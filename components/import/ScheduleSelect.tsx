import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { ChangeEvent } from "react";


interface ScheduleSelectProps {
  type: string;
  typeSetter: (ty: string) => void;
}

export function ScheduleSelect({
  type,
  typeSetter
}: ScheduleSelectProps): JSX.Element {
  const handleChange = (event: SelectChangeEvent | ChangeEvent): void => {
    // @ts-expect-error
    typeSetter(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Schedules</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Schedules"
        onChange={handleChange}
        data-testid="file-type-select"
      >
      </Select>
    </FormControl>
  );
}
