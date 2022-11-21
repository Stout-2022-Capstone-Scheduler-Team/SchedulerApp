import { render } from "@testing-library/react";
import { EditEmployeeInfo } from "../../../components";
import { Color } from "../../../entities";

it("Can Render", () => {
  // Arrange
  const dom = render(
    <EditEmployeeInfo
      name={""}
      color={new Color("blue")}
      maxHours={40}
      minHours={0}
      availableColors={[new Color("blue")]}
      setEmployeeName={(name: string) => null}
      setEmployeeColor={(color: Color) => null}
      setEmployeeMaxHours={(maxHours: number) => null}
      setEmployeeMinHours={(minHours: number) => null}
    />
  );

  // Assert
  expect(dom).toMatchSnapshot();
});
