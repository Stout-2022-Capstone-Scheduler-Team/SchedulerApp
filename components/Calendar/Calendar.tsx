import { Paper, Grid, Container, Button, Tabs, Tab, Card, Box, AppBar } from '@mui/material'
import Shift from './Shift';
import DailyShifts from './DailyShifts';


const arr = ['shift1', 'shift2', 'shift3']

const shifts = arr.map(
  (shift) => (<Shift />)
)

const Calender = () => {
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
          <DailyShifts />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts />
        </Grid>
        <Grid item xs={1} sx={{ borderRight: 2 }}>
          <DailyShifts />
        </Grid>
      
        
      </Grid>
    </Paper>
  )
}

export default Calender;