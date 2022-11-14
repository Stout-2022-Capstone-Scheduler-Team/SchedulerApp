import { render } from "@testing-library/react";
import { AvailabilityEditor } from "../../../components";

test("Can Render", () => {
  const editor = render(<AvailabilityEditor day={0} />);
  expect(editor).toMatchSnapshot();
});
