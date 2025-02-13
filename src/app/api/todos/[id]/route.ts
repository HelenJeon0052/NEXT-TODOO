import { NextRequest, NextResponse } from 'next/server' 
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import db from '@/app/lib/prisma'

export async function GET(request:NextRequest, {params}:{params:{id:string}}) {

    const session = await getServerSession(authOptions)
    
    console.log('session')
    console.log(session)

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized user' },{status: 401},)
    }

    const requestedId = parseInt(params.id);

    const getPost = await db.post.findMany({
        where: {
            id:requestedId,
          },
    });

    if (!getPost) {
        return NextResponse.json({ error: "USER NOT FOUND" }, { status: 404 });
    }

    return NextResponse.json(getPost);

}


export async function DELETE(request:NextRequest, {params}:{params:{id:string}}) {

    const session = await getServerSession(authOptions)
    
    console.log('session')
    console.log(session)

    const response={
        message:'todos/:id deleted',
        data:{
            id:params.id,
        }
    }

    const findPost = await db.post.findUnique({
        where:{id:parseInt(params.id)}
    })

    if (!findPost) {
        return NextResponse.json({ error: "ACCOUNT DOES NOT EXISTS" }, { status: 404 });
    }

    const deletePost=await db.post.delete({
        where:{id:parseInt(params.id)}
    })

    return NextResponse.json(response, {status:200})

}

export async function POST( request: NextApiRequest, response: NextApiResponse) {

      

}

export async function PATCH(request:NextRequest, {params}:{params:{id:string}}) {

    
    const session = await getServerSession(authOptions)
    
    console.log('session')
    console.log(session)

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized user' },{status: 401},)
    }

    const body = await request.json()

    const getPost = await db.post.findUnique({
        where:{ id:parseInt(params.id) }
    })

    if (!getPost) {
        return NextResponse.json({ error: "POST DOES NOT EXISTS" }, { status: 404 });
    }

    const updatePost = await db.post.update({ 
        where: { id: parseInt(params.id) },
        data: {
          title: body.title,
          category: body.category,
          status: body.status,
        },
      });

    if(updatePost) {
        console.log('POST PATCHED')
    }

    return NextResponse.json(updatePost)

}