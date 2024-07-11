import Grid from '@mui/material/Grid'

import { getInventory } from '@/stores/inventory'

// Component Imports
import InventoryList from '@/views/client/inventory/list/InventoryList'

import { getCurrentUser } from "@/libs/session"

const getData = async (storeid: string) => {


    const res = await getInventory(storeid)

    if (!res.ok) {
        throw new Error('Fail to fetch client inventory data')
    }

    return res.json()
}

const Inventory = async () => {
    const user = await getCurrentUser()

    const storeid = user?.store.storeid

    const data = await getData(storeid)

    return (
        <Grid container>
            <Grid item xs={12}>
                <InventoryList inventoryData={data} storeid={storeid} />
            </Grid>
        </Grid>
    )
}

export default Inventory

export const dynamic = 'force-dynamic';
