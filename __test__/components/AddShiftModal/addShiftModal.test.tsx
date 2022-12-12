import "@testing-library/jest-dom";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { AddShiftModal } from "../../../components";
import userEvent from "@testing-library/user-event";
import { DayOftheWeek, Shift, Time } from "../../../entities";

test("Add Shift Renders", () => {
  const addShiftModal = render(
    <AddShiftModal
      dispatch={jest.fn()}
      addShiftModalOpen={false}
      setShiftModalOpen={jest.fn()}
    />
  );

  expect(addShiftModal).toMatchSnapshot();
});

test("Modal opens and closes", async () => {
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const openModal = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddShiftModal
      dispatch={dispatch}
      addShiftModalOpen={false}
      setShiftModalOpen={openModal}
    />
  );

  expect(modal.queryByText(/add a shift/i)).toBe(null);

  // Rerender modal with open prop
  modal.rerender(
    <AddShiftModal
      dispatch={dispatch}
      addShiftModalOpen={true}
      setShiftModalOpen={openModal}
    />
  );

  // Make sure the modal exists
  expect(modal.queryByText(/add shift/i)).not.toBe(null);

  // Click the close button
  await user.click(modal.getByText(/Close/i));
});

test("Adding Shifts", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const openModal = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddShiftModal
      dispatch={dispatch}
      addShiftModalOpen={true}
      setShiftModalOpen={openModal}
    />
  );
  expect(modal.getByText(/Submit/i)).toBeDisabled();

  // Enter shift information
  await user.type(modal.getByLabelText(/Shift Name/i), "TestShiftName");
  await user.click(modal.getByLabelText(/Select Start Day/i));
  await user.click(modal.getByText(/Sunday/i));
  await user.type(modal.getByLabelText(/Select Start Time/i), "10:10 PM");
  await user.type(modal.getByLabelText(/Select End Time/i), "02:10 AM");

  // Clicking Submit button
  await waitFor(() => expect(modal.getByText(/Submit/i)).not.toBeDisabled());
  await user.click(modal.getByText(/Submit/i));

  // Assert
  const newShift = new Shift(
    "TestShiftName",
    Time.fromString("22:10", DayOftheWeek.Sunday),
    Time.fromString("2:10", DayOftheWeek.Monday)
  );
  expect(dispatch.mock.calls).toEqual([[{ add: newShift }]]);
});
