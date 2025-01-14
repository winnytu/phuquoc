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
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';

const passengers = [
  { id: 1, name: '杜爸', eTicket: 'ET123456', seat: '12A', ticketPdf: 'https://storage.googleapis.com/your-bucket/tickets/dudu-father.pdf' },
  { id: 2, name: '杜麗', eTicket: 'ET123457', seat: '12B', ticketPdf: 'https://storage.googleapis.com/your-bucket/tickets/duli.pdf' },
  { id: 3, name: 'superdudu', eTicket: 'ET123458', seat: '12C' },
  { id: 4, name: 'winny', eTicket: 'ET123459', seat: '12D' },
  { id: 5, name: 'mandy', eTicket: 'ET123460', seat: '12E' }
];

const FlightInfo = ({ flightInfo }) => {
  const [selectedPassenger, setSelectedPassenger] = useState(0);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);

  const handleOpenPdf = () => {
    const pdfUrl = passengers[selectedPassenger].ticketPdf;
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  if (!flightInfo) return null;

  return (
    <Box>
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
              minWidth: 100,
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
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2
            }}>
              <ConfirmationNumberIcon sx={{ color: '#6B90BF' }} />
              <Box sx={{ flex: 1 }}>
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
              <Chip 
                label={`座位 ${passengers[selectedPassenger].seat}`}
                size="small"
                sx={{ 
                  bgcolor: '#FFFFFF',
                  color: '#2C3E50'
                }}
              />
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
          [`& .MuiTimelineItem-root:before`]: {
            flex: 0,
            padding: 0
          }
        }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: '#6B90BF' }}>
                <FlightTakeoffIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: '#96B9D9' }} />
            </TimelineSeparator>
            <TimelineContent>
              <Typography 
                variant="subtitle1" 
                sx={{ color: '#4F698C' }}
                gutterBottom
              >
                去程第一段
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {flightInfo.departure.date} {flightInfo.departure.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {flightInfo.departure.from} → {flightInfo.departure.to}
              </Typography>
              {passengers[selectedPassenger].ticketPdf && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<PictureAsPdfIcon />}
                  sx={{ 
                    mt: 1,
                    textTransform: 'none',
                    borderRadius: 2
                  }}
                  onClick={handleOpenPdf}
                >
                  查看電子機票
                </Button>
              )}
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