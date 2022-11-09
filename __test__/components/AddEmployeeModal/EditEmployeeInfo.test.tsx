import { render } from "@testing-library/react";
import { EditEmployeeInfo } from "../../../components";

it("Can Render", () => {
  // Arrange
  const dom = render(<EditEmployeeInfo />);

  // Assert
  expect(dom).toMatchSnapshot();
});
