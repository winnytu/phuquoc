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
            background: 'linear-gradient(135deg, #6B90BF 0%, #96B9D9 100%)',
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

          <Card sx={{ 
            mb: 3,
            bgcolor: '#FFFFFF',
            border: '1px solid',
            borderColor: 'rgba(107, 144, 191, 0.12)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: '#2C3E50',
                  fontWeight: 600
                }}
              >
                <HotelIcon sx={{ mr: 1, color: '#6B90BF' }} />
                {hotel.name}
              </Typography>

              <Box sx={{ 
                display: 'flex',
                gap: 2,
                mt: 2,
                flexWrap: 'wrap'
              }}>
                <Chip 
                  icon={<CalendarTodayIcon />} 
                  label={`${hotel.checkIn} - ${hotel.checkOut}`}
                  sx={{
                    bgcolor: '#E3F2FD',
                    color: '#2C3E50',
                    '& .MuiSvgIcon-root': {
                      color: '#6B90BF'
                    }
                  }}
                />
                <Chip 
                  label={`${hotel.nights} 晚`}
                  size="small"
                  sx={{ 
                    ml: 'auto',
                    bgcolor: '#E3F2FD',
                    color: '#4F698C'
                  }}
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
                      bgcolor: '#E3F2FD',
                      color: '#6B90BF',
                      '&:hover': {
                        bgcolor: '#6B90BF',
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
                  borderRadius: 2,
                  bgcolor: '#6B90BF',
                  '&:hover': {
                    bgcolor: '#4F698C'
                  }
                }}
              >
                查看訂房詳情
              </Button>
            </CardContent>
          </Card>
        </Paper>
      ))}
    </Stack>
  );
};

export default HotelInfo; 