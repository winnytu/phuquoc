import React from 'react';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const AttractionDetails = ({ attraction }) => {
  if (!attraction?.details) return null;

  return (
    <Box sx={{ 
      mt: 3,
      px: { xs: 2, sm: 3 },
      py: 2,
      bgcolor: '#F8F9FA',
      borderRadius: 2,
      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 3,
          whiteSpace: 'pre-line',
          color: '#2C3E50',
          fontSize: { xs: '0.95rem', sm: '1rem' },
          lineHeight: 2,
          letterSpacing: '0.01em'
        }}
      >
        {attraction.details.description}
      </Typography>

      {attraction.details.highlights && (
        <Box sx={{ 
          mb: 4,
          p: 2,
          bgcolor: '#E3F2FD',
          borderRadius: 2
        }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 500,
              color: '#1565C0',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            <StarIcon fontSize="small" />
            景點亮點
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1.5,
            '& .MuiChip-root': {
              borderRadius: 1,
              px: 1,
              height: 28
            }
          }}>
            {attraction.details.highlights.map((highlight, index) => (
              <Chip 
                key={index}
                label={highlight}
                color="primary"
                variant="filled"
                sx={{
                  bgcolor: 'white',
                  color: '#1565C0',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#1565C0',
                    color: 'white'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {attraction.details.tips && (
        <Card sx={{ 
          mb: 4, 
          bgcolor: '#FFF3E0',
          borderRadius: 2,
          border: 1,
          borderColor: '#FB8C00',
          borderStyle: 'dashed'
        }}>
          <CardContent>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#E65100',
                fontWeight: 500
              }}
            >
              <TipsAndUpdatesIcon />
              遊覽建議
            </Typography>
            <List>
              {attraction.details.tips.map((tip, index) => (
                <ListItem 
                  key={index}
                  sx={{
                    py: 0.5,
                    px: 0
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon 
                      sx={{ 
                        color: '#FB8C00',
                        fontSize: 20
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={tip}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.95rem',
                        color: '#2C3E50',
                        fontWeight: 400
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {attraction.details.images && (
        <Box>
          <Typography 
            variant="subtitle1" 
            gutterBottom 
            sx={{ 
              fontWeight: 500,
              mb: 2,
              color: '#2C3E50',
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            景點照片
          </Typography>
          <ImageList
            sx={{
              gridAutoFlow: "column",
              gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
              gridAutoColumns: "minmax(250px, 1fr)",
              gap: 2,
              mb: 1
            }}
          >
            {attraction.details.images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image.url}
                  alt={image.caption}
                  loading="lazy"
                  style={{
                    borderRadius: 12,
                    height: '100%',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 1,
                    display: 'block',
                    color: '#5D6D7E',
                    fontSize: '0.85rem',
                    textAlign: 'center'
                  }}
                >
                  {image.caption}
                </Typography>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </Box>
  );
};

export default AttractionDetails; 