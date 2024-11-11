'use client'
import { UserProvider } from "./components/UserContext"

export function Providers({children}) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}
