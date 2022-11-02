import { Calendar } from "../../components";
import renderer from "react-test-renderer";

test("Test Calendar Renders", () => {
  const calendar = renderer.create(<Calendar allShifts={[]} />);
  expect(calendar).toMatchSnapshot();
});
