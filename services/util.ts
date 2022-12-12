import { useEffect, useRef } from "react";

export async function sleepTask(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function or<T>(a: T | undefined, b: T): T {
  if (a !== undefined) {
    return a;
  } else {
    return b;
  }
}

const DEBUG_LOG = false;

export function log(message?: any, ...more: any[]): void {
  // Ignore debug logging for code coverage
  // istanbul ignore next
  if (DEBUG_LOG) {
    console.log(message, ...more);
  }
}

export function useDidUpdateEffect(fn: () => any, inputs: any[]): void {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
}
