// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { InventoryDetailType } from '@/types/inventoryTypes'

// Component Imports
import PreviewActions from './PreviewActions'
import PreviewCard from './PreviewCard'

const Preview = ({ inventoryData, id }: { inventoryData: InventoryDetailType; id: number }) => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={9}>
                <PreviewCard inventoryData={inventoryData} id={id} />
            </Grid>
            <Grid item xs={12} md={3}>
                <PreviewActions id={id} />
            </Grid>
        </Grid>
    )
}

export default Preview
