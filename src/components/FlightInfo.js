import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Tabs,
  Tab,
  Box,
  Button,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const passengers = [
  { id: 1, name: '杜爸', eTicket: 'ET123456', seat: '12A' },
  { id: 2, name: '杜麗', eTicket: 'ET123457', seat: '12B' },
  { id: 3, name: 'superdudu', eTicket: 'ET123458', seat: '12C' },
  { id: 4, name: 'winny', eTicket: 'ET123459', seat: '12D' },
  { id: 5, name: 'mandy', eTicket: 'ET123460', seat: '12E' }
];

const FlightInfo = ({ flightInfo }) => {
  const [selectedPassenger, setSelectedPassenger] = useState(0);

  if (!flightInfo) return null;

  return (
    <Box>
      <Paper sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 1
      }}>
        <Typography variant="h6" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: 'primary.main',
          '& .MuiSvgIcon-root': { mr: 1 }
        }}>
          <PersonIcon />
          團員機票資訊
        </Typography>
        
        <Tabs
          value={selectedPassenger}
          onChange={(e, newValue) => setSelectedPassenger(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              minHeight: 48,
              fontSize: '0.95rem'
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
          bgcolor: 'primary.light'
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2
            }}>
              <ConfirmationNumberIcon color="primary" />
              <Box>
                <Typography variant="subtitle2" color="primary.main">
                  電子機票號碼
                </Typography>
                <Typography variant="h6">
                  {passengers[selectedPassenger].eTicket}
                </Typography>
              </Box>
              <Chip 
                label={`座位 ${passengers[selectedPassenger].seat}`}
                size="small"
                sx={{ 
                  ml: 'auto',
                  bgcolor: 'background.paper'
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Timeline sx={{
          [`& .MuiTimelineItem-root:before`]: {
            flex: 0,
            padding: 0
          }
        }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <FlightTakeoffIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1" color="primary.main" gutterBottom>
                去程第一段
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {flightInfo.departure.date} {flightInfo.departure.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {flightInfo.departure.from} → {flightInfo.departure.to}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  mt: 1,
                  textTransform: 'none',
                  borderRadius: 2
                }}
                onClick={() => window.open('您的登機證 URL')}
              >
                查看登機證
              </Button>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <FlightTakeoffIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1" color="secondary.main" gutterBottom>
                去程第二段
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {flightInfo.transfer.date} {flightInfo.transfer.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {flightInfo.transfer.from} → {flightInfo.transfer.to}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  mt: 1,
                  textTransform: 'none',
                  borderRadius: 2
                }}
                onClick={() => window.open('您的登機證 URL')}
              >
                查看登機證
              </Button>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <FlightLandIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1" color="primary.main" gutterBottom>
                回程第一段
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {flightInfo.return.date} {flightInfo.return.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {flightInfo.return.from} → {flightInfo.return.to}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  mt: 1,
                  textTransform: 'none',
                  borderRadius: 2
                }}
                onClick={() => window.open('您的登機證 URL')}
              >
                查看登機證
              </Button>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <FlightLandIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1" color="secondary.main" gutterBottom>
                回程第二段
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {flightInfo.returnTransfer.date} {flightInfo.returnTransfer.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {flightInfo.returnTransfer.from} → {flightInfo.returnTransfer.to}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  mt: 1,
                  textTransform: 'none',
                  borderRadius: 2
                }}
                onClick={() => window.open('您的登機證 URL')}
              >
                查看登機證
              </Button>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Paper>
    </Box>
  );
};

export default FlightInfo; 