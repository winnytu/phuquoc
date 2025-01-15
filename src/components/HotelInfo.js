import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  ButtonBase,
  Stack,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import LinkIcon from '@mui/icons-material/Link';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const ActionButton = ({ icon: Icon, label, onClick, fullWidth = false }) => (
  <ButtonBase
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 1,
      py: 0.75,
      px: 1.5,
      borderRadius: 1,
      bgcolor: 'rgba(107, 144, 191, 0.04)',
      color: '#4F698C',
      transition: 'all 0.2s',
      width: fullWidth ? '100%' : 'auto',
      minHeight: 36,
      '&:hover': {
        bgcolor: 'rgba(107, 144, 191, 0.16)',
      }
    }}
  >
    <Icon sx={{ fontSize: '1.2rem', flexShrink: 0 }} />
    <Typography 
      variant="body2" 
      sx={{ 
        fontWeight: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: { xs: 'normal', sm: 'nowrap' },
        lineHeight: 1.2,
        flex: 1
      }}
    >
      {label}
    </Typography>
  </ButtonBase>
);

const HotelInfo = () => {
  const [hotels, setHotels] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const hotelsRef = ref(db, 'hotels');
    const unsubscribe = onValue(hotelsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // 將物件轉換為陣列並按照入住日期排序
        const hotelsList = Object.entries(data).map(([id, hotel]) => ({
          id,
          ...hotel
        })).sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
        setHotels(hotelsList);
      }
    });

    return () => unsubscribe();
  }, []);

  const createGoogleMapsLink = (location) => {
    if (!location) return null;
    const query = encodeURIComponent(location.address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <Stack spacing={2}>
      {hotels.map((hotel, index) => (
        <Paper 
          key={hotel.id} 
          sx={{ 
            p: { xs: 2, sm: 3 },
            borderRadius: 1,
            bgcolor: '#FFFFFF',
            border: '1px solid',
            borderColor: 'rgba(107, 144, 191, 0.12)'
          }}
        >
          {/* Hotel Name and Dates */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            mb: 2
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#2C3E50',
                fontWeight: 600,
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                lineHeight: 1.3
              }}
            >
              <HotelIcon sx={{ color: '#6B90BF', fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
              {hotel.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: '#5D6D7E',
                pl: { xs: 0.5, sm: 0.5 }
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: '1rem' }} />
              {hotel.checkIn} - {hotel.checkOut}
            </Typography>
          </Box>

          <Divider sx={{ 
            my: 2,
            borderColor: 'rgba(107, 144, 191, 0.12)'
          }} />

          {/* Hotel Actions */}
          <Stack 
            spacing={1}
            sx={{ width: '100%' }}
          >
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              flexWrap: 'wrap'
            }}>
              <ActionButton
                icon={NightsStayIcon}
                label={`${hotel.nights} 晚`}
              />
              
              <ActionButton
                icon={MapIcon}
                label="查看地圖"
                onClick={() => window.open(createGoogleMapsLink(hotel.location), '_blank')}
              />

              <ActionButton
                icon={LinkIcon}
                label="訂房詳情"
                onClick={() => window.open(hotel.bookingLink, '_blank')}
              />
            </Box>

            <ActionButton
              icon={LocationOnIcon}
              label={hotel.location.address}
              onClick={() => window.open(createGoogleMapsLink(hotel.location), '_blank')}
              fullWidth={isMobile}
            />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default HotelInfo; 