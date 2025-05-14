import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';
import '@testing-library/jest-dom';

test('renders progress bar with correct percentage', () => {
  render(<ProgressBar progress={42} />);
  const percentText = screen.getByText('42%');
  expect(percentText).toBeInTheDocument();
  // Find the progress bar by its class
  const bar = screen.getByTestId('progress-bar');
  expect(bar).toHaveStyle('width: 42%');
}); 