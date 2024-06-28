// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { CategoryType } from '@/types/categoryTypes'

// Component Imports
import CategoryListTable from './CategoryListTable'

const CategoryList = ({ categoryData }: { categoryData: CategoryType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoryListTable tableData={categoryData} />
      </Grid>
    </Grid>
  )
}

export default CategoryList
