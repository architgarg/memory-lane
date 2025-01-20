import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import { memorySchema } from './schemas/memory.schema.js'
import { memoryLaneSchema } from './schemas/memory-lane.schema.js'

const app = express()
const port = 4001
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.post('/memory-lanes', async (req, res) => {
  try {
    const validatedData = memoryLaneSchema.parse(req.body)
    const memoryLane = await prisma.memoryLane.create({
      data: validatedData,
    })
    res.status(201).json({ memoryLane })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put('/memory-lanes/:slug', async (req, res) => {
  const { slug } = req.params
  try {
    const validatedData = memoryLaneSchema.parse(req.body)
    const memoryLane = await prisma.memoryLane.update({
      where: { slug },
      data: validatedData,
    })
    res.json({ memoryLane })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post('/memories', async (req, res) => {
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
    res.status(400).json({ error: error.message })
  }
})

app.get('/memories/:memory_lane_slug', async (req, res) => {
  const { memory_lane_slug } = req.params
  try {
    const [memoryLane, memories] = await Promise.all([
      prisma.memoryLane.findUnique({
        where: { slug: memory_lane_slug },
      }),
      prisma.memory.findMany({
        where: { memory_lane_slug },
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
    res.status(500).json({ error: error.message })
  }
})

app.put('/memories/:id', async (req, res) => {
  const { id } = req.params
  try {
    const validatedData = memorySchema.parse(req.body)
    const memory = await prisma.memory.update({
      where: { id: parseInt(id) },
      data: {
        ...validatedData,
        images: JSON.stringify(validatedData.images),
      },
    })
    res.json({ memory })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete('/memories/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.memory.delete({
      where: { id: parseInt(id) },
    })
    res.json({ message: 'Memory deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
