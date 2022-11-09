import { Calendar, ExportModal } from "../components";
import React from "react";
import { WaveformCollapseAlgorithm } from "../services/waveform_collapse";
import { shift, allDay, Monday, Tuesday, person, Wednesday, Thursday, Friday, Saturday, Sunday } from "../__test__/services/utils";
import { Color } from "../entities/color";

export default function EditSchedule(): JSX.Element {
  const schedulerDummyData = new WaveformCollapseAlgorithm(
    [
      shift("08:00", "12:00", Sunday),
      shift("08:00", "12:00", Monday),
      shift("08:00", "12:00", Tuesday),
      shift("08:00", "12:00", Wednesday),
      shift("08:00", "12:00", Thursday),
      shift("08:00", "12:00", Friday),
      shift("08:00", "12:00", Saturday)

    ],
    [
      person("Alice", 1, 12, [allDay(Sunday)], new Color("Red")),
      person("Bob", 1, 12, [allDay(Monday)], new Color("Orange")),
      person("Claire", 1, 12, [allDay(Tuesday)], new Color("Yellow")),
      person("Drew", 1, 12, [allDay(Wednesday)], new Color("Green")),
      person("Ethan", 1, 12, [allDay(Thursday)], new Color("Blue")),
      person("Frank", 1, 12, [allDay(Friday)], new Color()),
      person("Gabe", 1, 12, [allDay(Saturday)], new Color())
    ]
  );

  schedulerDummyData.generate();

  // Reference to the calendar which enables exporting it
  const exportRef = React.useRef(null);

  return (
    <>
      <Calendar scheduler={schedulerDummyData} exportRef={exportRef} />
      <ExportModal componentToExport={exportRef} />
    </>
  );
}
