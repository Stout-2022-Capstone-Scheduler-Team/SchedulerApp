import { Paper, Grid, Container, Button, Tabs, Tab, Card, Box, AppBar } from '@mui/material'

//takes in day, and information about shifts
import Shift from './Shift';

//delete later
const arr = ['shift1', 'shift2', 'shift3']

const shifts = arr.map(
	//add props
  (shift) => (<Shift />)
)

const DailyShifts = () => {
  return (
		<Grid container spacing={2} columns={1}  > 
			<Grid item xs={1} >
          {shifts}
      </Grid>
		</ Grid>
  )
}
export default DailyShifts;
