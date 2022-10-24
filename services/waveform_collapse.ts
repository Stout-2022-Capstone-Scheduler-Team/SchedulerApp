import { Shift, Employee, compareDaytimes } from "../entities/types";
import { Scheduler } from "../interfaces/scheduler";

// I believe this has the same size as `boolean`, since JS uses dynamic
// types and both number and boolean are less than the min size
type Assignment = number | boolean;

function matrixCounts(matrix: Assignment[][]): number[] {
  return matrix.map((s) => s.filter((cur) => cur === true).length);
  // const ret: number[] = []
  // for (let s = 0; s < matrix.length; s++) {
  //   let count = 0
  //   for (let i = 0; i < matrix[0].length; i++) {
  //     if (matrix[s][i]) {
  //       count += 1
  //     }
  //   }
  //   ret.push(count)
  // }
  // return ret
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

export class WaveformCollapseAlgorithm implements Scheduler {
  schedule: Shift[];
  staff: Employee[];
  constructor(schedule: Shift[], staff: Employee[]) {
    this.schedule = schedule;
    this.staff = staff;
  }

  /**
   * Generate a valid schedule if possible. Returns whether a schedule was successfully generated
   *
   * This algorithm runs in O(N*M) where N and M are the number of employees and shifts.
   * Right now, it only makes one attempt to assign shifts.
   *
   * */
  generate(): boolean {
    // Clear current hours and busy
    this.staff.forEach((employee) => {
      employee.current_hours = 0;
    });
    // Generate matrix & clear owners
    let matrix: Assignment[][] = [];
    this.schedule.forEach((shift) => {
      shift.owner = "";
      shift.option = 0;
      shift.assigned = 0;
      shift.first_try = undefined;
      const staff: boolean[] = [];
      this.staff.forEach((employee) => {
        staff.push(employee.isAvailable(shift));
      });
      matrix.push(staff);
    });
    // Either the function return false or assign a shift each loop
    let assigned = 0;
    while (assigned < this.schedule.length) {
      const counts = matrixCounts(matrix);
      // We could choose to always select by shift
      const idxShift = arrMin(counts);
      console.log("Assigning: ", idxShift);
      // Since we are selecting the shift or employee with the least possible assignments, it should
      // reduce the likelihood we run into a conflict
      if (idxShift !== -1 && this.assignShift(idxShift, matrix, assigned)) {
        // Mark order assigned in
        console.log("to: ", this.schedule[idxShift].owner);
        if (!this.canAssignMinHours(matrix)) {
          matrix = this.unassign(assigned, matrix);
          // assigned -= 1
        } else {
          assigned += 1;
        }
      } else if (assigned <= -1) {
        // Backtracking has failed (we've backtracked to the beginning)
        // Reset each shift to the first try we made, which will be a partially valid schedule
        this.schedule.forEach((shift) => {
          if (shift.first_try !== undefined) {
            shift.owner = shift.first_try;
          }
        });
        return false;
      } else {
        // No shift can be assigned to an employee, but not every shift has an owner yet
        // backtrack by unassigning a shift
        assigned -= 1;
        matrix = this.unassign(assigned, matrix);
      }
    }
    return true;
  }

  assignShift(
    idxShift: number,
    matrix: Assignment[][],
    assigned: number
  ): boolean {
    const curShift = this.schedule[idxShift];
    // Find employees that can take the shift
    const options = this.staff
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
        if (
          curShift.overlaps(this.schedule[j]) ||
          !e.canTakeHours(this.schedule[j].duration)
        ) {
          if (matrix[j][i] === true) {
            matrix[j][i] = assigned;
          }
        }
      }
      return true;
    }
    return false;
  }

  unassign(n: number, matrix: Assignment[][]): Assignment[][] {
    for (let i = 0; i < this.schedule.length; i++) {
      if (this.schedule[i].assigned === n) {
        const emp = this.getEmployee(this.schedule[i].owner);
        if (emp !== undefined) {
          emp.current_hours -= this.schedule[i].duration;
        }
        // Remove owner
        this.schedule[i].owner = "";
      } else if (this.schedule[i].assigned > n) {
        // Reset option for any shift that was assigned after the current one
        this.schedule[i].option = 0;
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

  canAssignMinHours(matrix: Assignment[][]): boolean {
    for (let i = 0; i < this.staff.length; i++) {
      let remaining = 0;
      for (let j = 0; j < this.schedule.length; j++) {
        if (matrix[j][i] === true) {
          remaining += this.schedule[j].duration;
        }
      }
      if (remaining < this.staff[i].remainingHours) {
        return false;
      }
    }
    return true;
  }

  getEmployee(name: string): Employee | undefined {
    return this.staff.find((e) => e.name === name);
  }

  getSortedSchedule(): Shift[] {
    this.schedule.sort((a, b) =>
      compareDaytimes(a.day, a.start, b.day, b.start)
    );
    return this.schedule;
  }
}
