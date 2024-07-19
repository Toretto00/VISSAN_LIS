'use client'

// React Imports
import { useRef } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { InvoiceDetailType } from '@/types/invoiceTypes'

// Component Imports
import PreviewActions from './PreviewActions'
import PreviewCard from './PreviewCard'

// Third-party Imports
import printJS from "print-js";

const Preview = ({ invoiceData, id }: { invoiceData: InvoiceDetailType; id: string }) => {

    const handlePrint = () => {
        printJS({
            printable: 'InventoryCard',
            type: 'html',
            targetStyles: ['*'],
            targetStyle: ['*'],
            frameId: 'printJS',
            documentTitle: `Invenntory ${id}`,
        })
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={9} >
                <PreviewCard invoiceData={invoiceData} id={id} />
            </Grid>
            <Grid item xs={12} md={3}>
                <PreviewActions id={id} handlePrint={handlePrint} />
            </Grid>
        </Grid >
    )
}

export default Preview
