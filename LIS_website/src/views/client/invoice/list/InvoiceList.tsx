// MUI inports
import { Grid } from '@mui/material'

// Type imports
import type { InvoiceType } from '@/types/invoiceTypes'

// Component imports
import InvoiceListTable from '@views/client/invoice/list/InvoiceListTable'

const InvoiceList = ({ invoiceData, storeid }: { invoiceData: InvoiceType[], storeid: string }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoiceListTable tableData={invoiceData} storeid={storeid} />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
