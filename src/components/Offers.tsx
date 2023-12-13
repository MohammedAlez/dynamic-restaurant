import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'
// import CountDown from './CountDown'
const CountDown = dynamic(() => import('./CountDown'), { ssr: false })
const Offers = () => {
    return (
        <div className='bg-black min-h-screen flex flex-col md:flex-row-reverse py-8 md:bg-[url("/offerBg.png")]'>
            <div className="relative flex-1 min-h-[300px]">
                <Image src='/offerProduct.png'  className='object-contain' fill alt='' />
            </div>
            <div className="text-center md:text-left flex flex-col gap-8 items-center flex-1 md:items-start justify-center px-8">
                <h1 className="text-white text-6xl font-bold ">Delecious Burger & French Fry</h1>
                <p className="max-w-[500px] text-xl font-medium text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate ut dolorum accusamus placeat ipsam voluptatem,</p>
                <CountDown />
                <button className="bg-red-500 rounded-lg p-2 px-3 text-white font-medium ">
                    Order Now
                </button>
            </div>
        </div>
    )
}

export default Offers