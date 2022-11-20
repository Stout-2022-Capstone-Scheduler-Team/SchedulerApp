import { Calendar } from "../../../components";
import renderer from "react-test-renderer";
import { Monday, shift } from "../../utils";

test("Test Calendar Renders", () => {
  const calendar = renderer.create(
    <Calendar shifts={[]} employees={[]} loading={false} />
  );
  expect(calendar).toMatchSnapshot();
});

test("Single Shift", () => {
  const calendar = renderer.create(
    <Calendar
      shifts={[shift("09:45", "10:15", Monday, Monday, "Drew")]}
      employees={[]}
      loading={false}
    />
  );
  expect(calendar).toMatchSnapshot();
});

test("Many Shifts", () => {
  const calendar = renderer.create(
    <Calendar
      shifts={[
        shift("09:45", "10:15", Monday, Monday, "Drew"),
        shift("09:46", "10:15", Monday, Monday, "Drew"),
        shift("09:47", "10:15", Monday, Monday, "Drew"),
        shift("09:48", "10:15", Monday, Monday, "Drew"),
        shift("09:49", "10:15", Monday, Monday, "Drew"),
        shift("09:50", "10:15", Monday, Monday, "Drew")
      ]}
      employees={[]}
      loading={false}
    />
  );
  expect(calendar).toMatchSnapshot();
});
