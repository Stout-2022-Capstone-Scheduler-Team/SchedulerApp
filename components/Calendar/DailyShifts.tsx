import { Grid } from '@mui/material'

import { Shift } from '../../entities/types'

import ShiftInfo from './ShiftInfo';

interface Props {
  allShifts: Shift[];
}

const DailyShifts = (props: Props) => {
  const shifts = props.allShifts.map((shift) => (<ShiftInfo shift={shift} />))

  return (
		<Grid container spacing={2} columns={1}  > 
			<Grid item xs={1} >
        {shifts}
      </Grid>
		</ Grid>
  )
}
export default DailyShifts;
