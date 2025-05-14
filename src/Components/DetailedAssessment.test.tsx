import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailedAssessment from './DetailedAssessment';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders detailed assessment heading and first question', () => {
  render(
    <MemoryRouter>
      <DetailedAssessment />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /detailed career assessment/i })).toBeInTheDocument();
  expect(screen.getByText(/what are your long-term career goals/i)).toBeInTheDocument();
}); 