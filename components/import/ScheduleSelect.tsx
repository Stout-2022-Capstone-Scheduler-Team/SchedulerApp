import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { ChangeEvent } from "react";
import { Schedule } from "../../entities";

interface ScheduleSelectProps {
  type: string;
  typeSetter: (ty: string) => void;
  schedules: { [key: string]: Schedule };
}

export function ScheduleSelect({
  type,
  typeSetter,
  schedules
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
        {Object.keys(schedules).map((name) => (
          <MenuItem value={name} key={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
