import type { ProductType } from "./productTypes"

export type InvoiceType =
{
    id: number,
    date: string,
    status: string,
    user: {
      id: number,
      username: string,
      password: string,
      role: string
    },
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

export type InvoiceDetailType = {  
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
      product: {
        id: number,
        category: string,
        name: string,
        code: string,
        description: string,
        created: string,
        updated:string
      },
      invoice: InvoiceType,
      quantity: number,
      created: string,
      updated: string
    }
  ]  
}

export type InvoiceProductType = {   
  product: ProductType,
  quantity: number
}
