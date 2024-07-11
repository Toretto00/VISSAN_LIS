"use client"

// React Imports
import type { Dispatch, SetStateAction } from "react";
import { useState, createContext, useContext } from "react";

// Third-party Imports
import dayjs from 'dayjs'

type ClientInventoryContextProps = {
    startDate: any,
    setStartDate: Dispatch<SetStateAction<any>>,
    endDate: any,
    setEndDate: Dispatch<SetStateAction<any>>
}

export const AddContext = createContext<ClientInventoryContextProps | undefined>(undefined);

export const AddProvider = ({ children }: { children: any }) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState(dayjs())

    return (
        <AddContext.Provider value={{
            startDate,
            setStartDate,
            endDate,
            setEndDate
        }}>
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
