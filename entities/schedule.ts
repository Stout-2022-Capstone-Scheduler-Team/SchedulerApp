import { Employee, Shift } from "./types";

export class Schedule {
  private staff: Employee[] = [];
  private shifts: Shift[] = [];
  private assignedShifts: Shift[] = [];
  private minHoursWorked: number;
  private maxHoursWorked: number;

  /**
   *
   * @param minHours Minimum man hours for this week
   * @param maxHours Maximum man hours for this week
   */
  constructor(minHours = 0, maxHours = 400) {
    this.minHoursWorked = minHours;
    this.maxHoursWorked = maxHours;
  }

  /**
   * Add a shift that needs to be filled to the schedule
   * @param newShift New shift to add
   */
  addShift(newShift: Shift) {
    this.shifts.concat(newShift);
  }

  /**
   * Get this schedule's shifts that must be filled
   * @returns This schedule's (unassigned) shifts
   */
  getShifts() {
    return this.shifts;
  }

  /**
   * Add an employee to the schedule
   * @param newEmp Employee to add to the schedule
   */
  addEmployee(newEmp: Employee) {
    this.staff.concat(newEmp);
  }

  /**
   * Get all the employees that exist in the schedule
   * @returns Employees in the schedule
   */
  getEmployees() {
    return this.staff;
  }

  /**
   * Set the schedule's assigned shifts
   * @param shifts set of assigned shifts (obtained from IScheduleAlgorithm)
   */
  setAssignedShifts(shifts: Shift[]) {
    this.assignedShifts.slice(0);
    this.assignedShifts = shifts;
  }
}
