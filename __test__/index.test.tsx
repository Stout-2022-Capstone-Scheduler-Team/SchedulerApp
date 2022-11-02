import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

import Home from "../pages/index";

test("renders learn react link", () => {
  const calendar = renderer.create(<Home />);
  expect(calendar).toMatchSnapshot();
});
