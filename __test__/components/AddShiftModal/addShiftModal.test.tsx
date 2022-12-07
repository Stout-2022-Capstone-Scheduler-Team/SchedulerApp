import "@testing-library/jest-dom";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { AddShiftModal } from "../../../components";
import userEvent from "@testing-library/user-event";
import { DayOftheWeek, Shift, Time } from "../../../entities";

test("Add Shift Renders", () => {
  const addShiftModal = render(
    <AddShiftModal existingShifts={[]} dispatch={jest.fn()} />
  );
  expect(addShiftModal).toMatchSnapshot();
});

test("Modal opens and closes", async () => {
  const user = userEvent.setup();
  const dispatch = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddShiftModal existingShifts={[]} dispatch={dispatch} />
  );

  // Click the modal button
  const openButton = modal.getByText(/ADD SHIFT/i);
  await user.click(openButton);

  // Make sure the modal exists
  {
    const header = modal.queryByText(/ADD SHIFT/i);
    expect(header).not.toBe(null);

    expect(modal).toMatchSnapshot();
  }

  // Click the submit button
  await user.click(modal.getByText(/Close/i));
});

test("Adding Shifts", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const dispatch = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddShiftModal existingShifts={[]} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Shift/i));

  expect(modal.getByText(/Submit/i)).toBeDisabled();

  // Enter shift information
  await user.click(modal.getByLabelText(/Job Title/i));
  await user.click(modal.getByLabelText(/Select Start Day/i));
  await user.click(modal.getByText(/Sunday/i));
  await user.type(modal.getByLabelText(/Select Start Time/i), "10:10 PM");
  await user.type(modal.getByLabelText(/Select End Time/i), "02:10 AM");

  // Clicking Submit button
  await waitFor(() => expect(modal.getByText(/Submit/i)).not.toBeDisabled());
  await user.click(modal.getByText(/Submit/i));

  // Assert
  const newShift = new Shift(
    "",
    Time.fromString("22:10", DayOftheWeek.Sunday),
    Time.fromString("2:10", DayOftheWeek.Monday)
  );
  expect(dispatch.mock.calls).toEqual([[{ add: newShift }]]);
});
