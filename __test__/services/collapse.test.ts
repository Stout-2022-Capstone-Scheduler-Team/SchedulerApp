import { generate, getEmployee } from "../../services/waveform_collapse";
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
import { Shift, Employee, Color } from "../../entities";
import { log } from "console";

test("Empty Schedule", async () => {
  const shifts: Shift[] = [];
  const staff: Employee[] = [];
  expect(await generate(shifts, staff)).toBeUndefined();
});

test("Get Employee Name", async () => {
  const staff: Employee[] = [
    person("alice", 1, 4, [allDay(Monday), allDay(Tuesday)], new Color("Red")),
    person("bob", 1, 12, [allDay(Monday), allDay(Tuesday)], new Color("Red")),
    person("clair", 1, 12, [shift("12:00", "24:00", Tuesday)], new Color("Red"))
  ];
  expect(getEmployee(staff, "alice")).toBe(staff[0]);
  expect(getEmployee(staff, "bob")).toBe(staff[1]);
  expect(getEmployee(staff, "clair")).toBe(staff[2]);
  expect(getEmployee(staff, "")).toBe(undefined);
  expect(getEmployee(staff, "some_other")).toBe(undefined);
});

test("Collapse Schedule", async () => {
  const shifts: Shift[] = [
    shift("08:00", "12:00", Monday),
    shift("15:45", "20:00", Monday),
    shift("14:00", "16:00", Tuesday)
  ];
  const staff: Employee[] = [
    person("alice", 1, 4, [allDay(Monday), allDay(Tuesday)], new Color("Red")),
    person("bob", 1, 12, [allDay(Monday), allDay(Tuesday)], new Color("Red")),
    person("clair", 1, 12, [shift("12:00", "24:00", Tuesday)], new Color("Red"))
  ];
  expect(await generate(shifts, staff)).toBeUndefined();
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("bob");
  expect(shifts[2].owner).toBe("clair");
});

test("Jarod 1 Schedule", async () => {
  const shifts: Shift[] = [
    shift("09:00", "12:00", Monday), // 3:00
    shift("09:00", "10:00", Monday), // 1:00
    shift("11:00", "12:00", Monday), // 1:00
    shift("09:00", "10:00", Monday) // 1:00
  ];
  const staff: Employee[] = [
    person("alice", 2, 12, [allDay(Monday)], new Color("Red")),
    person("bob", 1, 12, [allDay(Monday)], new Color("Red")),
    person("clair", 3, 12, [allDay(Monday)], new Color("Red"))
  ];
  expect(await generate(shifts, staff)).toBeUndefined();
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

test("Jarod 2 Schedule", async () => {
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
    person(
      "alice",
      2,
      10,
      [shift("09:00", "23:00", Monday), allDay(Tuesday)],
      new Color("Red")
    ),
    person(
      "bob",
      2,
      4,
      [allDay(Monday), shift("07:00", "24:00", Tuesday)],
      new Color("Red")
    )
  ];
  expect(await generate(shifts, staff)).toBeUndefined();
  expect(shifts[0].owner).toBe("bob");
  expect(shifts[1].owner).toBe("bob");
  expect(shifts[2].owner).toBe("bob");
  expect(shifts[3].owner).toBe("alice");
  expect(shifts[4].owner).toBe("alice");
  expect(shifts[5].owner).toBe("alice");
  expect(shifts[6].owner).toBe("alice");
});

test("Jarod 3 Schedule", async () => {
  const shifts: Shift[] = [
    shift("04:00", "09:00", Monday), // 5:00
    shift("07:00", "10:00", Monday), // 3:00
    shift("11:00", "12:00", Friday), // 1:00
    shift("08:00", "10:00", Wednesday) // 2:00
  ];
  const staff: Employee[] = [
    person(
      "alice",
      8,
      12,
      [
        allDay(Monday),
        allDay(Tuesday),
        allDay(Wednesday),
        allDay(Thursday),
        allDay(Friday),
        allDay(Saturday),
        allDay(Sunday)
      ],
      new Color("Red")
    ),
    person(
      "bob",
      1,
      4,
      [
        allDay(Monday),
        allDay(Tuesday),
        allDay(Wednesday),
        allDay(Thursday),
        allDay(Friday),
        allDay(Saturday),
        allDay(Sunday)
      ],
      new Color("Red")
    )
  ];
  expect(await generate(shifts, staff)).toBeUndefined();
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("bob");
  expect(shifts[2].owner).toBe("alice");
  expect(shifts[3].owner).toBe("alice");
});

test("Overnight Schedule 1", async () => {
  const shifts: Shift[] = [
    shift("18:00", "23:00", Monday), // 5:00
    shift("22:00", "05:00", Monday, Tuesday) // 7:00 (N)
  ];
  const staff: Employee[] = [
    person("alice", 2, 12, [allDay(Monday)], new Color("Red")),
    person("bob", 2, 12, [allDay(Monday), allDay(Tuesday)], new Color("Red"))
  ];
  expect(await generate(shifts, staff)).toBeUndefined();
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("bob");
});

test("Overnight Schedule 2", async () => {
  const shifts: Shift[] = [
    shift("18:00", "23:00", Monday), // 5:00
    shift("22:00", "05:00", Monday, Tuesday), // 7:00 (N)
    shift("10:00", "15:00", Tuesday), // 5:00
    shift("01:00", "05:00", Tuesday) // 4:00
  ];
  const staff: Employee[] = [
    person("alice", 2, 12, [allDay(Monday)], new Color("Red")),
    person("bob", 10, 12, [allDay(Monday), allDay(Tuesday)], new Color("Red")),
    person("claire", 2, 12, [allDay(Tuesday)], new Color("Red"))
  ];
  expect(await generate(shifts, staff)).toBeUndefined();
  const s = shifts;
  expect(s[0].owner).toBe("alice");
  expect(s[1].owner).toBe("bob");
  expect(s[2].owner).toBe("bob");
  expect(s[3].owner).toBe("claire");
});

test("Impossible Overnight Schedule", async () => {
  const shifts: Shift[] = [
    shift("22:00", "05:00", Monday) // 7:00
  ];
  const staff: Employee[] = [
    person("alice", 2, 12, [allDay(Monday)], new Color("Red"))
  ];
  expect(await generate(shifts, staff)).not.toBeUndefined();
});

test("Impossible Schedule", async () => {
  const shifts: Shift[] = [
    shift("09:00", "10:00", Monday),
    shift("09:00", "12:00", Monday),
    shift("09:00", "10:00", Monday),
    shift("11:00", "12:00", Monday)
  ];
  const staff: Employee[] = [
    person("alice", 2, 2, [allDay(Monday)], new Color("Red"))
  ];
  expect(await generate(shifts, staff)).not.toBeUndefined();
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("");
  expect(shifts[2].owner).toBe("");
  expect(shifts[3].owner).toBe("alice");
});

test("Back to Back", async () => {
  const shifts: Shift[] = [
    shift("10:00", "11:00", Monday),
    shift("11:00", "12:00", Monday)
  ];
  const staff: Employee[] = [
    person("alice", 2, 12, [allDay(Monday)], new Color("Red"))
  ];
  expect(await generate(shifts, staff)).toBeUndefined();
  expect(shifts[0].owner).toBe("alice");
  expect(shifts[1].owner).toBe("alice");
});

jest.setTimeout(1000000);
test("Absolutely Gigantic Schedule", async () => {
  const shifts: Shift[] = [
    shift("07:45", "14:00", Sunday),
    shift("07:45", "14:00", Sunday),

    shift("13:00", "21:00", Sunday),
    shift("13:00", "21:00", Sunday),

    shift("07:45", "14:00", Monday),
    shift("07:45", "14:00", Monday),
    shift("13:00", "21:00", Monday),
    shift("13:00", "21:00", Monday),

    shift("07:45", "14:00", Tuesday),
    shift("07:45", "14:00", Tuesday),
    shift("13:00", "21:00", Tuesday),
    shift("13:00", "21:00", Tuesday),

    shift("07:45", "14:00", Wednesday),
    shift("07:45", "14:00", Wednesday),
    shift("13:00", "21:00", Wednesday),
    shift("13:00", "21:00", Wednesday),

    shift("07:45", "14:00", Thursday),
    shift("07:45", "14:00", Thursday),
    shift("13:00", "21:00", Thursday),
    shift("13:00", "21:00", Thursday),

    shift("07:45", "14:00", Friday),
    shift("07:45", "14:00", Friday),
    shift("13:00", "21:00", Friday),
    shift("13:00", "21:00", Friday),

    shift("07:45", "14:00", Saturday),
    shift("07:45", "14:00", Saturday),
    shift("13:00", "21:00", Saturday),
    shift("13:00", "21:00", Saturday)
  ];
  const always = [
    allDay(Monday),
    allDay(Tuesday),
    allDay(Wednesday),
    allDay(Thursday),
    allDay(Friday),
    allDay(Saturday),
    allDay(Sunday)
  ];
  const staff: Employee[] = [
    person("alice", 12, 40, always),
    person("bob", 12, 40, always),
    person("claire", 12, 40, always),
    person("david", 12, 40, always),
    person("ethan", 12, 40, always),
    person("frank", 12, 40, always),
    person("gary", 12, 40, always),
    person("harry", 12, 40, always),
    person("2alice", 12, 40, always),
    person("2bob", 12, 40, always),
    person("2claire", 12, 40, always),
    person("2david", 12, 40, always),
    person("2ethan", 12, 40, always),
    person("2frank", 12, 40, always),
    person("2gary", 12, 40, always),
    person("2harry", 12, 40, always)
  ];
  console.log = log;
  console.log("Shifts: ", shifts.length);
  console.log("Staff: ", staff.length);
  // expect(false).toBe(true);
  expect(await generate(shifts, staff)).toBeUndefined();
});
