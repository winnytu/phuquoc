import { render, screen } from '@testing-library/react';
import DailyActivity from '../DailyActivity';

const mockDay = {
  date: '2024-01-24',
  day: 1,
  activities: [
    {
      name: '抵達胡志明市',
      time: '10:25',
      type: 'transport'
    }
  ]
};

describe('DailyActivity Component', () => {
  test('renders day information', () => {
    render(<DailyActivity day={mockDay} />);
    expect(screen.getByText(/Day 1/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-24/i)).toBeInTheDocument();
  });

  test('renders activity details', () => {
    render(<DailyActivity day={mockDay} />);
    expect(screen.getByText(/抵達胡志明市/i)).toBeInTheDocument();
    expect(screen.getByText(/10:25/i)).toBeInTheDocument();
  });
}); 