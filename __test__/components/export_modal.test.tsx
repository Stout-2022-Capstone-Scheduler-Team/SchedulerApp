import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import { ExportModal, ExportType } from "../../components";
import { checkExportHide } from "./util";

import {
  exportComponentAsJPEG,
  exportComponentAsPNG
} from "react-component-export-image";
import NavBar from "../../components/layout/NavBar";
jest.mock("react-component-export-image");

beforeEach(() => {
  jest.resetAllMocks();
});

test("Export Modal", async () => {
  const user = userEvent.setup();
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  const dom = render(<ExportModal componentToExport={exportRef} />);

  {
    const header = screen.queryByText(/Export Schedule/i);
    expect(header).toBe(null);
    expect(dom.baseElement).toMatchSnapshot();
  }

  await user.click(screen.getByText(/Export/i));

  {
    const header = screen.queryByText(/Export Schedule/i);
    expect(header).toBeInTheDocument();

    const dropdown = screen.queryByLabelText(/File Type/i);
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent(ExportType.pdf); // Default value
    expect(dom.baseElement).toMatchSnapshot();
  }

  await user.click(screen.getByText(/Cancel/i));

  {
    const header = screen.queryByText(/Export Schedule/i);
    expect(header).toBe(null);
    expect(dom.baseElement).toMatchSnapshot();
  }
});

test("Export as PNG", async () => {
  const user = userEvent.setup();
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(<ExportModal componentToExport={exportRef} />);
  await user.click(screen.getByText(/Export/i));

  await user.click(screen.getByText(/PDF/i));
  await user.click(screen.getByText(/PNG/i));
  {
    const mocked = jest.mocked(exportComponentAsPNG);
    mocked.mockResolvedValueOnce(() => {});
    // This needs something else to specify, since the text is the same
    await user.click(screen.getByTestId("export_button"));

    expect(mocked.mock.calls.length).toBe(1);
    expect(mocked.mock.calls[0][0]).toBe(exportRef);
  }
});

test("Export as JPEG", async () => {
  const user = userEvent.setup();
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(<ExportModal componentToExport={exportRef} />);
  await user.click(screen.getByText(/Export/i));

  await user.click(screen.getByText(/PDF/i));
  await user.click(screen.getByText(/JPEG/i));

  {
    const mocked = jest.mocked(exportComponentAsJPEG);
    mocked.mockResolvedValueOnce(() => {});
    await user.click(screen.getByTestId("export_button"));

    expect(mocked.mock.calls.length).toBe(1);
    expect(mocked.mock.calls[0][0]).toBe(exportRef);
  }
});

test("Export as PDF", async () => {
  const user = userEvent.setup();
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(<ExportModal componentToExport={exportRef} />);
  await user.click(screen.getByText(/Export/i));

  {
    window.print = jest.fn();
    const mocked = jest.mocked(window.print);
    mocked.mockReturnValue(undefined);
    await user.click(screen.getByTestId("export_button"));

    expect(mocked.mock.calls.length).toBe(1);
  }
});

checkExportHide("Export Button Export", <></>, /Export/i);

checkExportHide("Navbar Export", <NavBar />, /Scheduler Builder/i);
