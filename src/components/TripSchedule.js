import React, { useState } from 'react';
import { 
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DailyActivity from './DailyActivity';
import { schedule } from '../data/tripData';

const TripSchedule = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDay, setCurrentDay] = useState(schedule?.[0]?.day || 1);

  const handleDayChange = (event, newValue) => {
    setCurrentDay(newValue);
  };

  if (!schedule || schedule.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>載入中...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Tabs
        value={currentDay}
        onChange={handleDayChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: '#EDF2F7',
          '& .MuiTab-root': {
            minWidth: { xs: 'auto', sm: 100 },
            px: { xs: 2, sm: 3 },
            color: '#5D6D7E',
            '&.Mui-selected': {
              color: '#6B90BF'
            }
          }
        }}
      >
        {schedule?.map((day) => (
          <Tab 
            key={day.day}
            label={`Day ${day.day}`}
            value={day.day}
          />
        ))}
      </Tabs>

      <Box>
        {schedule?.map((day) => (
          <Box 
            key={day.day} 
            sx={{ 
              display: currentDay === day.day ? 'block' : 'none'
            }}
          >
            <DailyActivity 
              day={day}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TripSchedule; 