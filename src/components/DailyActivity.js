import React, { useState } from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
  Collapse,
  ButtonBase,
  Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import DirectionsIcon from '@mui/icons-material/Directions';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AttractionDetails from './AttractionDetails';
import { attractions } from '../data/tripData';

const MealChip = ({ type, label }) => {
  const getIcon = () => {
    switch (type) {
      case 'breakfast':
        return <FreeBreakfastIcon sx={{ fontSize: '1rem' }} />;
      case 'lunch':
        return <LunchDiningIcon sx={{ fontSize: '1rem' }} />;
      case 'dinner':
        return <DinnerDiningIcon sx={{ fontSize: '1rem' }} />;
      default:
        return <RestaurantIcon sx={{ fontSize: '1rem' }} />;
    }
  };

  return (
    <Chip
      icon={getIcon()}
      label={label}
      size="small"
      sx={{
        bgcolor: 'rgba(107, 144, 191, 0.08)',
        color: '#4F698C',
        '& .MuiChip-icon': {
          color: '#6B90BF'
        }
      }}
    />
  );
};

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
    <>
      {/* 行程列表 */}
      <List sx={{ 
        '& .MuiListItem-root': { 
          px: { xs: 1.5, sm: 2 },
          py: 2,
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: 1,
          mb: 1,
          bgcolor: 'rgba(107, 144, 191, 0.04)',
          '&:hover': {
            bgcolor: 'rgba(107, 144, 191, 0.08)'
          }
        }
      }}>
        {day.activities.map((activity, index) => {
          const nextActivity = day.activities[index + 1];
          const attractionKey = getAttractionKey(activity.name);
          const attraction = attractions?.[attractionKey];
          
          return (
            <React.Fragment key={activity.name}>
              <ListItem>
                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5
                }}>
                  {/* Time and Activity Name */}
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#2C3E50',
                          mb: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {activity.name}
                        {activity.type === 'breakfast' && <FreeBreakfastIcon sx={{ color: '#6B90BF', fontSize: '1.2rem' }} />}
                        {activity.type === 'lunch' && <LunchDiningIcon sx={{ color: '#6B90BF', fontSize: '1.2rem' }} />}
                        {activity.type === 'dinner' && <DinnerDiningIcon sx={{ color: '#6B90BF', fontSize: '1.2rem' }} />}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#5D6D7E',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                        {activity.time}
                      </Typography>
                    </Box>
                    {attraction && (
                      <IconButton
                        size="small"
                        onClick={() => handleExpandActivity(activity.name)}
                        sx={{ 
                          ml: 1,
                          color: '#4F698C',
                          bgcolor: 'rgba(107, 144, 191, 0.04)',
                          '&:hover': {
                            bgcolor: 'rgba(107, 144, 191, 0.16)'
                          }
                        }}
                      >
                        {expandedActivity === activity.name ? 
                          <ExpandLessIcon /> : 
                          <ExpandMoreIcon />
                        }
                      </IconButton>
                    )}
                  </Box>

                  {/* Activity Info and Actions */}
                  <Stack 
                    spacing={1}
                    sx={{ width: '100%' }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1,
                      flexWrap: 'wrap'
                    }}>
                      {activity.type === 'hotel' && (
                        <ActionButton
                          icon={HotelIcon}
                          label="住宿"
                        />
                      )}
                      
                      {activity.price && (
                        <ActionButton
                          icon={AttachMoneyIcon}
                          label={`${activity.price} TWD`}
                        />
                      )}

                      {activity.location && (
                        <ActionButton
                          icon={MapIcon}
                          label="查看地圖"
                          onClick={() => window.open(createGoogleMapsLink(activity.location), '_blank')}
                        />
                      )}

                      {activity.bookingLink && (
                        <ActionButton
                          icon={LinkIcon}
                          label="預訂連結"
                          onClick={() => window.open(activity.bookingLink, '_blank')}
                        />
                      )}
                    </Box>

                    {nextActivity?.location && activity.location && (
                      <ActionButton
                        icon={DirectionsIcon}
                        label="路線導航"
                        onClick={() => window.open(createDirectionsLink(activity.location, nextActivity.location), '_blank')}
                        fullWidth={isMobile}
                      />
                    )}
                  </Stack>

                  {/* Description */}
                  {activity.description && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#5D6D7E',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 0.5,
                        px: 0.5
                      }}
                    >
                      <InfoIcon sx={{ fontSize: '1rem', mt: 0.2 }} />
                      {activity.description}
                    </Typography>
                  )}

                  {/* Attraction Details */}
                  {attraction && (
                    <Collapse in={expandedActivity === activity.name}>
                      <Box sx={{ mt: 1 }}>
                        <AttractionDetails attraction={attraction} />
                      </Box>
                    </Collapse>
                  )}
                </Box>
              </ListItem>
              {index < day.activities.length - 1 && (
                <Divider sx={{ my: 1, borderColor: 'rgba(107, 144, 191, 0.12)' }} />
              )}
            </React.Fragment>
          );
        })}
      </List>

      {/* 用餐概覽 */}
      {day.meals && (
        <Box sx={{ 
          mt: 3,
          p: 2,
          borderRadius: 1,
          bgcolor: 'rgba(107, 144, 191, 0.04)',
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)'
        }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: '#2C3E50',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RestaurantIcon sx={{ mr: 1, color: '#6B90BF' }} />
            用餐概覽
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
            <MealChip type="breakfast" label={`早餐: ${day.meals.breakfast}`} />
            <MealChip type="lunch" label={`午餐: ${day.meals.lunch}`} />
            <MealChip type="dinner" label={`晚餐: ${day.meals.dinner}`} />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default DailyActivity; 