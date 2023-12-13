import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest, {params}:{params:{id:string}})=>{
    const {id} = params
    console.log(id);
    // const id = 'cloq77izg0003v5a4yr6upvqu'
    try{
        const res = await prisma.product.findUnique({
            where:{
                id:id,
            }
        })
        return new NextResponse(JSON.stringify({data:res,status:200}))
    }catch(e){
        // console.log(e);
        return new NextResponse(JSON.stringify({message:'SomeThing went wrong',status:500}))
    }
}


export const DELETE=async(req:NextRequest, {params}:{params:{id:string}})=>{
    const {id} = params
    // console.log(id);
    const session = await getAuthSession();
    if(session?.user.isAdmin){
        try{
            await prisma.product.delete({
                where:{
                    id:id,
                }
            })
            return new NextResponse(JSON.stringify({message:'The item has deleted',status:200}))
        }catch(e){
            console.log(e);
            return new NextResponse(JSON.stringify({message:'SomeThing went wrong',status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({message:'You are not allowed',status:403}))
    }
}