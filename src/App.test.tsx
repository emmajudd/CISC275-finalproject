import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

test('renders homepage title', () => {
  render(<App />);
  const title = screen.getByText(/the pink path/i);
  expect(title).toBeInTheDocument();
});


