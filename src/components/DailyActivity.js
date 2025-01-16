import React, { useState, useEffect } from 'react';
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
  Chip,
  Fab,
  Paper
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
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LogisticsIcon from '@mui/icons-material/LocalShipping';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import SpaIcon from '@mui/icons-material/Spa';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import ExpenseForm from './ExpenseForm';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NightsStayIcon from '@mui/icons-material/NightsStay';

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
        color: '#6B90BF',
        '& .MuiChip-icon': {
          color: '#6B90BF'
        }
      }}
    />
  );
};

const ActionButton = ({ icon: Icon, label, onClick, fullWidth = false, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'price':
        return {
          bgcolor: 'rgba(139, 195, 74, 0.08)',
          color: '#689F38',
          '&:hover': {
            bgcolor: 'rgba(139, 195, 74, 0.16)',
          }
        };
      case 'map':
        return {
          bgcolor: 'rgba(66, 165, 245, 0.08)',
          color: '#1976D2',
          '&:hover': {
            bgcolor: 'rgba(66, 165, 245, 0.16)',
          }
        };
      case 'booking':
        return {
          bgcolor: 'rgba(171, 71, 188, 0.08)',
          color: '#7B1FA2',
          '&:hover': {
            bgcolor: 'rgba(171, 71, 188, 0.16)',
          }
        };
      case 'expense':
        return {
          bgcolor: 'rgba(255, 152, 0, 0.08)',
          color: '#F57C00',
          '&:hover': {
            bgcolor: 'rgba(255, 152, 0, 0.16)',
          }
        };
      case 'hotel':
        return {
          bgcolor: 'rgba(66, 165, 245, 0.08)',
          color: '#1976D2',
          '&:hover': {
            bgcolor: 'rgba(66, 165, 245, 0.16)',
          }
        };
      default:
        return {
          bgcolor: 'rgba(107, 144, 191, 0.04)',
          color: '#4F698C',
          '&:hover': {
            bgcolor: 'rgba(107, 144, 191, 0.16)',
          }
        };
    }
  };

  return (
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
        transition: 'all 0.2s',
        width: fullWidth ? '100%' : 'auto',
        minHeight: 36,
        ...getVariantStyles()
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
};

const getActivityStyle = (type) => {
  const styles = {
    transport: {
      borderLeft: '4px solid #B0C4DE',
      icon: FlightTakeoffIcon,
      iconColor: '#6B90BF'
    },
    taxi: {
      borderLeft: '4px solid #B0C4DE',
      icon: LocalTaxiIcon,
      iconColor: '#6B90BF'
    },
    logistics: {
      borderLeft: '4px solid #B0C4DE',
      icon: LogisticsIcon,
      iconColor: '#6B90BF'
    },
    hotel: {
      borderLeft: '4px solid #B0C4DE',
      icon: HotelIcon,
      iconColor: '#6B90BF'
    },
    breakfast: {
      borderLeft: '4px solid #B0C4DE',
      icon: FreeBreakfastIcon,
      iconColor: '#6B90BF'
    },
    lunch: {
      borderLeft: '4px solid #B0C4DE',
      icon: LunchDiningIcon,
      iconColor: '#6B90BF'
    },
    dinner: {
      borderLeft: '4px solid #B0C4DE',
      icon: DinnerDiningIcon,
      iconColor: '#6B90BF'
    },
    attraction: {
      borderLeft: '4px solid #B0C4DE',
      icon: BeachAccessIcon,
      iconColor: '#6B90BF'
    },
    nightlife: {
      borderLeft: '4px solid #B0C4DE',
      icon: NightlifeIcon,
      iconColor: '#6B90BF'
    },
    spa: {
      borderLeft: '4px solid #B0C4DE',
      icon: SpaIcon,
      iconColor: '#6B90BF'
    },
    shopping: {
      borderLeft: '4px solid #B0C4DE',
      icon: ShoppingBagIcon,
      iconColor: '#6B90BF'
    },
    default: {
      borderLeft: '4px solid #B0C4DE',
      icon: InfoIcon,
      iconColor: '#6B90BF'
    }
  };

  return styles[type] || styles.default;
};

const StatusChip = ({ type, status }) => {
  const getStatusInfo = () => {
    if (type === 'attraction') {
      return {
        label: status ? '已購票' : '未購票',
        color: status ? '#6B90BF' : '#B0C4DE'
      };
    }
    if (type === 'transport') {
      return {
        label: status ? '已訂票' : '未訂票',
        color: status ? '#6B90BF' : '#B0C4DE'
      };
    }
    if (['breakfast', 'lunch', 'dinner'].includes(type)) {
      return {
        label: status ? '已訂位' : '未訂位',
        color: status ? '#6B90BF' : '#B0C4DE'
      };
    }
    return null;
  };

  const statusInfo = getStatusInfo();
  if (!statusInfo) return null;

  return (
    <Chip
      size="small"
      icon={status ? <CheckCircleIcon /> : <PendingIcon />}
      label={statusInfo.label}
      sx={{
        height: 24,
        bgcolor: 'rgba(107, 144, 191, 0.08)',
        color: statusInfo.color,
        '& .MuiChip-icon': {
          fontSize: '1rem',
          color: statusInfo.color
        },
        '& .MuiChip-label': {
          px: 1,
          fontSize: '0.75rem',
          fontWeight: 500
        }
      }}
    />
  );
};

const DailyActivity = ({ day }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hotels, setHotels] = useState({});
  const [attractions, setAttractions] = useState({});

  useEffect(() => {
    // 讀取行程資料
    const scheduleRef = ref(db, 'schedule');
    const unsubscribeSchedule = onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const daySchedule = data.find(d => d.day === day.day);
        if (daySchedule) {
          setActivities(daySchedule.activities || []);
        } else {
          setActivities([]);
        }
      } else {
        setActivities([]);
      }
    });

    // 讀取飯店資料
    const hotelsRef = ref(db, 'hotels');
    const unsubscribeHotels = onValue(hotelsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHotels(data);
      }
    });

    // 讀取景點資料
    const attractionsRef = ref(db, 'attractions');
    const unsubscribeAttractions = onValue(attractionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAttractions(data);
      }
    });

    return () => {
      unsubscribeSchedule();
      unsubscribeHotels();
      unsubscribeAttractions();
    };
  }, [day.day]);

  // 從 Firebase 讀取支出資料
  useEffect(() => {
    const expensesRef = ref(db, 'expenses');
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expensesList = Object.values(data).filter(
          expense => expense.dayNumber === day.day
        );
        setExpenses(expensesList);
      }
    });

    return () => unsubscribe();
  }, [day.day]);

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

  const getActivityType = (activity) => {
    if (activity.type === 'transport' || activity.type === 'taxi' || 
        activity.type === 'logistics' || activity.type === 'hotel' ||
        activity.type === 'breakfast' || activity.type === 'lunch' || 
        activity.type === 'dinner') return activity.type;
    
    if (activity.name.includes('夜市') || 
        activity.name.includes('spa') || 
        activity.name.includes('按摩') ||
        activity.name.includes('超市') || 
        activity.name.includes('購物') ||
        activity.name.includes('沙灘') || 
        activity.name.includes('樂園') || 
        activity.name.includes('Safari') || 
        activity.name.includes('動物園')) {
      return 'attraction';
    }
    
    return 'default';
  };

  const handleAddExpense = (newExpense) => {
    const expensesRef = ref(db, 'expenses');
    push(expensesRef, {
      ...newExpense,
      activityName: selectedActivity?.name || '',
      timestamp: Date.now()
    });
    setExpenseFormOpen(false);
    setSelectedActivity(null);
  };

  const handleOpenExpenseForm = (activity) => {
    setSelectedActivity(activity);
    setExpenseFormOpen(true);
  };

  return (
    <Box>
      {/* Day Title */}
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600,
          color: '#2C3E50',
          mb: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
         DAY {day.day}
      </Typography>

      {/* Activities List */}
      <List sx={{ 
        position: 'relative',
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
        {activities.map((activity, index) => {
          const nextActivity = activities[index + 1];
          const attractionKey = getAttractionKey(activity.name);
          const attraction = attractions?.[attractionKey];
          const activityType = getActivityType(activity);
          const activityStyle = getActivityStyle(activityType);
          const ActivityIcon = activityStyle.icon;
          
          return (
            <React.Fragment key={activity.name}>
              <ListItem sx={{ 
                borderLeft: activityStyle.borderLeft,
                transition: 'all 0.3s ease'
              }}>
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
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
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
                        <ActivityIcon sx={{ color: activityStyle.iconColor, fontSize: '1.2rem' }} />
                        {activity.name}
                        {(activity.type === 'attraction' || 
                          activity.type === 'breakfast' || 
                          activity.type === 'lunch' || 
                          activity.type === 'dinner' ||
                          activity.type === 'transport') && (
                          <StatusChip 
                            type={activity.type}
                            status={activity.ticketStatus}
                          />
                        )}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: '#5D6D7E',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          ml: '1.7rem'
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
                          color: '#4F698C',
                          bgcolor: 'rgba(107, 144, 191, 0.04)',
                          '&:hover': {
                            bgcolor: 'rgba(107, 144, 191, 0.16)'
                          },
                          mt: 0.5
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
                    sx={{ width: '100%', ml: '1.7rem' }}
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
                          variant="hotel"
                        />
                      )}
                      
                      {activity.location && (
                        <ActionButton
                          icon={MapIcon}
                          label="地圖"
                          onClick={() => window.open(activity.location.url || createGoogleMapsLink(activity.location), '_blank')}
                          variant="map"
                        />
                      )}

                      {activity.bookingLink && (
                        <ActionButton
                          icon={LinkIcon}
                          label="預訂"
                          onClick={() => window.open(activity.bookingLink, '_blank')}
                          variant="booking"
                        />
                      )}

                      <ActionButton
                        icon={AttachMoneyIcon}
                        label="支出"
                        onClick={() => handleOpenExpenseForm(activity)}
                        variant="expense"
                      />
                    </Box>
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
              {index < activities.length - 1 && (
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

      {/* Hotel Information */}
      {day.hotel && (
        <Paper 
          sx={{ 
            p: { xs: 2, sm: 3 },
            mt: 3,
            borderRadius: 1,
            bgcolor: '#FFFFFF',
            border: '1px solid',
            borderColor: 'rgba(107, 144, 191, 0.12)'
          }}
        >
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
              住宿資訊
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#2C3E50',
                fontWeight: 500,
                pl: { xs: 0.5, sm: 0.5 }
              }}
            >
              {day.hotel.name}
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
              {day.hotel.checkIn} - {day.hotel.checkOut}
            </Typography>
          </Box>

          <Divider sx={{ 
            my: 2,
            borderColor: 'rgba(107, 144, 191, 0.12)'
          }} />

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
                label={`${day.hotel.nights} 晚`}
              />
              
              <ActionButton
                icon={MapIcon}
                label="查看地圖"
                onClick={() => window.open(day.hotel.location.url || createGoogleMapsLink(day.hotel.location), '_blank')}
              />

              <ActionButton
                icon={LinkIcon}
                label="訂房詳情"
                onClick={() => window.open(day.hotel.bookingLink, '_blank')}
              />
            </Box>

            <ActionButton
              icon={LocationOnIcon}
              label={day.hotel.location.address}
              onClick={() => window.open(day.hotel.location.url || createGoogleMapsLink(day.hotel.location), '_blank')}
              fullWidth={isMobile}
            />
          </Stack>
        </Paper>
      )}

      {/* Expense Form Dialog */}
      <ExpenseForm
        open={expenseFormOpen}
        onClose={() => {
          setExpenseFormOpen(false);
          setSelectedActivity(null);
        }}
        onSubmit={handleAddExpense}
        day={{ day: day.day, date: day.date }}
        activity={selectedActivity}
      />
    </Box>
  );
};

export default DailyActivity; 