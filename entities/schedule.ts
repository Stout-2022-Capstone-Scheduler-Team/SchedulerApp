import { Color } from "./color";
import { Employee, Shift, Time } from "./types";
import dayjs, { Dayjs } from "dayjs";

export class Schedule {
  public readonly employees: Employee[] = [];
  public readonly shifts: Shift[] = [];
  public minHoursWorked: number;
  public maxHoursWorked: number;
  public name: string;
  public weekDate: Dayjs;
  public errors?: string;

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
    this.employees = employees;
    this.shifts = shifts;
    this.minHoursWorked = minHours;
    this.maxHoursWorked = maxHours;
    this.weekDate = dayjs().startOf("week");
    this.name = new Date().toLocaleString();
  }

  /**
   * Add a shift that needs to be filled to the schedule
   * @param newShift New shift to add
   */
  addShift(newShift: Shift): void {
    // Check the id of the new shift against the existing ones
    if (
      newShift.id === undefined ||
      newShift.id === -1 ||
      !this.shifts.some((shift) => shift.id === newShift.id)
    ) {
      // If the newShift's id does not match an existing id, assign it one and add the shift to the existing shifts
      let newId = 0;

      // Find a new valid ID, cap at 10,000 iterations
      while (this.shifts.some((shift) => shift.id === newId)) {
        newId++;
        if (newId >= 10000) break;
      }

      // Set the new Id and add shift
      newShift.id = newId;
    } else {
      // Find the shift that matches the id and remove it
      const shiftIndex = this.shifts.findIndex(
        (shift) => shift.id === newShift.id
      );
      this.shifts.splice(shiftIndex, 1);
    }

    // Add the new shift
    this.shifts.push(newShift);
  }

  /**
   * Remove a given shift from the schedule
   * @param shiftToRemove Shift to remove
   * @returns shift that was removed
   */
  removeShift(shiftToRemove: Shift): Shift {
    const index = this.shifts.findIndex(
      (shift) => shift.id === shiftToRemove.id
    );
    return this.shifts.splice(index, 1)[0];
  }

  /**
   * Add an employee to the schedule
   * @param newEmp Employee to add to the schedule
   * @param index Index to add employee at

   */
  addEmployee(newEmp: Employee, index?: number): void {
    if (this.employees.some((emp) => emp.name === newEmp.name)) {
      throw new Error(
        `Unable to add employee with duplicate name ${newEmp.name}`
      );
    } else if (index !== undefined) {
      this.employees.splice(index, 0, newEmp);
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
    const index = this.employees.findIndex((e) => e.name === empToRemove.name);
    return this.employees.splice(index, 1)[0];
  }

  /**
   * Create a deep copy of a schedule, which is safe to mutate and include all subtype logic as well
   * @param baseSchedule Base schedule to copy
   * @returns A deep copy of the input schedule
   */
  public static createDeepCopy(baseSchedule: Schedule): Schedule {
    const scheduleCopyBase: Schedule = JSON.parse(JSON.stringify(baseSchedule));
    const scheduleCopy = new Schedule(
      // Map to a new employee object; this ensures the employee array has all the required logic after being serialized
      scheduleCopyBase.employees.map(
        (emp) =>
          new Employee(
            emp.name,
            emp.min_hours,
            emp.max_hours,
            new Color(emp.color.colorName),
            emp.available.map(
              (shift) =>
                new Shift(
                  shift.name,
                  new Time(shift.start.dayHours, shift.start.day),
                  new Time(shift.end.dayHours, shift.end.day),
                  shift.id,
                  shift.owner
                )
            )
          )
      ),
      // Map to a new shift object, this ensures shifts keep their logic after being serialized
      scheduleCopyBase.shifts.map(
        (shift) =>
          new Shift(
            shift.name,
            new Time(shift.start.dayHours, shift.start.day),
            new Time(shift.end.dayHours, shift.end.day),
            shift.id,
            shift.owner
          )
      ),
      scheduleCopyBase.minHoursWorked,
      scheduleCopyBase.maxHoursWorked
    );
    scheduleCopy.name = baseSchedule.name;

    return scheduleCopy;
  }
}
