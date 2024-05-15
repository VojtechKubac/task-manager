import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  test('displays the current year in the copyright notice', () => {
    render(<Footer />);
    //const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear} Task Manager. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();
  });
});
