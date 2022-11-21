import { render } from "@testing-library/react";
import { EditEmployeeInfo } from "../../../components";
import { Color } from "../../../entities";

it("Can Render", () => {
  // Arrange
  const dom = render(
    <EditEmployeeInfo
      name={""}
      color={new Color("Blue")}
      maxHours={40}
      minHours={0}
      availableColors={[new Color("Blue")]}
      setEmployeeName={(name: string) => null}
      setEmployeeColor={(color: Color) => null}
      setEmployeeMaxHours={(maxHours: number) => null}
      setEmployeeMinHours={(minHours: number) => null}
      validName={true}
      validHours={true}
    />
  );

  // Assert
  expect(dom).toMatchSnapshot();
});
