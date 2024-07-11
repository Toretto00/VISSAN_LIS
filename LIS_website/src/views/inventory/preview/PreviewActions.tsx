'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Third-party Imports
import * as XLSX from "xlsx";

// Component Imports
import { excelExport } from '@/stores/inventory'

// Component Imports
// import AddPaymentDrawer from '@views/apps/invoice/shared/AddPaymentDrawer'
// import SendInvoiceDrawer from '@views/apps/invoice/shared/SendInvoiceDrawer'

// Util Imports
// import { getLocalizedUrl } from '@/utils/i18n'

// HandleClick
const handleGetExcelFile = async (from: string, to: string, id: number) => {
    const res = await excelExport(from, to, id)

    if (!res.ok)
        throw new Error("Fail to export excel file!")

    return res.arrayBuffer();
}

const handleExcelExport = async (from: string, to: string, id: number) => {
    try {
        const data = await handleGetExcelFile(from, to, id)

        const excel = new Uint8Array(data);

        const workbook = XLSX.read(excel, { type: "array" });

        XLSX.writeFile(workbook, "Inventory.xlsx");
    } catch (error) {
        // throw new Error(error);
        console.log(error)
    }
}

const PreviewActions = ({ id }: { id: string }) => {
    // States
    const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false)
    const [sendDrawerOpen, setSendDrawerOpen] = useState(false)



    return (
        <>
            <Card>
                <CardContent className='flex flex-col gap-4'>
                    {/* <Button
                        fullWidth
                        variant='contained'
                        className='capitalize'
                        startIcon={<i className='tabler-send' />}
                        onClick={() => setSendDrawerOpen(true)}
                    >
                        Send Invoice
                    </Button> */}
                    <Button fullWidth color='secondary' variant='tonal' className='capitalize' onClick={() => handleExcelExport("", "", Number(id))}>
                        Download
                    </Button>
                    <div className='flex items-center gap-4'>
                        <Button
                            fullWidth
                            target='_blank'
                            component={Link}
                            color='secondary'
                            variant='tonal'
                            className='capitalize'
                            href={`/apps/invoice/print/${id}`}
                            disabled
                        >
                            Print
                        </Button>
                        <Button
                            fullWidth
                            component={Link}
                            color='secondary'
                            variant='tonal'
                            className='capitalize'
                            href={`/admin/inventory/edit/${id}`}
                        >
                            Edit
                        </Button>
                    </div>
                    {/* <Button
                        fullWidth
                        color='success'
                        variant='contained'
                        className='capitalize'
                        onClick={() => setPaymentDrawerOpen(true)}
                        startIcon={<i className='tabler-currency-dollar' />}
                    >
                        Add Payment
                    </Button> */}
                </CardContent>
            </Card>
            {/* <AddPaymentDrawer open={paymentDrawerOpen} handleClose={() => setPaymentDrawerOpen(false)} />
            <SendInvoiceDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} /> */}
        </>
    )
}

export default PreviewActions
