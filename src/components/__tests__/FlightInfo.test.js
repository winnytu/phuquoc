import { render, screen } from '@testing-library/react';
import FlightInfo from '../FlightInfo';
import { flightInfo } from '../../data/tripData';

describe('FlightInfo Component', () => {
  test('renders passenger information', () => {
    render(<FlightInfo flightInfo={flightInfo} />);
    expect(screen.getByText(/團員機票資訊/i)).toBeInTheDocument();
  });

  test('renders flight timeline', () => {
    render(<FlightInfo flightInfo={flightInfo} />);
    expect(screen.getByText(/去程第一段/i)).toBeInTheDocument();
    expect(screen.getByText(/回程第二段/i)).toBeInTheDocument();
  });
}); 