import { RenderResult, screen, waitFor } from "@testing-library/react";
import { NextRouter } from "next/router";
import { Color } from "../entities";
import { Time, Shift, DayOftheWeek, Employee } from "../entities/types";

export const Monday = DayOftheWeek.Monday;
export const Tuesday = DayOftheWeek.Tuesday;
export const Wednesday = DayOftheWeek.Wednesday;
export const Thursday = DayOftheWeek.Thursday;
export const Friday = DayOftheWeek.Friday;
export const Saturday = DayOftheWeek.Saturday;
export const Sunday = DayOftheWeek.Sunday;

export function shift(
  from: string,
  to: string,
  day: DayOftheWeek,
  day2?: DayOftheWeek,
  owner?: string
): Shift {
  if (day2 === undefined) {
    day2 = day;
  }
  const s = new Shift(
    "",
    Time.fromString(from, day),
    Time.fromString(to, day2)
  );
  if (owner !== undefined) {
    s.owner = owner;
  }
  return s;
}
export function allDay(day: DayOftheWeek): Shift {
  return new Shift(
    "",
    Time.fromString("00:00", day),
    Time.fromString("24:00", day)
  );
}

export function person(
  name: string,
  minHours: number,
  maxHours: number,
  available: Shift[],
  color: Color
): Employee {
  const ret = new Employee(name, minHours, maxHours, color);
  available.forEach((shift) => ret.addAvailable(shift));
  return ret;
}

export async function RippleComplete(render: RenderResult): Promise<void> {
  await waitFor(
    () => {
      expect(
        render.baseElement.getElementsByClassName("MuiTouchRipple-child").length
      ).toBe(0);
    },
    { timeout: 1000 }
  );
}

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router
  };
}
