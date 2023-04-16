// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { data } from 'autoprefixer'

const prisma= new PrismaClient()
type Data = {
  title: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  if(req.method=="POST"){

   const {id,title}=req.body
    // const existPost = await prisma.post.findUnique({ where: { id: 3 } })
    // if (!existPost) {
    //   res.status(404).json({ title: 'Post not found' })
    //   return
    // }
    
    const updatedPost = await prisma.post.update({ 
        where: { id: id },
        data: { title: title}
      })
      res.status(200).json(updatedPost)
    }
}
