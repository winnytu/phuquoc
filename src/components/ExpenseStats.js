import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { db } from '../firebase';
import { ref, onValue, remove, update } from 'firebase/database';
import ExpenseForm from './ExpenseForm';

const members = [
  { id: 1, name: '杜爸' },
  { id: 2, name: '杜麗' },
  { id: 3, name: 'superdudu' },
  { id: 4, name: 'winny' },
  { id: 5, name: 'mandy' }
];

const categoryIcons = {
  food: RestaurantIcon,
  hotel: HotelIcon,
  transport: FlightTakeoffIcon,
  taxi: LocalTaxiIcon,
  attraction: BeachAccessIcon,
  shopping: ShoppingBagIcon,
  other: AttachMoneyIcon
};

const categoryLabels = {
  food: '餐飲',
  hotel: '住宿',
  transport: '交通',
  taxi: '計程車',
  attraction: '景點',
  shopping: '購物',
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const expensesRef = ref(db, 'expenses');
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val() || {};
      
      // 加入固定支出
      const fixedExpenses = {
        flight1: {
          amount: 13186,
          amountInTWD: 13186,
          category: 'transport',
          currency: 'TWD',
          dayNumber: 1,
          description: '機票',
          payer: '杜爸',
          splitWith: ['杜爸'],
          date: '2024-01-24'
        },
        flight2: {
          amount: 13186,
          amountInTWD: 13186,
          category: 'transport',
          currency: 'TWD',
          dayNumber: 1,
          description: '機票',
          payer: '杜麗',
          splitWith: ['杜麗'],
          date: '2024-01-24'
        },
        flight3: {
          amount: 13186,
          amountInTWD: 13186,
          category: 'transport',
          currency: 'TWD',
          dayNumber: 1,
          description: '機票',
          payer: 'superdudu',
          splitWith: ['superdudu'],
          date: '2024-01-24'
        },
        flight4: {
          amount: 13186,
          amountInTWD: 13186,
          category: 'transport',
          currency: 'TWD',
          dayNumber: 1,
          description: '機票',
          payer: 'winny',
          splitWith: ['winny'],
          date: '2024-01-24'
        },
        flight5: {
          amount: 13186,
          amountInTWD: 13186,
          category: 'transport',
          currency: 'TWD',
          dayNumber: 1,
          description: '機票',
          payer: 'mandy',
          splitWith: ['mandy'],
          date: '2024-01-24'
        },
        hotel1: {
          amount: 38723,
          amountInTWD: 38723,
          category: 'hotel',
          currency: 'TWD',
          dayNumber: 1,
          description: 'Sailing Club Signature Resort (1/24-1/26)',
          payer: 'winny',
          splitWith: ['杜爸', '杜麗', 'superdudu', 'winny', 'mandy'],
          date: '2024-01-24'
        },
        hotel2: {
          amount: 25912,
          amountInTWD: 25912,
          category: 'hotel',
          currency: 'TWD',
          dayNumber: 3,
          description: 'New World Phu Quoc Resort (1/26-1/28)',
          payer: 'winny',
          splitWith: ['杜爸', '杜麗', 'superdudu', 'winny', 'mandy'],
          date: '2024-01-26'
        },
        hotel3: {
          amount: 18420,
          amountInTWD: 18420,
          category: 'hotel',
          currency: 'TWD',
          dayNumber: 5,
          description: 'Ocean Bay Phu Quoc Resort (1/28-1/29)',
          payer: 'winny',
          splitWith: ['杜爸', '杜麗', 'superdudu', 'winny', 'mandy'],
          date: '2024-01-28'
        }
      };

      // 合併固定支出和資料庫支出
      const mergedData = { ...fixedExpenses, ...data };
      
      const expensesList = Object.entries(mergedData).map(([id, expense]) => ({
        ...expense,
        id
      }));
      setExpenses(expensesList);

      // 計算總金額（以TWD為準）
      const total = expensesList.reduce((sum, expense) => sum + expense.amountInTWD, 0);
      setTotalAmount(total);

      // 計算各類別總額
      const catTotals = expensesList.reduce((acc, expense) => {
        const category = expense.category || 'other';
        acc[category] = (acc[category] || 0) + expense.amountInTWD;
        return acc;
      }, {});
      setCategoryTotals(catTotals);

      // 計算各付款人實際消費總額（扣除幫別人分擔的部分）
      const payTotals = {};
      members.forEach(member => {
        const memberName = member.name;
        
        // 1. 計算這個人付出的總金額
        const paidTotal = expensesList
          .filter(expense => expense.payer === memberName)
          .reduce((sum, expense) => sum + expense.amountInTWD, 0);
        
        // 2. 計算這個人應該分擔的總金額
        const shouldPayTotal = expensesList
          .filter(expense => expense.splitWith.includes(memberName))
          .reduce((sum, expense) => {
            // 計算每個人實際應分擔的金額
            const splitAmount = expense.amountInTWD / expense.splitWith.length;
            return sum + splitAmount;
          }, 0);
        
        // 3. 設定付出金額和應付金額
        payTotals[memberName] = {
          paid: paidTotal,
          shouldPay: shouldPayTotal
        };
      });
      setPayerTotals(payTotals);
    });

    return () => unsubscribe();
  }, []);

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setShowEditForm(true);
  };

  const handleUpdateExpense = (updatedExpense) => {
    const expenseRef = ref(db, `expenses/${selectedExpense.id}`);
    update(expenseRef, {
      ...updatedExpense,
      timestamp: Date.now()
    });
    setShowEditForm(false);
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      const expenseRef = ref(db, `expenses/${selectedExpense.id}`);
      remove(expenseRef);
      setShowDeleteDialog(false);
      setSelectedExpense(null);
    }
  };

  const formatAmount = (amount, currency = 'TWD') => {
    const formatter = new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  };

  const toggleAmountDisplay = () => {
    setShowOriginalAmount(!showOriginalAmount);
  };

  const calculatePaymentInstructions = () => {
    // 計算每個人的淨額（付出 - 應付）
    const netAmounts = {};
    members.forEach(member => {
      const paidAmount = payerTotals[member.name]?.paid || 0;
      const shouldPayAmount = payerTotals[member.name]?.shouldPay || 0;
      netAmounts[member.name] = paidAmount - shouldPayAmount;
    });

    // 找出債務人和債權人
    const debtors = Object.entries(netAmounts)
      .filter(([_, amount]) => amount < 0)
      .sort((a, b) => a[1] - b[1]);
    const creditors = Object.entries(netAmounts)
      .filter(([_, amount]) => amount > 0)
      .sort((a, b) => b[1] - a[1]);

    // 計算付款指示
    const instructions = [];
    let debtorIndex = 0;
    let creditorIndex = 0;

    while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
      const [debtorName, debtorAmount] = debtors[debtorIndex];
      const [creditorName, creditorAmount] = creditors[creditorIndex];
      
      const amount = Math.min(Math.abs(debtorAmount), creditorAmount);
      if (amount >= 1) { // 只顯示金額大於等於1元的交易
        instructions.push({
          from: debtorName,
          to: creditorName,
          amount
        });
      }

      if (Math.abs(debtorAmount) === creditorAmount) {
        debtorIndex++;
        creditorIndex++;
      } else if (Math.abs(debtorAmount) < creditorAmount) {
        creditors[creditorIndex][1] -= Math.abs(debtorAmount);
        debtorIndex++;
      } else {
        debtors[debtorIndex][1] += creditorAmount;
        creditorIndex++;
      }
    }

    return instructions;
  };

  const renderPayerStats = () => {
    return members.map((member) => {
      const paidAmount = payerTotals[member.name]?.paid || 0;
      const shouldPayAmount = payerTotals[member.name]?.shouldPay || 0;
      const balance = paidAmount - shouldPayAmount;

      return (
        <Box
          key={member.name}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            p: { xs: 1.25, sm: 1.5 },
            bgcolor: 'rgba(107, 144, 191, 0.04)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'rgba(107, 144, 191, 0.08)'
          }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#2C3E50',
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {member.name}
          </Typography>
          <Stack spacing={0.5} alignItems="flex-end">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#5D6D7E',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' }
                }}
              >
                總支出
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#2C3E50',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {formatAmount(shouldPayAmount)}
              </Typography>
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#5D6D7E',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' }
                }}
              >
                已付
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#1976D2',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {formatAmount(paidAmount)}
              </Typography>
            </Box>
           
            {balance !== 0 && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: balance > 0 ? '#2e7d32' : '#d32f2f',
                  fontWeight: 500,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' }
                }}
              >
                {balance > 0 
                  ? `待收 ${formatAmount(balance)}` 
                  : `待付 ${formatAmount(Math.abs(balance))}`}
              </Typography>
            )}
          </Stack>
        </Box>
      );
    });
  };

  return (
    <Box sx={{ maxWidth: '100%', pb: { xs: 7, sm: 0 } }}>
      {/* 總金額卡片 */}
      <Paper 
        sx={{ 
          p: { xs: 2.5, sm: 3 },
          bgcolor: '#FFFFFF',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          sx={{ 
            color: '#2C3E50',
            textAlign: 'center',
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '1.25rem', sm: '2rem' }
          }}
        >
          總支出
        </Typography>
        <Typography 
          variant={isMobile ? "h4" : "h3"}
          onClick={toggleAmountDisplay}
          sx={{ 
            color: '#1976D2',
            textAlign: 'center',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.2s',
            fontSize: { xs: '2rem', sm: '3rem' },
            '&:hover': {
              color: '#1565C0'
            }
          }}
        >
          {formatAmount(totalAmount)}
        </Typography>
      </Paper>

      {/* 機票支出 */}
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          mt: 3,
          bgcolor: '#FFFFFF',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2C3E50',
            mb: { xs: 1.5, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}
        >
          <FlightTakeoffIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          機票費用
        </Typography>
        <Stack spacing={1}>
          {expenses
            .filter(expense => expense.id.startsWith('flight'))
            .map((expense) => (
              <Box 
                key={expense.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: { xs: 1.25, sm: 1.5 },
                  bgcolor: 'rgba(107, 144, 191, 0.04)',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'rgba(107, 144, 191, 0.08)'
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#2C3E50',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {expense.payer}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#1976D2',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {formatAmount(expense.amountInTWD)}
                </Typography>
              </Box>
          ))}
        </Stack>
      </Paper>

      {/* 飯店支出 */}
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          mt: 3,
          bgcolor: '#FFFFFF',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2C3E50',
            mb: { xs: 1.5, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}
        >
          <HotelIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          住宿費用
        </Typography>
        <Stack spacing={1}>
          {expenses
            .filter(expense => expense.id.startsWith('hotel'))
            .map((expense) => (
              <Box 
                key={expense.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  p: { xs: 1.25, sm: 1.5 },
                  bgcolor: 'rgba(107, 144, 191, 0.04)',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'rgba(107, 144, 191, 0.08)'
                }}
              >
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#2C3E50',
                      fontWeight: 500,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      mb: 0.5
                    }}
                  >
                    {expense.description}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#5D6D7E',
                      fontSize: { xs: '0.75rem', sm: '0.8rem' }
                    }}
                  >
                    {`付款人: ${expense.payer}`}
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#1976D2',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {formatAmount(expense.amountInTWD)}
                </Typography>
              </Box>
          ))}
        </Stack>
      </Paper>

      {/* 付款人統計 */}
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          bgcolor: '#FFFFFF',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2C3E50',
            mb: { xs: 1.5, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}
        >
          <AttachMoneyIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          支出分析
        </Typography>
        <Stack spacing={1.5}>
          {renderPayerStats()}
        </Stack>
      </Paper>

      {/* 類別統計 */}
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          bgcolor: '#FFFFFF',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2C3E50',
            mb: { xs: 1.5, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}
        >
          <AttachMoneyIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          分類統計
        </Typography>
        <Stack spacing={1.5}>
          {Object.entries(categoryTotals).map(([category, amount]) => {
            const Icon = categoryIcons[category] || categoryIcons.other;
            return (
              <Box 
                key={category}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: { xs: 1.25, sm: 1.5 },
                  bgcolor: 'rgba(107, 144, 191, 0.04)',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'rgba(107, 144, 191, 0.08)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon sx={{ color: '#6B90BF', fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#2C3E50', 
                      fontWeight: 500,
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    {categoryLabels[category] || category}
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#1976D2',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {formatAmount(amount)}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Paper>

      {/* 每日支出明細 */}
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          mt: 3,
          bgcolor: '#FFFFFF',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2C3E50',
            mb: { xs: 1.5, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}
        >
          <AttachMoneyIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          每日明細
        </Typography>
        <Stack spacing={2}>
          {Object.entries(
            expenses
              .filter(expense => !expense.id.startsWith('flight') && !expense.id.startsWith('hotel'))
              .reduce((acc, expense) => {
                const day = expense.dayNumber;
                if (!acc[day]) {
                  acc[day] = [];
                }
                acc[day].push(expense);
                return acc;
              }, {})
          )
            .sort(([a], [b]) => a - b)
            .map(([day, dayExpenses]) => (
              <Box key={day}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#2C3E50',
                    fontWeight: 600,
                    mb: 1.5,
                    pb: 0.5,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(107, 144, 191, 0.12)',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
                  DAY {day}
                </Typography>
                <Stack spacing={1}>
                  {dayExpenses.map((expense) => {
                    const Icon = categoryIcons[expense.category] || categoryIcons.other;
                    return (
                      <Box 
                        key={expense.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          p: { xs: 1.25, sm: 1.5 },
                          bgcolor: 'rgba(107, 144, 191, 0.04)',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'rgba(107, 144, 191, 0.08)'
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1, 
                            mb: 0.5,
                            flexWrap: 'wrap'
                          }}>
                            <Icon sx={{ 
                              color: '#6B90BF', 
                              fontSize: { xs: '1.1rem', sm: '1.2rem' },
                              flexShrink: 0
                            }} />
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                color: '#2C3E50',
                                fontWeight: 500,
                                flex: 1,
                                fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                minWidth: { xs: '100px', sm: 'auto' }
                              }}
                            >
                              {expense.description || categoryLabels[expense.category] || '未分類支出'}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              gap: 0.5,
                              ml: 'auto',
                              flexShrink: 0
                            }}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditExpense(expense)}
                                sx={{ 
                                  color: '#6B90BF',
                                  padding: { xs: '4px', sm: '8px' },
                                  '&:hover': { color: '#1976D2' }
                                }}
                              >
                                <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteClick(expense)}
                                sx={{ 
                                  color: '#6B90BF',
                                  padding: { xs: '4px', sm: '8px' },
                                  '&:hover': { color: '#d32f2f' }
                                }}
                              >
                                <DeleteIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 1,
                              ml: '1.7rem',
                              flexWrap: 'wrap'
                            }}
                          >
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#5D6D7E',
                                fontSize: { xs: '0.75rem', sm: '0.8rem' }
                              }}
                            >
                              {expense.payer}
                            </Typography>
                            {expense.splitWith?.length > 0 && (
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: '#5D6D7E',
                                  fontSize: { xs: '0.75rem', sm: '0.8rem' }
                                }}
                              >
                                {`分攤: ${expense.splitWith.join(', ')}`}
                              </Typography>
                            )}
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#5D6D7E',
                                fontSize: { xs: '0.75rem', sm: '0.8rem' }
                              }}
                            >
                              {expense.activityName}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          onClick={toggleAmountDisplay}
                          sx={{ 
                            color: '#1976D2',
                            fontWeight: 600,
                            cursor: 'pointer',
                            ml: 2,
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '0.875rem', sm: '0.9rem' }
                          }}
                        >
                          {showOriginalAmount 
                            ? `${formatAmount(expense.amount, expense.currency)}`
                            : formatAmount(expense.amountInTWD)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
          ))}
        </Stack>
      </Paper>

      {/* Edit Expense Dialog */}
      {showEditForm && (
        <ExpenseForm
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleUpdateExpense}
          day={{ day: selectedExpense.dayNumber, date: selectedExpense.date }}
          initialExpense={selectedExpense}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: '#2C3E50' }}>確認刪除</DialogTitle>
        <DialogContent>
          <Typography>
            確定要刪除這筆支出嗎？此操作無法復原。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowDeleteDialog(false)}
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

      {/* 待結算金額 */}
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          mt: 3,
          bgcolor: '#FFFFFF',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Typography 
          variant="h6"
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            color: '#2C3E50',
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            mb: 2
          }}
        >
          <SwapHorizIcon sx={{ mr: 1, color: '#6B90BF' }} />
          待結算金額
        </Typography>

        <Stack spacing={2}>
          {calculatePaymentInstructions().map((instruction, index) => (
            <Box 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: { xs: 1.25, sm: 1.5 },
                bgcolor: 'rgba(107, 144, 191, 0.04)',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'rgba(107, 144, 191, 0.08)'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#2C3E50',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {instruction.from}
                </Typography>
                <ArrowRightAltIcon sx={{ color: '#6B90BF' }} />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#2C3E50',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {instruction.to}
                </Typography>
              </Stack>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#1976D2',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {formatAmount(instruction.amount)}
              </Typography>
            </Box>
          ))}
          {calculatePaymentInstructions().length === 0 && (
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#5D6D7E',
                textAlign: 'center',
                py: 2
              }}
            >
              目前沒有待結算金額
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ExpenseStats; 