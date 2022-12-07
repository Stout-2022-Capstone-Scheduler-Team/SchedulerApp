import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ImportModal } from "../../../components/import/ImportModal";

import React from "react";
import { Schedule } from "../../../entities";
import localforage from "localforage";
import { createMockRouter } from "../../utils";

jest.mock("localforage");
beforeEach(() => {
  jest.resetAllMocks();
});

test("Button is Disabled", async () => {
  const dom = render(<ImportModal />);

  expect(dom.baseElement).toMatchSnapshot();

  expect(screen.getByText(/Import Schedule/i)).toBeDisabled();
});

test("Import Modal", async () => {
  const iterate = jest.mocked(localforage.iterate);
  // testing retrieving all of the items from the storage
  iterate.mockImplementationOnce(
    async (f: (value: Schedule, key: string, _: number) => void) => {
      f(new Schedule(), "item", 1);
      return await Promise.resolve(undefined);
    }
  );

  const user = userEvent.setup();
  const dom = render(<ImportModal />);

  expect(dom.baseElement).toMatchSnapshot();
  await waitFor(() =>
    expect(screen.getByText(/Import Schedule/i)).not.toBeDisabled()
  );

  await user.click(screen.getByText(/Import Schedule/i));

  {
    const dropdown = screen.getByLabelText(/Schedules/i);
    expect(dropdown).toBeInTheDocument();
    await user.click(dropdown);

    expect(dom.baseElement).toMatchSnapshot();

    await user.click(screen.getByText(/item/i));

    expect(dropdown).toHaveTextContent(/item/i);

    expect(dom.baseElement).toMatchSnapshot();
  }

  await user.click(screen.getByText(/Cancel/i));

  expect(dom.baseElement).toMatchSnapshot();
});

const router = createMockRouter({});

test("Import Modal Navigation", async () => {
  const iterate = jest.mocked(localforage.iterate);
  // testing retrieving all of the items from the storage
  iterate.mockImplementationOnce(
    async (f: (value: Schedule, key: string, _: number) => void) => {
      f(new Schedule(), "item", 1);
      return await Promise.resolve(undefined);
    }
  );

  const user = userEvent.setup();
  const dom = render(
    <RouterContext.Provider value={router}>
      <ImportModal />
    </RouterContext.Provider>
  );

  expect(dom.baseElement).toMatchSnapshot();
  await waitFor(() =>
    expect(screen.getByText(/Import Schedule/i)).not.toBeDisabled()
  );

  await user.click(screen.getByText(/Import Schedule/i));

  await user.click(screen.getByLabelText(/Schedules/i));

  await user.click(screen.getByText(/item/i));

  await user.click(screen.getByText(/^Import$/i));
  await waitFor(() =>
    expect(router.push).toHaveBeenCalledWith(
      "/edit-schedule#item",
      "/edit-schedule#item",
      {}
    )
  );

  // expect(dom.baseElement).toMatchSnapshot();
});
