// Next Imports
import { redirect } from 'next/navigation'

// Type Imports
import type { InventoryDetailType } from '@/types/inventoryTypes'

// Component Imports
import Preview from '@views/inventory/preview/PreviewPage'
import { InventoryDetail } from '@/stores/inventory'

const getData = async (id: number) => {
    // Vars
    const res = await InventoryDetail(14);

    if (!res.ok) {
        throw new Error('Failed to fetch inventory detail data')
    }

    return res.json()
}

const PreviewPage = async ({ params }: { params: { id: number } }) => {
    // Vars
    const data = await getData(params.id)

    // const filteredData = data.filter((invoice: InventoryDetailType) => invoice.id === params.id)[0]

    // if (!filteredData) {
    //     redirect('/not-found')
    // }

    return <Preview inventoryData={data} id={params.id} />
}

export default PreviewPage
