import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicQuestions from './BasicQuestions';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

beforeAll(() => {
  window.alert = jest.fn();
});

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

test('submit button only works if all questions are answered', () => {
  render(
    <MemoryRouter>
      <BasicQuestions />
    </MemoryRouter>
  );
  const inputs = screen.getAllByRole('textbox');
  // Fill only the first two
  fireEvent.change(inputs[0], { target: { value: 'foo' } });
  fireEvent.change(inputs[1], { target: { value: 'bar' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  // Should call alert
  expect(window.alert).toHaveBeenCalledWith('Please answer all questions before submitting.');
  // Fill the last one
  fireEvent.change(inputs[2], { target: { value: 'baz' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  // Should navigate to /basic-results (simulate with mock)
});


