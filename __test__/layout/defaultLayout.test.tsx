import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import DefaultLayout from "../../components/Layout/DefaultLayout";

test("label links to home", () => {
  render(
    <DefaultLayout>
      <h1>hi</h1>
    </DefaultLayout>
  );
  const navBarTitle = screen.getByText(/Scheduler Builder/i);
  expect(navBarTitle).toBeInTheDocument();
});
