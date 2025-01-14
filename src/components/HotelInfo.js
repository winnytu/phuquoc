import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import { hotels } from '../data/tripData';

const HotelInfo = () => {
  const createGoogleMapsLink = (location) => {
    if (!location) return null;
    const query = encodeURIComponent(location.address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <Stack spacing={3}>
      {hotels.map((hotel) => (
        <Paper 
          key={hotel.id} 
          sx={{ 
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #1A73E8 0%, #4285F4 100%)',
            color: 'white'
          }}>
            <Typography variant="h6" sx={{ 
              display: 'flex', 
              alignItems: 'center',
              '& .MuiSvgIcon-root': { mr: 1 }
            }}>
              <HotelIcon />
              {hotel.name}
            </Typography>
          </Box>

          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2
              }}>
                <CalendarTodayIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    入住日期
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {hotel.checkIn}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    退房日期
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {hotel.checkOut}
                  </Typography>
                </Box>
                <Chip 
                  label={`${hotel.nights} 晚`}
                  color="primary"
                  size="small"
                  sx={{ ml: 'auto' }}
                />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2
              }}>
                <LocationOnIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    飯店地址
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {hotel.location.address}
                  </Typography>
                </Box>
                <Tooltip title="在 Google Maps 中查看">
                  <IconButton
                    color="primary"
                    href={createGoogleMapsLink(hotel.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: 'primary.light',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    <MapIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Button
                variant="contained"
                color="primary"
                href={hotel.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  borderRadius: 2
                }}
              >
                查看訂房詳情
              </Button>
            </Stack>
          </CardContent>
        </Paper>
      ))}
    </Stack>
  );
};

export default HotelInfo; 