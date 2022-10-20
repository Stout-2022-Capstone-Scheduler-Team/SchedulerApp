import { Paper, Grid } from '@mui/material'
import { Shift, Time } from '../../entities/types'

interface ShiftInfo {
  shift: Shift;
}

const ShiftInfo = (props: ShiftInfo) => {
  return (
    <Paper sx={{mb:1}}>
      <Grid container columns={1}>
        <Grid item xs={1} >
          11:00 AM - 12:00 AM
        </Grid>
        <Grid item xs={1} >
          {props.shift.owner}
        </Grid>
      </ Grid>
    </Paper>
  )
}

export default ShiftInfo;