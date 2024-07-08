"use client"

// React Imports
import type { Dispatch, SetStateAction } from "react";
import { useState, createContext, useContext } from "react";

// Type Imports
import type { InventoryProductType } from '@/types/inventoryTypes'

type AddContextProps = {
    selectData: InventoryProductType[],
    setSelectData: Dispatch<SetStateAction<InventoryProductType[]>>
}

export const AddContext = createContext<AddContextProps | undefined>(undefined);

export const AddProvider = ({ children }: { children: any }) => {
    const [selectData, setSelectData] = useState<InventoryProductType[]>([])

    return (
        <AddContext.Provider value={{ selectData, setSelectData }}>
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
