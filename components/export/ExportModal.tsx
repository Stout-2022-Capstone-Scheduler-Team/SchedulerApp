import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export function BasicSelect(): JSX.Element {
  const [type, setType] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
  }

  return (
    <Box sx={{ m: 2, minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">File Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="File Type"
          onChange={handleChange}
        >
          <MenuItem value={1}>jpeg</MenuItem>
          <MenuItem value={2}>png</MenuItem>
          <MenuItem value={3}>pdf</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default function BasicModal(): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Export</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Export Schedule
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Select an export type from the drop down list.
          </Typography>
          <BasicSelect />
        </Box>
      </Modal>
    </div>
  )
}
