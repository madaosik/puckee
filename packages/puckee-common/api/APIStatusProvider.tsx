import React, { useState, useCallback } from 'react'
import { AlertReport, AlertType } from '../types'

export const APIStatusContext = React.createContext({
  status: undefined,
  addStatus: (type: AlertType, msg: string) => {},
  removeStatus: () => {},
})

interface APIStatusProviderProps {
    children: React.ReactNode
}

export default function APIStatusProvider({ children }: APIStatusProviderProps) {
  const [status, setStatus] = useState<AlertReport | undefined>()

  const removeStatus = () => setStatus(undefined)
  const addStatus = (type: AlertType, msg: string) => setStatus({ type, msg })

  const contextValue = {
    status,
    addStatus: useCallback((type: AlertType, msg: string) => addStatus(type, msg), []),
    removeStatus: useCallback(() => removeStatus(), []),
  }

  return (
    <APIStatusContext.Provider value={contextValue}>
      {children}
    </APIStatusContext.Provider>
  )
}