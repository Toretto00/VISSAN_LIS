// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  handleEvent: (data: any) => void
}

type FormDataType = {
  name: string
  code: string
}

// Vars
const initialData = {
  name: '',
  code: ''
}

const AddDrawer = ({ open, handleClose, handleEvent }: Props) => {
  // States
  const [formData, setFormData] = useState<FormDataType>(initialData)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData(initialData)
    handleEvent(formData)
    handleClose()
  }

  const handleReset = () => {
    handleClose()
    setFormData({
      name: '',
      code: ''
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New Category</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Name'
            fullWidth
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <CustomTextField
            label='Code'
            fullWidth
            value={formData.code}
            onChange={e => setFormData({ ...formData, code: e.target.value })}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddDrawer
