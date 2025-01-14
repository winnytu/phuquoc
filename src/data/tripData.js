const flightInfo = {
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

const hotels = [
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

const schedule = [
  {
    date: '2024-01-24',
    day: 1,
    hotel: hotels[0],
    meals: {
      breakfast: '自理',
      lunch: '機上餐點',
      dinner: '楊東夜市美食'
    },
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
        type: 'taxi'
      },
      {
        name: '日落沙灘 (Sunset Beach)',
        time: '16:00-18:00',
        price: 127,
        type: 'attraction',
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
        type: 'nightlife',
        description: '當地最大的夜市，可品嚐越南美食、購買紀念品',
        location: {
          address: 'Bach Dang Street, Duong Dong',
          coordinates: '10.2168° N, 103.9590° E'
        }
      },
      {
        name: '金剛超市 (Kingkong Market)',
        time: '20:00-20:30',
        type: 'shopping',
        description: '採購日用品和零食',
        location: {
          address: '165 Nguyen Trung Truc Street, Duong Dong',
          coordinates: '10.2156° N, 103.9584° E'
        }
      },
      {
        name: 'Miss Tien Spa按摩',
        time: '21:00-22:30',
        type: 'spa',
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
    meals: {
      breakfast: '飯店自助餐',
      lunch: 'Vinpearl Safari 餐廳',
      dinner: 'VinWonders 美食廣場'
    },
    activities: [
      {
        name: '飯店早餐',
        time: '08:00-09:00',
        type: 'breakfast',
        description: '享用豐盛的飯店自助早餐'
      },
      {
        name: '野生動物園 (Vinpearl Safari)',
        time: '09:00-13:00',
        type: 'attraction',
        description: '亞洲最大的半自然野生動物園',
        location: {
          address: 'Bai Dai, Ganh Dau, Phu Quoc',
          coordinates: '10.3518° N, 103.8468° E'
        },
        openingHours: '09:00-16:00'
      },
      {
        name: '午餐 - Safari餐廳',
        time: '13:00-14:30',
        type: 'lunch',
        description: '在野生動物園內的餐廳享用午餐'
      },
      {
        name: '飯店休息',
        time: '14:30-16:00',
        type: 'hotel',
        description: '避開最熱的時段'
      },
      {
        name: '富國大世界 (VinWonders)',
        time: '16:00-22:00',
        type: 'attraction',
        description: '主題樂園，有水舞秀等表演',
        location: {
          address: 'Bai Dai, Ganh Dau, Phu Quoc',
          coordinates: '10.3494° N, 103.8501° E'
        },
        openingHours: '16:00-24:00'
      },
      {
        name: '晚餐 - VinWonders美食廣場',
        time: '18:30-19:30',
        type: 'dinner',
        description: '在樂園內享用晚餐'
      }
    ]
  },
  {
    date: '2024-01-26',
    day: 3,
    hotel: hotels[1],
    meals: {
      breakfast: '飯店自助餐',
      lunch: '自理',
      dinner: '開心夜市美食'
    },
    activities: [
      {
        name: '飯店早餐',
        time: '08:00-09:00',
        type: 'breakfast',
        description: '享用豐盛的飯店自助早餐'
      },
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
        type: 'hotel',
        description: '游泳池、沙灘活動等'
      },
      {
        name: '開心夜市 (Vui Fest Bazaar)',
        time: '18:00-21:00',
        type: 'nightlife',
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
    meals: {
      breakfast: '飯店自助餐',
      lunch: '香島水上樂園餐廳',
      dinner: 'Mango Bay餐廳'
    },
    activities: [
      {
        name: '飯店早餐',
        time: '08:00-09:00',
        type: 'breakfast',
        description: '享用豐盛的飯店自助早餐'
      },
      {
        name: '香島水上樂園',
        time: '09:00-12:00',
        type: 'attraction',
        description: '享受各種水上設施',
        location: {
          address: 'Hon Thom Island, An Thoi, Phu Quoc',
          coordinates: '10.0314° N, 104.0215° E'
        },
        openingHours: '09:00-17:00'
      },
      {
        name: '午餐 - 水上樂園餐廳',
        time: '12:00-13:30',
        type: 'lunch'
      },
      {
        name: '日落小鎮 (Sunset Town)',
        time: '15:00-21:00',
        type: 'attraction',
        description: '包含：跨海纜車、太陽世界、Mango餐廳、親吻橋、海洋之吻秀',
        location: {
          address: 'Hon Thom Island, Phu Quoc',
          coordinates: '10.0289° N, 104.0224° E'
        }
      },
      {
        name: '晚餐 - Mango Bay餐廳',
        time: '18:30-20:00',
        type: 'dinner',
        description: '在日落小鎮享用浪漫晚餐'
      }
    ]
  },
  {
    date: '2024-01-28',
    day: 5,
    hotel: hotels[2],
    meals: {
      breakfast: '飯店自助餐',
      lunch: '自理',
      dinner: '珍珠樂園餐廳'
    },
    activities: [
      {
        name: '飯店早餐',
        time: '08:00-09:00',
        type: 'breakfast',
        description: '享用豐盛的飯店自助早餐'
      },
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
        type: 'attraction',
        location: {
          address: 'Bai Dai Beach, Ganh Dau, Phu Quoc',
          coordinates: '10.3482° N, 103.8489° E'
        },
        openingHours: '09:00-20:00'
      },
      {
        name: '晚餐 - 珍珠樂園餐廳',
        time: '18:30-19:30',
        type: 'dinner',
        description: '在樂園內享用晚餐'
      }
    ]
  },
  {
    date: '2024-01-29',
    day: 6,
    hotel: null,
    meals: {
      breakfast: '飯店自助餐',
      lunch: '機場餐廳',
      dinner: '機上餐點'
    },
    activities: [
      {
        name: '飯店早餐',
        time: '08:00-09:00',
        type: 'breakfast',
        description: '享用豐盛的飯店自助早餐'
      },
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
        name: '午餐 - 機場餐廳',
        time: '11:00-11:45',
        type: 'lunch',
        description: '在機場享用午餐'
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

const attractions = {
  sunsetBeach: {
    name: '日落沙灘',
    description: '以美麗的日落景色聞名',
    bestTime: '16:00-18:00',
    facilities: ['沙灘椅租借', '淋浴設施', '餐廳'],
    details: {
      description: `
        富國島最受歡迎的海灘之一，擁有細軟的白沙和清澈的海水。
        這裡的日落景色特別迷人，是拍攝日落和享受海灘活動的理想地點。
        沿著海灘有許多餐廳和酒吧，可以一邊享用美食一邊欣賞日落。
      `,
      tips: [
        '建議下午4點後前往，避開最熱的時段',
        '日落時間約在17:30-18:00之間',
        '可以在海灘租借躺椅和遮陽傘',
        '附近有多家海鮮餐廳'
      ],
      images: [
        {
          url: 'https://storage.googleapis.com/your-bucket/sunset-beach-1.jpg',
          caption: '日落沙灘的黃昏景色',
          source: 'https://example.com/photo-credit'
        },
        {
          url: 'https://storage.googleapis.com/your-bucket/sunset-beach-2.jpg',
          caption: '海灘活動場景'
        }
      ]
    }
  },
  vinpearlSafari: {
    name: '野生動物園',
    openingHours: '09:00-16:00',
    recommendedVisitTime: '中午前入場',
    duration: '3-4小時',
    facilities: ['接駁車', '餐廳', '紀念品商店'],
    details: {
      description: `
        Vinpearl Safari是東南亞最大的半自然野生動物園之一，
        佔地380公頃，擁有超過150種動物，約3000隻動物。
        園區分為開放式野生動物區和步行區，可以近距離觀察各種野生動物。
      `,
      highlights: [
        '獅子區',
        '老虎區',
        '長頸鹿區',
        '猴子島',
        '鳥類天堂'
      ],
      tips: [
        '建議早上入園，動物較活躍',
        '全程約需3-4小時',
        '提供接駁車服務',
        '請勿餵食動物'
      ],
      images: [
        {
          url: 'https://storage.googleapis.com/your-bucket/vinpearl-safari-1.jpg',
          caption: '園區內的長頸鹿'
        },
        {
          url: 'https://storage.googleapis.com/your-bucket/vinpearl-safari-2.jpg',
          caption: '白老虎展區'
        }
      ]
    }
  },
  vinWonders: {
    name: '富國大世界',
    openingHours: '16:00-24:00',
    recommendedVisitTime: '晚餐時間及21:30水舞秀',
    duration: '1.5-2小時',
    highlights: [
      '21:30 水舞秀',
      '主題樂園遊樂設施',
      '水上樂園',
      '室內遊樂場'
    ],
    facilities: ['餐廳', '商店', '表演場地'],
    details: {
      description: `
        VinWonders是富國島最大的主題樂園，結合了遊樂設施、
        表演節目和餐飲購物。園區內設有多個主題區域，
        晚上的水舞秀是最受歡迎的表演節目。
      `,
      zones: [
        '歐洲廣場',
        '冒險樂園',
        '水上世界',
        '童話王國'
      ],
      tips: [
        '建議下午4點後入園',
        '水舞秀建議提前15-20分鐘占位',
        '可購買套票含晚餐',
        '部分設施有身高限制'
      ],
      images: [
        {
          url: 'https://storage.googleapis.com/your-bucket/vinwonders-1.jpg',
          caption: '夜晚的水舞秀'
        },
        {
          url: 'https://storage.googleapis.com/your-bucket/vinwonders-2.jpg',
          caption: '歐洲風格的建築'
        }
      ]
    }
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
    },
    details: {
      description: `
        日落小鎮位於富國島南部，是一個集合觀光、餐飲、購物的綜合區域。
        最著名的是全世界最長的跨海纜車，可以欣賞到壯麗的海景和日落。
        小鎮內有多個特色景點，包括浪漫的親吻橋和精彩的表演節目。
      `,
      mustSee: [
        '搭乘全球最長跨海纜車',
        '在親吻橋拍照',
        '欣賞海洋之吻秀',
        '享用Mango Bay餐廳美食'
      ],
      tips: [
        '建議下午3點後前往',
        '纜車最後一班約21:30',
        '可購買套票包含表演',
        '建議預訂餐廳位置'
      ],
      images: [
        {
          url: 'https://storage.googleapis.com/your-bucket/sunset-town-1.jpg',
          caption: '跨海纜車景觀'
        },
        {
          url: 'https://storage.googleapis.com/your-bucket/sunset-town-2.jpg',
          caption: '親吻橋夜景'
        }
      ]
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

const passengers = [
  { 
    id: 1, 
    name: '杜爸', 
    eTicket: 'ET123456', 
    seat: '12A',
    ticketPdf: 'https://storage.googleapis.com/your-bucket/tickets/dudu-father.pdf'
  },
  { 
    id: 2, 
    name: '杜麗', 
    eTicket: 'ET123457', 
    seat: '12B',
    ticketPdf: 'https://storage.googleapis.com/your-bucket/tickets/duli.pdf'
  },
  // ... 其他乘客
]; 

export {
  schedule,
  flightInfo,
  hotels,
  attractions
}; 