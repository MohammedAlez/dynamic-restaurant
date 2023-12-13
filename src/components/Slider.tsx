'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const data = [
    {
        title:'ALWAYS FRESH & ALWAYS CRISPY & ALWAYS HOT',
        img:'/slide1.png',
    },
    {
        title:'WE DELIVER YOUR ORDER WHEREVER YOU ARE IN NY',
        img:'/slide2.png',
    },
]

const Slider = () => {
    
    const [current, setCurrent] = useState(0);
    useEffect(()=>{
        const interval = setInterval(
            ()=>{setCurrent(prev=>(prev===data.length-1 ? 0 : prev + 1))},5000)
        return ()=>clearInterval(interval)
    },[])
    return (
        <div className='h-[calc(100vh-128px)] flex flex-col md:flex-row '>
            <div className="flex-1 h-1/2 px-6 bg-red-50 md:h-full flex flex-col items-center gap-8 justify-center">
                <div className="text-4xl text-red-500 font-bold text-center">{data[current].title}</div>
                <button className='rounded-lg p-2 px-3 text-white hover:bg-red-600 bg-red-500 transition font-medium'>
                    Order Now
                </button>
            </div>
            <div className="flex-1 relative h-1/2 md:h-full w-full">
                <Image fill src={data[current].img} className='object-cover' alt='' />
            </div>
        </div>
    )
}

export default Slider