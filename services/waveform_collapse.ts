import { Shift, Employee } from "../entities/types";

// I believe this has the same size as `boolean`, since JS uses dynamic
// types and both number and boolean are less than the min size
type Assignment = number | boolean;

function matrixCounts(matrix: Assignment[][]): number[] {
  return matrix.map((s) => s.filter((cur) => cur === true).length);
}

function arrMin(arr: number[]): number {
  let min = Infinity;
  let idx = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min && arr[i] > 0) {
      min = arr[i];
      idx = i;
    }
  }
  return idx;
}

/**
 * Generate a valid schedule if possible. Returns whether a schedule was successfully generated
 *
 * This algorithm runs in O(N*M) where N and M are the number of employees and shifts.
 * It now also backtracks, which greatly increases it's worst case time, but only marginally increases it's
 * average time, since we use hueristics to try more likely options first
 *
 * */
export function generate(shifts: Shift[], staff: Employee[]): boolean {
  // Clear current hours and busy
  staff.forEach((employee) => {
    employee.current_hours = 0;
    employee.combineAvailable();
  });
  // Generate matrix & clear owners
  let matrix: Assignment[][] = [];
  shifts.forEach((shift) => {
    shift.owner = "";
    shift.option = 0;
    shift.assigned = 0;
    shift.first_try = undefined;
    const row: boolean[] = [];
    staff.forEach((employee) => {
      row.push(employee.isAvailable(shift));
    });
    matrix.push(row);
  });
  // Either the function return false or assign a shift each loop
  let assigned = 0;
  while (assigned < shifts.length) {
    const counts = matrixCounts(matrix);
    // We could choose to always select by shift
    const idxShift = arrMin(counts);
    // Since we are selecting the shift or employee with the least possible assignments, it should
    // reduce the likelihood we run into a conflict
    if (
      idxShift !== -1 &&
      assignShift(shifts, staff, idxShift, matrix, assigned)
    ) {
      // Mark order assigned in
      if (!canAssignMinHours(shifts, staff, matrix)) {
        matrix = unassign(shifts, staff, assigned, matrix);
        // assigned -= 1
      } else {
        assigned += 1;
      }
    } else if (assigned <= -1) {
      // Backtracking has failed (we've backtracked to the beginning)
      // Reset each shift to the first try we made, which will be a partially valid schedule
      shifts.forEach((shift) => {
        if (shift.first_try !== undefined) {
          shift.owner = shift.first_try;
        }
      });
      return false;
    } else {
      // No shift can be assigned to an employee, but not every shift has an owner yet
      // backtrack by unassigning a shift
      assigned -= 1;
      matrix = unassign(shifts, staff, assigned, matrix);
    }
  }
  return true;
}

function assignShift(
  shifts: Shift[],
  staff: Employee[],
  idxShift: number,
  matrix: Assignment[][],
  assigned: number
): boolean {
  const curShift = shifts[idxShift];
  // Find employees that can take the shift
  const options = staff
    .map((e, i) => ({ e, i }))
    .filter(
      (employee, i) =>
        matrix[idxShift][i] === true &&
        employee.e.canTakeHours(curShift.duration)
    )
    .sort((a, b) => a.e.score(curShift) - b.e.score(curShift));

  if (curShift.option < options.length) {
    const { i, e } = options[curShift.option];
    curShift.option += 1;
    e.current_hours += curShift.duration;
    curShift.owner = e.name;
    if (curShift.first_try === undefined) {
      curShift.first_try = e.name;
    }
    curShift.assigned = assigned;
    // Update matrix to note that the shift cannot be assigned to anyone else
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[idxShift][j] === true) {
        matrix[idxShift][j] = assigned;
      }
    }
    // Update matrix to note employee cannot be scheduled for an overlapping shift
    for (let j = 0; j < matrix.length; j++) {
      if (curShift.overlaps(shifts[j]) || !e.canTakeHours(shifts[j].duration)) {
        if (matrix[j][i] === true) {
          matrix[j][i] = assigned;
        }
      }
    }
    return true;
  }
  return false;
}

function unassign(
  shifts: Shift[],
  staff: Employee[],
  n: number,
  matrix: Assignment[][]
): Assignment[][] {
  for (let i = 0; i < shifts.length; i++) {
    if (shifts[i].assigned === n) {
      const emp = getEmployee(staff, shifts[i].owner);
      if (emp !== undefined) {
        emp.current_hours -= shifts[i].duration;
      }
      // Remove owner
      shifts[i].owner = "";
    } else if (shifts[i].assigned > n) {
      // Reset option for any shift that was assigned after the current one
      shifts[i].option = 0;
    }
  }
  // update matrix with new availablities
  return matrix.map((s) =>
    s.map((a) => {
      if (typeof a === "number" && a >= n) {
        a = true;
      }
      return a;
    })
  );
}

function canAssignMinHours(
  shifts: Shift[],
  staff: Employee[],
  matrix: Assignment[][]
): boolean {
  for (let i = 0; i < staff.length; i++) {
    let remaining = 0;
    for (let j = 0; j < shifts.length; j++) {
      if (matrix[j][i] === true) {
        remaining += shifts[j].duration;
      }
    }
    if (remaining < staff[i].remainingHours) {
      return false;
    }
  }
  return true;
}

export function getEmployee(
  staff: Employee[],
  name: string
): Employee | undefined {
  for (let i = 0; i < staff.length; i++) {
    if (staff[i].name === name) {
      return staff[i];
    }
  }
  return undefined;
}
