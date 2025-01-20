import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { memorySchema } from '../../../backend/schemas/memory.schema'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const [memoryLane, memories] = await Promise.all([
        prisma.memoryLane.findUnique({
          where: { slug: id as string },
        }),
        prisma.memory.findMany({
          where: { memory_lane_slug: id as string },
        }),
      ])

      if (!memoryLane) {
        res.status(404).json({ error: 'Memory lane not found' })
        return
      }

      res.json({
        memoryLane,
        memories: memories.map((memory) => ({
          ...memory,
          images: JSON.parse(memory.images),
        })),
      })
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  } else if (req.method === 'PUT') {
    try {
      const validatedData = memorySchema.parse(req.body)
      const memory = await prisma.memory.update({
        where: { id: parseInt(id as string) },
        data: {
          ...validatedData,
          images: JSON.stringify(validatedData.images),
        },
      })
      res.json({ memory })
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.memory.delete({
        where: { id: parseInt(id as string) },
      })
      res.json({ message: 'Memory deleted successfully' })
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
