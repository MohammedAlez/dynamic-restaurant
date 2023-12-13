import { Products } from '@/types/types'
import Image from 'next/image'
import React from 'react'

const getData=async()=>{
    const res = await fetch(process.env.API_URL + `/products`)

    if(!res.ok)
        return new Error("failed fetch data")
    const data = await res.json()
    return data.data
}

const Featured = async() => {
    const data:Products = await getData()
    return (
        <div className='w-screen max-w-full overflow-x-scroll '>
            {/* Wrapper */}
            <div className="flex w-max mx-auto">
                {/* item */}
                {data.map(item=><div key={item.id} className="w-screen md:w-[50vh] lg:min-w-[33vh] flex flex-col gap-3 items-center group hover:bg-red-50 transition p-4">
                    <div className="relative w-[250px] h-[250px] group-hover:scale-90 transition">
                        {item.img && <Image src={item.img} fill alt=''/>}
                    </div>
                    <h1 className="text-red-500 font-bold">
                        {item.title}
                    </h1>
                    <p className='text-red-500 text-center'> 
                        {item.desc}    
                    </p>
                    <div className="">
                        <span className="text-red-500 font-bold block mb-2 text-center">${item.price}</span>
                        <button className='text-white p-2 px-3 bg-red-500 rounded-lg font-medium'>Add to Cart</button>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default Featured