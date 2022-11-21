import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddShiftModal } from "../../../components";

test("Add Shift Renders", () => {
  render(<AddShiftModal existingShifts={[]} dispatch={async () => {}} />);
});

test("Modal opens and closes", () => {
  const modal = render(
    <AddShiftModal existingShifts={[]} dispatch={async () => {}} />
  );

  // Click the modal button
  const openButton = modal.getByText(/ADD SHIFT/i);
  fireEvent.click(openButton);

  // Make sure the modal exists
  {
    const header = modal.queryByText(/ADD SHIFT/i);
    expect(header).not.toBe(null);

    expect(modal).toMatchSnapshot();
  }

  // Click the submit button
  fireEvent.click(modal.getByText(/Submit/i));
});
