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
import TripSchedule from './components/TripSchedule';
import FlightInfo from './components/FlightInfo';
import { flightInfo } from './data/tripData';
import HotelInfo from './components/HotelInfo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A73E8',
      light: '#E8F0FE',
    },
    secondary: {
      main: '#34A853',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    grey: {
      100: '#F3F4F6',
    }
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
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        }
      }
    }
  }
});

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const navigationItems = [
    { label: '每日行程', icon: <CalendarMonthIcon /> },
    { label: '航班資訊', icon: <FlightTakeoffIcon /> },
    { label: '住宿安排', icon: <HotelIcon /> }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Box className="main-content">
          <Container 
            maxWidth="lg" 
            sx={{ 
              py: { 
                xs: 2,
                sm: 3
              }
            }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                mb: 3, 
                background: 'linear-gradient(135deg, #1A73E8 0%, #4285F4 100%)',
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
              <Paper sx={{ 
                mb: 3, 
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  variant="standard"
                  sx={{ 
                    bgcolor: 'background.paper',
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    }
                  }}
                >
                  {navigationItems.map((item, index) => (
                    <Tab 
                      key={index}
                      icon={item.icon} 
                      label={item.label} 
                      iconPosition="start"
                    />
                  ))}
                </Tabs>
              </Paper>
            )}

            <Box>
              {currentTab === 0 && <TripSchedule />}
              {currentTab === 1 && <FlightInfo flightInfo={flightInfo} />}
              {currentTab === 2 && <HotelInfo />}
            </Box>
          </Container>
        </Box>

        {isMobile && (
          <Paper 
            sx={{ 
              position: 'fixed', 
              bottom: 0, 
              left: 0, 
              right: 0,
              zIndex: 1100,
              borderRadius: 0,
              boxShadow: '0 -1px 8px rgba(0,0,0,0.1)'
            }} 
            elevation={3}
          >
            <BottomNavigation
              value={currentTab}
              onChange={handleTabChange}
              showLabels
              sx={{
                height: 56,
                '& .MuiBottomNavigationAction-root': {
                  minWidth: 'auto',
                  py: 1,
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main'
                  }
                },
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.75rem'
                }
              }}
            >
              {navigationItems.map((item, index) => (
                <BottomNavigationAction
                  key={index}
                  label={item.label}
                  icon={item.icon}
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
      </div>
    </ThemeProvider>
  );
}

export default App;
