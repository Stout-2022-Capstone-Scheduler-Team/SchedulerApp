import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Home from "../pages/index";

test("renders learn react link", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Create Schedule/i);
  expect(linkElement).toBeInTheDocument();
});
