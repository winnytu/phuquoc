import React, { useState, useRef, useEffect } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import DailyActivity from './DailyActivity';
import { schedule } from '../data/tripData';

const TripSchedule = () => {
  const [currentDay, setCurrentDay] = useState(schedule?.[0]?.day || 1);
  const tabsRef = useRef({});

  const handleDayChange = (event, newValue) => {
    setCurrentDay(newValue);
    // 滾動選中的標籤到中間
    const selectedTab = tabsRef.current[newValue];
    if (selectedTab) {
      selectedTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  // 確保當前日期存在
  const currentSchedule = schedule?.find(day => day.day === currentDay);
  if (!currentSchedule) {
    return null;
  }

  return (
    <>
      <Paper 
        sx={{ 
          mb: 3,
          borderRadius: 1,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}
      >
        <Tabs
          value={currentDay}
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            bgcolor: 'background.paper',
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
              bgcolor: '#6B90BF'
            },
            '& .MuiTab-root': {
              minWidth: 100,
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#5D6D7E',
              '&.Mui-selected': {
                color: '#2C3E50'
              }
            }
          }}
        >
          {schedule?.map((day, index) => (
            <Tab 
              key={index} 
              label={`DAY ${day.day}`}
              value={day.day}
              ref={el => tabsRef.current[day.day] = el}
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(107, 144, 191, 0.04)'
                }
              }}
            />
          ))}
        </Tabs>
      </Paper>
      <DailyActivity day={currentSchedule} />
    </>
  );
};

export default TripSchedule; 