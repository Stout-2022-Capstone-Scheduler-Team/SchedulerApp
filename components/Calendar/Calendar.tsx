import { Shift, DayOftheWeek } from '../../entities/types'
import DailyShifts from './DailyShifts';
import WeeklyDate from './WeeklyDate';

import { Grid, Paper } from '@mui/material'

interface Props {
  allShifts: Shift[];
}

const Calender = (props: Props) => {
  return (
    <Paper sx={{m:2, p:1, bgcolor: '#eeeeee'}}>
      <Grid container columns={7}> 
        <Grid item xs={1} sx={{ px:0.75 }}>
          <WeeklyDate dayOfWeek="Sun" date="10.23"/>
        </Grid>
        <Grid item xs={1} sx={{ px:0.75 }}>
          <WeeklyDate dayOfWeek="Mon" date="10.24"/>
        </Grid>
        <Grid item xs={1} sx={{ px:0.75 }}>
          <WeeklyDate dayOfWeek="Tue" date="10.25"/>
        </Grid>
        <Grid item xs={1} sx={{ px:0.75 }}>
          <WeeklyDate dayOfWeek="Wed" date="10.26"/>
        </Grid>
        <Grid item xs={1} sx={{ px:0.75 }}>
          <WeeklyDate dayOfWeek="Thu" date="10.27"/>
        </Grid>
        <Grid item xs={1} sx={{ px:0.75 }}>
          <WeeklyDate dayOfWeek="Fri" date="10.28"/>
        </Grid>
				<Grid item xs={1} sx={{ px:0.75 }}>
          <WeeklyDate dayOfWeek="Sat" date="10.29"/>
        </Grid>
        <Grid item xs={1} sx={{ px:1.5 }}>
          <DailyShifts allShifts={props.allShifts.filter(shift => shift.day === DayOftheWeek.Sunday)}/>
        </Grid>
        <Grid item xs={1} sx={{ px:1.5 }}>
          <DailyShifts allShifts={props.allShifts.filter(shift => shift.day === DayOftheWeek.Monday)}/>
        </Grid>
        <Grid item xs={1} sx={{ px:1.5 }}>
          <DailyShifts allShifts={props.allShifts.filter(shift => shift.day === DayOftheWeek.Tuesday)}/>
        </Grid>
        <Grid item xs={1} sx={{ px:1.5 }}>
          <DailyShifts allShifts={props.allShifts.filter(shift => shift.day === DayOftheWeek.Wednesday)}/>
        </Grid>
        <Grid item xs={1} sx={{ px:1.5 }}>
          <DailyShifts allShifts={props.allShifts.filter(shift => shift.day === DayOftheWeek.Thursday)}/>
        </Grid>
        <Grid item xs={1} sx={{ px:1.5 }}>
          <DailyShifts allShifts={props.allShifts.filter(shift => shift.day === DayOftheWeek.Friday)} />
        </Grid>
        <Grid item xs={1} sx={{ px:1.5 }}>
          <DailyShifts allShifts={props.allShifts.filter(shift => shift.day === DayOftheWeek.Saturday)}/>
        </Grid>  
      </Grid>
    </Paper>
  )
}

export default Calender;