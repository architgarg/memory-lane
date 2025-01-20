import { z } from 'zod'

export const memorySchema = z.object({
  memory_lane_slug: z.string(),
  title: z.string(),
  description: z.string(),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  images: z.array(z.string()),
})

export type MemorySchema = z.infer<typeof memorySchema>;