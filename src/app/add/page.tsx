'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React,{ useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase';

const storage = getStorage(app);

const page = () => {
    const {data, status} = useSession();
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState('');
    const [inputs, setInputs] = useState({
        title:'',
        desc:'',
        price:0,
        catSlug:'',
        img:''
    })
    const [priceOption, setPriceOption] = useState({
        title:'',
        additionalPrice:0
    })
    const [file, setFile] = useState<File>()
    const [options, setOptions] = useState<{title:string,additionalPrice:number}[]>([])
    const handleChangeImg=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0]
        setFile(item)

        const url =  URL.createObjectURL(item)
        setImageUrl(url)
    }
    // const upload=async()=>{
    //     const data = new FormData();
    //     data.append('file', file!)
    //     data.append('upload_preset', 'resturant')
    //     const res = await fetch('https://api.cloudinary.com/v1_1/ddam9qqz6/image',{
    //         method:'POST',
    //         headers:{'Content-Type':'multipart/form-data'},
    //         body: data
    //     })
    //     const resData = await res.json();
    //     return resData.url ;

    // }
    // const upload = async () => {
    //     const data = new FormData();
    //     data.append('file', file!);
    //     data.append('upload_preset', 'resturant');
    
    //     try {
    //         const res = await fetch('https://api.cloudinary.com/v1_1/mohammed.alez/image/upload', {
    //             method: 'POST',
    //             body: data,
    //         });
    
    //         const resData = await res.json();
    //         return resData.url;
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //         throw error;
    //     }
    // };
    
    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const changePriceOption=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPriceOption(prev=>{
            return {...prev, [e.target.name]:e.target.value};
        })
    }
    const updateOptions=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(priceOption.title!=='' && priceOption.additionalPrice>=0){
            setOptions(prev=>{
                return [...prev, priceOption];
            })
        }else
            toast.warning('please fill the price option title or price')
    }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        // const img = await upload();
        try{
            const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/products',{
                method:'POST',
                body:JSON.stringify({
                    ...inputs,
                    options,
                })
            })
            const data = await res.json();
            router.push(`/product/${data.data.id}`)
            toast.success('Item created successfully')
        }catch(e){
            console.log(e);
            toast.error("some thing went wrong")
        }
    }
    useEffect(()=>{
        const upload=()=>{
            const name = new Date().getTime() + (file?.name || "")
            const storageRef = ref(storage, name);
            if(file){
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed', 
                () => {
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // // console.log('Upload is ' + progress + '% done');
                    // switch (snapshot.state) {
                    // case 'paused':
                    //     // console.log('Upload is paused');
                    //     break;
                    // case 'running':
                    //     // console.log('Upload is running');
                    //     break;
                    // }
                }, 
                () => {}, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setInputs(prev=>{
                            return {...prev,'img':downloadURL}
                        })
                    });
                }
                );
            }
        }
        file && upload()
    },[file])
    if(status==='loading') 
        return <div className="">Loading</div>
    else if(!data?.user.isAdmin || status!=='authenticated')
        router.push('/')
    return (
        <div className='max-w-[1000px] mx-auto py-4 px-2'>
            <h1 className='font-bold text-2xl text-red-500 '>Add Product</h1>
            <form className="py-3" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2 mb-3'>
                    <div className="border-red-300 border rounded-sm focus:outline-red-500 px-3 p-2 text-red-500">
                        <span className='block font-medium text-red-500'>Image</span>
                        {imageUrl && <Image className='mx-auto' src={imageUrl} width={300} height={200} alt=''/>}
                        <input onChange={handleChangeImg} type="file" placeholder='Enter the product title' className="rounded-sm px-3 p-2 text-red-500" name='title'/>
                    </div>
                </div>
                <label className='flex flex-col gap-2 mb-3'>
                    <span className='block font-medium text-red-500'>Title</span>
                    <input onChange={handleChange} type="text" placeholder='Enter the product title' className="border-red-300 border rounded-sm focus:outline-red-500 px-3 p-2 text-red-500" name='title'/>
                </label>
                <label className='flex flex-col gap-2 mb-3'>
                    <span className='block font-medium text-red-500'>Description</span>
                    <textarea onChange={handleChange} placeholder='Enter the description' className="border-red-300 border rounded-sm focus:outline-red-500 px-3 p-2 text-red-500" name='desc'/>
                </label>
                <label className='flex flex-col gap-2 mb-3'>
                    <span className='block font-medium text-red-500'>Category</span>
                    <select name='catSlug' id="" onChange={handleChange} className="border-red-300 border rounded-sm focus:outline-red-500 px-3 p-2 text-red-500">
                        <option selected value='burgers'>Burgers</option>
                        <option value='pizzas'>Pizzas</option>
                        <option value='pastas'>Pastas</option>
                    </select>
                </label>
                <label className='flex flex-col gap-2 mb-3'>
                    <span className='block font-medium text-red-500'>Price</span>
                    <input onChange={handleChange} type="number" placeholder='Enter the product price' className="border-red-300 border rounded-sm focus:outline-red-500 px-3 p-2 text-red-500" name='price'/>
                </label>
                <label className='flex flex-col gap-2 mb-3'>
                    <span className='block font-medium text-red-500'>Price Options</span>
                    <div className="flex flex-col md:flex-row gap-3">
                        <input onChange={changePriceOption} name='title' type="text" placeholder='Enter the option title' className="flex-1 border-red-300 border rounded-sm focus:outline-red-500 px-3 p-2 text-red-500" />
                        <input onChange={changePriceOption} name='additionalPrice' type="number" placeholder='Enter the option price' className="flex-1 border-red-300 border rounded-sm focus:outline-red-500 px-3 p-2 text-red-500" />
                        <button onClick={updateOptions} className="hover:text-white font-medium w-fit text-sm p-1 transition  text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-500 ">add option</button>
                    </div>
                </label>
                <div className="flex gap-2">
                    {options.map((option, index)=><div key={index} onClick={()=>setOptions(prev=>prev.filter(item=>item.title!==option.title))} className="flex gap-2 mb-3 cursor-pointer">
                        <span className="rounded-lg w-fit border border-red-500 p-2 font-medium text-sm flex-1 text-red-500">{option.title} ${option.additionalPrice}</span>
                    </div>)}
                </div>
                <button className="px-3 p-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition font-medium">Create Product</button>
            </form>
        </div>
    )
}

export default page