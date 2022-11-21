import { render } from "@testing-library/react";
import { AvailabilityEditor } from "../../../components";

test("Can Render", () => {
  const editor = render(
    <AvailabilityEditor
      day={0}
      currentAvailability={[]}
      addAvailability={() => null}
      removeAvailability={() => null}
    />
  );
  expect(editor).toMatchSnapshot();
});
