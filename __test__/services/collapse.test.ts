import { WaveformCollapseAlgorithm } from '../../services/waveform_collapse'
import { shift, allDay, Monday, Tuesday, person } from './utils'

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
      person('alice', 1, 4, [allDay(Monday), allDay(Tuesday)]),
      person('bob', 1, 12, [allDay(Monday), allDay(Tuesday)]),
      person('clair', 1, 12, [shift('12:00', '24:00', Tuesday)]),
    ]
  )
  expect(process.generate()).toBe(true)
  const s = process.getSchedule()
  expect(s[0].owner).toBe('alice')
  expect(s[1].owner).toBe('bob')
  expect(s[2].owner).toBe('clair')
})

test('Jarod 1 Schedule', () => {
  const process = new WaveformCollapseAlgorithm(
    [
      shift('09:00', '10:00', Monday), // 1:00
      shift('11:00', '12:00', Monday), // 1:00
      shift('09:00', '12:00', Monday), // 3:00
      shift('09:00', '10:00', Monday), // 1:00
    ],
    [
      person('alice', 2, 12, [allDay(Monday)]),
      person('bob', 1, 12, [allDay(Monday)]),
      person('clair', 3, 12, [allDay(Monday)]),
    ]
  )
  expect(process.generate()).toBe(true)
  // expect(process.getSchedule()).toBe([])
  const s = process.getSchedule()
  let bobCount = 0
  let aliceCount = 0
  for (let i = 0; i < 4; i++) {
    if (s[i].owner === 'alice') {
      aliceCount++
    } else if (s[i].owner === 'bob') {
      bobCount++
    }
  }
  expect(bobCount).toBe(1)
  expect(aliceCount).toBe(2)
  expect(s[2].owner).toBe('clair')
})

test('Jarod 2 Schedule', () => {
  const process = new WaveformCollapseAlgorithm(
    [
      shift('09:00', '10:00', Monday), // 1:00
      shift('11:15', '11:30', Tuesday), // 0:15
      shift('11:45', '14:00', Tuesday), // 2:15
      shift('14:30', '19:00', Tuesday), // 4:30
      shift('08:00', '09:00', Tuesday), // 1:00
      shift('09:30', '11:00', Tuesday), // 1:30
      shift('12:00', '13:00', Tuesday), // 1:00
    ],
    [
      person('alice', 2, 10, [shift('09:00', '23:00', Monday), allDay(Tuesday)]),
      person('bob', 2, 4, [allDay(Monday), shift('07:00', '24:00', Tuesday)]),
    ]
  )
  expect(process.generate()).toBe(true)
  // expect(process.getSchedule()).toBe([])
  const s = process.getSchedule()
  console.log(s)
  expect(s[0].owner).toBe('bob')
  expect(s[1].owner).toBe('bob')
  expect(s[2].owner).toBe('bob')
  expect(s[3].owner).toBe('alice')
  expect(s[4].owner).toBe('alice')
  expect(s[5].owner).toBe('alice')
  expect(s[6].owner).toBe('alice')
})

test('Impossible Schedule', () => {
  const process = new WaveformCollapseAlgorithm(
    [
      shift('09:00', '10:00', Monday),
      shift('09:00', '12:00', Monday),
      shift('09:00', '10:00', Monday),
      shift('11:00', '12:00', Monday),
    ],
    [person('alice', 2, 2, [allDay(Monday)])]
  )
  expect(process.generate()).toBe(false)
  const s = process.getSortedSchedule()
  expect(s[0].owner).toBe('alice')
  expect(s[1].owner).toBe('')
  expect(s[2].owner).toBe('')
  expect(s[3].owner).toBe('alice')
})
