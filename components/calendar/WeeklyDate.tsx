import { Grid, Typography } from "@mui/material";

interface WeeklyDate {
  dayOfWeek: string;
  date: string;
}

export function WeeklyDate(props: WeeklyDate): JSX.Element {
  return (
    <Grid container columns={2} sx={{ borderBottom: 1 }}>
      <Grid item xs={1}>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", fontFamily: "monospace", color: "inherit" }}
        >
          {props.date}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography
          variant="h6"
          align="right"
          sx={{ fontFamily: "monospace", color: "inherit" }}
        >
          {props.dayOfWeek}
        </Typography>
      </Grid>
    </Grid>
  );
}
