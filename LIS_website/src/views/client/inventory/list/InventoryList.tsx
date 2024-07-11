// MUI inports
import { Grid } from '@mui/material'

// Type imports
import type { InventoryType } from '@/types/inventoryTypes'

// Component imports
import InventoryListTable from '@views/client/inventory/list/InventoryListTable'

const InventoryList = ({ inventoryData, storeid }: { inventoryData: InventoryType[], storeid: string }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InventoryListTable tableData={inventoryData} storeid={storeid} />
      </Grid>
    </Grid>
  )
}

export default InventoryList
