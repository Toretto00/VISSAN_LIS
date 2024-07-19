import Grid from '@mui/material/Grid'

import { getInventory } from '@/stores/inventory'

// Component Imports
import InventoryList from '@/views/client/inventory/list/InventoryList'

import { getCurrentUser } from "@/libs/session"

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { signOut } from 'next-auth/react'

const getData = async (storeid: string) => {
    const res = await getInventory(storeid)

    if (!res.ok) {
        if (res.status === 401) {
            // Sign out from the app
            await signOut({ redirect: false })

            // cookies().delete("next-auth.session-token")
            redirect("/login")
        }

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
