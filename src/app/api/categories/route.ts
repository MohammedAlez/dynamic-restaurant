
import prisma from "@/utils/connect";
// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

// const prisma = new PrismaClient();
export  const GET=async()=>{
    try{
        const res = await prisma.category.findMany();
        // console.log(res);
        return NextResponse.json({data:res,status:200});
    }catch(e){
        console.log(e)
        return new NextResponse(JSON.stringify({message:'SomeThing Went Wrong'}),{status:200});
    }
}