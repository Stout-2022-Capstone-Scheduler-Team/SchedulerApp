import assert from 'assert'

/**
 * Represents a point in time
 */
export class Time {
  hours: number
  constructor (hours: number) {
    this.hours = hours
  }

  /**
   * Time.FromString("05:15") -> 5.25
   * */
  static FromString (s: string): Time {
    const hours = Number(s.substring(0, 2))
    assert(s.charAt(2) === ':')
    const minutes = Number(s.substring(3, 5))
    return new Time(hours + minutes / 60)
  }

  hoursTo (other: Time): number {
    return other.hours - this.hours
  }
}

/**
 * Represents a specific day of the week
 */
export enum DayOftheWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

/**
 * A Shift that can be assigned to an Employee
 */
export class Shift {
  name: string
  start: Time
  end: Time
  day: DayOftheWeek
  owner: string = ''

  constructor (name: string, start: Time, end: Time, day: DayOftheWeek) {
    this.name = name
    this.start = start
    this.end = end
    this.day = day
  }

  overlaps (other: Shift): boolean {
    if (this.day === other.day) {
      return this.start <= other.end && other.start <= this.end
    }
    return false
  }

  contains (other: Shift): boolean {
    if (this.day === other.day) {
      return this.start <= other.start && other.end <= this.end
    }
    return false
  }

  get duration (): number {
    return this.start.hoursTo(this.end)
  }
}

export class Employee {
  name: string
  min_hours: number
  max_hours: number
  current_hours: number = 0
  available: Shift[] = []
  busy: Shift[] = []
  constructor (name: string, minHours: number, maxHours: number) {
    assert(minHours <= maxHours)
    this.name = name
    this.min_hours = minHours
    this.max_hours = maxHours
    this.current_hours = 0
    this.busy = []
    this.available = []
  }

  notBusy (inputShift: Shift): boolean {
    for (let y = 0; y < this.busy.length; y++) {
      if (inputShift.overlaps(this.busy[y])) {
        return false
      }
    }
    return true
  }

  gainHours (input: number): boolean {
    if (this.current_hours + input <= this.max_hours) {
      this.current_hours += input
      return true
    }
    return false
  }
}

export class SchedulerService {
  schedule: Shift[]
  empty: Shift[]
  staff: Employee[]
  isValid: boolean
  constructor (schedule: Shift[], staff: Employee[]) {
    this.schedule = schedule
    this.staff = staff
    this.isValid = this.createValidSchedule()
    this.empty = []
  }

  reset (): void {
    for (let i = 0; i < this.staff.length; i++) {
      this.staff[i].busy = []
      this.staff[i].current_hours = 0
    }
    for (let i = 0; i < this.schedule.length; i++) {
      this.schedule[i].name = ''
    }
  }

  createValidSchedule (): boolean {
    for (let i = 0; i < 1000; i++) {
      if (this.generate()) {
        return true
      }
    }
    return false
  }

  generate (): boolean {
    for (let s = 0; s < this.schedule.length; s++) {
      if (s > 0) {
        // If it failed to assign a shift, it will return false
        if ((this.schedule[s - 1].name === '')) {
          return false
        }
        // It will find the Employee that was most recently assigned a shift and push it to the end
        for (let e = 0; e < this.staff.length; e++) {
          if (this.schedule[s - 1].name === this.staff[e].name) {
            this.staff.push(this.staff[e])
            this.staff.splice(e)
            break
          }
        }
        this.something(s)
      }
    }
    for (let i = 0; i < this.staff.length; i++) {
      if (this.staff[i].current_hours < this.staff[i].min_hours) {
        return false
      }
    }
    return true
  }

  something (s: number): void {
    for (let e = 0; e < this.staff.length; e++) {
      for (let a = 0; a < this.staff[e].available.length; a++) {
        // If the employee is available and isn't busy, then they gain the shift
        if (this.schedule[s].contains(this.staff[e].available[a]) && this.staff[e].gainHours(this.schedule[s].duration) && this.staff[e].notBusy(this.schedule[s])) {
          this.schedule[s].name = this.staff[e].name // Assign shift
          this.staff[e].busy.push(this.schedule[s]) // Add the shift to their busy
          return
        }
      }
    }
  }

  getSchedule (): Shift[] {
    if (this.isValid) {
      return this.schedule
    }
    return this.empty
  }
}

interface MatrixCount { employee: number[], shift: number[] }

function matrixCounts (matrix: boolean[][]): MatrixCount {
  const ret: MatrixCount = {
    shift: [],
    employee: []
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

function arrMin (arr: number[]): [number, number] {
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
  empty: Shift[]
  constructor (schedule: Shift[], staff: Employee[]) {
    this.schedule = schedule
    this.staff = staff
    this.empty = []
  }

  /**
   * Generate a valid schedule if possible. Returns whether a schedule was succesfully generated
   *
   * This algorithm runs in O(N*M) where N and M are the number of employees and shifts.
   * Right now, it doesn't respect employee's max & min hours, and only makes one attempt to
   * assign shifts.
   *
   * */
  generateSchedule (): boolean {
    // Generate matrix & clear owners
    const matrix: boolean[][] = []
    this.schedule.forEach(shift => {
      shift.owner = ''
      const staff: boolean[] = []
      this.staff.forEach(employee => {
        staff.push(employee.notBusy(shift))
      })
      matrix.push(staff)
    })

    while (true) {
      if (this.schedule.every(shift => shift.owner !== '')) {
        return true
      }
      const counts = matrixCounts(matrix)
      const [idxShift, minShift] = arrMin(counts.shift)
      if (idxShift === -1) {
        // No shift can be assigned to an employee, but not every shift has an owner yet
        return false
      }
      const [idxEmployee, minEmployee] = arrMin(counts.employee)
      if (idxEmployee === -1) {
        throw new Error('This should be impossible since then the idxShift should have been -1')
      }
      // Since we are selecting the shift or employee with the least possible assignments, it should
      // reduce the likelihood we run into a conflict
      if (minShift < minEmployee) {
        if (!this.assignShift(idxShift, matrix)) {
          return false
        }
      } else {
        if (!this.assignEmployee(idxEmployee, matrix)) {
          return false
        }
      }
    }
  }

  assignShift (idxShift: number, matrix: boolean[][]): boolean {
    // Find employee that can take the shift
    for (let i = 0; i < matrix[0].length; i++) {
      if (matrix[idxShift][i]) {
        this.schedule[idxShift].owner = this.staff[i].name
        // Update matrix to note that the shift cannot be assigned to anyone else
        for (let j = 0; j < matrix[0].length; j++) {
          matrix[idxShift][j] = false
        }
        // Update matrix to note employee cannot be scheduled for an overlapping shift
        for (let j = 0; j < matrix.length; j++) {
          if (this.schedule[idxShift].overlaps(this.schedule[j])) {
            matrix[j][i] = false
          }
        }
        return true
      }
    }
    return false
  }

  assignEmployee (idxEmployee: number, matrix: boolean[][]): boolean {
    // Find shift that the employee can take
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][idxEmployee]) {
        this.schedule[i].owner = this.staff[idxEmployee].name
        // Update matrix to note that the shift cannot be assigned to anyone else
        for (let j = 0; j < matrix[0].length; j++) {
          matrix[i][j] = false
        }
        // Update matrix to note employee cannot be scheduled for an overlapping shift
        for (let j = 0; j < matrix.length; j++) {
          if (this.schedule[i].overlaps(this.schedule[j])) {
            matrix[j][idxEmployee] = false
          }
        }
        return true
      }
    }
    return false
  }
}
