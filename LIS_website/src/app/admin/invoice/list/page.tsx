import Grid from '@mui/material/Grid'

import { getInvoice } from '@/stores/invoice'
import { getStoreLocation } from '@/stores/storeLocations'

// Component Imports
import InvoiceList from '@/views/invoice/list/InvoiceList'

// Third-party Imports
import dayjs from 'dayjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const getData = async (storeid: string, from: string, to: string, status: string) => {
  const res = await getInvoice(storeid, from, to, status)

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

const Invoice = async () => {
  const data = await getData("", "", dayjs().format("DD/MM/YYYY").toString(), "pending")

  const storeLocations = await getStoreLocations()

  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoiceList invoiceData={data} storeLocations={storeLocations} />
      </Grid>
    </Grid>
  )
}

export default Invoice

export const dynamic = 'force-dynamic';
