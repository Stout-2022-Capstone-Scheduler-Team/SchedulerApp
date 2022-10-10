import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Home from '../pages/index';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Next\.js!/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveProperty('href', 'https://nextjs.org/');
});
