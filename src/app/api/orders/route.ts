import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export async function GET(){
    const session = await getAuthSession();
    // console.log(session?.user.isAdmin)
    if(session?.user){
        try{
            if(session.user.isAdmin){
                const res = await prisma.order.findMany();
                return NextResponse.json({data:res,status:200});
            }
            const res = await prisma.order.findMany({
                where:{
                    userEmail:session.user.email!
                }
            });
            // console.log(res);
            return NextResponse.json({data:res,status:200});
        }catch(e){
            console.log(e)
            return new NextResponse(JSON.stringify({message:'SomeThing Went Wrong'}),{status:200});
        }
    }else{
        return new NextResponse(JSON.stringify({message:'You are not authenticated'}),{status:401});
    }
}