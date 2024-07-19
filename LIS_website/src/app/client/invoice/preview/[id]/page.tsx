// Next Imports
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// Component Imports
import Preview from '@views/client/invoice/preview/PreviewPage'
import { getInvoiceDetail } from '@/stores/invoice'

const getData = async (id: number) => {
    // Vars
    const res = await getInvoiceDetail(id);

    if (!res.ok) {
        if (res.status === 401) {
            cookies().delete("next-auth.session-token")
            redirect("/login")
        }

        throw new Error('Failed to fetch inventory detail data')
    }

    return res.json()
}

const PreviewPage = async ({ params }: { params: { id: string, date: string } }) => {
    // Vars
    const data = await getData(Number(params.id))

    if (!data) {
        redirect('/not-found')
    }

    return <Preview invoiceData={data} id={params.id} />
}

export default PreviewPage

export const dynamic = 'force-dynamic';
