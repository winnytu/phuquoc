import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Tabs,
  Tab,
  Box,
  IconButton,
  Chip,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Collapse,
  Stack
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { flightInfo, passengers } from '../constants';

const FlightInfo = () => {
  const [selectedPassenger, setSelectedPassenger] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenPdf = () => {
    const pdfUrl = passengers[selectedPassenger].ticketPdf;
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  const FlightChips = ({ flight, seatInfo }) => (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={1} 
      sx={{ mt: 1 }}
    >
      <Chip
        icon={<AirplanemodeActiveIcon />}
        label={flight.flightNo}
        size="small"
        sx={{ bgcolor: '#E3F2FD', color: '#4F698C' }}
      />
      <Chip
        label={`座位 ${seatInfo}`}
        size="small"
        sx={{ 
          bgcolor: '#FFFFFF',
          color: '#2C3E50',
          border: '1px solid',
          borderColor: 'rgba(107, 144, 191, 0.3)'
        }}
      />
    </Stack>
  );

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Paper sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: 3,
        bgcolor: '#FFFFFF',
        border: '1px solid',
        borderColor: 'rgba(107, 144, 191, 0.12)'
      }}>
        <Typography variant="h6" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: '#2C3E50',
          fontWeight: 600,
          mb: 3
        }}>
          <FlightTakeoffIcon sx={{ mr: 1, color: '#6B90BF' }} />
          航班資訊
        </Typography>
        
        <Tabs
          value={selectedPassenger}
          onChange={(e, newValue) => setSelectedPassenger(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            borderBottom: 1,
            borderColor: '#EDF2F7',
            '& .MuiTab-root': {
              minWidth: { xs: 80, sm: 100 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: '#5D6D7E',
              '&.Mui-selected': {
                color: '#6B90BF'
              }
            }
          }}
        >
          {passengers.map((passenger) => (
            <Tab 
              key={passenger.id}
              label={passenger.name}
            />
          ))}
        </Tabs>

        <Card sx={{ 
          mb: 3,
          borderRadius: 2,
          bgcolor: '#E3F2FD'
        }}>
          <CardContent sx={{ 
            p: 2,
            '&:last-child': { pb: 2 }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1
            }}>
              <ConfirmationNumberIcon sx={{ color: '#6B90BF' }} />
              <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ color: '#4F698C' }}
                >
                  電子機票號碼
                </Typography>
                <Typography variant="h6">
                  {passengers[selectedPassenger].eTicket}
                </Typography>
              </Box>
              {passengers[selectedPassenger].ticketPdf && (
                <IconButton
                  onClick={handleOpenPdf}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#6B90BF',
                    '&:hover': {
                      bgcolor: '#6B90BF',
                      color: 'white'
                    }
                  }}
                >
                  <PictureAsPdfIcon />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>

        <Timeline sx={{ 
          p: 0,
          m: 0,
          [`& .MuiTimelineItem-root`]: {
            minHeight: 'auto',
            '&:before': {
              flex: 0,
              padding: 0
            }
          }
        }}>
          {Object.entries({
            departure: '去程第一段',
            transfer: '去程第二段',
            return: '回程第一段',
            returnTransfer: '回程第二段'
          }).map(([key, title], index) => (
            <TimelineItem key={key}>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: '#6B90BF' }}>
                  {index < 2 ? <FlightTakeoffIcon /> : <FlightLandIcon />}
                </TimelineDot>
                {index < 3 && <TimelineConnector sx={{ bgcolor: '#96B9D9' }} />}
              </TimelineSeparator>
              <TimelineContent>
                <Box sx={{ 
                  '&:hover': {
                    bgcolor: 'rgba(107, 144, 191, 0.05)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ color: '#4F698C' }}
                    >
                      {title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {flightInfo[key].date} {flightInfo[key].time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flightInfo[key].from} → {flightInfo[key].to}
                  </Typography>
                  
                  <FlightChips 
                    flight={flightInfo[key]}
                    seatInfo={passengers[selectedPassenger].seats[key]}
                  />
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>
    </Box>
  );
};

export default FlightInfo; 