import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { memorySchema } from '../../../backend/schemas/memory.schema'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const validatedData = memorySchema.parse(req.body)
      const memory = await prisma.memory.create({
        data: {
          ...validatedData,
          images: JSON.stringify(validatedData.images),
        },
      })
      res.status(201).json({ memory })
    } catch (error) {
      res
        .status(400)
        .json({
          error: error instanceof Error ? error.message : 'An error occurred',
        })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
