import { Employee, Shift } from "./types";

export class Schedule {
  private readonly _staff: Employee[] = [];
  private readonly _shifts: Shift[] = [];
  private _assignedShifts: Shift[] = [];
  private _minHoursWorked: number;
  private _maxHoursWorked: number;

  /**
   *
   * @param minHours Minimum man hours for this week
   * @param maxHours Maximum man hours for this week
   */
  constructor(
    staff: Employee[] = [],
    shifts: Shift[] = [],
    minHours = 0,
    maxHours = 400
  ) {
    this._staff = staff;
    this._shifts = shifts;
    this._assignedShifts = [];
    this._minHoursWorked = minHours;
    this._maxHoursWorked = maxHours;
  }

  public get minHoursWorked(): number {
    return this._minHoursWorked;
  }

  public set minHoursWorked(newValue: number) {
    this._minHoursWorked = newValue;
  }

  public get maxHoursWorked(): number {
    return this._maxHoursWorked;
  }

  public set maxHoursWorked(newValue: number) {
    this._maxHoursWorked = newValue;
  }

  /**
   * Add a shift that needs to be filled to the schedule
   * @param newShift New shift to add
   */
  addShift(newShift: Shift): void {
    this._shifts.concat(newShift);
  }

  /**
   * Remove a given shift from the schedule
   * @param shiftToRemove Shift to remove
   * @returns shift that was removed
   */
  removeShift(shiftToRemove: Shift): Shift {
    const index = this._shifts.indexOf(shiftToRemove);
    return this._shifts.splice(index, 1)[0];
  }

  /**
   * Get this schedule's shifts that must be filled
   * @returns This schedule's (unassigned) shifts
   */
  public get shifts(): Shift[] {
    return this._shifts;
  }

  /**
   * Add an employee to the schedule
   * @param newEmp Employee to add to the schedule
   */
  addEmployee(newEmp: Employee): void {
    this._staff.concat(newEmp);
  }

  /**
   * Remove a given employee from the schedule
   * @param empToRemove Employee to remove from the schedule
   * @returns the employee removed from the schedule
   */
  removeEmployee(empToRemove: Employee): Employee {
    const index = this._staff.indexOf(empToRemove);
    return this._staff.splice(index, 1)[0];
  }

  /**
   * Get all the employees that exist in the schedule
   * @returns Employees in the schedule
   */
  public get employees(): Employee[] {
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
  public get assignedShifts(): Shift[] {
    return this._assignedShifts;
  }
}
