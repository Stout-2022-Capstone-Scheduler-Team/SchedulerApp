import "@testing-library/jest-dom";
import { render, waitFor, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditSchedule from "../../pages/edit-schedule";

// Make dates always return the same value
jest
  .useFakeTimers({
    advanceTimers: true
  })
  .setSystemTime(new Date("2020-01-01"));
test("verify date", () => {
  expect(new Date()).toEqual(new Date("2020-01-01"));
});

test("EditSchedule Renders", () => {
  const page = render(<EditSchedule />);
  expect(page.baseElement).toMatchSnapshot();
});

test("Can use Reducer", async () => {
  const user = userEvent.setup();
  render(<EditSchedule />);

  // Add a shift
  await user.click(screen.getByText(/Add Shift/i));

  // Enter shift information
  await user.click(screen.getByLabelText(/Select Start Day/i));
  await user.click(screen.getByText(/Sunday/i));
  await user.type(screen.getByLabelText(/Select Start Time/i), "10:10 PM");
  await user.type(screen.getByLabelText(/Select End Time/i), "02:10 AM");

  // Clicking Submit button
  await user.click(screen.getByText(/Submit/i));

  await act(async () => {
    await waitFor(() => screen.getByText(/10:10pm/));
  });

  expect(screen.getByText(/10:10pm/)).toBeInTheDocument();
  expect(screen.getByText(/2:10am/)).toBeInTheDocument();
}, 10000);
