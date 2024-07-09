// Next Imports
import { redirect } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
// import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
// import EditCard from '@views/inventory/edit/EditCard'
import EditActions from '@views/inventory/edit/EditActions'
import { InventoryDetail } from '@/stores/inventory'

// import { Suspense } from 'react'
import LoadingPage from '@/app/loading'

import dynamic from 'next/dynamic';

const EditCard = dynamic(() => import('@views/inventory/edit/EditCard'), {
    loading: () => <LoadingPage />,
});

const getData = async (id: number) => {
    // Vars
    const res = await InventoryDetail(id);

    if (!res.ok) {
        throw new Error('Failed to fetch inventory detail data')
    }

    return res.json()
}

const EditPage = async ({ params }: { params: { id: string } }) => {
    // Vars
    const data = await getData(Number(params.id))

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={9}>
                <EditCard data={data} inventoryData={data} id={params.id} />
            </Grid>
            <Grid item xs={12} md={3}>
                <EditActions id={params.id} />
            </Grid>
        </Grid>
    )
}

export default EditPage

// export const dynamic = 'force-dynamic';
