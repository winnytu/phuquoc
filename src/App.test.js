import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders app header', () => {
    render(<App />);
    const headerElement = screen.getByText(/富國島旅遊行程/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders trip title', () => {
    render(<App />);
    const titleElement = screen.getByText(/2024 富國島之旅/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders navigation tabs', () => {
    render(<App />);
    const dailyScheduleTab = screen.getByText(/每日行程/i);
    const flightInfoTab = screen.getByText(/航班資訊/i);
    const hotelInfoTab = screen.getByText(/住宿安排/i);
    
    expect(dailyScheduleTab).toBeInTheDocument();
    expect(flightInfoTab).toBeInTheDocument();
    expect(hotelInfoTab).toBeInTheDocument();
  });

  test('switches between tabs', () => {
    render(<App />);
    
    // 點擊航班資訊標籤
    const flightInfoTab = screen.getByText(/航班資訊/i);
    fireEvent.click(flightInfoTab);
    
    // 確認航班資訊內容已顯示
    const flightInfoContent = screen.getByText(/團員機票資訊/i);
    expect(flightInfoContent).toBeInTheDocument();
    
    // 點擊住宿安排標籤
    const hotelInfoTab = screen.getByText(/住宿安排/i);
    fireEvent.click(hotelInfoTab);
    
    // 確認住宿資訊內容已顯示
    const hotelInfoContent = screen.getByText(/Sailing Club Signature Resort/i);
    expect(hotelInfoContent).toBeInTheDocument();
  });
});
