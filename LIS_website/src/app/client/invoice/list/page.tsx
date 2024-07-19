import Grid from '@mui/material/Grid'

import { getInvoice } from '@/stores/invoice'

// Component Imports
import InvoiceList from '@/views/client/invoice/list/InvoiceList'

import { getCurrentUser } from "@/libs/session"

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'

const getData = async (storeid: string, from: string, to: string, status: string) => {
    const res = await getInvoice(storeid, from, to, status)

    if (!res.ok) {
        if (res.status === 401) {
            cookies().delete("next-auth.session-token")
            redirect("/login")
        } else if (res.status === 404) {
            return res.json()
        }

        throw new Error('Fail to fetch client invoice data')
    }

    return res.json()
}

const Invoice = async () => {
    const user = await getCurrentUser()

    const storeid = user?.store.storeid

    const data = await getData(storeid, "", dayjs().format("DD/MM/YYYY").toString(), "")

    return (
        <Grid container>
            <Grid item xs={12}>
                <InvoiceList invoiceData={data} storeid={storeid} />
            </Grid>
        </Grid>
    )
}

export default Invoice

export const dynamic = 'force-dynamic';
