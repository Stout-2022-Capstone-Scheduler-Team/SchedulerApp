import { AddEmployeeModal } from "../../../components";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Color, DayOftheWeek, Employee, Shift, Time } from "../../../entities";

test("Add Employee Renders", () => {
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const employeeModal = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );
  expect(employeeModal).toMatchSnapshot();
});

test("Modal has 8 tabs", async () => {
  // Setup modal, open it
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const modal = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  // Get tab elements
  const tabs = modal.queryAllByRole("tab");

  // Assert there are 8 tabs (one for employee, one for each day of week)
  expect(tabs.length).toBe(8);
});

test("Modal Switches Tabs", async () => {
  // Setup modal, open it
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const modal = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

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
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const modal = render(
    <AddEmployeeModal
      existingEmployees={[
        new Employee("Alice", 0, 40, new Color("Pink"), [
          new Shift(
            "",
            new Time(10, DayOftheWeek.Monday),
            new Time(12, DayOftheWeek.Monday)
          )
        ])
      ]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  // Act / Assert

  // Verify modal submit button is disabled by default
  expect(modal.getByText(/Submit/)).toBeDisabled();

  // Enter name, submit button should still be disabled
  await user.type(modal.getAllByLabelText(/Employee Name/)[0], "Drew");
  expect(modal.getByText(/Submit/)).toBeDisabled();

  // Add availability, expect submit button to be valid
  await user.click(modal.getByText(/Monday/));
  await user.click(modal.getByLabelText(/All Day/));
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

  // Enter invalid name, expect button to be disabled again
  await user.type(
    modal.getAllByLabelText(/Employee Name/)[0],
    "{backspace}{backspace}{backspace}{backspace}Alice"
  );
  expect(modal.getByText(/Submit/)).toBeDisabled();
  // Fix name, submit is enabled again
  await user.type(
    modal.getAllByLabelText(/Employee Name/)[0],
    "{backspace}{backspace}{backspace}{backspace}{backspace}Bob"
  );
  expect(modal.getByText(/Submit/)).not.toBeDisabled();
}, 10000);

test("Close button clears inputs", async () => {
  // Arrange
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const modal = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  // Act / Assert
  // Open modal, add details, submit employee
  await user.type(modal.getAllByLabelText(/Employee Name/)[0], "Alice");
  await user.click(modal.getByText(/Monday/));
  await user.click(modal.getByLabelText(/All Day/));
  await user.click(modal.getByText(/Close/));

  // Reopen modal, expect fields to be empty
  const modal2 = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );
  expect(modal2.getAllByLabelText(/Employee Name/)[0]).toBeEmptyDOMElement();
  expect(modal2.getByLabelText(/Employee Color/)).not.toBeEmptyDOMElement();
  expect(modal2.getByLabelText(/Minimum Hours per Week/)).toBeEmptyDOMElement();
  expect(modal2.getByLabelText(/Maximum Hours per Week/)).toBeEmptyDOMElement();
});

test("Submit button clears inputs", async () => {
  // Arrange
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const modal = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  // Act / Assert
  // Open modal, add details, submit employee
  await user.type(modal.getAllByLabelText(/Employee Name/)[0], "Alice");
  await user.click(modal.getByText(/Monday/));
  await user.click(modal.getByLabelText(/All Day/));
  await user.click(modal.getByText(/Submit/));

  // Reopen modal, expect fields to be empty
  const modal2 = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );
  expect(modal2.getAllByLabelText(/Employee Name/)[0]).toBeEmptyDOMElement();
  expect(modal2.getByLabelText(/Employee Color/)).not.toBeEmptyDOMElement();
  expect(modal2.getByLabelText(/Minimum Hours per Week/)).toBeEmptyDOMElement();
  expect(modal2.getByLabelText(/Maximum Hours per Week/)).toBeEmptyDOMElement();
});

test("Full Add Employee", async () => {
  // Arrange
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const modal = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

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

test("Full Edit Employee", async () => {
  // Arrange
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const employee = new Employee("Drew", 10, 40, new Color("Red"), [
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  ]);
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const modal = render(
    <AddEmployeeModal
      existingEmployees={[]}
      dispatch={dispatch}
      currentEmployee={employee}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={true}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  // Edit Name
  await user.type(
    modal.getAllByLabelText(/Employee Name/)[0],
    "{backspace}{backspace}{backspace}{backspace}Alice"
  );

  // Submit
  await user.click(modal.getByText(/Submit/));

  expect(dispatch.mock.calls).toEqual([
    [
      {
        update: employee,
        name: "Alice",
        maxHours: 40,
        minHours: 10,
        color: new Color("Red"),
        available: [
          new Shift(
            "",
            new Time(10, DayOftheWeek.Monday),
            new Time(12, DayOftheWeek.Monday)
          )
        ]
      }
    ]
  ]);
});
