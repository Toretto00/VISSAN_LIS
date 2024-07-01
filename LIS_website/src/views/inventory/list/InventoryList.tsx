// MUI inports
import { Grid } from '@mui/material'

// Type imports
import type { InventoryType } from '@/types/inventoryTypes'

// Component imports
import InventoryListTable from '@views/inventory/list/InventoryListTable'

const InventoryList = ({ inventoryData }: { inventoryData: InventoryType[] }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InventoryListTable tableData={inventoryData} />
      </Grid>
    </Grid>
  )
}

export default InventoryList
