'use client'
import { SessionProvider } from "next-auth/react"


type Props = {
    children:React.ReactNode
}
export const AuthProvider=({children}:Props)=>{
    // eslint-disable-next-line react/react-in-jsx-scope
    return <SessionProvider >
        {children}
    </SessionProvider>
}