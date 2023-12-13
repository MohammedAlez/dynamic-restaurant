
import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import CartItem from './CartItem'
import Image from 'next/image'
import { UserLinks } from './UserLinks'
import { getAuthSession } from '@/utils/auth'

const NavBar = async() => {
    const session = await getAuthSession();
    // console.log(session?.user.isAdmin)
    return (
        <div className="border-b-2  border-b-red-600">
            <div className='max-w-[1200px] justify-between text-red-600 flex  p-4 mx-auto items-center'>
                <div className=" gap-2 items-center hidden md:flex flex-1">
                    <Link href='/' className="text-red-600 text " >Home Page</Link>
                    <Link href='/menu' className="text-red-600 text " >Menu</Link>
                    <Link href='/' className="text-red-600 text " >Contact</Link>
                </div>
                <div className="text-xl font-bold flex-1 md:text-center ">
                    Pizzao
                </div>
                <div className=" hidden md:flex items-center gap-3 flex-1 justify-end">
                    <div className="rounded-lg p-2 flex gap-1 text-red-500 bg-red-200">
                        <Image src='/phone.png' alt='' width={20} height={20}/>
                        0658005590
                    </div>
                    {session?.user.isAdmin 
                    ? <Link href='/add' className='text-red-500 font-medium'>Add Product</Link> 
                    : <CartItem />}
                    <UserLinks case={1}/>
                </div>
                <div className="md:hidden">
                    <Menu />
                </div>
            </div>
        </div>
    )
}

export default NavBar