import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddShiftModal } from "../../components/addShiftModal";

test("Add Shift Renders", () => {
  const addShiftModal = render(<AddShiftModal />);
  expect(addShiftModal).toMatchSnapshot();
});
test("Modal opens and closes", () => {
  const modal = render(<AddShiftModal />);

  // Make sure no modal exists
  {
    const header = modal.queryByText(/ADD SHIFT/i);
    expect(header).toBe(null);
    expect(modal).toMatchSnapshot();
  }

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
  fireEvent.click(modal.getByText(/Submit /i));

  // Make sure the modal is gone
  {
    const header = modal.queryByText(/ADD SHIFT/i);
    expect(header).toBe(null);

    expect(modal).toMatchSnapshot();
  }
});
