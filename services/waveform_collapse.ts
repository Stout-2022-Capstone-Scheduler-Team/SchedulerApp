import { Shift, Employee, compareDaytimes } from "../entities/types";

interface MatrixCount {
  employee: number[]
  shift: number[]
}

function matrixCounts(matrix: boolean[][]): MatrixCount {
  const ret: MatrixCount = {
    shift: [],
    employee: []
  };
  for (let s = 0; s < matrix.length; s++) {
    let count = 0;
    for (let i = 0; i < matrix[0].length; i++) {
      if (matrix[s][i]) {
        count += 1;
      }
    }
    ret.shift.push(count);
  }
  for (let s = 0; s < matrix[0].length; s++) {
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][s]) {
        count += 1;
      }
    }
    ret.employee.push(count);
  }
  return ret;
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

export class WaveformCollapseAlgorithm {
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
    const matrix: boolean[][] = [];
    this.schedule.forEach((shift) => {
      shift.owner = "";
      const staff: boolean[] = [];
      this.staff.forEach((employee) => {
        staff.push(employee.isAvailable(shift));
      });
      matrix.push(staff);
    });
    // Either the function return false or assign a shift each loop
    for (let i = 0; i < this.schedule.length; i++) {
      const counts = matrixCounts(matrix);
      // We could choose to always select by shift
      const idxShift = arrMin(counts.shift);
      if (idxShift === -1) {
        // No shift can be assigned to an employee, but not every shift has an owner yet
        return false;
      }
      // const [idxEmployee, minEmployee] = arrMin(counts.employee)
      // if (idxEmployee === -1) {
      //   /* istanbul ignore next */
      //   throw new Error(
      //     'This should be impossible since then the idxShift should have been -1'
      //   )
      // }
      // Since we are selecting the shift or employee with the least possible assignments, it should
      // reduce the likelihood we run into a conflict
      if (!this.assignShift(idxShift, matrix)) {
        /* istanbul ignore next */
        throw new Error(
          "This should be impossible since then the idxShift should have been -1"
        );
      }
    }
    return true;
  }

  assignShift(idxShift: number, matrix: boolean[][]): boolean {
    const curShift = this.schedule[idxShift];
    // Find employees that can take the shift
    let best: undefined | number;
    let score: undefined | number;
    for (let i = 0; i < matrix[0].length; i++) {
      if (
        matrix[idxShift][i] &&
        this.staff[i].canTakeHours(curShift.duration)
      ) {
        const cur = this.staff[i].score(curShift);
        if (score === undefined || cur < score) {
          score = cur;
          best = i;
        }
      }
    }
    if (best !== undefined) {
      this.staff[best].current_hours += curShift.duration;
      this.schedule[idxShift].owner = this.staff[best].name;
      // Update matrix to note that the shift cannot be assigned to anyone else
      for (let j = 0; j < matrix[0].length; j++) {
        matrix[idxShift][j] = false;
      }
      // Update matrix to note employee cannot be scheduled for an overlapping shift
      for (let j = 0; j < matrix.length; j++) {
        if (
          curShift.overlaps(this.schedule[j]) ||
          !this.staff[best].canTakeHours(this.schedule[j].duration)
        ) {
          matrix[j][best] = false;
        }
      }
      return true;
    }
    /* istanbul ignore next */
    throw new Error(
      "This should be impossible since then the idxShift should have been -1"
    );
  }

  // assignEmployee(idxEmployee: number, matrix: boolean[][]): boolean {
  //   const curEmployee = this.staff[idxEmployee]
  //   // Find shift that the employee can take
  //   let best: undefined | number
  //   let score: undefined | number
  //   for (let i = 0; i < matrix.length; i++) {
  //     if (
  //       matrix[i][idxEmployee] &&
  //       curEmployee.canTakeHours(this.schedule[i].duration)
  //     ) {
  //       const cur = curEmployee.score(this.schedule[i])
  //       if (score === undefined || cur < score) {
  //         score = cur
  //         best = i
  //       }
  //     }
  //   }
  //   if (best !== undefined) {
  //     this.schedule[best].owner = curEmployee.name
  //     // Update matrix to note that the shift cannot be assigned to anyone else
  //     for (let j = 0; j < matrix[0].length; j++) {
  //       matrix[best][j] = false
  //     }
  //     // Update matrix to note employee cannot be scheduled for an overlapping shift
  //     for (let j = 0; j < matrix.length; j++) {
  //       if (
  //         this.schedule[best].overlaps(this.schedule[j]) ||
  //         !curEmployee.canTakeHours(this.schedule[j].duration)
  //       ) {
  //         matrix[j][idxEmployee] = false
  //       }
  //     }
  //     return true
  //   }
  //   /* istanbul ignore next */
  //   throw new Error(
  //     'This should be impossible since then the idxShift should have been -1'
  //   )
  // }

  getSchedule(): Shift[] {
    return this.schedule;
  }

  getSortedSchedule(): Shift[] {
    this.schedule.sort((a, b) =>
      compareDaytimes(a.day, a.start, b.day, b.start)
    );
    return this.schedule;
  }
}
