'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
const page = () => {
    const handleLogin=(e:React.MouseEvent<HTMLButtonElement>)=>{
        //make the button blured
        e.currentTarget.blur();
        signIn('google')
    }
    const router = useRouter();
    const {status} = useSession()
    // console.log(status);
    if(status==='loading')
        return <p>Loading...</p>
    if(status==='authenticated')
        router.push('/')
    else return (
        <div className='flex justify-center items-center md:py-7'>
            <div className="border  md:rounded-lg overflow-hidden max-w-[1000px] h-screen flex flex-col md:flex-row ">
                <div className="relative h-full min-h[30vh] flex-1 min-w-[300px]">
                    <Image src='/loginBg.png' className='object-cover' alt='' fill />
                </div>
                <div className=" flex-[2] md:flex-1 p-4 px-6  gap-6 flex flex-col">
                    <h1 className="text-center md:text-left text-2xl font-bold ">Welcome</h1>
                    <p className="text-center md:text-left font-medium ">Log into your account or create a one using the social buttons</p>
                    <div className="text-center ">
                        <button onClick={handleLogin} className="mx-auto md:mx-0 transition focus:scale-90 hover:bg-gray-50 rounded-lg p-2 px-4 mb-3 items-center  w-[280px] font-medium flex gap-4 border border-">
                            <Image width={30} height={30} src='/facebook.png' alt='' />
                            Sign in using Facebook
                        </button>
                        <button onClick={handleLogin} className="mx-auto md:mx-0 transition focus:scale-90 hover:bg-gray-50 rounded-lg p-2 px-4 w-[280px] items-center  font-medium flex gap-4 border border-">
                            <Image width={30} height={30} src='/google.png' alt='' />
                            Sign in using Google
                        </button>
                    </div>
                    <div className="text-center md:text-left ">
                        Have a problem? 
                        <Link href='' className='underline font-bold'> Contact us</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page