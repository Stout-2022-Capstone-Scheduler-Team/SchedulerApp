import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditEmployeeInfo } from "../../../components";
import { Color } from "../../../entities";

it("Can Render", () => {
  // Arrange
  render(
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
});

it("Can update Color", async () => {
  // Arrange
  const user = userEvent.setup();
  const setColor = jest.fn((newColor: Color) => null);
  const { getByLabelText, getByText } = render(
    <EditEmployeeInfo
      name={"Joe"}
      color={new Color("Red")}
      maxHours={40}
      minHours={0}
      availableColors={[new Color("Red"), new Color("Blue")]}
      setEmployeeName={() => null}
      setEmployeeColor={setColor}
      setEmployeeMaxHours={() => null}
      setEmployeeMinHours={() => null}
      validName={true}
      validHours={true}
    />
  );

  // Act
  await user.click(getByLabelText(/Employee Color/i));
  await user.click(getByText(/Blue/i));

  // Assert
  expect(setColor.mock.calls.length).toEqual(1);
  expect(setColor.mock.calls[0]).toEqual([new Color("Blue")]);
});

it("Can Randomize Color", async () => {
  // Arrange
  const user = userEvent.setup();
  const setColor = jest.fn((newColor: Color) => null);
  const { getByLabelText, getByText } = render(
    <EditEmployeeInfo
      name={"Joe"}
      color={new Color("Red")}
      maxHours={40}
      minHours={0}
      availableColors={[new Color("Red"), new Color("Blue")]}
      setEmployeeName={() => null}
      setEmployeeColor={setColor}
      setEmployeeMaxHours={() => null}
      setEmployeeMinHours={() => null}
      validName={true}
      validHours={true}
    />
  );

  // Act
  await user.click(getByLabelText(/Employee Color/i));
  await user.click(getByText(/Random/i));

  // Assert
  expect(setColor.mock.calls.length).toEqual(1);
});
