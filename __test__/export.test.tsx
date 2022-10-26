import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ExportModal } from "../components/export/ExportModal";

import renderer from "react-test-renderer";
import React from "react";

test("Home page snapshot", () => {
  const exportRef = React.useRef(null);
  const tree = renderer
    .create(<ExportModal componentToExport={exportRef} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Create Schedule Button", () => {
  const exportRef = React.useRef(null);
  render(<ExportModal componentToExport={exportRef} />);
  const linkElement = screen.getByText(/Create Schedule/i);
  expect(linkElement).toBeVisible();
  expect(linkElement).toBeEnabled();
  expect(linkElement).toHaveAttribute("href", "/create");
});
