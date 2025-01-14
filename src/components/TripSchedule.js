import React, { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Paper,
  Fade
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DailyActivity from './DailyActivity';
import { schedule } from '../data/tripData';

const TripSchedule = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDay, setCurrentDay] = useState(schedule?.[0]?.day || 1);

  useEffect(() => {
    const getCurrentScheduleDay = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 重置時間為當天 00:00:00

      // 尋找當天或最近的未來行程
      const currentSchedule = schedule.find(day => {
        const scheduleDate = new Date(day.date);
        scheduleDate.setHours(0, 0, 0, 0);
        return scheduleDate.getTime() === today.getTime();
      });

      if (currentSchedule) {
        setCurrentDay(currentSchedule.day);
      }
    };

    getCurrentScheduleDay();
  }, []); // 只在組件掛載時執行一次

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
          <CalendarMonthIcon sx={{ mr: 1, color: '#6B90BF' }} />
          行程安排
        </Typography>

        <Tabs
          value={currentDay}
          onChange={handleDayChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            mb: 3,
            borderBottom: 1,
            borderColor: '#EDF2F7',
            '& .MuiTab-root': {
              minWidth: { xs: 'auto', sm: 100 },
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: '#5D6D7E',
              '&.Mui-selected': {
                color: '#6B90BF',
                fontWeight: 600
              }
            },
            '& .MuiTabs-scrollButtons': {
              '&.Mui-disabled': {
                opacity: 0.3,
              },
            },
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
            <Fade 
              key={day.day}
              in={currentDay === day.day}
              timeout={300}
            >
              <Box 
                sx={{ 
                  display: currentDay === day.day ? 'block' : 'none'
                }}
              >
                <DailyActivity 
                  day={day}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default TripSchedule; 