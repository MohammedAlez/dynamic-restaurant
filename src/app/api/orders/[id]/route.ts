import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, {params}:{params:{id:string}}){
    const {id} = params
    // console.log(id);
    try{
        const body = await req.json();
        await prisma.order.update({
            where:{
                id:id,
            },
            data:{status:body}
        })
        // console.log('updated')
        return new NextResponse(JSON.stringify({message:'Order has been updated',status:200}))
    }catch(e){
        console.log(e);
        return new NextResponse(JSON.stringify({message:'SomeThing went wrong',status:500}))
    }
}