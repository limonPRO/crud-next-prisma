// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma= new PrismaClient()
type Data = {
  title: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
   if(req.method=="POST"){
    const {id}=req.body
    // const existPost = await prisma.post.findUnique({ where: { id: 2 } })
    // if (!existPost) {
    //   res.status(404).json({ title: 'Post not found' })
    // }
    const deletedPost = await prisma.post.delete({ where: { id: id } })
    res.status(200).json(deletedPost)
  }
}
