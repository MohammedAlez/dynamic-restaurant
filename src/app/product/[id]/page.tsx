import DeleteItem from '@/components/DeleteItem';
import PriceSettings from '@/components/PriceSettings'
import Image from 'next/image'
import React, {  } from 'react'

async function getData(id:string){
    const res = await fetch(process.env.API_URL + `/products/${id}`,{
        cache:'no-store'
    });
    if(!res.ok)
        return new Error('Failed fetch data')
    const data = await res.json();
    return data.data

}
const page = async({params}:{params:{id:string}}) => {
    const data = await getData(params.id);
    // console.log(data)
    return (
        <div className='relative h-screen p-4 md:py-28 flex flex-col md:flex-row justify-around'>
            <div className="relative flex-1 p-10 h-1/2 md:h-[50vh] ">
                <Image className='object-contain' src={data?.img} alt='' fill />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6 ">
                <h1 className="font-bold text-red-500 text-3xl">{data.title}</h1>
                <p className="text-red-500 font-medium text-lg">{data.desc}</p>
                <PriceSettings product={data}/>
                
            </div>
            <DeleteItem id={data.id}/>
        </div>
    )
}

export default page