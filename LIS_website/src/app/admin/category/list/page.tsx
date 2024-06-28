// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CategoryList from '@/views/category/list'

import { fetches } from "@/stores/category"

const getData = async () => {
  // Vars
  const res = await fetches({})

  if (!res.ok) {
    throw new Error('Failed to fetch category data')
  }

  return res.json()
}

const Category = async () => {
  // Vars
  const data = await getData()

  return (
    <Grid container>
      <Grid item xs={12}>
        <CategoryList categoryData={data} />
      </Grid>
    </Grid>
  )
}

export default Category
