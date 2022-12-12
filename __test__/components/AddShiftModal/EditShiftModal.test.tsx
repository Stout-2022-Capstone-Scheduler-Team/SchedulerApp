import "@testing-library/jest-dom";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { AddShiftModal } from "../../../components";
import userEvent from "@testing-library/user-event";
import { DayOftheWeek, Shift, Time } from "../../../entities";
import { ScheduleAction, sleepTask } from "../../../services";
import { Monday, shift } from "../../utils";
import { modal } from "@mui/material";

test("Shift Data Renders", () => {
  const shift = new Shift("advad", new Time(3, Monday), new Time(5, Monday));
  const dispatch = jest.fn();
  render(
    <AddShiftModal
      dispatch={dispatch}
      addShiftModalOpen={true}
      setShiftModalOpen={function (addShiftModalOpen: boolean): void {}}
      shift={shift}
    />
  );
});

test("Shift on Calendar updates", async () => {
  const shift = new Shift("advad", new Time(3, Monday), new Time(5, Monday));
  const user = userEvent.setup();
  const dispatch = jest.fn();
  dispatch.mockResolvedValue(undefined);
  const modal = render(
    <AddShiftModal
      dispatch={dispatch}
      addShiftModalOpen={true}
      setShiftModalOpen={function (addShiftModalOpen: boolean): void {}}
      shift={shift}
    />
  );
  await user.click(modal.getByDisplayValue(/advad/i));

  // Change shift information
  await user.dblClick(modal.getByLabelText(/Shift Name/i));
  await user.type(modal.getByLabelText(/Shift Name/i), "TestShiftName", {
    skipClick: true
  });
  await user.click(modal.getByText(/Monday/i));
  await user.click(modal.getByText(/Tuesday/i));
  await user.tripleClick(modal.getByLabelText(/Select Start Time/i));
  await user.type(modal.getByLabelText(/Select Start Time/i), "08:00 AM", {
    skipClick: true
  });
  await user.tripleClick(modal.getByLabelText(/Select End Time/i));
  await user.type(modal.getByLabelText(/Select End Time/i), "10:00 AM", {
    skipClick: true
  });

  // Clicking Submit modal
  //   await waitFor(() => expect(modal.getByText(/Submit/i)).not.toBeDisabled());
  await user.click(modal.getByText(/Submit/i));

  // Assert
  const newShift = new Shift(
    "TestShiftName",
    Time.fromString("8:00", DayOftheWeek.Tuesday),
    Time.fromString("10:00", DayOftheWeek.Tuesday)
  );
  expect(dispatch).toHaveBeenCalledWith({ add: newShift });
});
