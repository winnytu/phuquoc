export const flightInfo = {
  departure: {
    date: '2024-01-24',
    from: '桃園機場',
    to: '胡志明市(T2)',
    time: '07:45-10:25'
  },
  transfer: {
    date: '2024-01-24',
    from: '胡志明市(T1)',
    to: '富國島',
    time: '13:20-14:20'
  },
  return: {
    date: '2024-01-29',
    from: '富國島',
    to: '胡志明市(T1)',
    time: '12:00-13:10'
  },
  returnTransfer: {
    date: '2024-01-29',
    from: '胡志明市(T2)',
    to: '桃園機場',
    time: '16:50-21:10'
  }
};

export const hotels = [
  {
    id: 1,
    name: 'Sailing Club Signature Resort Phu Quoc',
    checkIn: '2024-01-24',
    checkOut: '2024-01-26',
    nights: 2,
    bookingLink: 'https://www.booking.com/Share-Djd6mGv',
    location: {
      address: 'Cua Lap Hamlet, Duong To Commune, Phu Quoc',
      coordinates: '10.2890° N, 103.8471° E'
    },
    image: 'sailing-club.jpg'
  },
  {
    id: 2,
    name: 'New World Phu Quoc Resort',
    checkIn: '2024-01-26',
    checkOut: '2024-01-28',
    nights: 2,
    bookingLink: 'https://www.booking.com/Share-sB5wb4',
    location: {
      address: 'Khem Beach, An Thoi, Phu Quoc',
      coordinates: '10.0494° N, 104.0234° E'
    },
    image: 'new-world.jpg'
  },
  {
    id: 3,
    name: 'Ocean Bay Phu Quoc Resort and Spa',
    checkIn: '2024-01-28',
    checkOut: '2024-01-29',
    nights: 1,
    bookingLink: 'https://www.booking.com/Share-6D9MlhI',
    location: {
      address: '1A Tran Hung Dao Street, Duong Dong, Phu Quoc',
      coordinates: '10.2123° N, 103.9597° E'
    },
    image: 'ocean-bay.jpg'
  }
];

export const dailyItinerary = [
  {
    date: '2024-01-24',
    day: 1,
    hotel: hotels[0],
    activities: [
      {
        name: '抵達胡志明市',
        time: '10:25',
        type: 'transport'
      },
      {
        name: '轉機至富國島',
        time: '13:20-14:20',
        type: 'transport'
      },
      {
        name: '機場接送到飯店',
        time: '14:30',
        price: 590,
        status: 'confirmed',
        type: 'transport'
      },
      {
        name: '日落沙灘 (Sunset Beach)',
        time: '16:00-18:00',
        price: 127,
        bookingLink: 'https://s.klook.com/c/mXkzBeWkXQ',
        description: '欣賞美麗的日落景色，可以在沙灘散步或游泳',
        location: {
          address: 'Sunset Beach, Duong Dong, Phu Quoc',
          coordinates: '10.1891° N, 103.9660° E'
        }
      },
      {
        name: '楊東夜市 (Duong Dong Night Market)',
        time: '18:30-20:00',
        description: '當地最大的夜市，可品嚐越南美食、購買紀念品',
        location: {
          address: 'Bach Dang Street, Duong Dong',
          coordinates: '10.2168° N, 103.9590° E'
        }
      },
      {
        name: '金剛超市 (Kingkong Market)',
        time: '20:00-20:30',
        description: '採購日用品和零食',
        location: {
          address: '165 Nguyen Trung Truc Street, Duong Dong',
          coordinates: '10.2156° N, 103.9584° E'
        }
      },
      {
        name: 'Miss Tien Spa按摩',
        time: '21:00-22:30',
        description: '放鬆享受越式按摩',
        bookingNote: '建議提前預約'
      },
      {
        name: '入住 Sailing Club Signature Resort',
        time: '15:00',
        type: 'hotel',
        hotelInfo: hotels[0]
      }
    ]
  },
  {
    date: '2024-01-25',
    day: 2,
    hotel: hotels[0],
    activities: [
      {
        name: '野生動物園 (Vinpearl Safari)',
        time: '09:00-13:00',
        description: '亞洲最大的半自然野生動物園',
        location: {
          address: 'Bai Dai, Ganh Dau, Phu Quoc',
          coordinates: '10.3518° N, 103.8468° E'
        },
        openingHours: '09:00-16:00'
      },
      {
        name: '午餐休息',
        time: '13:00-14:30'
      },
      {
        name: '飯店休息',
        time: '14:30-16:00',
        description: '避開最熱的時段'
      },
      {
        name: '富國大世界 (VinWonders)',
        time: '16:00-22:00',
        description: '主題樂園，有水舞秀等表演',
        location: {
          address: 'Bai Dai, Ganh Dau, Phu Quoc',
          coordinates: '10.3494° N, 103.8501° E'
        },
        openingHours: '16:00-24:00'
      }
    ]
  },
  {
    date: '2024-01-26',
    day: 3,
    hotel: hotels[1],
    activities: [
      {
        name: '退房',
        time: '12:00',
        type: 'logistics'
      },
      {
        name: '換飯店入住',
        time: '14:00',
        type: 'logistics'
      },
      {
        name: '飯店設施體驗',
        time: '14:30-17:00',
        description: '游泳池、沙灘活動等'
      },
      {
        name: '開心夜市 (Vui Fest Bazaar)',
        time: '18:00-21:00',
        description: '富國島南部的觀光夜市，又稱海濱夜市',
        location: {
          address: 'An Thoi Town, Phu Quoc',
          coordinates: '10.0377° N, 104.0251° E'
        },
        openingHours: '16:00-24:00'
      }
    ]
  },
  {
    date: '2024-01-27',
    day: 4,
    hotel: hotels[1],
    activities: [
      {
        name: '香島水上樂園',
        time: '09:00-12:00',
        description: '享受各種水上設施',
        location: {
          address: 'Hon Thom Island, An Thoi, Phu Quoc',
          coordinates: '10.0314° N, 104.0215° E'
        },
        openingHours: '09:00-17:00'
      },
      {
        name: '午餐',
        time: '12:00-13:30'
      },
      {
        name: '日落小鎮 (Sunset Town)',
        time: '15:00-21:00',
        description: '包含：跨海纜車、太陽世界、Mango餐廳、親吻橋、海洋之吻秀',
        location: {
          address: 'Hon Thom Island, Phu Quoc',
          coordinates: '10.0289° N, 104.0224° E'
        }
      }
    ]
  },
  {
    date: '2024-01-28',
    day: 5,
    hotel: hotels[2],
    activities: [
      {
        name: '退房',
        time: '12:00',
        type: 'logistics'
      },
      {
        name: '換飯店入住',
        time: '14:00',
        type: 'logistics'
      },
      {
        name: '珍珠樂園 (Vinpearl Pearl)',
        time: '14:30-20:00',
        location: {
          address: 'Bai Dai Beach, Ganh Dau, Phu Quoc',
          coordinates: '10.3482° N, 103.8489° E'
        },
        openingHours: '09:00-20:00'
      }
    ]
  },
  {
    date: '2024-01-29',
    day: 6,
    hotel: null,
    activities: [
      {
        name: '退房',
        time: '10:00',
        type: 'logistics'
      },
      {
        name: '前往機場',
        time: '10:30',
        type: 'transport'
      },
      {
        name: '富國島 → 胡志明市',
        time: '12:00-13:10',
        type: 'transport'
      },
      {
        name: '胡志明市 → 桃園',
        time: '16:50-21:10',
        type: 'transport'
      }
    ]
  }
];

export const attractions = {
  sunsetBeach: {
    name: '日落沙灘',
    description: '以美麗的日落景色聞名',
    bestTime: '16:00-18:00',
    facilities: ['沙灘椅租借', '淋浴設施', '餐廳']
  },
  vinpearlSafari: {
    name: '野生動物園',
    openingHours: '09:00-16:00',
    closedDays: ['週二', '週三', '週四'],
    recommendedVisitTime: '中午前入場',
    duration: '3-4小時',
    facilities: ['接駁車', '餐廳', '紀念品商店']
  },
  vinWonders: {
    name: '富國大世界',
    openingHours: '16:00-24:00',
    recommendedVisitTime: '晚餐時間及21:30水舞秀',
    duration: '1.5-2小時',
    highlights: ['21:30 水舞秀'],
    facilities: ['餐廳', '商店', '表演場地']
  },
  sunsetTown: {
    name: '日落小鎮',
    highlights: [
      '跨海纜車',
      '太陽世界',
      'Mango餐廳',
      '親吻橋',
      '海洋之吻秀'
    ],
    cableCar: {
      length: '7,899公尺',
      duration: '15-20分鐘',
      bestTime: '日落時分'
    }
  },
  pearlPark: {
    name: '珍珠樂園',
    openingHours: '09:00-20:00',
    recommendedVisitTime: '中午前入場',
    duration: '4-6小時',
    shows: [
      {
        name: '海洋博物館美人魚秀',
        time: '14:00'
      },
      {
        name: '煙火秀',
        time: '19:00'
      }
    ],
    facilities: [
      '珍珠展示中心',
      '水族館',
      '購物中心',
      '餐廳'
    ]
  }
};

export const photos = {
  '2024-01-24': [
    {
      url: '/images/day1/beach.jpg',
      title: '日落沙灘',
      featured: true,
      link: 'https://example.com/original-photo'
    },
    // ... 其他照片
  ],
  // ... 其他日期的照片
}; 