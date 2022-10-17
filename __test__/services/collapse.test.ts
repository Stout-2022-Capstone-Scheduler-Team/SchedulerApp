import { Time, Shift, DayOftheWeek, Employee } from '../../services/types'

import { WaveformCollapseAlgorithm } from '../../services/waveform_collapse'
import { shift, all_day, Monday, Tuesday, person } from './utils'

test('Empty Schedule', () => {
  const process = new WaveformCollapseAlgorithm([], [])
  expect(process.generate()).toBe(true)
})

test('Collapse Schedule', () => {
  const process = new WaveformCollapseAlgorithm(
    [
      shift('08:00', '12:00', Monday),
      shift('15:45', '20:00', Monday),
      shift('14:00', '16:00', Tuesday),
    ],
    [
      person('alice', 1, 4, [all_day(Monday), all_day(Tuesday)]),
      person('bob', 1, 12, [all_day(Monday), all_day(Tuesday)]),
      person('clair', 1, 12, [shift('12:00', '24:00', Tuesday)]),
    ]
  )
  expect(process.generate()).toBe(true)
  let s = process.getSchedule()
  expect(s[0].owner).toBe('alice')
  expect(s[1].owner).toBe('bob')
  expect(s[2].owner).toBe('clair')
})

test('Jarod 1 Schedule', () => {
  const process = new WaveformCollapseAlgorithm(
    [
      shift('09:00', '10:00', Monday),
      shift('11:00', '12:00', Monday),
      shift('09:00', '12:00', Monday),
      shift('09:00', '10:00', Monday),
    ],
    [
      person('alice', 2, 12, [all_day(Monday)]),
      person('bob', 1, 12, [all_day(Monday)]),
      person('clair', 3, 12, [all_day(Monday)]),
    ]
  )
  expect(process.generate()).toBe(true)
  // expect(process.getSchedule()).toBe([])
  let s = process.getSchedule()
  expect(s[0].owner).toBe('alice')
  expect(s[1].owner).toBe('alice')
  expect(s[2].owner).toBe('bob')
  expect(s[3].owner).toBe('clair')
})

test('Impossible Schedule', () => {
  const process = new WaveformCollapseAlgorithm(
    [
      shift('09:00', '10:00', Monday),
      shift('09:00', '12:00', Monday),
      shift('09:00', '10:00', Monday),
      shift('11:00', '12:00', Monday),
    ],
    [person('alice', 2, 2, [all_day(Monday)])]
  )
  expect(process.generate()).toBe(false)
  let s = process.getSortedSchedule()
  expect(s[0].owner).toBe('alice')
  expect(s[1].owner).toBe('alice')
  expect(s[2].owner).toBe('')
  expect(s[3].owner).toBe('')
})
