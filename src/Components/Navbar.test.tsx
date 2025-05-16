import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
//checks to see if the light and dark mode button render and if all nessecary links are in the document
test('renders all navigation links and dark mode button', () => {
 render(
   <MemoryRouter>
     <Navbar darkMode={false} setDarkMode={() => {}} />
   </MemoryRouter>
 );
 //tests that the home, basic assessment, detailed assessment, and contact page links are in the document
 expect(screen.getByText(/home/i)).toBeInTheDocument();
 expect(screen.getByText(/basic assessment/i)).toBeInTheDocument();
 expect(screen.getByText(/detailed assessment/i)).toBeInTheDocument();
 expect(screen.getByText(/contact page/i)).toBeInTheDocument();
 expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument();
});
