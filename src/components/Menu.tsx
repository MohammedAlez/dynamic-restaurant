'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import CartItem from './CartItem';
import { UserLinks } from './UserLinks';

const Menu = () => {
    const [open, setOpen] = useState(false);
    const urls = [
        {id:1,name:'Home Page',url:'/'},
        {id:1,name:'Menu',url:'/menu'},
        {id:1,name:'Working Hours',url:'/'},
        {id:1,name:'Contact',url:'/'},
    ]
    return (
        <div className=''>
            <div className="cursor-pointer md:hidden" >
                <Image src='/open.png' width={20} height={20} alt='' onClick={()=>setOpen(true)}/>
            </div>
            {open && <div className="z-[99999] md:hidden py-16 flex flex-col gap-8 items-center w-full bg-red-500 fixed top-0 left-0 h-screen h-[calc(100vh - 96px)]">
                <div className="fixed cursor-pointer top-4 right-4 bg-white w-[50px] h-[50px] flex justify-center items-center rounded-full">
                    <Image src='/close.png' width={20} height={20}  alt='' onClick={()=>setOpen(false)}/>
                </div>
                {urls.map(item=>
                    <Link href={item.url} onClick={()=>setOpen(false)} className="text-white text-xl font-bold" key={item.id}>
                        {item.name}
                    </Link>
                )}
                <div className="" onClick={()=>setOpen(false)}>
                    <UserLinks case={2}/>
                </div>
                <CartItem />
            </div>}
        </div>
    )
}

export default Menu