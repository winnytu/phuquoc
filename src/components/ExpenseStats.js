import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HotelIcon from '@mui/icons-material/Hotel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { db } from '../firebase';
import { ref, onValue, remove, update } from 'firebase/database';
import ExpenseForm from './ExpenseForm';

const categoryIcons = {
  food: RestaurantIcon,
  transport: DirectionsBusIcon,
  shopping: ShoppingBagIcon,
  entertainment: TheaterComedyIcon,
  accommodation: HotelIcon,
  other: MoreHorizIcon
};

const categoryLabels = {
  food: '餐飲',
  transport: '交通',
  shopping: '購物',
  entertainment: '娛樂',
  accommodation: '住宿',
  other: '其他'
};

const ExpenseStats = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [payerTotals, setPayerTotals] = useState({});
  const [showOriginalAmount, setShowOriginalAmount] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    const expensesRef = ref(db, 'expenses');
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expensesList = Object.entries(data).map(([id, expense]) => ({
          ...expense,
          id
        }));
        setExpenses(expensesList);

        // Calculate totals
        const total = expensesList.reduce((sum, expense) => sum + expense.amountInTWD, 0);
        setTotalAmount(total);

        // Calculate category totals
        const catTotals = expensesList.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amountInTWD;
          return acc;
        }, {});
        setCategoryTotals(catTotals);

        // Calculate payer totals
        const payTotals = expensesList.reduce((acc, expense) => {
          acc[expense.payer] = (acc[expense.payer] || 0) + expense.amountInTWD;
          return acc;
        }, {});
        setPayerTotals(payTotals);
      }
    });

    return () => unsubscribe();
  }, []);

  const formatAmount = (amount, currency = 'TWD') => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleEditExpense = (expense) => {
    setEditExpense(expense);
  };

  const handleUpdateExpense = (updatedExpense) => {
    const expenseRef = ref(db, `expenses/${editExpense.id}`);
    update(expenseRef, {
      ...updatedExpense,
      timestamp: Date.now()
    });
    setEditExpense(null);
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      const expenseRef = ref(db, `expenses/${selectedExpense.id}`);
      remove(expenseRef);
      setDeleteConfirmOpen(false);
      setSelectedExpense(null);
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Paper sx={{ 
        p: { xs: 2, sm: 3 },
        mb: 3,
        bgcolor: '#FFFFFF',
        border: '1px solid',
        borderColor: 'rgba(107, 144, 191, 0.12)',
        borderRadius: 1
      }}>
        <Typography variant="h6" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: '#2C3E50',
          fontWeight: 600,
          mb: 3,
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}>
          <AttachMoneyIcon sx={{ mr: 1, color: '#6B90BF' }} />
          消費統計
        </Typography>

        {/* Total Amount */}
        <Box sx={{ 
          mb: 4,
          p: 2,
          bgcolor: 'rgba(107, 144, 191, 0.04)',
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography variant="h4" sx={{ 
            color: '#2C3E50',
            fontWeight: 600
          }}>
            {formatAmount(totalAmount)}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#5D6D7E' }}>
            總支出
          </Typography>
        </Box>

        {/* Payer Breakdown */}
        <Typography variant="h6" sx={{ 
          mb: 2,
          color: '#2C3E50',
          fontWeight: 600
        }}>
          支付統計
        </Typography>
        <Stack spacing={2} sx={{ mb: 4 }}>
          {Object.entries(payerTotals).map(([payer, amount]) => (
            <Box key={payer} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'rgba(107, 144, 191, 0.04)',
              borderRadius: 1
            }}>
              <Typography sx={{ color: '#2C3E50' }}>
                {payer}
              </Typography>
              <Typography sx={{ 
                color: '#2C3E50',
                fontWeight: 500
              }}>
                {formatAmount(amount)}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Category Breakdown */}
        <Typography variant="h6" sx={{ 
          mb: 2,
          color: '#2C3E50',
          fontWeight: 600
        }}>
          類別統計
        </Typography>
        <Stack spacing={2} sx={{ mb: 4 }}>
          {Object.entries(categoryTotals).map(([category, amount]) => {
            const Icon = categoryIcons[category];
            return (
              <Box key={category} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                bgcolor: 'rgba(107, 144, 191, 0.04)',
                borderRadius: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon sx={{ color: '#6B90BF' }} />
                  <Typography sx={{ color: '#2C3E50' }}>
                    {categoryLabels[category]}
                  </Typography>
                </Box>
                <Typography sx={{ 
                  color: '#2C3E50',
                  fontWeight: 500
                }}>
                  {formatAmount(amount)}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Daily Breakdown */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ 
            mb: 2,
            color: '#2C3E50',
            fontWeight: 600
          }}>
            每日支出
          </Typography>
          <Stack spacing={2}>
            {Object.entries(expenses.reduce((acc, expense) => {
              const dayKey = `Day ${expense.dayNumber}`;
              if (!acc[dayKey]) {
                acc[dayKey] = {
                  date: expense.date,
                  total: 0,
                  expenses: []
                };
              }
              acc[dayKey].total += expense.amountInTWD;
              acc[dayKey].expenses.push(expense);
              return acc;
            }, {})).map(([dayKey, day]) => (
              <Paper key={dayKey} sx={{
                p: 2,
                bgcolor: 'rgba(107, 144, 191, 0.04)',
                borderRadius: 1
              }}>
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1
                }}>
                  <Typography sx={{ color: '#2C3E50', fontWeight: 500 }}>
                    {dayKey}
                  </Typography>
                  <Typography sx={{ color: '#2C3E50', fontWeight: 600 }}>
                    {formatAmount(day.total)}
                  </Typography>
                </Box>
                <Stack spacing={1}>
                  {day.expenses.map((expense) => {
                    const Icon = categoryIcons[expense.category];
                    const amount = showOriginalAmount ? expense.amount : expense.amountInTWD;
                    const currency = showOriginalAmount ? expense.currency : 'TWD';
                    return (
                      <Box
                        key={expense.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1,
                          bgcolor: 'rgba(107, 144, 191, 0.08)',
                          borderRadius: 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                          <Icon sx={{ color: '#6B90BF' }} />
                          <Typography sx={{ color: '#4F698C', flex: 1 }}>
                            {expense.description || categoryLabels[expense.category]}
                          </Typography>
                          <Typography sx={{ color: '#4F698C' }}>
                            ({expense.payer}) {formatAmount(amount, currency)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditExpense(expense)}
                            sx={{ 
                              color: '#6B90BF',
                              '&:hover': { color: '#1976D2' }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(expense)}
                            sx={{ 
                              color: '#6B90BF',
                              '&:hover': { color: '#d32f2f' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Edit Expense Dialog */}
        {editExpense && (
          <ExpenseForm
            open={!!editExpense}
            onClose={() => setEditExpense(null)}
            onSubmit={handleUpdateExpense}
            day={{ day: editExpense.dayNumber, date: editExpense.date }}
            initialExpense={editExpense}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ color: '#2C3E50' }}>確認刪除</DialogTitle>
          <DialogContent>
            <Typography>
              確定要刪除這筆支出記錄嗎？此操作無法復原。
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setDeleteConfirmOpen(false)}
              sx={{ color: '#6B90BF' }}
            >
              取消
            </Button>
            <Button 
              onClick={handleConfirmDelete}
              sx={{ color: '#d32f2f' }}
            >
              刪除
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ExpenseStats; 