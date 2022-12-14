import { EmployeeSummary } from "../../../components";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Color, DayOftheWeek, Employee, Shift, Time } from "../../../entities";
import userEvent from "@testing-library/user-event";

test("Employee Summary Renders", () => {
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  render(
    <EmployeeSummary
      employees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );
});

test("Employee Summary Renders with employees", () => {
  const dispatch = jest.fn();
  const employee1 = new Employee("Alice", 0, 40, new Color("Pink"), [
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  ]);
  const employee2 = new Employee("Bob", 0, 40, new Color("Red"), [
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  ]);
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  render(
    <EmployeeSummary
      employees={[employee1, employee2]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );
});

test("Employee Card opens sets addEmployeeModalOpen", async () => {
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const employee1 = new Employee("Alice", 0, 40, new Color("Pink"), [
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  ]);
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const employeeSummary = render(
    <EmployeeSummary
      employees={[employee1]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  expect(
    employeeSummary.getByTestId(/EmployeesStack/i)
  ).not.toBeEmptyDOMElement();

  await user.click(employeeSummary.getByText(/Alice/));
  expect(setCurrentEmployee).toBeCalledWith(employee1);
  expect(setAddEmployeeModalOpen).toBeCalledWith(true);
});

test("Confirmation modal opens and closes", async () => {
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const employee1 = new Employee("Alice", 0, 40, new Color("Pink"), [
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  ]);
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const employeeSummary = render(
    <EmployeeSummary
      employees={[employee1]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  // Make sure no modal exists
  {
    const header = employeeSummary.queryByText(/Confirm Delete/);
    expect(header).toBe(null);
  }

  await user.click(
    employeeSummary.getByTestId(/DeleteIcon/i).parentElement as Element
  );

  // Make sure the modal exists
  {
    const header = employeeSummary.queryByText(/Confirm Delete/);
    expect(header).not.toBe(null);
  }

  // Click the cancel button
  await user.click(employeeSummary.getByText(/Close/));

  // Make sure the modal is gone
  {
    const header = employeeSummary.queryByText(/Confirm Delete/);
    expect(header).toBe(null);
  }
});

test("Confirmation modal deletes employee", async () => {
  const user = userEvent.setup();
  const dispatch = jest.fn();
  const employee1 = new Employee("Alice", 0, 40, new Color("Pink"), [
    new Shift(
      "",
      new Time(10, DayOftheWeek.Monday),
      new Time(12, DayOftheWeek.Monday)
    )
  ]);
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const employeeSummary = render(
    <EmployeeSummary
      employees={[employee1]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );

  // Make sure no modal exists
  {
    const header = employeeSummary.queryByText(/Confirm Delete/);
    expect(header).toBe(null);
  }

  await user.click(
    employeeSummary.getByTestId(/DeleteIcon/i).parentElement as Element
  );

  // Make sure the modal exists
  {
    const header = employeeSummary.queryByText(/Confirm Delete/);
    expect(header).not.toBe(null);
  }

  // Click the delete button
  await user.click(employeeSummary.getByText(/^Delete$/i));

  expect(dispatch).toHaveBeenCalledWith({ remove: employee1 });
});
