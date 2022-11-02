import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import React from "react";
import { ExportModal, ExportType } from "../../components";

import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG
} from "react-component-export-image";
jest.mock("react-component-export-image");
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

test("Export Functionality", async () => {
  const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
  render(<ExportModal componentToExport={exportRef} />);

  fireEvent.click(screen.getByText(/Export/i));
  {
    let mocked = jest.mocked(exportComponentAsPNG);
    mocked.mockResolvedValueOnce(() => {});
    // This needs something else to specify, since the text is the same
    fireEvent.click(screen.getByTestId("export_button"));

    await waitFor(() => expect(mocked.mock.calls.length).toBe(1));
    expect(mocked.mock.calls[0][0]).toBe(exportRef);
  }

  // TODO: Updating a MuiSelect element in a test is a challenge
  // const select = screen.getByTestId("file-type-select");
  // const input = select.getElementsByTagName("input").item(0);
  // if (input !== null) {
  //   input.value = ExportType.jpeg;
  // }
  //
  // {
  //   let mocked = jest.mocked(exportComponentAsJPEG);
  //   mocked.mockResolvedValueOnce(() => {});
  //   fireEvent.click(screen.getByTestId("export_button"));
  //
  //   await waitFor(() => expect(mocked.mock.calls.length).toBe(1));
  //   expect(mocked.mock.calls[0][0]).toBe(exportRef);
  // }
  //
  // if (input !== null) {
  //   input.value = ExportType.pdf;
  // }
  //
  // {
  //   let mocked = jest.mocked(exportComponentAsPDF);
  //   mocked.mockResolvedValueOnce(() => {});
  //   fireEvent.click(screen.getByTestId("export_button"));
  //
  //   await waitFor(() => expect(mocked.mock.calls.length).toBe(1));
  //   expect(mocked.mock.calls[0][0]).toBe(exportRef);
  // }
});
