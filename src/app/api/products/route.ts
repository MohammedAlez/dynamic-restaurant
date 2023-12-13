import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET(request:NextRequest){
    const { searchParams } = new URL(request.url)
    const catSlug = searchParams.get('catslug') 
    try{
        const res = await prisma.product.findMany({
            where:{
                ...(catSlug ? {catSlug} : {isFeatured:true})
            }
        });
        // console.log(res);
        return NextResponse.json({data:res,status:200});
    }catch(e){
        console.log(e)
        return new NextResponse(JSON.stringify({message:'SomeThing Went Wrong'}),{status:200});
    }
}

export async function POST(req:NextRequest){
    try{
        const body = await req.json();
        const res = await prisma.product.create({
            data:body
        })
        return new NextResponse(JSON.stringify({data:res,status:200}))
    }catch(e){
        console.log(e);
        return new NextResponse(JSON.stringify({message:'something went wrong'}))
    }
}