import { AddEmployeeModal } from "../../../components";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

test("Add Employee Renders", () => {
  const employeeModal = render(<AddEmployeeModal />);
  expect(employeeModal).toMatchSnapshot();
});

test("Button opens Modal", () => {
  const modal = render(<AddEmployeeModal />);

  // Make sure no modal exists
  {
    const header = screen.queryByText(/Add an Employee/i);
    expect(header).toBe(null);
    expect(modal).toMatchSnapshot();
  }

  // Click the modal button
  console.log(screen.getByText(/Add Employee/i));
  fireEvent.click(screen.getByText(/Add Employee/i));

  // Make sure the modal exists
  {
    const header = screen.queryByText(/Add an Employee/i);
    expect(header).toBeInTheDocument();
    expect(modal).toMatchSnapshot();
  }
});
