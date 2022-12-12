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

test("Schedule", () => {
  expect(person("alice", 1, 4, [allDay(Monday), allDay(Tuesday)], new Color("Red")).isAvailable(shift("09:00", "12:00", Monday))).toBe(true);
  expect(person("alice", 1, 4, [shift("09:00", "13:00", Monday)], new Color("Red")).isAvailable(shift("09:00", "10:00", Monday))).toBe(true);
  expect(person("alice", 1, 4, [shift("09:00", "10:00", Monday), shift("09:30", "12:00", Monday)], new Color("Red")).isAvailable(shift("09:00", "11:00", Monday))).toBe(true);
  expect(person("alice", 1, 4, [allDay(Monday), allDay(Tuesday)], new Color("Red")).isAvailable(shift("23:00", "5:00", Monday, Tuesday))).toBe(true);
  expect(person("alice", 1, 4, [shift("09:00", "12:00", Tuesday)], new Color("Red")).isAvailable(shift("09:00", "12:00", Monday))).toBe(false);
  expect(person("alice", 1, 4, [shift("06:00", "12:00", Tuesday)], new Color("Red")).isAvailable(shift("09:00", "12:00", Monday))).toBe(false);
});
