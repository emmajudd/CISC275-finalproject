import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';
import '@testing-library/jest-dom';

test('renders contact page heading and all group members', () => {
  render(<ContactPage />);
  expect(screen.getByRole('heading', { name: /contact the group/i })).toBeInTheDocument();
  expect(screen.getByText(/mia pfaff/i)).toBeInTheDocument();
  expect(screen.getByText(/sean smith/i)).toBeInTheDocument();
  expect(screen.getByText(/tyler walsh/i)).toBeInTheDocument();
  expect(screen.getByText(/emma judd/i)).toBeInTheDocument();
}); 