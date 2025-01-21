import { z } from 'zod'

export const memoryLaneSchema = z.object({
  user_name: z.string(),
  slug: z.string(),
  description: z.string(),
})

export type MemoryLaneSchema = z.infer<typeof memoryLaneSchema>
