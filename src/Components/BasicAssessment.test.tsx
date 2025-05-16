// This file includes code generated with the assistance of a ChatGPT.
// It contains tests for the BasicAssessment component to verify rendering and progress bar updates.

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BasicAssessment from './BasicAssessment';


test('renders basic assessment heading', () => {
  render(
    <MemoryRouter>
      <BasicAssessment />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /basic career assessment/i })).toBeInTheDocument();
});

test('progress bar starts at 0%', () => {
  render(
    <MemoryRouter>
      <BasicAssessment />
    </MemoryRouter>
  );
  expect(screen.getByText('0%')).toBeInTheDocument();
  expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 0%');
});

test('progress bar updates as user answers questions', () => {
  render(
    <MemoryRouter>
      <BasicAssessment />
    </MemoryRouter>
  );
  //Answer first question
  const yesRadios = screen.getAllByRole('radio', { name: /yes/i });
  fireEvent.click(yesRadios[0]);
  //Progress should update
  const expectedProgress = Math.round((1 / 14) * 100) + '%';
  expect(screen.getByText(expectedProgress)).toBeInTheDocument();
  expect(screen.getByTestId('progress-bar')).toHaveStyle(`width: ${expectedProgress}`);
  //Answer second question
  fireEvent.click(yesRadios[1]);
  const expectedProgress2 = Math.round((2 / 14) * 100) + '%';
  expect(screen.getByText(expectedProgress2)).toBeInTheDocument();
  expect(screen.getByTestId('progress-bar')).toHaveStyle(`width: ${expectedProgress2}`);
});

