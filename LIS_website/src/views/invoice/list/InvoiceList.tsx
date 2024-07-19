// MUI inports
import { Grid } from '@mui/material'

// Type imports
import type { InvoiceType } from '@/types/invoiceTypes'
import type { StoreLocationType } from '@/types/storeLocationTypes'

// Component imports
import InvoiceListTable from './InvoiceListTable'

const InvoiceList = ({ invoiceData, storeLocations }: { invoiceData: InvoiceType[], storeLocations: StoreLocationType[] }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoiceListTable tableData={invoiceData} storeLocations={storeLocations} />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
