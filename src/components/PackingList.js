import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Collapse
} from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const packingItems = {
  documents: {
    title: '證件與文件',
    items: [
      { id: 'passport', name: '護照', essential: true },
      { id: 'visa', name: '簽證', essential: true },
      { id: 'insurance', name: '旅遊保險', essential: true },
      { id: 'tickets', name: '機票', essential: true },
      { id: 'hotelBooking', name: '飯店訂房確認', essential: true },
      { id: 'cash', name: '現金 (越南盾/美金)', essential: true },
      { id: 'creditCard', name: '信用卡', essential: true }
    ]
  },
  electronics: {
    title: '3C用品',
    items: [
      { id: 'phone', name: '手機', essential: true },
      { id: 'charger', name: '充電器', essential: true },
      { id: 'powerBank', name: '行動電源', essential: true },
      { id: 'adapter', name: '萬用轉接頭', essential: true },
      { id: 'camera', name: '相機', essential: false },
      { id: 'earphones', name: '耳機', essential: false }
    ]
  },
  clothing: {
    title: '衣物',
    items: [
      { id: 'underwear', name: '內衣褲', essential: true },
      { id: 'socks', name: '襪子', essential: true },
      { id: 'shirts', name: 'T恤', essential: true },
      { id: 'shorts', name: '短褲', essential: true },
      { id: 'swimwear', name: '泳衣', essential: true },
      { id: 'sleepwear', name: '睡衣', essential: false },
      { id: 'hat', name: '帽子', essential: false },
      { id: 'sunglasses', name: '太陽眼鏡', essential: false }
    ]
  },
  toiletries: {
    title: '盥洗用品',
    items: [
      { id: 'toothbrush', name: '牙刷牙膏', essential: true },
      { id: 'shampoo', name: '洗髮精', essential: false },
      { id: 'bodywash', name: '沐浴乳', essential: false },
      { id: 'sunscreen', name: '防曬乳', essential: true },
      { id: 'insectRepellent', name: '防蚊液', essential: true },
      { id: 'medicines', name: '個人藥品', essential: true }
    ]
  },
  misc: {
    title: '其他',
    items: [
      { id: 'umbrella', name: '雨傘', essential: false },
      { id: 'waterBottle', name: '水壺', essential: false },
      { id: 'snacks', name: '零食', essential: false },
      { id: 'mask', name: '口罩', essential: true },
      { id: 'wetTissue', name: '濕紙巾', essential: true }
    ]
  }
};

const PackingList = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(packingItems).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  const handleToggle = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleExpandCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const calculateProgress = (items) => {
    const total = items.length;
    const checked = items.filter(item => checkedItems[item.id]).length;
    return (checked / total) * 100;
  };

  return (
    <Paper sx={{ 
      p: { xs: 2, sm: 3 },
      bgcolor: '#FFFFFF',
      border: '1px solid',
      borderColor: 'rgba(107, 144, 191, 0.12)'
    }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          color: '#2C3E50',
          fontWeight: 600,
          mb: 3
        }}
      >
        <LuggageIcon sx={{ mr: 1, color: '#6B90BF' }} />
        行李打包清單
      </Typography>

      {Object.entries(packingItems).map(([category, { title, items }], index) => (
        <React.Fragment key={category}>
          {index > 0 && <Divider sx={{ my: 2 }} />}
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
                  {title}
                </Typography>
                <Chip 
                  label={`${Math.round(calculateProgress(items))}%`}
                  size="small"
                  sx={{ 
                    ml: 1,
                    bgcolor: '#E3F2FD',
                    color: '#4F698C'
                  }}
                />
              </Box>
              <IconButton 
                size="small"
                onClick={() => handleExpandCategory(category)}
              >
                {expandedCategories[category] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={expandedCategories[category]}>
              <List dense disablePadding>
                {items.map((item) => (
                  <ListItem 
                    key={item.id}
                    disablePadding
                    sx={{ py: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        edge="start"
                        checked={!!checkedItems[item.id]}
                        onChange={() => handleToggle(item.id)}
                        sx={{
                          color: '#96B9D9',
                          '&.Mui-checked': {
                            color: '#6B90BF'
                          }
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      sx={{
                        '& .MuiTypography-root': {
                          textDecoration: checkedItems[item.id] ? 'line-through' : 'none',
                          color: checkedItems[item.id] ? '#96B9D9' : '#2C3E50'
                        }
                      }}
                    />
                    {item.essential && (
                      <Chip 
                        label="必備"
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ 
                          height: 20,
                          fontSize: '0.75rem'
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        </React.Fragment>
      ))}
    </Paper>
  );
};

export default PackingList; 