import React from 'react';
import { 
  Paper, 
  Tabs, 
  Tab, 
  Box 
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

const DayNavigation = ({ currentDay, onDayChange, days }) => {
  return (
    <Paper sx={{ 
      mb: 2,
      borderRadius: 1,
      overflow: 'hidden'
    }}>
      <Tabs
        value={currentDay}
        onChange={(e, newValue) => onDayChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            minHeight: 64,
            fontSize: '0.95rem'
          },
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0'
          }
        }}
      >
        {days.map((day) => (
          <Tab
            key={day.day}
            icon={<DateRangeIcon />}
            label={`Day ${day.day}`}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default DayNavigation; 