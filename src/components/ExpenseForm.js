import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const categories = [
  { value: 'food', label: '餐飲' },
  { value: 'transport', label: '交通' },
  { value: 'shopping', label: '購物' },
  { value: 'entertainment', label: '娛樂' },
  { value: 'accommodation', label: '住宿' },
  { value: 'other', label: '其他' }
];

const currencies = [
  { value: 'TWD', label: 'TWD', rate: 1 },
  { value: 'VND', label: 'VND', rate: 0.0013 } // 1 VND = 0.0013 TWD (約略匯率)
];

const members = [
  { id: 1, name: '杜爸' },
  { id: 2, name: '杜麗' },
  { id: 3, name: 'superdudu' },
  { id: 4, name: 'winny' },
  { id: 5, name: 'mandy' }
];

const activityTypeToCategory = {
  transport: 'transport',
  taxi: 'transport',
  hotel: 'accommodation',
  breakfast: 'food',
  lunch: 'food',
  dinner: 'food',
  attraction: 'entertainment',
  nightlife: 'entertainment',
  spa: 'entertainment',
  shopping: 'shopping'
};

const ExpenseForm = ({ open, onClose, onSubmit, day, activity, initialExpense = null }) => {
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: day.date,
    dayNumber: day.day,
    currency: 'TWD',
    payer: '',
    amountInTWD: 0
  });

  useEffect(() => {
    if (initialExpense) {
      setExpense({
        ...initialExpense,
        amount: initialExpense.amount.toString()
      });
    } else if (activity) {
      const suggestedCategory = activityTypeToCategory[activity.type] || 'other';
      setExpense(prev => ({
        ...prev,
        category: suggestedCategory,
        description: activity.name
      }));
    }
  }, [activity, initialExpense]);

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    const rate = currencies.find(c => c.value === expense.currency).rate;
    setExpense(prev => ({
      ...prev,
      amount,
      amountInTWD: amount * rate
    }));
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    const rate = currencies.find(c => c.value === currency).rate;
    setExpense(prev => ({
      ...prev,
      currency,
      amountInTWD: prev.amount * rate
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.amount || !expense.category || !expense.payer) return;
    
    onSubmit({
      ...expense,
      id: initialExpense?.id || Date.now(),
      amount: Number(expense.amount),
      amountInTWD: Number(expense.amountInTWD)
    });
    setExpense({
      amount: '',
      category: '',
      description: '',
      date: day.date,
      dayNumber: day.day,
      currency: 'TWD',
      payer: '',
      amountInTWD: 0
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        m: 0, 
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        新增支出紀錄
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activity && (
              <Typography variant="subtitle2" sx={{ color: '#5D6D7E' }}>
                {activity.name} ({activity.time})
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                required
                label="金額"
                type="number"
                value={expense.amount}
                onChange={handleAmountChange}
                InputProps={{
                  inputProps: { min: 0 },
                  startAdornment: (
                    <InputAdornment position="start">
                      {expense.currency}
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 1 }}
              />
              <FormControl sx={{ width: 120 }} required>
                <InputLabel>幣別</InputLabel>
                <Select
                  value={expense.currency}
                  label="幣別"
                  onChange={handleCurrencyChange}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {expense.currency === 'VND' && expense.amount && (
              <Typography variant="body2" sx={{ color: '#5D6D7E' }}>
                約 {Math.round(expense.amountInTWD)} TWD
              </Typography>
            )}
            <FormControl required>
              <InputLabel>支付人</InputLabel>
              <Select
                value={expense.payer}
                label="支付人"
                onChange={(e) => setExpense({ ...expense, payer: e.target.value })}
              >
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required>
              <InputLabel>類別</InputLabel>
              <Select
                value={expense.category}
                label="類別"
                onChange={(e) => setExpense({ ...expense, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="描述"
              multiline
              rows={2}
              value={expense.description}
              onChange={(e) => setExpense({ ...expense, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">取消</Button>
          <Button type="submit" variant="contained">新增</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExpenseForm; 