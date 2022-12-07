import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditSchedule from "../../pages/edit-schedule";
import { sleepTask } from "../../services";

it("EditSchedule Renders", () => {
  render(<EditSchedule />);
});

it("Can use Reducer", async () => {
  const user = userEvent.setup();
  const page = render(<EditSchedule />);

  // Add a shift
  await user.click(page.getByText(/Add Shift/i));

  // Enter shift information
  await user.click(page.getByLabelText(/Select Start Day/i));
  await user.click(page.getByText(/Sunday/i));
  await user.type(page.getByLabelText(/Select Start Time/i), "10:10 PM");
  await user.type(page.getByLabelText(/Select End Time/i), "02:10 AM");

  // Clicking Submit button
  await user.click(page.getByText(/Submit/i));

  await sleepTask(1000);

  // Assert
  expect(page.queryByText(/10:10pm/)).not.toBeNull();
  expect(page.queryByText(/2:10am/)).not.toBeNull();
}, 10000);
