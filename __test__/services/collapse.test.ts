import {
  generate as WaveformCollapseAlgorithm,
  getEmployee
} from "../../services/waveform_collapse";
import {
  shift,
  allDay,
  Monday,
  Tuesday,
  person,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
} from "../utils";
import { Shift, Employee } from "../../entities";

test("Empty Schedule", () => {
  const shifts: Shift[] = [];
  const staff: Employee[] = [];
  expect(WaveformCollapseAlgorithm(shifts, staff)).toBe(true);
});

test("Get Employee Name", () => {
  const staff: Employee[] = [
    person("alice", 1, 4, [allDay(Monday), allDay(Tuesday)]),
    person("bob", 1, 12, [allDay(Monday), allDay(Tuesday)]),
    person("clair", 1, 12, [shift("12:00", "24:00", Tuesday)])
  ];
  expect(getEmployee(staff, "alice")).toBe(staff[0]);
  expect(getEmployee(staff, "bob")).toBe(staff[1]);
  expect(getEmployee(staff, "clair")).toBe(staff[2]);
  expect(getEmployee(staff, "")).toBe(undefined);
  expect(getEmployee(staff, "some_other")).toBe(undefined);
});

test("Collapse Schedule", () => {
  const shifts: Shift[] = [
    shift("08:00", "12:00", Monday),
    shift("15:45", "20:00", Monday),
    shift("14:00", "16:00", Tuesday)
  ];
  const staff: Employee[] = [
    person("alice", 1, 4, [allDay(Monday), allDay(Tuesday)]),
    person("bob", 1, 12, [allDay(Monday), allDay(Tuesday)]),
    person("clair", 1, 12, [shift("12:00", "24:00", Tuesday)])
  ];
  expect(WaveformCollapseAlgorithm(shifts, staff)).toBe(true);
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("bob");
  expect(shifts[2].owner).toBe("clair");
});

test("Jarod 1 Schedule", () => {
  const shifts: Shift[] = [
    shift("09:00", "12:00", Monday), // 3:00
    shift("09:00", "10:00", Monday), // 1:00
    shift("11:00", "12:00", Monday), // 1:00
    shift("09:00", "10:00", Monday) // 1:00
  ];
  const staff: Employee[] = [
    person("alice", 2, 12, [allDay(Monday)]),
    person("bob", 1, 12, [allDay(Monday)]),
    person("clair", 3, 12, [allDay(Monday)])
  ];
  expect(WaveformCollapseAlgorithm(shifts, staff)).toBe(true);
  let bobCount = 0;
  let aliceCount = 0;
  for (let i = 1; i < 4; i++) {
    if (shifts[i].owner === "alice") {
      aliceCount++;
    } else if (shifts[i].owner === "bob") {
      bobCount++;
    }
  }
  expect(bobCount).toBe(1);
  expect(aliceCount).toBe(2);
  expect(shifts[0].owner).toBe("clair");
});

test("Jarod 2 Schedule", () => {
  const shifts: Shift[] = [
    shift("09:00", "10:00", Monday), // 1:00
    shift("11:15", "11:30", Tuesday), // 0:15
    shift("11:45", "14:00", Tuesday), // 2:15
    shift("14:30", "19:00", Tuesday), // 4:30
    shift("08:00", "09:00", Tuesday), // 1:00
    shift("09:30", "11:00", Tuesday), // 1:30
    shift("12:00", "13:00", Tuesday) // 1:00
  ];
  const staff: Employee[] = [
    person("alice", 2, 10, [shift("09:00", "23:00", Monday), allDay(Tuesday)]),
    person("bob", 2, 4, [allDay(Monday), shift("07:00", "24:00", Tuesday)])
  ];
  expect(WaveformCollapseAlgorithm(shifts, staff)).toBe(true);
  expect(shifts[0].owner).toBe("bob");
  expect(shifts[1].owner).toBe("bob");
  expect(shifts[2].owner).toBe("bob");
  expect(shifts[3].owner).toBe("alice");
  expect(shifts[4].owner).toBe("alice");
  expect(shifts[5].owner).toBe("alice");
  expect(shifts[6].owner).toBe("alice");
});

test("Jarod 3 Schedule", () => {
  const shifts: Shift[] = [
    shift("04:00", "09:00", Monday), // 5:00
    shift("07:00", "10:00", Monday), // 3:00
    shift("11:00", "12:00", Friday), // 1:00
    shift("08:00", "10:00", Wednesday) // 2:00
  ];
  const staff: Employee[] = [
    person("alice", 8, 12, [
      allDay(Monday),
      allDay(Tuesday),
      allDay(Wednesday),
      allDay(Thursday),
      allDay(Friday),
      allDay(Saturday),
      allDay(Sunday)
    ]),
    person("bob", 1, 4, [
      allDay(Monday),
      allDay(Tuesday),
      allDay(Wednesday),
      allDay(Thursday),
      allDay(Friday),
      allDay(Saturday),
      allDay(Sunday)
    ])
  ];
  expect(WaveformCollapseAlgorithm(shifts, staff)).toBe(true);
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("bob");
  expect(shifts[2].owner).toBe("alice");
  expect(shifts[3].owner).toBe("alice");
});

test("Impossible Schedule", () => {
  const shifts: Shift[] = [
    shift("09:00", "10:00", Monday),
    shift("09:00", "12:00", Monday),
    shift("09:00", "10:00", Monday),
    shift("11:00", "12:00", Monday)
  ];
  const staff: Employee[] = [person("alice", 2, 2, [allDay(Monday)])];
  expect(WaveformCollapseAlgorithm(shifts, staff)).toBe(false);
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("");
  expect(shifts[2].owner).toBe("");
  expect(shifts[3].owner).toBe("alice");
});
