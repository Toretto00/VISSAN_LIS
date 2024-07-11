// MUI inports
import { Grid } from '@mui/material'

// Type imports
import type { InventoryType } from '@/types/inventoryTypes'
import type { StoreLocationType } from '@/types/storeLocationTypes'

// Component imports
import InventoryListTable from '@views/inventory/list/InventoryListTable'

const InventoryList = ({ inventoryData, storeLocations }: { inventoryData: InventoryType[], storeLocations: StoreLocationType[] }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InventoryListTable tableData={inventoryData} storeLocations={storeLocations} />
      </Grid>
    </Grid>
  )
}

export default InventoryList
