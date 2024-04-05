import React, { createContext, useContext } from 'react'

const TableContext = createContext()

const TableContextProvider = ({children}) => {
  
    return (
        <TableContext.Provider value={{}}>
            {children}
        </TableContext.Provider>
    )
}

// Global Custom Hook
const useGlobalContext = () => {
    return useContext(TableContext)
}

export { TableContext, TableContextProvider, useGlobalContext}