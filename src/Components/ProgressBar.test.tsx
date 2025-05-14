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

test('renders 100% progress', () => {
  render(<ProgressBar progress={100} />);
  expect(screen.getByText('100%')).toBeInTheDocument();
  expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 100%');
});

test('rounds progress to nearest integer', () => {
  render(<ProgressBar progress={33.7} />);
  expect(screen.getByText('34%')).toBeInTheDocument();
  expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 34%');
});

test('handles negative progress as 0%', () => {
  render(<ProgressBar progress={-10} />);
  expect(screen.getByText('0%')).toBeInTheDocument();
  expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 0%');
});

 