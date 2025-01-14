import React from 'react';
import { 
  Paper, 
  Tabs, 
  Tab, 
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

const DayNavigation = ({ currentDay, onDayChange, days }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper sx={{ 
      mb: 2,
      borderRadius: 1,
      overflow: 'hidden',
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'rgba(107, 144, 191, 0.12)',
      bgcolor: '#FFFFFF'
    }}>
      <Tabs
        value={currentDay}
        onChange={(e, newValue) => onDayChange(newValue)}
        variant="scrollable"
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        sx={{
          minHeight: { xs: 56, sm: 64 },
          '& .MuiTabs-scroller': {
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'center'
          },
          '& .MuiTabs-flexContainer': {
            justifyContent: isMobile ? 'flex-start' : 'center'
          },
          '& .MuiTab-root': {
            minHeight: { xs: 56, sm: 64 },
            fontSize: { xs: '0.875rem', sm: '0.95rem' },
            px: { xs: 2, sm: 3 },
            minWidth: { xs: 'auto', sm: 120 },
            color: '#5D6D7E',
            '&.Mui-selected': {
              color: '#6B90BF',
              fontWeight: 600
            }
          },
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0',
            bgcolor: '#6B90BF'
          },
          '& .MuiTabScrollButton-root': {
            width: 20,
            opacity: 0.7,
            '&.Mui-disabled': {
              opacity: 0.2
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.1rem'
            }
          },
          '& .MuiSvgIcon-root': {
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            color: 'inherit'
          }
        }}
      >
        {days.map((day) => (
          <Tab
            key={day.day}
            icon={<DateRangeIcon />}
            label={`Day ${day.day}`}
            iconPosition="start"
            sx={{
              gap: 1,
              textTransform: 'none'
            }}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default DayNavigation; 