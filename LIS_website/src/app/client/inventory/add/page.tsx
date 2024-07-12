// MUI Imports
import { Grid } from "@mui/material";

// Component Imports
import { getProduct } from "@/stores/product";
import AddCard from "@views/client/inventory/add/AddCard"
import AddActions from "@views/client/inventory/add/AddActions"

import { getCurrentUser } from "@/libs/session"
import { AddProvider } from "@/@core/contexts/AddContext";

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const getProductData = async () => {
  const res = await getProduct();

  if (!res.ok) {
    if (res.status === 401) {
      cookies().delete("next-auth.session-token")
      redirect("/login")
    }

    throw new Error("Fail to fetch product!")
  }

  return res.json();
}

const AddPage = async () => {
  const productData = await getProductData()

  const user = await getCurrentUser()

  const storeid = user?.store.storeid

  return (
    <Grid container spacing={6}>
      <AddProvider>
        <Grid item xs={12} md={9}>
          <AddCard productData={productData} storeid={storeid} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AddActions />
        </Grid>
      </AddProvider>
    </Grid>
  )
}

export default AddPage

export const dynamic = 'force-dynamic';
