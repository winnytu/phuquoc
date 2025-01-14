import React from 'react';
import {
  Paper,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  Tooltip
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const PhotoGallery = ({ photos = [] }) => {
  if (photos.length === 0) return null;

  return (
    <Paper sx={{ 
      borderRadius: 1,
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #FF9800 0%, #FFA726 100%)',
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ 
          display: 'flex', 
          alignItems: 'center',
          '& .MuiSvgIcon-root': { mr: 1 }
        }}>
          <PhotoLibraryIcon />
          相片集
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <ImageList 
          variant="quilted" 
          cols={4} 
          gap={8}
          sx={{
            mb: 0,
            '& .MuiImageListItem-root': {
              overflow: 'hidden',
              borderRadius: 2
            }
          }}
        >
          {photos.map((photo, index) => (
            <ImageListItem 
              key={index} 
              cols={photo.featured ? 2 : 1} 
              rows={photo.featured ? 2 : 1}
              sx={{ position: 'relative' }}
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="body2">
                  {photo.title}
                </Typography>
                {photo.link && (
                  <Tooltip title="查看原始圖片">
                    <IconButton
                      size="small"
                      href={photo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.2)'
                        }
                      }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Paper>
  );
};

export default PhotoGallery; 