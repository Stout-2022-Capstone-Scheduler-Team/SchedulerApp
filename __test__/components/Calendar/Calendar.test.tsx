import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Calendar } from "../../../components";
import { DayOftheWeek, Schedule, Shift, Time } from "../../../entities";

test("Multiple Shifts Render", () => {
  const shift1 = new Shift(
    "",
    new Time(1, DayOftheWeek.Monday),
    new Time(2, DayOftheWeek.Monday),
    1
  );
  const shift2 = new Shift(
    "",
    new Time(12, DayOftheWeek.Wednesday),
    new Time(14, DayOftheWeek.Wednesday),
    2
  );
  const schedule = new Schedule([], [shift1, shift2], 0, 500);
  render(
    <Calendar schedule={schedule} openShiftModal={jest.fn()} loading={false} />
  );
});
