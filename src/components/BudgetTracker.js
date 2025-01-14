import React from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const BudgetTracker = ({ activities }) => {
  const totalBudget = activities
    .filter(activity => activity.price)
    .reduce((sum, activity) => sum + activity.price, 0);

  const confirmedExpenses = activities
    .filter(activity => activity.price && activity.status === 'confirmed')
    .reduce((sum, activity) => sum + activity.price, 0);

  return (
    <Paper sx={{ 
      borderRadius: 1,
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #34A853 0%, #4CAF50 100%)',
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ 
          display: 'flex', 
          alignItems: 'center',
          '& .MuiSvgIcon-root': { mr: 1 }
        }}>
          <AccountBalanceWalletIcon />
          預算追蹤
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          <AttachMoneyIcon color="primary" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              總預算
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
              TWD {totalBudget.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          <TrendingUpIcon color="success" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              已確認支出
            </Typography>
            <Typography variant="h6" color="success.main" sx={{ fontWeight: 500 }}>
              TWD {confirmedExpenses.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List sx={{ 
          '& .MuiListItem-root': {
            px: 0,
            py: 1.5
          }
        }}>
          {activities
            .filter(activity => activity.price)
            .map((activity, index) => (
              <ListItem 
                key={index}
                secondaryAction={
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      TWD {activity.price.toLocaleString()}
                    </Typography>
                    {activity.status === 'confirmed' && (
                      <Chip 
                        label="已確認" 
                        color="success" 
                        size="small"
                        sx={{ 
                          mt: 0.5,
                          height: 20,
                          fontSize: '0.75rem'
                        }}
                      />
                    )}
                  </Box>
                }
              >
                <ListItemText
                  primary={activity.name}
                  secondary={activity.time}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: 500
                    }
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Stack>
    </Paper>
  );
};

export default BudgetTracker; 