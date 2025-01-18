import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Divider,
  Link,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { db, storage } from '../firebase';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const activityTypes = [
  { value: 'transport', label: '交通/計程車' },
  { value: 'logistics', label: '行李/退房' },
  { value: 'hotel', label: '飯店' },
  { value: 'breakfast', label: '早餐' },
  { value: 'lunch', label: '午餐' },
  { value: 'dinner', label: '晚餐' },
  { value: 'attraction', label: '景點' },
  { value: 'nightlife', label: '夜市/夜生活' },
  { value: 'spa', label: 'SPA' },
  { value: 'shopping', label: '購物' }
];

const ScheduleManager = () => {
  const [schedule, setSchedule] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState({
    name: '',
    time: '',
    type: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    type: '',
    description: '',
    location: {
      url: ''
    },
    ticketStatus: false,
    pdfUrl: '',
    pdfName: ''
  });

  useEffect(() => {
    const scheduleRef = ref(db, 'schedule');
    const unsubscribe = onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSchedule(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOpenDialog = (day, activity = null) => {
    setSelectedDay(day);
    setSelectedActivity(activity);
    if (activity) {
      setFormData({
        name: activity.name,
        time: activity.time,
        type: activity.type,
        description: activity.description || '',
        location: {
          url: activity.location?.url || ''
        },
        ticketStatus: activity.ticketStatus || false,
        pdfUrl: activity.pdfUrl || '',
        pdfName: activity.pdfName || ''
      });
    } else {
      setFormData({
        name: '',
        time: '',
        type: '',
        description: '',
        location: { 
          url: ''
        },
        ticketStatus: false,
        pdfUrl: '',
        pdfName: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedActivity(null);
    setSelectedDay(null);
  };

  const validateTime = (time) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](-([0-1]?[0-9]|2[0-3]):[0-5][0-9])?$/;
    return timeRegex.test(time);
  };

  const handleSave = () => {
    // 重置錯誤
    setFormError({
      name: '',
      time: '',
      type: ''
    });

    // 驗證必填欄位
    let hasError = false;
    if (!formData.name.trim()) {
      setFormError(prev => ({ ...prev, name: '請輸入活動名稱' }));
      hasError = true;
    }
    if (!formData.time.trim()) {
      setFormError(prev => ({ ...prev, time: '請輸入時間' }));
      hasError = true;
    } else if (!validateTime(formData.time)) {
      setFormError(prev => ({ ...prev, time: '請輸入正確的時間格式 (HH:MM 或 HH:MM-HH:MM)' }));
      hasError = true;
    }
    if (!formData.type) {
      setFormError(prev => ({ ...prev, type: '請選擇活動類型' }));
      hasError = true;
    }

    if (hasError) return;

    const newSchedule = [...schedule];
    const dayIndex = newSchedule.findIndex(day => day.day === selectedDay);

    if (selectedActivity) {
      // 編輯現有活動
      const activityIndex = newSchedule[dayIndex].activities.findIndex(
        activity => activity === selectedActivity
      );
      newSchedule[dayIndex].activities[activityIndex] = {
        ...selectedActivity,
        ...formData
      };
    } else {
      // 新增活動
      newSchedule[dayIndex].activities.push(formData);
    }

    // 根據時間排序活動
    newSchedule[dayIndex].activities.sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });

    setSchedule(newSchedule);
    set(ref(db, 'schedule'), newSchedule);
    handleCloseDialog();
  };

  const handleDelete = async (day, activity) => {
    if (window.confirm('確定要刪除這個活動嗎？')) {
      try {
        // 如果活動有 PDF，先刪除 PDF 文件
        if (activity.pdfUrl) {
          const fileRef = storageRef(storage, activity.pdfUrl.split('?')[0].split('/o/')[1].replace(/%2F/g, '/'));
          await deleteObject(fileRef);
        }

        // 刪除活動
        const newSchedule = [...schedule];
        const dayIndex = newSchedule.findIndex(d => d.day === day);
        const activityIndex = newSchedule[dayIndex].activities.findIndex(
          a => a === activity
        );
        newSchedule[dayIndex].activities.splice(activityIndex, 1);
        setSchedule(newSchedule);
        set(ref(db, 'schedule'), newSchedule);
      } catch (error) {
        console.error('Error deleting activity:', error);
        alert('刪除失敗，請稍後再試');
      }
    }
  };

  const handleMoveActivity = (dayIndex, activityIndex, direction) => {
    const newSchedule = [...schedule];
    const activities = newSchedule[dayIndex].activities;
    const newIndex = activityIndex + (direction === 'up' ? -1 : 1);

    if (newIndex >= 0 && newIndex < activities.length) {
      // Swap activities
      [activities[activityIndex], activities[newIndex]] = [activities[newIndex], activities[activityIndex]];
      
      // Update time order
      activities.sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
      });

      setSchedule(newSchedule);
      set(ref(db, 'schedule'), newSchedule);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('請上傳 PDF 檔案');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('檔案大小不能超過 10MB');
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const fileRef = storageRef(storage, `/pdfs/${fileName}`);
      
      const metadata = {
        contentType: 'application/pdf',
      };

      const snapshot = await uploadBytes(fileRef, file, metadata);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      
      setFormData({
        ...formData,
        pdfUrl: downloadUrl,
        pdfName: file.name
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.code === 'storage/unauthorized') {
        alert('沒有權限上傳檔案，請確認您的權限設定');
      } else if (error.code === 'storage/canceled') {
        alert('上傳已取消');
      } else if (error.code === 'storage/unknown') {
        alert('發生未知錯誤，請稍後再試');
      } else {
        alert('PDF 上傳失敗，請稍後再試');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePdf = async () => {
    if (formData.pdfUrl) {
      try {
        const fileRef = storageRef(storage, formData.pdfUrl);
        await deleteObject(fileRef);
        setFormData({
          ...formData,
          pdfUrl: '',
          pdfName: ''
        });
      } catch (error) {
        console.error('Error deleting file:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  const renderActivityItem = (activity, dayIndex, activityIndex, day) => (
    <ListItem
      key={`${day.day}-${activityIndex}`}
      sx={{ 
        border: '1px solid',
        borderColor: 'rgba(107, 144, 191, 0.12)',
        borderRadius: 1,
        mb: 1,
        p: { xs: 1.5, sm: 2 },
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'flex-start',
        gap: { xs: 1, sm: 0 }
      }}
    >
      <Stack spacing={0.5} sx={{ flex: 1, width: '100%' }}>
        <Typography 
          variant="subtitle1"
          sx={{ 
            fontSize: { xs: '0.9375rem', sm: '1rem' },
            fontWeight: 500,
            color: '#2C3E50',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {activity.name}
          {activity.type === 'attraction' && (
            <Typography 
              component="span" 
              sx={{ 
                ml: 1,
                color: activity.ticketStatus ? '#66BB6A' : '#FFA726',
                fontSize: '0.8125rem'
              }}
            >
              {activity.ticketStatus ? '(已購票)' : '(未購票)'}
            </Typography>
          )}
          {activity.pdfUrl && (
            <Link
              href={activity.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#6B90BF',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                  color: '#1976D2'
                }
              }}
            >
              <PictureAsPdfIcon sx={{ fontSize: '1.2rem', ml: 1 }} />
            </Link>
          )}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#5D6D7E',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' }
          }}
        >
          {activity.time} - {activityTypes.find(t => t.value === activity.type)?.label || activity.type}
        </Typography>
      </Stack>
      <Box sx={{ 
        display: 'flex',
        gap: 0.5,
        mt: { xs: 1, sm: 0 },
        width: { xs: '100%', sm: 'auto' },
        justifyContent: { xs: 'flex-end', sm: 'flex-end' }
      }}>
        <IconButton
          size="small"
          onClick={() => handleMoveActivity(dayIndex, activityIndex, 'up')}
          disabled={activityIndex === 0}
          sx={{ 
            p: '6px',
            color: '#6B90BF',
            '&:hover': {
              bgcolor: 'rgba(107, 144, 191, 0.08)'
            },
            '&.Mui-disabled': {
              color: 'rgba(0, 0, 0, 0.26)'
            }
          }}
        >
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleMoveActivity(dayIndex, activityIndex, 'down')}
          disabled={activityIndex === day.activities.length - 1}
          sx={{ 
            p: '6px',
            color: '#6B90BF',
            '&:hover': {
              bgcolor: 'rgba(107, 144, 191, 0.08)'
            },
            '&.Mui-disabled': {
              color: 'rgba(0, 0, 0, 0.26)'
            }
          }}
        >
          <ArrowDownwardIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleOpenDialog(day.day, activity)}
          sx={{ 
            p: '6px',
            color: '#6B90BF',
            '&:hover': {
              bgcolor: 'rgba(107, 144, 191, 0.08)'
            }
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDelete(day.day, activity)}
          sx={{ 
            p: '6px',
            color: '#EF5350',
            '&:hover': {
              bgcolor: 'rgba(239, 83, 80, 0.08)'
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </ListItem>
  );

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      {schedule.map((day, dayIndex) => (
        <Box key={day.day} sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            gap: { xs: 1, sm: 2 },
            mb: 2 
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.125rem' },
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Day {day.day} ({day.date})
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog(day.day)}
              size="small"
              sx={{ 
                ml: { xs: 0, sm: 2 },
                bgcolor: 'rgba(107, 144, 191, 0.08)',
                color: '#6B90BF',
                '&:hover': {
                  bgcolor: 'rgba(107, 144, 191, 0.16)'
                }
              }}
            >
              新增活動
            </Button>
          </Box>
          
          <List sx={{ bgcolor: 'background.paper' }}>
            {day.activities.map((activity, activityIndex) => 
              renderActivityItem(activity, dayIndex, activityIndex, day)
            )}
          </List>
        </Box>
      ))}

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            m: { xs: 2, sm: 4 }
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2,
          fontSize: { xs: '1.125rem', sm: '1.25rem' },
          fontWeight: 600
        }}>
          {selectedActivity ? '編輯活動' : '新增活動'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="活動名稱"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!formError.name}
              helperText={formError.name}
            />
            <TextField
              label="時間"
              fullWidth
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              error={!!formError.time}
              helperText={formError.time || 'HH:MM 或 HH:MM-HH:MM'}
            />
            <FormControl fullWidth required error={!!formError.type}>
              <InputLabel>活動類型</InputLabel>
              <Select
                value={formData.type}
                label="活動類型"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {activityTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              {formError.type && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                  {formError.type}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="描述"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              label="Google Maps 連結"
              fullWidth
              value={formData.location.url}
              onChange={(e) => setFormData({
                ...formData,
                location: { url: e.target.value }
              })}
              helperText="請輸入 Google Maps 分享連結"
            />
            {(formData.type === 'attraction' || 
              formData.type === 'breakfast' || 
              formData.type === 'lunch' || 
              formData.type === 'dinner' ||
              formData.type === 'transport') && (
              <FormControl fullWidth>
                <InputLabel>
                  {formData.type === 'attraction' && '門票狀態'}
                  {(formData.type === 'breakfast' || 
                    formData.type === 'lunch' || 
                    formData.type === 'dinner') && '訂位狀態'}
                  {formData.type === 'transport' && '訂票狀態'}
                </InputLabel>
                <Select
                  value={formData.ticketStatus}
                  label={
                    formData.type === 'attraction' ? '門票狀態' :
                    formData.type === 'transport' ? '訂票狀態' : '訂位狀態'
                  }
                  onChange={(e) => setFormData({ ...formData, ticketStatus: e.target.value })}
                >
                  <MenuItem value={false}>
                    {formData.type === 'attraction' && '未購票'}
                    {(formData.type === 'breakfast' || 
                      formData.type === 'lunch' || 
                      formData.type === 'dinner') && '未訂位'}
                    {formData.type === 'transport' && '未訂票'}
                  </MenuItem>
                  <MenuItem value={true}>
                    {formData.type === 'attraction' && '已購票'}
                    {(formData.type === 'breakfast' || 
                      formData.type === 'lunch' || 
                      formData.type === 'dinner') && '已訂位'}
                    {formData.type === 'transport' && '已訂票'}
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            <Box sx={{ mt: 2 }}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: formData.pdfUrl ? 1 : 0
              }}>
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: 'none' }}
                  id="pdf-upload"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                <label htmlFor="pdf-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={isUploading ? <CircularProgress size={20} /> : <PictureAsPdfIcon />}
                    disabled={isUploading}
                  >
                    {isUploading ? '上傳中...' : formData.pdfUrl ? '更換 PDF' : '上傳 PDF'}
                  </Button>
                </label>
              </Box>
              {formData.pdfUrl && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: 'rgba(107, 144, 191, 0.04)',
                  border: '1px solid',
                  borderColor: 'rgba(107, 144, 191, 0.12)'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                    flex: 1
                  }}>
                    <PictureAsPdfIcon sx={{ color: '#6B90BF' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#2C3E50', fontWeight: 500 }}>
                        {formData.pdfName}
                      </Typography>
                      <Link
                        href={formData.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '0.75rem',
                          color: '#6B90BF',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        在新分頁開啟
                      </Link>
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={handleDeletePdf}
                    sx={{ color: '#EF5350' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSave} variant="contained">
            儲存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScheduleManager; 