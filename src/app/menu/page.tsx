// import { Menu } from '@/types/types' 
// import Link from 'next/link'
import React from 'react'

// const getData=async ()=> {
//     try{
//         console.log(process.env.API_URL + '/categories')
//         const res = await fetch(process.env.API_URL + '/categories',{cache:"no-store"})
//         const data = await res.json()
//         // console.log(data);
//         if (!res.ok) {
//             throw new Error('Failed to fetch data')
//         }
//         return data.data
//     }catch(e){
//         console.log(e);
//         throw e
//     }
// }


// const page = async() => {
//     const data:Menu = await getData()
//     return (
//         <div className='bg-red-50 p-4 md:py-16 flex flex-col min-h-screen md:h-[calc(100vh-130px)] md:flex-row'>
//             {/* {menu.map(category=><Link 
//             key={category.id} href={'/menu/' + category.slug} 
//             className='hover:scale-95 transition bg-cover md:min-h-2/3 min-h-1/3 p-4' style={{backgroundImage:`url(${category?.img})`}}>
//                 <div className={`p-4 w-2/3 h-full text-${category.color} flex flex-col justify-between gap-8`}>
//                     <h1 className="font-bold text-3xl uppercase">{category.title}</h1>
//                     <p className="text-xl font-medium">{category.desc}</p>
//                     <button className="bg-blue-950 text-white font-medium px-3 p-2 rounded-lg">Explore</button>
//                 </div>
//             </Link>)} */}
//             {data ? data?.map((category)=><Link 
//             key={category.id} href={'/menu/' + category.slug} 
//             className='hover:scale-95 transition bg-cover md:min-h-2/3 min-h-1/3 p-4 flex-1' style={{backgroundImage:`url(${category?.img})`}}>
//                 <div className={`p-4 w-2/3 h-full text-${category.color} flex flex-col justify-between gap-8`}>
//                     <h1 className="font-bold text-3xl uppercase">{category.title}</h1>
//                     <p className="text-xl font-medium">{category.desc}</p>
//                     <button className="bg-blue-950 text-white  font-medium px-3 p-2 rounded-lg">Explore</button>
//                 </div>
//             </Link>) : 
//             <div className=''>No Menu Yet</div>
//             }
//         </div>
//     )
// }

const page=async()=>{
    return <div className="">hello world</div>
}
export default page