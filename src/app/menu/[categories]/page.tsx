
import { Products } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getData=async(catSlug:string)=>{
    const res = await fetch(process.env.API_URL + `/products?catslug=${catSlug}`,{
        cache:'no-store'
    })

    if(!res.ok)
        return new Error("failed fetch data")
    const data = await res.json()
    return data.data
}
const page =async ({ params }: { params: { categories:string } }) => {
    // console.log(params.categories)
    const data:Products = await getData(params.categories)
    // console.log(data);
    return (
        <>{data.length!==0 ? <div className='flex flex-wrap mb-4'>
            {data && data?.map(item=><Link href={'/product/' + item.id} 
            className='odd:bg-[rgb(254 242 242 / 48%)] even:bg-red-50  flex flex-col justify-between hover:bborder-b-red-500 w-full sm:w-1/2 lg:w-1/3 h-[60vh] p-4 group relative z-[999]' key={item.id}>
                <div className="relative h-[80%]">
                    {item.img && <Image className='object-contain' src={item.img} fill alt=''/>}
                </div>
                <div className="flex justify-between items-center">
                    <h1 className='text-red-500 font-medium text-xl'>{item.title}</h1>
                    <div className="">
                        <span className="group-hover:hidden block text-red-500 font-medium text-xl">${item.price}</span>
                        <span className="group-hover:block hidden text-sm bg-red-500 text-white rounded-md px-2 font-medium p-1">Add to Cart</span>
                    </div>
                </div>
            </Link>)}
        </div>
        :
        <div className='p-8 text-bold text-red-500 font-bold text-2xl text-center min-h-[70vh] pt-14'>There&copy;s No Products Here</div>
    }</>)
}

export default page