'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
export const UserLinks = (props:{case:number}) => {
    const {status} = useSession()
    if(status==='authenticated')
        return props.case===1 
        ? <><Link href='/orders' className="text-red-600 text " >Orders</Link> <button onClick={()=>signOut()}>SignOut</button></>
        : <Link href='/orders' className='  text-white text-xl font-bold'>Orders</Link>
    else if(status==='unauthenticated')
        return props.case===1 
        ? <Link href='/login' className="text-red-600 text " >Login</Link>
        : <Link href='/login' className='text-white text-xl font-bold'>Login</Link>
    else return null
}
