import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { memoryLaneSchema } from '../../../backend/schemas/memory-lane.schema'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const validatedData = memoryLaneSchema.parse(req.body)
      const memoryLane = await prisma.memoryLane.create({
        data: validatedData,
      })
      res.status(201).json({ memoryLane })
    } catch (error: unknown) {
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
