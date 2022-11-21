import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AvailabilityEditor } from "../../../components";
import { DayOftheWeek, Shift, Time } from "../../../entities";

test("Can Render", () => {
  render(
    <AvailabilityEditor
      day={0}
      currentAvailability={[]}
      addAvailability={() => null}
      removeAvailability={() => null}
    />
  );
});

test("Can Remove Availability Blocks", async () => {
  // Arrange
  const user = userEvent.setup();
  const availArray = [
    new Shift(
      "",
      new Time(8, DayOftheWeek.Monday),
      new Time(16, DayOftheWeek.Monday)
    )
  ];
  const removeAvailability = jest.fn((avail: Shift) => {
    availArray.splice(0);
  });
  const { getByTestId, rerender } = render(
    <AvailabilityEditor
      day={0}
      currentAvailability={availArray}
      addAvailability={() => null}
      removeAvailability={removeAvailability}
    />
  );

  // Act / Assert
  expect(getByTestId(/AvailabilityStack/i)).not.toBeEmptyDOMElement();
  await user.click(getByTestId(/DeleteIcon/i).parentElement as Element);
  rerender(
    <AvailabilityEditor
      day={0}
      currentAvailability={availArray}
      addAvailability={() => null}
      removeAvailability={removeAvailability}
    />
  );
  expect(getByTestId(/AvailabilityStack/i)).toBeEmptyDOMElement();
});
