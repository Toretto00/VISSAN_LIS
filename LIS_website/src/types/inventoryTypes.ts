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

export type InventoryDetailType = {
  id: number,
  store: {
    id: number,
    warehouseid: string,
    storeid: string,
    retailname: string,
    retailsystem: string,
    shortname: string
  },
  products: [
    {
      id: number,
      inventory: {
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
      },
      product: {
        id: number,
        category: string,
        name: string,
        code: string,
        description: string,
        created: string,
        updated: string
      },
      quantity: number,
      created: string,
      updated: string
    }
  ],
  created: string,
  updated: string
        
}
