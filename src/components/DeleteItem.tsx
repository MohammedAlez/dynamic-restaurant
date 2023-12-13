'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';



const DeleteItem = ({id}:{id:string}) => {
    const {data, status} = useSession();
    const router = useRouter();
    const handleDelete=async()=>{
        const res = await fetch(`http://localhost:3000/api/products/${id}`,{
            cache:'no-store',
            method:'DELETE'
        })
        if(!res.ok)
            return new Error('failed')
        toast.success('The item has deleted');
        router.push('/menu');
    }
    if(status === 'unauthenticated' || !data?.user.isAdmin)
        return ;
    return (
        <button
        onClick={handleDelete}
        className='top-6 right-6 absolute font-medium rounded-lg px-3 p-2 text-white bg-red-600 hover:bg-red-500'
        >Delete</button>
    )
}

export default DeleteItem