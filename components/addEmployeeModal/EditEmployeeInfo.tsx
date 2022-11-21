import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import { Color } from "../../entities";

interface EditEmployeeInfoProps {
  name: string;
  color: Color;
  maxHours: number;
  minHours: number;
  availableColors: Color[];
  setEmployeeName: (name: string) => void;
  setEmployeeColor: (color: Color) => void;
  setEmployeeMaxHours: (maxHours: number) => void;
  setEmployeeMinHours: (minHours: number) => void;
  validName: boolean;
  validHours: boolean;
}

export function EditEmployeeInfo(props: EditEmployeeInfoProps): JSX.Element {
  const {
    name,
    color,
    maxHours,
    minHours,
    availableColors,
    setEmployeeName,
    setEmployeeColor,
    setEmployeeMaxHours,
    setEmployeeMinHours,
    validName,
    validHours
  } = props;

  /**
   * Event to fire when color selector is updated
   */
  const onColorUpdate = (event: SelectChangeEvent<string>): void => {
    const desiredColor = String(event.target.value);
    let newColor: Color;
    if (desiredColor.toLocaleLowerCase() === "random") {
      newColor =
        availableColors[Math.floor(Math.random() * availableColors.length)];
    } else {
      newColor = new Color(desiredColor);
    }

    setEmployeeColor(newColor);
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={3}>
        <TextField
          label="Employee Name"
          variant="standard"
          value={name}
          error={!validName}
          helperText={validName ? "" : "Please enter a unique employee name"}
          onChange={(event) => setEmployeeName(event.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="standard" sx={{ minWidth: "80%" }}>
          <InputLabel id="employee-color-selector">Employee Color</InputLabel>
          <Select
            labelId="employee-color-selector"
            id="employee-color-select"
            value={color?.colorName ?? ""}
            label="Employee Color"
            sx={{ width: "90%" }}
            onChange={onColorUpdate}
          >
            <MenuItem value={0} sx={{ color: "gray" }}>
              Random
            </MenuItem>
            {availableColors.map((color) => (
              <MenuItem
                value={color.colorName}
                key={color.colorName + color.colorHex}
              >
                {color.colorName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Minimum Hours per Week"
          variant="standard"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: { min: 0 }
          }}
          value={Number.isNaN(minHours) ? "" : minHours}
          error={!validHours}
          onChange={(event) =>
            setEmployeeMinHours(parseInt(event.target.value))
          }
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Maximum Hours per Week"
          variant="standard"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: { min: 0 }
          }}
          value={Number.isNaN(maxHours) ? "" : maxHours}
          error={!validHours}
          onChange={(event) =>
            setEmployeeMaxHours(parseInt(event.target.value))
          }
        />
      </Grid>
    </Grid>
  );
}
