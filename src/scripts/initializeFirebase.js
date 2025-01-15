import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { schedule, hotels, attractions, flightInfo, passengers } from '../data/tripData';

const firebaseConfig = {
  apiKey: "AIzaSyBMGMb4BbsM8R0DAThlBe0shHKXBs63oI4",
  authDomain: "phu-quoc-54ba6.firebaseapp.com",
  databaseURL: "https://phu-quoc-54ba6-default-rtdb.firebaseio.com",
  projectId: "phu-quoc-54ba6",
  storageBucket: "phu-quoc-54ba6.firebasestorage.app",
  messagingSenderId: "710066761767",
  appId: "1:710066761767:web:63a1935d5e059c9fcc1e02",
  measurementId: "G-QTQCWXP23F"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const initializeData = async () => {
  try {
    console.log('開始初始化資料...');

    // 初始化行程資料
    console.log('正在初始化行程資料...');
    await set(ref(db, 'schedule'), schedule);
    console.log('行程資料初始化完成');
    
    // 初始化飯店資料
    console.log('正在初始化飯店資料...');
    await set(ref(db, 'hotels'), hotels);
    console.log('飯店資料初始化完成');
    
    // 初始化景點資料
    console.log('正在初始化景點資料...');
    await set(ref(db, 'attractions'), attractions);
    console.log('景點資料初始化完成');
    
    // 初始化航班資料
    console.log('正在初始化航班資料...');
    await set(ref(db, 'flightInfo'), flightInfo);
    console.log('航班資料初始化完成');
    
    // 初始化乘客資料
    console.log('正在初始化乘客資料...');
    await set(ref(db, 'passengers'), passengers);
    console.log('乘客資料初始化完成');
    
    console.log('所有資料初始化完成！');
  } catch (error) {
    console.error('初始化資料時發生錯誤：', error);
    throw error;
  }
};

// 執行初始化
console.log('準備開始初始化資料...');
initializeData()
  .then(() => {
    console.log('資料初始化程序執行完畢');
    process.exit(0);
  })
  .catch((error) => {
    console.error('資料初始化失敗：', error);
    process.exit(1);
  }); 