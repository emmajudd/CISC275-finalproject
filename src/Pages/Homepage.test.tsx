//This test file was made with the assistance of chatgpt.Its a test file for the homepages api key and chat validation
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Homepage from './Homepage';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

describe('Homepage', () => {
  beforeEach(() => {
    window.alert = jest.fn();
    (axios.post as jest.Mock).mockClear();
    localStorage.clear();
  });

  test('renders API key input and allows input', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const apiKeyInput = screen.getByPlaceholderText(/insert api key here/i);
    expect(apiKeyInput).toBeInTheDocument();
    fireEvent.change(apiKeyInput, { target: { value: 'test-key' } });
    expect(apiKeyInput).toHaveValue('test-key');
  });

  test('submitting API key stores it in localStorage', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    const apiKeyInput = screen.getByPlaceholderText(/insert api key here/i);
    fireEvent.change(apiKeyInput, { target: { value: 'my-secret-key' } });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);
    expect(localStorage.getItem('MYKEY')).toBe(JSON.stringify('my-secret-key'));
  });

  test('career helper blocks messages under 10 characters', async () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    // Set API key so chat validation is reached
    const apiKeyInput = screen.getByPlaceholderText(/insert api key here/i);
    fireEvent.change(apiKeyInput, { target: { value: 'test-key' } });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    const chatInput = screen.getByPlaceholderText(/ask a question/i);
    fireEvent.change(chatInput, { target: { value: 'short' } });
    const sendBtn = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendBtn);
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringMatching(/more detailed message/i)
      );
    });
    expect(axios.post).not.toHaveBeenCalled();
  });
}); 