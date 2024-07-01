import Grid from '@mui/material/Grid'

import { fetches } from '@/stores/inventory'

// Component Imports
import InventoryList from '@/views/inventory/list/InventoryList'

// Third-party Imports
import dayjs from 'dayjs'

const getData = async () => {
  const res = await fetches(dayjs().format('DD/MM/YYYY').toString())

  if (!res.ok) {
    throw new Error('Fail to fetch inventory data')
  }

  return res.json()
}

const Inventory = async () => {
  const data = await getData()

  return (
    <Grid container>
      <Grid item xs={12}>
        <InventoryList inventoryData={data} />
      </Grid>
    </Grid>
  )
}

export default Inventory
