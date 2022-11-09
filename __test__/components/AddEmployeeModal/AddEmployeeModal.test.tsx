import { AddEmployeeModal } from "../../../components";
import { render, fireEvent } from "@testing-library/react";

test("Add Employee Renders", () => {
  const employeeModal = render(<AddEmployeeModal />);
  expect(employeeModal).toMatchSnapshot();
});

test("Modal opens and closes", () => {
  const modal = render(<AddEmployeeModal />);

  // Make sure no modal exists
  {
    const header = modal.queryByText(/Add an Employee/i);
    expect(header).toBe(null);
    expect(modal).toMatchSnapshot();
  }

  // Click the modal button
  const openButton = modal.getByText(/Add Employee/i);
  fireEvent.click(openButton);

  // Make sure the modal exists
  {
    const header = modal.queryByText(/Add an Employee/i);
    expect(header).not.toBe(null);

    expect(modal).toMatchSnapshot();
  }

  // Click the cancel button
  fireEvent.click(modal.getByText(/Close/i));

  // Make sure the modal is gone
  {
    const header = modal.queryByText(/Add an Employee/i);
    expect(header).toBe(null);

    expect(modal).toMatchSnapshot();
  }
});

test("Modal has 8 tabs", () => {
  // Setup modal, open it
  const modal = render(<AddEmployeeModal />);
  fireEvent.click(modal.getByText(/Add Employee/i));

  // Get tab elements
  const tabs = modal.queryAllByRole("tab");

  // Assert there are 8 tabs (one for employee, one for each day of week)
  expect(tabs.length).toBe(8);
});

it("Modal Switches Tabs", () => {
  // Setup modal, open it
  const modal = render(<AddEmployeeModal />);
  fireEvent.click(modal.getByText(/Add Employee/i));

  // Navigate to wednesday's tab
  fireEvent.click(modal.getByText(/Wednesday/i));

  // Check for wednesday availability header
  const header = modal.getByText(/Wednesday Availability/i);
  expect(header).not.toBe(null);
});
