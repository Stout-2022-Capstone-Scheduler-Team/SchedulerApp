import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import { useState } from "react";

interface EmployeePanelProps {}

export function EditEmployeeInfo(props: EmployeePanelProps) {
  const { ...other } = props;
  const [employeeColor, setEmployeeColor] = useState<Number>();

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={3}>
        <TextField label="Employee Name" variant="standard" />
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
        />
      </Grid>
    </Grid>
  );
}
