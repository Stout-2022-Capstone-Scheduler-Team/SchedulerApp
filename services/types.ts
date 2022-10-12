import assert from 'assert'

/**
 * Represents a point in time
 */
export class Time {
  hours: number
  constructor(hours: number) {
    this.hours = hours
  }
  /**
   * Time.FromString("05:15") -> 5.25
   * */
  static FromString(s: string): Time {
    return new Time(0)
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

  constructor(name: string, start: Time, end: Time, day: DayOftheWeek) {
    this.name = name
    this.start = start
    this.end = end
    this.day = day
  }

  overlaps(other: Shift): boolean {
    if (this.day == other.day) {
      return this.start <= other.end && other.start <= this.end
    }
    return false
  }

  contains(other: Shift): boolean{
    if (this.day == other.day) {
      return this.start <= other.start && other.end <= this.end
    }
    return false
  }
}

export class Employee {
  name: string
  min_hours: number
  max_hours: number
  current_hours: number
  available: Shift[]
  busy: Shift[]
  constructor(name: string, min_hours: number, max_hours: number) {
    assert(min_hours <= max_hours)
    this.name = name
    this.min_hours = min_hours
    this.max_hours = max_hours
    this.current_hours = 0
    this.busy = []
    this.available = []
  }

  notBusy(inputShift: Shift): boolean {
    for (let y = 0; y < this.busy.length; y++) {
      if (inputShift.overlaps(this.busy[y])) {
        return false
      }
    }
    return true
  }

  gainHours(input: number): boolean {
    if(this.current_hours + input <= this.max_hours){
      this.current_hours += input
      return true
    }
    return false;
  }
}

export class SchedulerService {
  schedule: Shift[]
  empty: Shift[]
  staff: Employee[]
  isValid: boolean
  constructor(schedule: Shift[], staff: Employee[]) {
    this.schedule = schedule
    this.staff = staff
    this.isValid = this.createValidSchedule()
    this.empty = [];
  }

  reset() {
    for (let i = 0; i < this.staff.length; i++) {
      this.staff[i].busy = []
      this.staff[i].current_hours = 0
    }
    for (let i = 0; i < this.schedule.length; i++) {
      this.schedule[i].name = ''
    }
  }

  createValidSchedule(): boolean {
    for(let i=0;i<1000;i++){
      if(this.generate()){
        return true;
      }
    }
    return false;
  }

  generate(): boolean {
    for (let s = 0; s < this.schedule.length; s++) {
      if (s > 0) {
        //If it failed to assign a shift, it will return false
        if ((this.schedule[s - 1].name = '')) {
          return false
        }
        //It will find the Employee that was most recently assigned a shift and push it to the end
        for (let e = 0; e < this.staff.length; e++) {
          if (this.schedule[s - 1].name == this.staff[e].name) {
            this.staff.push(this.staff[e])
            delete this.staff[e]
            break
          }
        }
      }
      foundEmployee: for (let e = 0; e < this.staff.length; e++) {
        for (let a = 0; a < this.staff[e].available.length; a++) {
          //If the employee is available and isn't busy, then they gain the shift
          if (this.schedule[s].contains(this.staff[e].available[a]) && this.staff[e].gainHours(getDuration(this.schedule[s])) && this.staff[e].notBusy(this.schedule[s])) {
            this.schedule[s].name = this.staff[e].name //Assign shift
            this.staff[e].busy.push(this.schedule[s]) //Add the shift to their busy
            break foundEmployee //return to the 1st for loop & get a new shift
          }
        }
      }
    }
    for (let i = 0; i < this.staff.length; i++) {
      if (this.staff[i].current_hours < this.staff[i].min_hours) {
        return false
      }
    }
    return true
  }

  getSchedule(): Shift[] {
    if(this.isValid){
      return this.schedule
    }
    return this.empty
  }
}