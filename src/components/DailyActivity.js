import React, { useState } from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import DirectionsIcon from '@mui/icons-material/Directions';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttractionDetails from './AttractionDetails';
import { attractions } from '../data/tripData';

const DailyActivity = ({ day }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expandedActivity, setExpandedActivity] = useState(null);

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

  const getAttractionKey = (activityName) => {
    const nameMap = {
      '日落沙灘 (Sunset Beach)': 'sunsetBeach',
      '野生動物園 (Vinpearl Safari)': 'vinpearlSafari',
      '富國大世界 (VinWonders)': 'vinWonders',
      '日落小鎮 (Sunset Town)': 'sunsetTown'
    };
    return nameMap[activityName];
  };

  const handleExpandActivity = (activityName) => {
    setExpandedActivity(expandedActivity === activityName ? null : activityName);
  };

  return (
    <Paper sx={{ 
      p: { xs: 2, sm: 3 }, 
      mb: 3,
      borderRadius: 1,
      bgcolor: '#FFFFFF',
      border: '1px solid',
      borderColor: 'rgba(107, 144, 191, 0.12)'
    }}>
      <Typography variant="h6" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        color: '#2C3E50',
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
        fontWeight: 600,
        '& .MuiSvgIcon-root': { mr: 1 }
      }}>
        <DateRangeIcon sx={{ color: '#6B90BF' }} />
        Day {day.day} - {day.date}
      </Typography>

      <List sx={{ 
        '& .MuiListItem-root': { 
          px: { xs: 1, sm: 2 },
          py: 2,
          '&:hover': {
            bgcolor: 'rgba(107, 144, 191, 0.08)'
          }
        }
      }}>
        {day.activities.map((activity, index) => {
          const nextActivity = day.activities[index + 1];
          const attractionKey = getAttractionKey(activity.name);
          
          return (
            <React.Fragment key={activity.name}>
              <ListItem 
                alignItems="flex-start"
                sx={{
                  flexDirection: 'column',
                  cursor: attractionKey ? 'pointer' : 'default'
                }}
                onClick={() => attractionKey && handleExpandActivity(activity.name)}
              >
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
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        color: 'primary.main',
                        mb: 0.5
                      }}
                    >
                      {activity.time}
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        fontWeight: 500,
                        color: 'text.primary',
                        lineHeight: 1.5
                      }}
                    >
                      {activity.name}
                    </Typography>
                  </Box>
                  {attractionKey && (
                    <IconButton 
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandActivity(activity.name);
                      }}
                    >
                      {expandedActivity === activity.name ? 
                        <ExpandLessIcon /> : 
                        <ExpandMoreIcon />
                      }
                    </IconButton>
                  )}
                  {activity.status === 'confirmed' && (
                    <Chip 
                      label="已確認" 
                      size="small"
                      sx={{ 
                        height: 24,
                        fontSize: '0.75rem',
                        ml: { xs: 0, sm: 1 },
                        mt: { xs: 1, sm: 0 },
                        mr: { xs: 'auto', sm: 0 },
                        bgcolor: '#E3F2FD',
                        color: '#4F698C'
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
                            bgcolor: 'white',
                            border: 1,
                            borderColor: 'primary.main',
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
                    ml: { xs: 4, sm: 6 },
                    mt: 1,
                    bgcolor: '#E3F2FD',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    width: 'fit-content',
                    border: '1px solid',
                    borderColor: 'rgba(107, 144, 191, 0.3)'
                  }}>
                    <AttachMoneyIcon 
                      fontSize="small"
                      sx={{ color: '#4F698C' }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#4F698C',
                        fontWeight: 500,
                        ml: 0.5
                      }}
                    >
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
                      mt: { xs: 1, sm: 0 },
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      lineHeight: 1.6,
                      color: 'text.secondary',
                      opacity: 0.85
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
                    sx={{ 
                      ml: { xs: 4, sm: 6 },
                      mt: { xs: 1, sm: 0 },
                      bgcolor: '#E3F2FD',
                      px: 3,
                      py: 1,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#4F698C',
                      border: '1px solid',
                      borderColor: 'rgba(107, 144, 191, 0.3)'
                    }}
                  >
                    注意：{activity.bookingNote}
                  </Typography>
                )}

                {attractionKey && expandedActivity === activity.name && (
                  <Box sx={{ 
                    width: '100%',
                    mt: 2,
                    pt: 2,
                    borderTop: 1,
                    borderColor: 'divider'
                  }}>
                    <AttractionDetails 
                      attraction={attractions[attractionKey]} 
                    />
                  </Box>
                )}
              </ListItem>
              {index < day.activities.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          );
        })}
      </List>

      {day.hotel && (
        <>
          <Divider sx={{ my: 3 }} />
          <Card sx={{ 
            bgcolor: '#E3F2FD',
            borderRadius: 1,
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'rgba(107, 144, 191, 0.12)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2 
              }}>
                <HotelIcon sx={{ 
                  mr: 1, 
                  color: '#6B90BF',
                  fontSize: 28
                }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#4F698C',
                    fontWeight: 500 
                  }}
                >
                  今晚住宿
                </Typography>
                {day.hotel.location && (
                  <IconButton
                    size="small"
                    color="#6B90BF"
                    href={createGoogleMapsLink(day.hotel.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      ml: 'auto',
                      bgcolor: '#FFFFFF',
                      color: '#6B90BF',
                      '&:hover': {
                        bgcolor: '#6B90BF',
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
                  color: '#2C3E50',
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
                  color: '#6B90BF',
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