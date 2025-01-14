export const flightInfo = {
  departure: {
    date: '2024-01-24',
    from: '桃園機場 Terminal 1',
    to: '胡志明市 Terminal 2',
    time: '07:45-10:25',
    airline: 'VIETNAM AIRLINES',
    flightNo: 'VN571',
    terminal: 'T2',
    duration: '03:40'
  },
  transfer: {
    date: '2024-01-24',
    from: '胡志明市 Terminal 1',
    to: '富國島',
    time: '13:20-14:20',
    airline: 'VIETNAM AIRLINES',
    flightNo: 'VN1827',
    terminal: 'T1',
    duration: '01:00'
  },
  return: {
    date: '2024-01-29',
    from: '富國島',
    to: '胡志明市 Terminal 1',
    time: '12:00-13:10',
    airline: 'VIETNAM AIRLINES',
    flightNo: 'VN1824',
    terminal: 'T1',
    duration: '01:10'
  },
  returnTransfer: {
    date: '2024-01-29',
    from: '胡志明市 Terminal 2',
    to: '桃園機場 Terminal 1',
    time: '16:50-21:10',
    airline: 'VIETNAM AIRLINES',
    flightNo: 'VN570',
    terminal: 'T2',
    duration: '03:20'
  }
};

export const passengers = [
  { 
    id: 1, 
    name: '杜爸', 
    seats: {
      departure: '32D',
      transfer: '15E',
      return: '09E',
      returnTransfer: '34D'
    },
    eTicket: '7079364850',
    ticketPdf: 'https://storage.cloud.google.com/phu-quoc-trip/e-ticket/Electronic%20Ticket-EMD%20Receipt%20%2024JAN%20for%20TU%20CHENG%20%20CHUN.pdf'
  },
  { 
    id: 2, 
    name: '杜麗', 
    seats: {
      departure: '32E',
      transfer: '15D',
      return: '09D',
      returnTransfer: '34E'
    },
    eTicket: '7079364852',
    ticketPdf: 'https://storage.cloud.google.com/phu-quoc-trip/e-ticket/Electronic%20Ticket-EMD%20Receipt%20%2024JAN%20for%20TU%20LI%20%20CHUN.pdf'
  },
  { 
    id: 3, 
    name: 'superdudu', 
    seats: {
      departure: '32F',
      transfer: '15F',
      return: '09F',
      returnTransfer: '34F'
    },
    eTicket: '7079364851',
    ticketPdf: 'https://storage.cloud.google.com/phu-quoc-trip/e-ticket/Electronic%20Ticket-EMD%20Receipt%20%2024JAN%20for%20TU%20CHENG%20%20YUAN.pdf'
  },
  { 
    id: 4, 
    name: 'winny', 
    seats: {
      departure: '32G',
      transfer: '15G',
      return: '09G',
      returnTransfer: '34G'
    },
    eTicket: '9052399166',
    class: {
      departure: 'ECONOMY CLASSIC, S',
      transfer: 'ECONOMY CLASSIC, Y',
      return: 'ECONOMY LITE, Y',
      returnTransfer: 'ECONOMY LITE, T'
    },
    baggage: '1PC',
    ticketPdf: 'https://storage.cloud.google.com/phu-quoc-trip/e-ticket/Electronic%20Ticket-EMD%20Receipt%20%2024JAN%20for%20CHARNG%20WIN%20%20TU.pdf'
  },
  { 
    id: 5, 
    name: 'mandy', 
    seats: {
      departure: '32B',
      transfer: '15B',
      return: '09B',
      returnTransfer: '34B'
    },
    eTicket: '7079364854',
    ticketPdf: 'https://storage.cloud.google.com/phu-quoc-trip/e-ticket/Electronic%20Ticket-EMD%20Receipt%20%2024JAN%20for%20CHEN%20MAN%20%20TING.pdf'
  }
]; 