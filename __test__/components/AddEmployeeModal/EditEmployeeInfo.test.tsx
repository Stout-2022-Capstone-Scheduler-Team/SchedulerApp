import { render, fireEvent, screen } from "@testing-library/react";
import { EditEmployeeInfo } from "../../../components";

it("Can Render", () => {
  // Arrange
  let dom = render(<EditEmployeeInfo />);

  // Assert
  expect(dom).toMatchSnapshot();
});
