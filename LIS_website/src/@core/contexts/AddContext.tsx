"use client"

// React Imports
import type { Dispatch, SetStateAction } from "react";
import { useState, createContext, useContext } from "react";

// Type Imports
import type { InventoryProductType } from '@/types/inventoryTypes'
import type { InvoiceProductType } from '@/types/invoiceTypes'

type AddContextProps = {
    selectData: InventoryProductType[],
    setSelectData: Dispatch<SetStateAction<InventoryProductType[]>>,
    selectDataInvoice: InvoiceProductType[],
    setSelectDataInvoice: Dispatch<SetStateAction<InvoiceProductType[]>>
}

export const AddContext = createContext<AddContextProps | undefined>(undefined);

export const AddProvider = ({ children }: { children: any }) => {
    const [selectData, setSelectData] = useState<InventoryProductType[]>([])
    const [selectDataInvoice, setSelectDataInvoice] = useState<InvoiceProductType[]>([])

    return (
        <AddContext.Provider value={{ selectData, setSelectData, selectDataInvoice, setSelectDataInvoice }}>
            {children}
        </AddContext.Provider>

    )
}

export const useAddContext = () => {
    const context = useContext(AddContext)

    if (context === undefined)
        throw new Error("UseContext is not found")
    else
        return context
}
