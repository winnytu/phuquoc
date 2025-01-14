import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import DirectionsIcon from '@mui/icons-material/Directions';
import DateRangeIcon from '@mui/icons-material/DateRange';

const DailyActivity = ({ day }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const createGoogleMapsLink = (location) => {
    if (!location) return null;
    const query = encodeURIComponent(location.address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const createDirectionsLink = (fromLocation, toLocation) => {
    if (!fromLocation || !toLocation) return null;
    const origin = encodeURIComponent(fromLocation.address);
    const destination = encodeURIComponent(toLocation.address);
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  };

  return (
    <Paper sx={{ 
      p: { xs: 2, sm: 3 }, 
      mb: 3,
      borderRadius: 1,
      bgcolor: 'background.paper'
    }}>
      <Typography variant="h6" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        color: 'primary.main',
        '& .MuiSvgIcon-root': { mr: 1 }
      }}>
        <DateRangeIcon />
        Day {day.day} - {day.date}
      </Typography>

      <List sx={{ 
        '& .MuiListItem-root': { 
          px: { xs: 1, sm: 2 },
          py: 2,
          '&:hover': {
            bgcolor: 'grey.50'
          }
        }
      }}>
        {day.activities.map((activity, index) => {
          const nextActivity = day.activities[index + 1];
          
          return (
            <React.Fragment key={index}>
              {index > 0 && <Divider variant="inset" component="li" />}
              <ListItem sx={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                borderRadius: 2
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1, 
                  width: '100%',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' }
                }}>
                  <ListItemIcon sx={{
                    color: 'primary.main',
                    minWidth: { xs: 32, sm: 40 }
                  }}>
                    {activity.type === 'hotel' ? (
                      <HotelIcon />
                    ) : (
                      <AccessTimeIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {activity.name}
                      </Typography>
                    }
                    secondary={activity.time || '時間未定'}
                    sx={{
                      m: 0,
                      '& .MuiListItemText-secondary': {
                        color: 'text.secondary'
                      }
                    }}
                  />
                  {activity.status === 'confirmed' && (
                    <Chip 
                      label="已確認" 
                      color="success" 
                      size="small"
                      sx={{ 
                        height: 24,
                        fontSize: '0.75rem',
                        ml: { xs: 0, sm: 1 },
                        mt: { xs: 1, sm: 0 },
                        mr: { xs: 'auto', sm: 0 }
                      }}
                    />
                  )}
                  {activity.location && (
                    <Box sx={{ 
                      ml: 'auto', 
                      display: 'flex', 
                      gap: 1,
                      width: { xs: '100%', sm: 'auto' },
                      mt: { xs: 1, sm: 0 },
                      justifyContent: { xs: 'flex-end', sm: 'flex-start' }
                    }}>
                      <Tooltip title="在 Google Maps 中查看">
                        <IconButton
                          size="small"
                          color="primary"
                          href={createGoogleMapsLink(activity.location)}
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
                          <MapIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {nextActivity && nextActivity.location && (
                        <Tooltip title="查看到下一個地點的路線">
                          <IconButton
                            size="small"
                            color="primary"
                            href={createDirectionsLink(activity.location, nextActivity.location)}
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
                            <DirectionsIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  )}
                </Box>

                {activity.price && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    ml: { xs: 4, sm: 6 }
                  }}>
                    <AttachMoneyIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      TWD {activity.price}
                    </Typography>
                  </Box>
                )}
                
                {activity.description && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      ml: { xs: 4, sm: 6 },
                      mt: { xs: 1, sm: 0 }
                    }}
                  >
                    {activity.description}
                  </Typography>
                )}
                
                {activity.bookingLinks && (
                  <Box sx={{ 
                    ml: { xs: 4, sm: 6 }, 
                    mt: 1 
                  }}>
                    {Object.entries(activity.bookingLinks).map(([platform, link]) => (
                      <Link
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mr: 2 }}
                      >
                        {platform}預訂
                      </Link>
                    ))}
                  </Box>
                )}

                {activity.bookingNote && (
                  <Typography 
                    variant="body2" 
                    color="warning.main" 
                    sx={{ 
                      ml: { xs: 4, sm: 6 },
                      mt: { xs: 1, sm: 0 }
                    }}
                  >
                    注意：{activity.bookingNote}
                  </Typography>
                )}
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>

      {day.hotel && (
        <>
          <Divider sx={{ my: 3 }} />
          <Card sx={{ 
            bgcolor: 'primary.light',
            borderRadius: 1,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2 
              }}>
                <HotelIcon sx={{ 
                  mr: 1, 
                  color: 'primary.main',
                  fontSize: 28
                }} />
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  今晚住宿
                </Typography>
                {day.hotel.location && (
                  <IconButton
                    size="small"
                    color="primary"
                    href={createGoogleMapsLink(day.hotel.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      ml: 'auto',
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    <MapIcon />
                  </IconButton>
                )}
              </Box>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500
                }}
              >
                {day.hotel.name}
              </Typography>
              <Link
                href={day.hotel.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                查看訂房詳情
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </Paper>
  );
};

export default DailyActivity; 