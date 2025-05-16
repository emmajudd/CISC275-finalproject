// This test file was generated with the help of chatgpt. This test file verifies that the ProgressBar component
// correctly displays and styles the progress percentage, rounding values, capping negatives at 0%, and rendering up to 100% accurately
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';
import '@testing-library/jest-dom';


// tests that see if the progress gives the correct percentage and width based on amount of questions answered
test('renders progress bar with correct percentage', () => {
 render(<ProgressBar progress={42} />);
 const percentText = screen.getByText('42%');
 expect(percentText).toBeInTheDocument();
 // Find the progress bar by its class
 const bar = screen.getByTestId('progress-bar');
 expect(bar).toHaveStyle('width: 42%');
});


// tests that see if the progress bar goes to 100 percent
test('renders 100% progress', () => {
 render(<ProgressBar progress={100} />);
 expect(screen.getByText('100%')).toBeInTheDocument();
 expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 100%');
});


//see if the progress bar does integer division
test('rounds progress to nearest integer', () => {
 render(<ProgressBar progress={33.7} />);
 expect(screen.getByText('34%')).toBeInTheDocument();
 expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 34%');
});


//progress bar shouldt get passed 0
test('handles negative progress as 0%', () => {
 render(<ProgressBar progress={-10} />);
 expect(screen.getByText('0%')).toBeInTheDocument();
 expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 0%');
});
