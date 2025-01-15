import React, { useState } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { 
  CssBaseline, 
  Container, 
  AppBar, 
  Toolbar, 
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TripSchedule from './components/TripSchedule';
import FlightInfo from './components/FlightInfo';
import HotelInfo from './components/HotelInfo';
import PackingList from './components/PackingList';
import ExpenseStats from './components/ExpenseStats';
import ScheduleManager from './components/ScheduleManager';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B90BF',
      light: '#96B9D9',
      dark: '#4F698C',
    },
    secondary: {
      main: '#386873',
      light: '#96B9D9',
      dark: '#595516',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5D6D7E',
    },
    grey: {
      100: '#E3F2FD',
      200: '#EDF2F7',
    },
  },
  typography: {
    fontFamily: [
      'Google Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 500,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '-0.25px',
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
      color: '#2C3E50',
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: '#5D6D7E',
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          backgroundImage: 'none',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.12)',
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
          color: '#5D6D7E',
          '&.Mui-selected': {
            color: '#6B90BF',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(107, 144, 191, 0.25)',
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '0.85rem',
          height: 28,
        },
        filled: {
          backgroundColor: '#96B9D9',
          color: '#2C3E50',
          '&:hover': {
            backgroundColor: '#6B90BF',
            color: '#FFFFFF',
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(107, 144, 191, 0.08)',
          }
        }
      }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid',
          borderColor: '#EDF2F7',
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#5D6D7E',
          '&.Mui-selected': {
            color: '#6B90BF',
          }
        }
      }
    }
  }
});

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigationItems = [
    { label: '每日行程', shortLabel: '行程', icon: <CalendarMonthIcon /> },
    { label: '航班資訊', shortLabel: '航班', icon: <FlightTakeoffIcon /> },
    { label: '消費統計', shortLabel: '支出', icon: <AttachMoneyIcon /> },
    { label: '行程管理', shortLabel: '編輯', icon: <EditIcon /> },
    { label: '行李清單', shortLabel: '行李', icon: <LuggageIcon /> }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        pb: { xs: 7, sm: 0 },
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { 
              xs: 2,
              sm: 3
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #6B90BF 0%, #96B9D9 100%)',
              color: 'white',
              borderRadius: 1
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              2024 富國島之旅
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              1月24日 - 1月29日・6天5夜
            </Typography>
          </Paper>

          {!isMobile && (
            <Paper 
              sx={{ 
                mt: 3,
                borderRadius: 1,
                borderColor: 'rgba(107, 144, 191, 0.12)',
                bgcolor: '#FFFFFF'
              }}
              elevation={0}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                sx={{
                  minHeight: 56,
                  '& .MuiTab-root': {
                    minHeight: 56,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#5D6D7E',
                    '&.Mui-selected': {
                      color: '#2C3E50'
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.25rem',
                      mb: 0.5
                    }
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: '#6B90BF'
                  }
                }}
              >
                {navigationItems.map((item, index) => (
                  <Tab
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    sx={{
                      minWidth: 120,
                      '&:hover': {
                        bgcolor: 'rgba(107, 144, 191, 0.04)'
                      }
                    }}
                  />
                ))}
              </Tabs>
            </Paper>
          )}

          <Container maxWidth="lg" sx={{ flex: 1, py: 3, px: 0 }}>
            {value === 0 && <TripSchedule />}
            {value === 1 && <FlightInfo />}
            {value === 2 && <ExpenseStats />}
            {value === 3 && (
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                pb: { xs: 7, sm: 0 }
              }}>
                <Paper sx={{ 
                  p: { xs: 2, sm: 3 },
                  borderRadius: 1,
                  bgcolor: '#FFFFFF',
                  border: '1px solid',
                  borderColor: 'rgba(107, 144, 191, 0.12)'
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: '#2C3E50',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <EditIcon sx={{ color: '#6B90BF' }} />
                    行程管理
                  </Typography>
                  <ScheduleManager />
                </Paper>
              </Box>
            )}
            {value === 4 && <PackingList />}
          </Container>
        </Container>

        {isMobile && (
          <Paper 
            sx={{ 
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: '1px solid',
              borderColor: 'rgba(107, 144, 191, 0.12)',
              zIndex: 1000
            }} 
            elevation={3}
          >
            <BottomNavigation
              value={value}
              onChange={handleChange}
              sx={{
                height: 64,
                bgcolor: '#FFFFFF',
                '& .MuiBottomNavigationAction-root': {
                  minWidth: 0,
                  padding: '8px 0',
                  color: '#5D6D7E',
                  '&.Mui-selected': {
                    color: '#2C3E50'
                  }
                },
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.75rem',
                  '&.Mui-selected': {
                    fontSize: '0.75rem'
                  }
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.5rem'
                }
              }}
            >
              {navigationItems.map((item, index) => (
                <BottomNavigationAction
                  key={index}
                  label={item.shortLabel}
                  icon={item.icon}
                  sx={{
                    flex: index === 2 ? 1.2 : 1,
                    '& .MuiBottomNavigationAction-wrapper': {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }}
                />
              ))}
            </BottomNavigation>
          </Paper>
        )}

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'grey.200',
            mb: isMobile ? 7 : 0
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © 2024 富國島旅遊行程規劃
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
