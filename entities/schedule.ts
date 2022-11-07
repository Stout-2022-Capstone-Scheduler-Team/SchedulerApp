import { Employee, Shift } from "./types";

export class Schedule {
  private _staff: Employee[] = [];
  private _shifts: Shift[] = [];
  private _assignedShifts: Shift[] = [];
  private _minHoursWorked: number;
  private _maxHoursWorked: number;

  /**
   *
   * @param minHours Minimum man hours for this week
   * @param maxHours Maximum man hours for this week
   */
  constructor(minHours = 0, maxHours = 400) {
    this._minHoursWorked = minHours;
    this._maxHoursWorked = maxHours;
  }

  public get minHoursWorked() {
    return this._minHoursWorked;
  }

  public set minHoursWorked(newValue) {
    this._minHoursWorked = newValue;
  }

  public get maxHoursWorked() {
    return this._maxHoursWorked;
  }

  public set maxHoursWorked(newValue) {
    this._maxHoursWorked = newValue;
  }

  /**
   * Add a shift that needs to be filled to the schedule
   * @param newShift New shift to add
   */
  addShift(newShift: Shift) {
    this._shifts.concat(newShift);
  }

  /**
   * Remove a given shift from the schedule
   * @param shiftToRemove Shift to remove
   * @returns shift that was removed
   */
  removeShift(shiftToRemove: Shift) {
    let index = this._shifts.indexOf(shiftToRemove);
    return this._shifts.splice(index, 1);
  }

  /**
   * Get this schedule's shifts that must be filled
   * @returns This schedule's (unassigned) shifts
   */
  public get shifts() {
    return this._shifts;
  }

  /**
   * Add an employee to the schedule
   * @param newEmp Employee to add to the schedule
   */
  addEmployee(newEmp: Employee) {
    this._staff.concat(newEmp);
  }

  /**
   * Remove a given employee from the schedule
   * @param empToRemove Employee to remove from the schedule
   * @returns the employee removed from the schedule
   */
  removeEmployee(empToRemove: Employee) {
    let index = this._staff.indexOf(empToRemove);
    return this._staff.splice(index, 1);
  }

  /**
   * Get all the employees that exist in the schedule
   * @returns Employees in the schedule
   */
  public get employees() {
    return this._staff;
  }

  /**
   * Set the schedule's assigned shifts
   * @param shifts set of assigned shifts (obtained from IScheduleAlgorithm)
   */
  public set assignedShifts(shifts: Shift[]) {
    this._assignedShifts.slice(0);
    this._assignedShifts = shifts;
  }

  /**
   * Get this schedule's assigned shifts
   * @returns This schedule's assigned shifts
   */
  public get assignedShifts() {
    return this._assignedShifts;
  }
}
