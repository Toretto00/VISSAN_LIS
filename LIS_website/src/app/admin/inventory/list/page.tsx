import Grid from '@mui/material/Grid'

import { fetches } from '@/stores/inventory'
import { getStoreLocation } from '@/stores/storeLocations'

// Component Imports
import InventoryList from '@/views/inventory/list/InventoryList'

// Third-party Imports
import dayjs from 'dayjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const getData = async () => {
  const res = await fetches(dayjs().format('DD/MM/YYYY').toString())

  if (!res.ok) {
    if (res.status === 401) {
      cookies().delete("next-auth.session-token")
      redirect("/login")
    }

    throw new Error('Fail to fetch inventory data')
  }

  return res.json()
}

const getStoreLocations = async () => {
  const res = await getStoreLocation()

  if (!res.ok) {
    throw new Error('Fail to fetch store locations data')
  }

  return res.json()
}

const Inventory = async () => {
  const data = await getData()
  const storeLocations = await getStoreLocations()

  return (
    <Grid container>
      <Grid item xs={12}>
        <InventoryList inventoryData={data} storeLocations={storeLocations} />
      </Grid>
    </Grid>
  )
}

export default Inventory

export const dynamic = 'force-dynamic';
