import { EmployeeSummary } from "../../../components";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Color, DayOftheWeek, Employee, Shift, Time } from "../../../entities";
import userEvent from "@testing-library/user-event";

test("Employee Summary Renders", () => {
  const dispatch = jest.fn();
  const setCurrentEmployee = jest.fn();
  const setAddEmployeeModalOpen = jest.fn();
  const employeeSummary = render(
    <EmployeeSummary
      employees={[]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );
  expect(employeeSummary).toMatchSnapshot();
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
  const employeeSummary = render(
    <EmployeeSummary
      employees={[employee1, employee2]}
      dispatch={dispatch}
      currentEmployee={null}
      setCurrentEmployee={setCurrentEmployee}
      addEmployeeModalOpen={false}
      setAddEmployeeModalOpen={setAddEmployeeModalOpen}
    />
  );
  expect(employeeSummary).toMatchSnapshot();
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
  expect(setCurrentEmployee).toBeCalled();
  expect(setAddEmployeeModalOpen).toBeCalled();
});

// add coverage for confirmation modal close and delete paths
// modal opens and closes with buttons
// modal opens and closes with employee card click
