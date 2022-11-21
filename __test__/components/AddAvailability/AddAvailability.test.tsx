import { AddAvailabilityModal } from "../../../components";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Color, DayOftheWeek, Employee, Shift, Time } from "../../../entities";
import { useStyleRegistry } from "styled-jsx";

test("Add Availability Renders", () => {
  const addavailability = jest.fn();
  const employeeModal = render(
    <AddAvailabilityModal
      day={DayOftheWeek.Monday}
      addAvailability={addavailability}
    />
  );
  expect(employeeModal).toMatchSnapshot();
});

test("Modal opens and closes", async () => {
  const user = userEvent.setup();
  const addavailability = jest.fn();
  const modal = render(
    <AddAvailabilityModal
      day={DayOftheWeek.Monday}
      addAvailability={addavailability}
    />
  );

  // Make sure no modal exists
  {
    const header = modal.queryByText(/Monday Availability/i);
    expect(header).toBe(null);
    expect(modal).toMatchSnapshot();
  }

  // Click the modal button
  const openButton = modal.getByText(/Add Availability/i);
  await user.click(openButton);

  // Make sure the modal exists
  {
    const header = modal.queryByText(/Add Availability/i);
    expect(header).not.toBe(null);
  }

  // Click the cancel button
  await user.click(modal.getByText(/Close/i));

  // Make sure the modal is gone
  {
    const header = modal.queryByText(/Monday Availability/i);
    expect(header).toBe(null);

    expect(modal).toMatchSnapshot();
  }
});

test("Full Add Availability", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const addavailability = jest.fn();
  addavailability.mockResolvedValue(undefined);
  const modal = render(
    <AddAvailabilityModal
      day={DayOftheWeek.Monday}
      addAvailability={addavailability}
    />
  );
  await user.click(modal.getByText(/Add Availability/i));

  // Enter availability time
  await user.type(modal.getAllByLabelText(/Select Start Time/i)[0], "10:00 AM");
  await user.type(modal.getAllByLabelText(/Select End Time/i)[0], "12:00 PM");

  // Submit
  await user.click(modal.getByText(/^Add$/i));

  const newShift = new Shift(
    "",
    new Time(10, DayOftheWeek.Monday),
    new Time(12, DayOftheWeek.Monday)
  );
  // Assert
  expect(addavailability.mock.calls).toEqual([[newShift]]);
});

test("Full Add Availability Checked", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const addavailability = jest.fn();
  addavailability.mockResolvedValue(undefined);
  const modal = render(
    <AddAvailabilityModal
      day={DayOftheWeek.Monday}
      addAvailability={addavailability}
    />
  );
  await user.click(modal.getByText(/Add Availability/i));
  await user.click(modal.getByText(/All Day/i));

  // Submit
  await user.click(modal.getByText(/^Add$/i));

  const newShift = new Shift(
    "",
    new Time(0, DayOftheWeek.Monday),
    new Time(24, DayOftheWeek.Monday)
  );
  // Assert
  expect(addavailability.mock.calls).toEqual([[newShift]]);
});
