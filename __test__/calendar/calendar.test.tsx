import { Calendar } from "../../components";
import renderer from "react-test-renderer";
import { Monday, shift } from "../services/utils";

test("Test Calendar Renders", () => {
  const calendar = renderer.create(<Calendar allShifts={[]} />);
  expect(calendar).toMatchSnapshot();
});

test("Single Shift", () => {
  const calendar = renderer.create(
    <Calendar allShifts={[shift("09:45", "10:15", Monday, "Drew")]} />
  );
  expect(calendar).toMatchSnapshot();
});

test("Many Shifts", () => {
  const calendar = renderer.create(
    <Calendar
      allShifts={[
        shift("09:45", "10:15", Monday, "Drew"),
        shift("09:46", "10:15", Monday, "Drew"),
        shift("09:47", "10:15", Monday, "Drew"),
        shift("09:48", "10:15", Monday, "Drew"),
        shift("09:49", "10:15", Monday, "Drew"),
        shift("09:50", "10:15", Monday, "Drew")
      ]}
    />
  );
  expect(calendar).toMatchSnapshot();
});
