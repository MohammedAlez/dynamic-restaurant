'use client'
import { cartItem } from '@/types/types';
import { useCartStore } from '@/utils/store';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect } from 'react'

const page = () => {
    const {totalItems, products, totalPrice, removeFromCart} = useCartStore();
    useEffect(()=>{
        useCartStore.persist.rehydrate();
    },[])
    return (
        <>
            {products.length===0 ? 
                <h1 className='text-center text-red-500 h-screen pt-16'>
                    No Items
                    <Link href='/menu' className='ml-6 underline text-gray-600 '>Go to Shop</Link>
                </h1>
                :
                <div className='flex md:flex-row flex-col h-screen '>
                    <div className="overflow-y-scroll flex-1 gap-2 md:flex-[2] lg:flex-1 p-3 md:p-4 justify-center flex flex-col">
                        {products?.map((item:cartItem)=><div key={item.id} className="flex gap-2  justify-between text-red-500 items-center w-full max-w-[500px] mx-auto p-2">
                            <div className="relative w-[100px] h-[100px] ">
                                {item.img && <Image src={item?.img} alt='' fill />}
                            </div>
                            <div className="">
                                <span className="block text-lg font-bold ">{item.title}*{item.quantity}</span>
                                <span className="block ">{item.optionTitle}</span>
                            </div>
                            <div className="text-md font-medium">${item.price.toFixed(2)}</div>
                            <div onClick={()=>removeFromCart(item)} className="flex justify-center items-center w-8 rounded-full cursor-pointer  h-8 hover:bg-red-50 text-sm font-bold ">X</div>
                        </div>)}
                    </div>
                    <div className="flex-1 gap-3 font-medium text-red-500 p-3 md:p-4 items-center bg-red-50 flex flex-col justify-center">
                        <div className="flex justify-between max-w-[400px] min-w-[350px] ">
                            <span className="">Subtotal ({totalItems} items)</span>
                            <span className="">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between max-w-[400px] min-w-[350px] ">
                            <span className="">Service Cost</span>
                            <span className="">$0.00</span>
                        </div>
                        <div className="flex justify-between max-w-[400px] min-w-[350px] ">
                            <span className="">Delivery Cost</span>
                            <span className="text-green-500">$0.00</span>
                        </div>
                        <div className="flex justify-between max-w-[400px] min-w-[350px] ">
                            <span className="uppercase">total (incl. vat)</span>
                            <span className="text-lg font-bold ">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="text-right mt-7 max-w-[400px] min-w-[350px] ">
                            <button className="uppercase px-3 p-2 rounded-lg text-white bg-red-500">CheckOut</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default page