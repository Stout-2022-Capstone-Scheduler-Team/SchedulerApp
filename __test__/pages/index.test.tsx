import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import EditSchedule from "../../pages/edit-schedule";

test("EditSchedule Renders", () => {
  const editSchedule = renderer.create(<EditSchedule />);
  expect(editSchedule).toMatchSnapshot();
});
