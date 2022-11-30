import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImportModal } from "../../../components/import/ImportModal";

import React from "react";

// jest.mock("");
beforeEach(() => {
  jest.resetAllMocks();
});
test("Button is Disabled", async () => {
  const dom = render(<ImportModal />);

  expect(dom.baseElement).toMatchSnapshot();

  expect(screen.getByText(/Import Schedule/i)).toBeDisabled();
});

test("Import Modal", async () => {
  const user = userEvent.setup();
  const dom = render(<ImportModal />);

  expect(dom.baseElement).toMatchSnapshot();

  await user.click(screen.getByText(/Import Schedule/i));

  {
    const header = screen.queryByText(/Import Schedule/i);
    expect(header).toBeInTheDocument();

    const dropdown = screen.queryByLabelText(/Schedules/i);
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent("");

    expect(dom.baseElement).toMatchSnapshot();
  }

  await user.click(screen.getByText(/Cancel/i));

  expect(dom.baseElement).toMatchSnapshot();
});
