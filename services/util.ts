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
