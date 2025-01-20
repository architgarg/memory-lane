import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { memoryLaneSchema } from '../../../backend/schemas/memory-lane.schema'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query

  if (req.method === 'PUT') {
    try {
      const validatedData = memoryLaneSchema.parse(req.body)
      const memoryLane = await prisma.memoryLane.update({
        where: { slug: slug as string },
        data: validatedData,
      })
      res.json({ memoryLane })
    } catch (error: unknown) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
