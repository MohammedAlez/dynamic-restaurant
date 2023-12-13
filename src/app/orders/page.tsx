'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Order } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'



const page = () => {
    const {status, data:user} = useSession()
    const router = useRouter();
    // console.log(user)
    const { isPending, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            fetch(process.env.NEXT_PUBLIC_URL + '/api/orders',{cache:"no-store"}).then(
                (res) => res.json(),
            ),
    })
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({id,status}:{id:string,status:string})=>{
            return fetch(process.env.NEXT_PUBLIC_URL + `/api/orders/${id}`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(status)
            })
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    })
    const handleUpadateStatus=(e:React.FormEvent<HTMLFormElement>, id:string)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement
        const status = input.value;
        mutation.mutate({id,status})
        input.value = "";
        toast.success('the status updated')
    }
    if(status === 'unauthenticated') 
        router.push('/login');
    if(isPending || status === 'loading') 
        return <div className="">Loading...</div>
    else 
        return (
            <div className='p-10'>
                <table className="w-full">
                    <thead className="">
                        <tr className="text-left">
                            <th className="py-2 px-1 hidden md:block">Order Id</th>
                            <th className="py-2 px-1 ">Date</th>
                            <th className="py-2 px-1 ">Price</th>
                            <th className="py-2 px-1 hidden md:block">Products</th>
                            <th className="py-2 px-1 ">Status</th>
                        </tr>
                    </thead>
                    <tbody className="gap-1">
                        {data?.data?.map((item:Order)=><tr key={item.id} className={` ${item.status!=='delevired' ? 'bg-red-200' : 'bg-gray-100 '}`}>
                            <td className="py-4 px-1 hidden md:block">{item.id}</td>
                            <td className="py-4 px-1 ">{item.createdAt.substring(0,10)}</td>
                            <td className="py-4 px-1 ">${item.price}</td>
                            <td className="py-4 px-1 hidden md:block">{item.products[0].title}</td>
                            {user?.user.isAdmin 
                            ? <td className="py-4 px-1 text-green-500">
                                <form className='flex justify-around gap-3' onSubmit={(e)=>handleUpadateStatus(e, item.id)}>
                                    <input className='px-2' placeholder={item.status}/>
                                    <button className="rounded-full bg-red-400 p-2">
                                        <Image src='/edit.png' width={20} height={20} alt=''/>
                                    </button>
                                </form>
                            </td>
                            : <td className="py-4 px-1 text-green-500">{item.status}</td>}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
}

export default page