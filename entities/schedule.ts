import { Employee, Shift } from "./types";

export class Schedule {
  public readonly employees: Employee[] = [];
  public readonly shifts: Shift[] = [];
  public minHoursWorked: number;
  public maxHoursWorked: number;

  /**
   * Constructor
   * @param employees List of employees that are available to be assigned to shifts
   * @param shifts List of shifts that must be assigned
   * @param minHours Minimum man hours for this week
   * @param maxHours Maximum man hours for this week
   */
  constructor(
    employees: Employee[] = [],
    shifts: Shift[] = [],
    minHours = 0,
    maxHours = 400
  ) {
    // Map to a new employee object; this ensures the employee array has all the required logic
    this.employees = employees.map(
      (emp) => new Employee(emp.name, emp.min_hours, emp.max_hours, emp.color)
    );

    // Map to a new shift object, this ensures shifts keep their logic
    this.shifts = shifts.map(
      (shift) => new Shift(shift.name, shift.start, shift.end, shift.owner)
    );
    this.minHoursWorked = minHours;
    this.maxHoursWorked = maxHours;
  }

  /**
   * Add a shift that needs to be filled to the schedule
   * @param newShift New shift to add
   */
  addShift(newShift: Shift): void {
    this.shifts.push(newShift);
  }

  /**
   * Remove a given shift from the schedule
   * @param shiftToRemove Shift to remove
   * @returns shift that was removed
   */
  removeShift(shiftToRemove: Shift): Shift {
    const index = this.shifts.indexOf(shiftToRemove);
    return this.shifts.splice(index, 1)[0];
  }

  /**
   * Add an employee to the schedule
   * @param newEmp Employee to add to the schedule
   */
  addEmployee(newEmp: Employee): void {
    if (this.employees.some((emp) => emp.name === newEmp.name)) {
      throw new Error(
        `Unable to add employee with duplicate name ${newEmp.name}`
      );
    } else {
      this.employees.push(newEmp);
    }
  }

  /**
   * Remove a given employee from the schedule
   * @param empToRemove Employee to remove from the schedule
   * @returns the employee removed from the schedule
   */
  removeEmployee(empToRemove: Employee): Employee {
    const index = this.employees.indexOf(empToRemove);
    return this.employees.splice(index, 1)[0];
  }
}
