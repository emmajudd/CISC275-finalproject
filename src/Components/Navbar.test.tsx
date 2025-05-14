import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders all navigation links and dark mode button', () => {
  render(
    <MemoryRouter>
      <Navbar darkMode={false} setDarkMode={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/basic assessment/i)).toBeInTheDocument();
  expect(screen.getByText(/detailed assessment/i)).toBeInTheDocument();
  expect(screen.getByText(/contact page/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument();
});