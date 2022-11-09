import { expect } from "@jest/globals";
import type { MatcherFunction } from "expect";

import "@testing-library/jest-dom";
import { render, screen, fireEvent, Matcher } from "@testing-library/react";

import React from "react";
import { ExportModal, ExportType } from "../../components";

const toBeHidden: MatcherFunction<[]> = function toBeHidden(actual) {
  if (!(actual instanceof HTMLElement)) {
    throw new Error("actual must be an HTMLElement");
  }
  let current: HTMLElement | null = actual;
  while (current !== null) {
    if (current.style.display === "none") {
      return {
        message: () =>
          "Expected element or parent not to be hidden by `style.display = 'none'`",
        pass: true
      };
    }
    current = current.parentElement;
  }
  return {
    message: () =>
      "Expected element or parent to be hidden by `style.display = 'none'`",
    pass: false
  };
};
expect.extend({ toBeHidden });

declare module "expect" {
  interface AsymmetricMatchers {
    toBeHidden: () => void;
  }
  interface Matchers<R> {
    toBeHidden: () => R;
  }
}

export function checkExportHide(
  name: string,
  element: JSX.Element,
  selector: Matcher
): void {
  test(name, async() => {
    const exportRef: React.RefObject<React.ReactInstance> = React.createRef();
    // Need to add export modal to add printing events
    render(
      <>
        {element}
        <ExportModal
          componentToExport={exportRef}
          defaultValue={ExportType.pdf}
        />
        <div className="printed" data-testid="shown" />
      </>
    );
    expect(screen.getByText(selector)).not.toBeHidden();
    fireEvent(window, new Event("beforeprint"));
    expect(screen.getByText(selector)).toBeHidden();
    expect(screen.getByTestId("shown")).not.toBeHidden();
    fireEvent(window, new Event("afterprint"));
    expect(screen.getByText(selector)).not.toBeHidden();
  });
}
