import { EmployeeSummary } from "../../../components";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

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

// modal opens and closes with buttons
// modal opens and closes with employee card click
