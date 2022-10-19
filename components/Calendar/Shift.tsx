import { Paper, Grid, Container, Button, Tabs, Tab, Card, Box, AppBar } from '@mui/material'

const Shift = () => {
  return (
    <Paper >
      <Grid container columns={1}>
        <Grid item xs={1} >
          11:00 AM - 12:00 AM
        </Grid>
        <Grid item xs={1} >
          Drew Accola
        </Grid>
      </ Grid>
    </Paper>
  )
}

export default Shift;