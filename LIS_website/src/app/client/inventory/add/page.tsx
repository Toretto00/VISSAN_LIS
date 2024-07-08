// MUI Imports
import { Grid } from "@mui/material";

// Component Imports
import { getProduct } from "@/stores/product";
import AddForm from "@/views/client/inventory/add/AddForm";
import AddCard from "@views/client/inventory/add/AddCard"
import AddActions from "@views/client/inventory/add/AddActions"

import { getCurrentUser } from "@/libs/session"
import { AddProvider } from "@/@core/contexts/AddContext";

const getProductData = async () => {
  const res = await getProduct();

  if (!res.ok) {
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
      {/* <Grid item xs={12} lg={12}>
        <AddForm productData={productData} />
      </Grid> */}
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
