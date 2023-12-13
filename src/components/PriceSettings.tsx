'use client'

import { Product } from '@/types/types'
import { useCartStore } from '@/utils/store'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    product:Product
}
const PriceSettings = ({product}:Props) => {
    const [total, setTotal] = useState(parseFloat(product.price));
    const [quantity, setQuantity] = useState(1);
    const [type, setType] = useState(0);
    const {addToCart} = useCartStore();
    useEffect(()=>{
        if(product.options && product.options.length!==0){
            setTotal(quantity * (parseFloat(product.price) + parseFloat(product.options[type]?.additionalPrice)))
        }else
            setTotal(quantity * parseFloat(product.price))
        
    },[quantity, type])
    useEffect(()=>{
        useCartStore.persist.rehydrate();
    },[])
    const handleAddToCart=()=>{
        addToCart({ 
        id: product.id.toString(),  
        title:product.title, 
        img: product.img, 
        price: total, 
        ...(product.options?.length && {optionTitle: product?.options[type]?.title}),
        quantity})
        toast.success('Item added to cart');
    }
    return (<>
        <div className="font-bold text-red-500">${total.toFixed(2)}</div>
        <div className="flex gap-6">
            {product.options?.map((item, index)=><button 
            key={index} 
            onClick={()=>setType(index)}
            className={` p-2 px-3 border border-red-500 ${type===index ? 'bg-red-500 text-white' : 'text-red-500'} rounded-lg  font-medium`}
            >{item.title}</button>
            )}
        </div>
        <div className="flex">
            <div className=" border border-red-500 p-4 py-3 flex justify-between w-[200px] font-medium text-red-500">
                Quantity
                <div className=" flex gap-2 items-center">
                    <span onClick={()=>setQuantity(quantity!=1 ? quantity-1 : quantity)}className='transition h-6 text-lg font-bold cursor-pointer hover:bg-red-100 rounded-full w-6 inline-flex justify-center items-center'>-</span>
                    {quantity}
                    <span onClick={()=>setQuantity(quantity+1)}className='transition h-6 text-lg font-bold cursor-pointer hover:bg-red-100 rounded-full w-6 inline-flex justify-center items-center'>+</span>
                </div> 
            </div>
            <button onClick={handleAddToCart} 
                className="p-4 py-3 bg-red-500  text-white font-medium">
                Add to Cart
            </button>
        </div>
    </>)
}

export default PriceSettings