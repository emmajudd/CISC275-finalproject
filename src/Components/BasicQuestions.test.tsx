import React from 'react';
import { render, screen } from '@testing-library/react';
import BasicQuestions from './BasicQuestions';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders all basic questions and submit button', () => {
  render(
    <MemoryRouter>
      <BasicQuestions />
    </MemoryRouter>
  );
  expect(screen.getByText(/what are your interests/i)).toBeInTheDocument();
  expect(screen.getByText(/what are your skills/i)).toBeInTheDocument();
  expect(screen.getByText(/what is your preferred work environment/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
}); 