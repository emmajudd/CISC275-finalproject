import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailedAssessment from './DetailedAssessment';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

beforeAll(() => {
  window.alert = jest.fn();
});
jest.mock('canvas-confetti', () => () => {});

test('renders detailed assessment heading and first question', () => {
  render(
    <MemoryRouter>
      <DetailedAssessment />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /detailed career assessment/i })).toBeInTheDocument();
  expect(screen.getByText(/what are your long-term career goals/i)).toBeInTheDocument();
});

test('shows character count and enforces minimum character requirement', () => {
  render(
    <MemoryRouter>
      <DetailedAssessment />
    </MemoryRouter>
  );
  // Find all character count elements
  const charCounts = screen.getAllByText(/character minimum 0 \/ 10/i);
  expect(charCounts.length).toBeGreaterThan(0);
  // Type 5 characters in the first textarea
  const textarea = screen.getAllByRole('textbox')[0];
  fireEvent.change(textarea, { target: { value: 'hello' } });
  expect(screen.getByText(/character minimum 5 \/ 10/i)).toBeInTheDocument();
  // Type 10 characters
  fireEvent.change(textarea, { target: { value: 'helloworld' } });
  expect(screen.getByText(/character minimum 10 \/ 10/i)).toBeInTheDocument();
});

test('submit button only works if all questions are answered', () => {
  render(
    <MemoryRouter>
      <DetailedAssessment />
    </MemoryRouter>
  );
  // There are 10 questions, fill only the first 9
  const textareas = screen.getAllByRole('textbox');
  for (let i = 0; i < textareas.length - 1; i++) {
    fireEvent.change(textareas[i], { target: { value: 'helloworld' } });
  }
  // Click submit
  fireEvent.click(screen.getByRole('button', { name: /submit answers/i }));
  // Popup should not appear
  expect(screen.queryByText(/thank you for your responses/i)).not.toBeInTheDocument();
  // Fill the last question
  fireEvent.change(textareas[textareas.length - 1], { target: { value: 'helloworld' } });
  // Click submit
  fireEvent.click(screen.getByRole('button', { name: /submit answers/i }));
  // Popup should appear
  expect(screen.getByText(/thank you for your responses/i)).toBeInTheDocument();
}); 