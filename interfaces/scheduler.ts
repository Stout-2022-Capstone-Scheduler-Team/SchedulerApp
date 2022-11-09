import { Shift, Employee } from "../entities/types";
interface Scheduler {
  schedule: Shift[];
  staff: Employee[];

  /**
   * Generate a valid schedule if possible. Returns whether a schedule was successfully generated
   *
   * Note that a partial schedule will still be generated even if this method returns false
   * */
  generate: () => boolean;

  /**
   * Get the current Schedule, sorted by the day & time each shift starts
   * */
  getSortedSchedule: () => Shift[];

  /**
   * Gets an employee by name
   * */
  getEmployee: (name: string) => Employee | undefined;
}

export default Scheduler;
