import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { ChangeEvent } from "react";

import { ExportType } from "./ExportModal";

interface FormatSelectProps {
  type: ExportType;
  typeSetter: (ty: ExportType) => void;
}

export function FormatSelect({
  type,
  typeSetter
}: FormatSelectProps): JSX.Element {
  const handleChange = (event: SelectChangeEvent | ChangeEvent): void => {
    // @ts-expect-error
    typeSetter(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">File Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="File Type"
        onChange={handleChange}
        data-testid="file-type-select"
      >
        <MenuItem value={ExportType.jpeg}>jpeg</MenuItem>
        <MenuItem value={ExportType.png}>png</MenuItem>
        <MenuItem value={ExportType.pdf}>pdf</MenuItem>
      </Select>
    </FormControl>
  );
}
