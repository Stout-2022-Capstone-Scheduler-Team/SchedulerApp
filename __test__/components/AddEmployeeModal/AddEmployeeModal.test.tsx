import { AddEmployeeModal } from "../../../components";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Color, Employee, Schedule } from "../../../entities";
jest.mock("../../../entities/color");

test("Add Employee Renders", () => {
  const empty = new Schedule();
  const dispatch = jest.fn();
  const employeeModal = render(
    <AddEmployeeModal schedule={empty} dispatch={dispatch} />
  );
  expect(employeeModal).toMatchSnapshot();
});

test("Modal opens and closes", async () => {
  const user = userEvent.setup();
  const empty = new Schedule();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal schedule={empty} dispatch={dispatch} />
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

    expect(modal).toMatchSnapshot();
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
  const empty = new Schedule();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal schedule={empty} dispatch={dispatch} />
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
  const empty = new Schedule();
  const dispatch = jest.fn();
  const modal = render(
    <AddEmployeeModal schedule={empty} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/i));

  // Navigate to wednesday's tab
  await user.click(modal.getByText(/Wednesday/i));

  // Check for wednesday availability header
  const header = modal.getByText(/Wednesday Availability/i);
  expect(header).not.toBe(null);
});

test("Simple Add Employee", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const empty = new Schedule();
  const dispatch = jest.fn();
  dispatch.mockResolvedValue(undefined);
  jest.mocked(Color.getRandomColorName).mockReturnValueOnce("Red");
  const modal = render(
    <AddEmployeeModal schedule={empty} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/i));
  await user.type(modal.getByLabelText(/Employee Name/i), "Alice");
  await user.click(modal.getByText(/Submit/i));
  expect(dispatch.mock.calls).toEqual([
    [{ add: new Employee("Alice", 0, 40, new Color("Red")) }]
  ]);
});

test("Full Add Employee", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const empty = new Schedule();
  const dispatch = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddEmployeeModal schedule={empty} dispatch={dispatch} />
  );
  await user.click(modal.getByText(/Add Employee/i));

  // Enter basic details
  await user.type(modal.getByLabelText(/Employee Name/i), "Alice");
  await user.click(modal.getByLabelText(/Employee Color/i));
  await user.click(modal.getByText(/Red/i));

  // Enter availability
  await user.click(modal.getByText(/Monday/i));
  // TODO

  await user.click(modal.getByText(/Submit/i));
  expect(dispatch.mock.calls).toEqual([
    [{ add: new Employee("Alice", 0, 40, new Color("Red")) }]
  ]);
});
