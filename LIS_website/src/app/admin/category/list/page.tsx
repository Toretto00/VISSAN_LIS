// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CategoryList from '@/views/category/list'

import { fetches } from "@/stores/category"

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const getData = async () => {
  // Vars
  const res = await fetches({})

  if (!res.ok) {
    if (res.status === 401) {
      cookies().delete("next-auth.session-token")
      redirect("/login")
    }

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

export const dynamic = 'force-dynamic';
