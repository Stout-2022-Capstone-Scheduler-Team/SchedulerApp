import { Paper, Grid } from '@mui/material'
import DailyShifts from './DailyShifts';

import { Shift, Time, DayOftheWeek } from '../../entities/types'


interface Props {
  allShifts: Shift[];
}

const Calender = (props: Props) => {
  props.allShifts.filter(shift => shift.day === DayOftheWeek.Monday)
  return (
    <Paper sx={{m:1, bgcolor: '#eeeeee'}}>
      <Grid container spacing={2} columns={7} sx={{m: 1}} > 
        <Grid item xs={1} sx={{ borderRight: 2, borderBottom: 2, p: 1 }}>
          Sunday
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2, borderBottom: 2 }}>
          Monday
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2, borderBottom: 2 }}>
          Tuesday
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2, borderBottom: 2 }}>
          Wednesday
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2, borderBottom: 2 }}>
          Thursday
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2, borderBottom: 2 }}>
          Friday
        </Grid>
				<Grid item xs={1} sx={{ borderRight: 2, borderBottom: 2 }}>
          Saturday
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts allShifts={ props.allShifts.filter(shift => shift.day === DayOftheWeek.Sunday)}/>
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts allShifts={ props.allShifts.filter(shift => shift.day === DayOftheWeek.Monday)}/>
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts allShifts={ props.allShifts.filter(shift => shift.day === DayOftheWeek.Tuesday)}/>
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts allShifts={ props.allShifts.filter(shift => shift.day === DayOftheWeek.Wednesday)} />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts allShifts={ props.allShifts.filter(shift => shift.day === DayOftheWeek.Thursday)}/>
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts allShifts={ props.allShifts.filter(shift => shift.day === DayOftheWeek.Friday)} />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts allShifts={ props.allShifts.filter(shift => shift.day === DayOftheWeek.Saturday)}/>
        </Grid>
      
        
      </Grid>
    </Paper>
  )
}

export default Calender;