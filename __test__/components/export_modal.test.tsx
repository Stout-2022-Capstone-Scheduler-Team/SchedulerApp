import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import React from "react";
import { ExportModal, ExportType } from "../../components";
import { checkExportHide } from "./util";

import {
  exportComponentAsJPEG,
  exportComponentAsPNG
} from "react-component-export-image";
import NavBar from "../../components/layout/NavBar";
jest.mock("react-component-export-image");
// jest.mock("window.print");

beforeEach(() => {
  jest.resetAllMocks();
});

test("Export Modal", async () => {
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  const dom = render(<ExportModal componentToExport={exportRef} />);

  {
    const header = screen.queryByText(/Export Schedule/i);
    expect(header).toBe(null);
    expect(dom.baseElement).toMatchSnapshot();
  }

  fireEvent.click(screen.getByText(/Export/i));

  {
    const header = screen.queryByText(/Export Schedule/i);
    expect(header).toBeInTheDocument();

    const dropdown = screen.queryByLabelText(/File Type/i);
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent(ExportType.png); // Default value
    expect(dom.baseElement).toMatchSnapshot();
  }

  fireEvent.click(screen.getByText(/Cancel/i));

  {
    const header = screen.queryByText(/Export Schedule/i);
    expect(header).toBe(null);
    expect(dom.baseElement).toMatchSnapshot();
  }
});

test("Export as PNG", async () => {
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(<ExportModal componentToExport={exportRef} />);

  fireEvent.click(screen.getByText(/Export/i));
  {
    const mocked = jest.mocked(exportComponentAsPNG);
    mocked.mockResolvedValueOnce(() => {});
    // This needs something else to specify, since the text is the same
    fireEvent.click(screen.getByTestId("export_button"));

    await waitFor(() => expect(mocked.mock.calls.length).toBe(1));
    expect(mocked.mock.calls[0][0]).toBe(exportRef);
  }
});

test("Export as JPEG", async () => {
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(
    <ExportModal componentToExport={exportRef} defaultValue={ExportType.jpeg} />
  );
  fireEvent.click(screen.getByText(/Export/i));
  {
    const mocked = jest.mocked(exportComponentAsJPEG);
    mocked.mockResolvedValueOnce(() => {});
    fireEvent.click(screen.getByTestId("export_button"));

    await waitFor(() => expect(mocked.mock.calls.length).toBe(1));
    expect(mocked.mock.calls[0][0]).toBe(exportRef);
  }
});

test("Export as PDF", async () => {
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(
    <ExportModal componentToExport={exportRef} defaultValue={ExportType.pdf} />
  );
  fireEvent.click(screen.getByText(/Export/i));
  {
    window.print = jest.fn();
    const mocked = jest.mocked(window.print);
    mocked.mockReturnValue(undefined);
    fireEvent.click(screen.getByTestId("export_button"));

    await waitFor(() => expect(mocked.mock.calls.length).toBe(1));
  }
});

checkExportHide("Export Button Export", <></>, /Export/i);

checkExportHide("Navbar Export", <NavBar />, /Scheduler Builder/i);
