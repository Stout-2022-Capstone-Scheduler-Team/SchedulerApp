import { AddEmployeeModal } from "../../../components";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Color, DayOftheWeek, Employee, Shift, Time } from "../../../entities";

test("Add Employee Renders", () => {
  const dispatch = jest.fn();
  const employeeModal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );
  expect(employeeModal).toMatchSnapshot();
});

test("Modal opens and closes", async () => {
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );

  // Make sure no modal exists
  {
    const header = modal.queryByText(/Add an Employee/);
    expect(header).toBe(null);
    expect(modal).toMatchSnapshot();
  }

  // Click the modal button
  const openButton = modal.getByText(/Add Employee/);
  await user.click(openButton);

  // Make sure the modal exists
  {
    const header = modal.queryByText(/Add an Employee/);
    expect(header).not.toBe(null);
  }

  // Click the cancel button
  await user.click(modal.getByText(/Close/));

  // Make sure the modal is gone
  {
    const header = modal.queryByText(/Add an Employee/);
    expect(header).toBe(null);
  }
});

test("Modal has 8 tabs", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/));

  // Get tab elements
  const tabs = modal.queryAllByRole("tab");

  // Assert there are 8 tabs (one for employee, one for each day of week)
  expect(tabs.length).toBe(8);
});

test("Modal Switches Tabs", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/));

  // Navigate to wednesday's tab
  await user.click(modal.getByText(/Wednesday/));

  // Check for wednesday availability header
  const header = modal.getByText(/Wednesday Availability/);
  expect(header).not.toBe(null);
});

test("Disable Submit on Failed Validation", async () => {
  // Arrange
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );

  // Act / Assert
  // Open modal
  await user.click(modal.getByText(/Add Employee/));

  // Verify modal submit button is disabled by default
  expect(modal.getByText(/Submit/)).toBeDisabled();

  // Enter name, submit button should still be disabled
  await user.type(modal.getAllByLabelText(/Employee Name/)[0], "Alice");
  expect(modal.getByText(/Submit/)).toBeDisabled();

  // Add availability, expect submit button to be valid
  await user.click(modal.getByText(/Monday/));
  await user.click(modal.getByText(/Add Availability/));
  await user.click(modal.getByLabelText(/All Day/));
  await user.click(modal.getByText(/^Add$/));
  expect(modal.getByText(/Submit/)).not.toBeDisabled();

  // Enter invalid hours, expect button to be disabled again
  await user.click(modal.getByText(/Edit Employee Info/));
  await user.type(modal.getAllByLabelText(/Minimum Hours per Week/)[0], "41");
  expect(modal.getByText(/Submit/)).toBeDisabled();

  // Fix min hours, submit is enabled again
  await user.type(
    modal.getAllByLabelText(/Minimum Hours per Week/)[0],
    "{backspace}{backspace}{backspace}"
  );
  expect(modal.getByText(/Submit/)).toBeDisabled();
  await user.type(modal.getAllByLabelText(/Minimum Hours per Week/)[0], "0");
  expect(modal.getByText(/Submit/)).not.toBeDisabled();
});

test("Submit button clears inputs", async () => {
  // Arrange
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const { getByText, getByLabelText, getAllByLabelText } = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );

  // Act / Assert
  // Open modal, add details, submit employee
  await user.click(getByText(/Add Employee/));
  await user.type(getAllByLabelText(/Employee Name/)[0], "Alice");
  await user.click(getByText(/Monday/));
  await user.click(getByText(/Add Availability/));
  await user.click(getByLabelText(/All Day/));
  await user.click(getByText(/^Add$/));
  await user.click(getByText(/Submit/));

  // Reopen modal, expect fields to be empty
  await user.click(getByText(/Add Employee/));
  expect(getAllByLabelText(/Employee Name/)[0]).toBeEmptyDOMElement();
  expect(getByLabelText(/Employee Color/)).not.toBeEmptyDOMElement();
  expect(getByLabelText(/Minimum Hours per Week/)).toBeEmptyDOMElement();
  expect(getByLabelText(/Maximum Hours per Week/)).toBeEmptyDOMElement();
});

test("Full Add Employee", async () => {
  // Arrange
  const user = userEvent.setup();
  const dispatch = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/));

  // Enter basic details
  await user.type(modal.getAllByLabelText(/Employee Name/)[0], "Alice");
  await user.click(modal.getByLabelText(/Employee Color/));
  const colorList = within(modal.getByRole("listbox"));
  await user.click(colorList.getByText(/Red/));
  await user.type(
    modal.getAllByLabelText(/Minimum Hours per Week/)[0],
    "{backspace}{backspace}{backspace}5"
  );
  await user.type(
    modal.getAllByLabelText(/Maximum Hours per Week/)[0],
    "{backspace}{backspace}{backspace}15"
  );

  // Enter availability
  await user.click(modal.getByText(/Monday/));
  await user.click(modal.getByText(/Add Availability/));
  await user.type(modal.getAllByLabelText(/Select Start Time/)[0], "10:00 AM");
  await user.type(modal.getAllByLabelText(/Select End Time/)[0], "12:00 PM");
  await user.click(modal.getByText(/^Add$/));

  // Submit
  await user.click(modal.getByText(/Submit/));

  // Assert
  const newEmp = new Employee("Alice", 5, 15, new Color("Red"));
  newEmp.addAvailability(
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  );
  expect(dispatch.mock.calls).toEqual([[{ add: newEmp }]]);
});
