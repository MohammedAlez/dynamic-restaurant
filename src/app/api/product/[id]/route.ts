import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest, {params}:{params:{id:string}})=>{
    // const {id} = params
    // console.log(id);
    const id = 'cloq77izg0003v5a4yr6upvqu'
    console.log(params);
    // try{
    //     const res = await prisma.product.findUnique({
    //         where:{
    //             id:id,
    //         }
    //     })
    //     return new NextResponse(JSON.stringify({data:res,status:200}))
    // }catch(e){
    //     // console.log(e);
    //     return new NextResponse(JSON.stringify({message:'SomeThing went wrong',status:500}))
    // }
    return new NextResponse(JSON.stringify({message:params}));
}