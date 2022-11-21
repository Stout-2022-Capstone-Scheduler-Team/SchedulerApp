import { AddEmployeeModal } from "../../../components";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Color, DayOftheWeek, Employee, Shift, Time } from "../../../entities";
// jest.mock("../../../entities/color");

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
    const header = modal.queryByText(/Add an Employee/i);
    expect(header).toBe(null);
    expect(modal).toMatchSnapshot();
  }

  // Click the modal button
  const openButton = modal.getByText(/Add Employee/i);
  await user.click(openButton);

  // Make sure the modal exists
  {
    const header = modal.queryByText(/Add an Employee/i);
    expect(header).not.toBe(null);
  }

  // Click the cancel button
  await user.click(modal.getByText(/Close/i));

  // Make sure the modal is gone
  {
    const header = modal.queryByText(/Add an Employee/i);
    expect(header).toBe(null);

    expect(modal).toMatchSnapshot();
  }
});

test("Modal has 8 tabs", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/i));

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
  await user.click(modal.getByText(/Add Employee/i));

  // Navigate to wednesday's tab
  await user.click(modal.getByText(/Wednesday/i));

  // Check for wednesday availability header
  const header = modal.getByText(/Wednesday Availability/i);
  expect(header).not.toBe(null);
});

test("Full Add Employee", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const dispatch = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddEmployeeModal existingEmployees={[]} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/i));

  // Enter basic details
  await user.type(modal.getAllByLabelText(/Employee Name/i)[0], "Alice");
  await user.click(modal.getByLabelText(/Employee Color/i));
  const colorList = within(modal.getByRole("listbox"));
  await user.click(colorList.getByText(/Red/i));

  // Enter availability
  await user.click(modal.getByText(/Monday/i));
  await user.click(modal.getByText(/Add Availability/i));
  await user.type(modal.getAllByLabelText(/Select Start Time/i)[0], "10:00 AM");
  await user.type(modal.getAllByLabelText(/Select End Time/i)[0], "12:00 PM");
  await user.click(modal.getByText(/^Add$/i));

  // Submit
  await user.click(modal.getByText(/Submit/i));

  // Assert
  const newEmp = new Employee("Alice", 0, 40, new Color("Red"));
  newEmp.addAvailability(
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  );
  expect(dispatch.mock.calls).toEqual([[{ add: newEmp }]]);
});
