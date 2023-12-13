'use client'
import { useCartStore } from '@/utils/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const CartItem = () => {
    const {totalItems} = useCartStore();
    useEffect(()=>{
        useCartStore.persist.rehydrate();
    },[])
    return (
        <div className=''>
            <Link href='/cart' className=" flex gap-2 ">
                <Image src='/cart.png' alt='' width={25} height={25}/>
                <span className="text-white font-bold md:text-red-600 md:text-base text-xl">Cart({totalItems})</span>
            </Link>
        </div>
    )
}

export default CartItem