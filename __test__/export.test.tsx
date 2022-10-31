import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ExportModal } from "../components/export/ExportModal";

import renderer from "react-test-renderer";
import React from "react";

test("Export snapshot", () => {
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  const tree = renderer
    .create(<ExportModal componentToExport={exportRef} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Export Button", () => {
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(<ExportModal componentToExport={exportRef} />);
  // const linkElement = screen.getByText(/Create Schedule/i);
  // expect(linkElement).toBeVisible();
  // expect(linkElement).toBeEnabled();
  // expect(linkElement).toHaveAttribute("href", "/create");
});
