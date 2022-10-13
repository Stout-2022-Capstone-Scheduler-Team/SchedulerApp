
import { Time, Shift, SchedulerService, DayOftheWeek } from '../../services/types'

test('Time', () => {
  expect(Time.FromString('15:45').hours).toBeCloseTo(15.75)
  expect(Time.FromString('15:45').hoursBetween(Time.FromString('16:00'))).toBeCloseTo(0.25)
  expect(Time.FromString('16:00').hoursBetween(Time.FromString('15:15'))).toBeCloseTo(0.75)
})

test('Shift', () => {
  const shift = (from: string, to: string, day: DayOftheWeek): Shift => new Shift('', Time.FromString(from), Time.FromString(to), day)
  const base = shift('03:00', '04:00', DayOftheWeek.Monday)
  expect(base.overlaps(shift('03:30', '05:00', DayOftheWeek.Monday))).toBe(true)
  expect(base.overlaps(shift('04:30', '05:00', DayOftheWeek.Monday))).toBe(false)
  expect(base.overlaps(shift('03:30', '05:00', DayOftheWeek.Tuesday))).toBe(false)
  expect(base.overlaps(shift('04:30', '05:00', DayOftheWeek.Tuesday))).toBe(false)

  expect(base.contains(shift('03:30', '04:00', DayOftheWeek.Monday))).toBe(true)
  expect(base.contains(shift('03:30', '05:00', DayOftheWeek.Monday))).toBe(false)
  expect(base.contains(shift('04:30', '05:00', DayOftheWeek.Monday))).toBe(false)
  expect(base.contains(shift('03:30', '04:00', DayOftheWeek.Tuesday))).toBe(false)
  expect(base.contains(shift('03:30', '05:00', DayOftheWeek.Tuesday))).toBe(false)
  expect(base.contains(shift('04:30', '05:00', DayOftheWeek.Tuesday))).toBe(false)

  expect(shift('03:30', '04:00', DayOftheWeek.Monday).duration).toBeCloseTo(0.5)
  expect(shift('03:30', '05:00', DayOftheWeek.Monday).duration).toBeCloseTo(1.5)
  expect(shift('04:30', '05:00', DayOftheWeek.Monday).duration).toBeCloseTo(0.5)
  expect(shift('03:30', '04:00', DayOftheWeek.Tuesday).duration).toBeCloseTo(0.5)
  expect(shift('03:30', '05:00', DayOftheWeek.Tuesday).duration).toBeCloseTo(1.5)
  expect(shift('04:30', '05:00', DayOftheWeek.Tuesday).duration).toBeCloseTo(0.5)
})

test('Empty Schedule', () => {
  const process = new SchedulerService([], [])
  expect(process.generate()).toBe(true)
})
