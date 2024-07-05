// MUI Imports
import { Grid } from "@mui/material";

// Component Imports
import { getProduct } from "@/stores/product";
import AddForm from "@/views/client/add/AddForm";

const getProductData = async () => {
  const res = await getProduct();

  if (!res.ok) {
    throw new Error("Fail to fetch product!")
  }

  return res.json();
}

const AddPage = async () => {
  const productData = await getProductData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12}>
        <AddForm productData={productData} />
      </Grid>
    </Grid>
  )
}

export default AddPage
