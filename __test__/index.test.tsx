import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Home from "../pages/index";

import renderer from "react-test-renderer";

test("Home page snapshot", () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Create Schedule Button", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Create Schedule/i);
  expect(linkElement).toBeVisible();
  expect(linkElement).toBeEnabled();
  expect(linkElement).toHaveAttribute("href", "/create");
});

test("Advanced Options Button", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Advanced Options/i);
  expect(linkElement).toBeVisible();
  expect(linkElement).toBeEnabled();
});
