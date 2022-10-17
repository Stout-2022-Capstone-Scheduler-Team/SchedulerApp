import { Shift, Employee, compareDaytimes } from './types'

interface MatrixCount {
  employee: number[]
  shift: number[]
}

function matrixCounts(matrix: boolean[][]): MatrixCount {
  const ret: MatrixCount = {
    shift: [],
    employee: [],
  }
  for (let s = 0; s < matrix.length; s++) {
    let count = 0
    for (let i = 0; i < matrix[0].length; i++) {
      if (matrix[s][i]) {
        count += 1
      }
    }
    ret.shift.push(count)
  }
  for (let s = 0; s < matrix[0].length; s++) {
    let count = 0
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][s]) {
        count += 1
      }
    }
    ret.employee.push(count)
  }
  return ret
}

function arrMin(arr: number[]): [number, number] {
  let min = Infinity
  let idx = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min && arr[i] > 0) {
      min = arr[i]
      idx = i
    }
  }
  return [idx, min]
}

export class WaveformCollapseAlgorithm {
  schedule: Shift[]
  staff: Employee[]
  constructor(schedule: Shift[], staff: Employee[]) {
    this.schedule = schedule
    this.staff = staff
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
      employee.current_hours = 0
      employee.busy = []
    })
    // Generate matrix & clear owners
    const matrix: boolean[][] = []
    this.schedule.forEach((shift) => {
      shift.owner = ''
      const staff: boolean[] = []
      this.staff.forEach((employee) => {
        staff.push(employee.isAvailable(shift))
      })
      matrix.push(staff)
    })
    //Either the function return false or assign a shift each loop
    for(let i=0;i<this.schedule.length;i++) {
      const counts = matrixCounts(matrix)
      // We could choose to always select by shift
      const [idxShift, minShift] = arrMin(counts.shift)
      if (idxShift === -1) {
        // No shift can be assigned to an employee, but not every shift has an owner yet
        return false
      }
      const [idxEmployee, minEmployee] = arrMin(counts.employee)
      if (idxEmployee === -1) {
        throw new Error(
          'This should be impossible since then the idxShift should have been -1'
        )
      }
      // Since we are selecting the shift or employee with the least possible assignments, it should
      // reduce the likelihood we run into a conflict
      if (minShift < minEmployee) {
        if (!this.assignShift(idxShift, matrix)) {
          throw new Error(
            'This should be impossible since then the idxShift should have been -1'
          )
          // return false
        }
      } else {
        if (!this.assignEmployee(idxEmployee, matrix)) {
          throw new Error(
            'This should be impossible since then the idxShift should have been -1'
          )
          // return false
        }
      }
    }
    return true;
  }

  assignShift(idxShift: number, matrix: boolean[][]): boolean {
    let cur_shift = this.schedule[idxShift]
    // Find employees that can take the shift
    let best: undefined | number = undefined
    let score: undefined | number = undefined
    for (let i = 0; i < matrix[0].length; i++) {
      if (
        matrix[idxShift][i] &&
        this.staff[i].canTakeHours(cur_shift.duration)
      ) {
        let cur = this.staff[i].score(cur_shift)
        if (score === undefined || cur < score) {
          score = cur
          best = i
        }
      }
    }
    if (best !== undefined) {
      this.staff[best].gainHours(cur_shift.duration)
      this.schedule[idxShift].owner = this.staff[best].name
      // Update matrix to note that the shift cannot be assigned to anyone else
      for (let j = 0; j < matrix[0].length; j++) {
        matrix[idxShift][j] = false
      }
      // Update matrix to note employee cannot be scheduled for an overlapping shift
      for (let j = 0; j < matrix.length; j++) {
        if (
          cur_shift.overlaps(this.schedule[j]) ||
          !this.staff[best].canTakeHours(this.schedule[j].duration)
        ) {
          matrix[j][best] = false
        }
      }
      return true
    }
    return false
  }

  assignEmployee(idxEmployee: number, matrix: boolean[][]): boolean {
    let cur_employee = this.staff[idxEmployee]
    // Find shift that the employee can take
    let best: undefined | number = undefined
    let score: undefined | number = undefined
    for (let i = 0; i < matrix.length; i++) {
      if (
        matrix[i][idxEmployee] &&
        cur_employee.canTakeHours(this.schedule[i].duration)
      ) {
        let cur = cur_employee.score(this.schedule[i])
        if (score === undefined || cur < score) {
          score = cur
          best = i
        }
      }
    }
    if (best !== undefined) {
      this.schedule[best].owner = cur_employee.name
      // Update matrix to note that the shift cannot be assigned to anyone else
      for (let j = 0; j < matrix[0].length; j++) {
        matrix[best][j] = false
      }
      // Update matrix to note employee cannot be scheduled for an overlapping shift
      for (let j = 0; j < matrix.length; j++) {
        if (
          this.schedule[best].overlaps(this.schedule[j]) ||
          !cur_employee.canTakeHours(this.schedule[j].duration)
        ) {
          matrix[j][idxEmployee] = false
        }
      }
      return true
    }
    return false
  }

  getSchedule(): Shift[] {
    return this.schedule
  }

  getSortedSchedule(): Shift[] {
    this.schedule.sort((a, b) =>
      compareDaytimes(a.day, a.start, b.day, b.start)
    )
    return this.schedule
  }
}
