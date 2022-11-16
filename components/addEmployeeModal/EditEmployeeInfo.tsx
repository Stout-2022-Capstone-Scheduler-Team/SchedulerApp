import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import { useState } from "react";
import { Color } from "../../entities";

interface EditEmployeeInfoProps {
  setEmployeeName: (name: string) => void;
  setEmployeeColor: (color: Color) => void;
  setEmployeeMaxHours: (maxHours: number) => void;
  setEmployeeMinHours: (minHours: number) => void;
}

export function EditEmployeeInfo(props: EditEmployeeInfoProps): JSX.Element {
  const {
    setEmployeeName,
    setEmployeeColor,
    setEmployeeMaxHours,
    setEmployeeMinHours
  } = props;
  const [employeeColor] = useState<Number>();

  const onColorUpdate = (event: SelectChangeEvent<string>): void => {
    const newColor = new Color(event.target.value);
    setEmployeeColor(newColor);
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={3}>
        <TextField
          label="Employee Name"
          variant="standard"
          onChange={(event) => setEmployeeName(event.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="standard" sx={{ minWidth: "80%" }}>
          <InputLabel id="employee-color-selector">Employee Color</InputLabel>
          <Select
            labelId="employee-color-selector"
            id="employee-color-select"
            value={employeeColor?.toString() ?? ""}
            label="Employee Color"
            sx={{ width: "90%" }}
            onChange={onColorUpdate}
          >
            <MenuItem value={0} sx={{ color: "gray" }}>
              Random
            </MenuItem>
            <MenuItem value={10}>Blue</MenuItem>
            <MenuItem value={20}>Green</MenuItem>
            <MenuItem value={30}>Red</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Minimum Hours per Week"
          defaultValue={10}
          variant="standard"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            setEmployeeMinHours(parseInt(event.target.value))
          }
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Maximum Hours per Week"
          defaultValue={40}
          variant="standard"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            setEmployeeMaxHours(parseInt(event.target.value))
          }
        />
      </Grid>
    </Grid>
  );
}
