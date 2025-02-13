import { NextRequest, NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/app/lib/prisma'

export async function GET(request:NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response('Session not found', {
          status: 401
        })
    }
    
    console.log('user')
    console.log(session)
    
    const data = await db.post.findMany({
        where: { 
            userId:session.user?.id
         },
        include: {
            user:true
        },
        orderBy: {
            createdAt:'desc'
        }
    })

    if(!data) {
        NextResponse.json('post fetching error', {status:401})
    }

    return NextResponse.json(data, {status:200})
}

export async function POST( request: NextRequest, response: NextResponse) {

    const session = await getServerSession(authOptions)
  
    if (!session) {
        return NextResponse.json({error:'Session Issue:No Session'}, {status:401})
     }

    const prismaUser = await db.user.findUnique({
      where: {
          id:session.user?.id
      },
      include: {
          accounts:true
      }
    })


    try {
          const body = await request.json()

          console.log('POST body')
          console.log(body)
          
          if (!body.title) {
            return NextResponse.json({ error: "title is required" }, { status: 200 });
          }

          const result = await db.post.create({
          data: {
              title: body.title as string,
              category: body.category as string,
              status: body.status as string,
              userId: prismaUser?.id as string,
          },
          });

          return NextResponse.json(result, {status:201});
      } 
     catch (e) {
          console.log(e);
          NextResponse.json({ err: "Error has occured while making a post" }, {status:402});
      }
}

export async function DELETE(request:NextRequest, {params}:{params:{id:string}}) {

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