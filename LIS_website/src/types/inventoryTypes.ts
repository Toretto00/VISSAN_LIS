export type InventoryType = {
    id: number,
    location: {
      id: number,
      warehouseid: string,
      storeid: string,
      retailname: string,
      retailsystem: string,
      shortname: string
    },
    created: string,
    updated: string
          
}