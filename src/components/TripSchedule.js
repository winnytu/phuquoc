import React, { useState } from 'react';
import { 
  Box, 
  Grid,
  Paper,
  Typography,
  Stack
} from '@mui/material';
import { dailyItinerary } from '../data/tripData';
import DailyActivity from './DailyActivity';
import DayNavigation from './DayNavigation';
import PhotoGallery from './PhotoGallery';
import BudgetTracker from './BudgetTracker';
import { photos } from '../data/tripData';

const TripSchedule = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const selectedDay = dailyItinerary[currentDay];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DayNavigation
          currentDay={currentDay}
          onDayChange={setCurrentDay}
          days={dailyItinerary}
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <DailyActivity day={selectedDay} />
          <PhotoGallery photos={photos[selectedDay.date] || []} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box sx={{ position: 'sticky', top: 24 }}>
          <BudgetTracker activities={selectedDay.activities} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TripSchedule; 