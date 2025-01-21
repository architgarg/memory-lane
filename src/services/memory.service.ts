import ApiClient from './api-client.ts'
import { MEMORIES } from '../constants/api-urls.ts'
import { MemoryLane } from '@prisma/client'
import { MemorySchema } from '../schemas/memory.schema.ts'

class MemoriesService extends ApiClient {
  async getByMemoryLaneSlug(memoryLaneSlug: string) {
    return this.get<{ memoryLane: MemoryLane; memories: MemorySchema[] }>(
      `${MEMORIES}/${memoryLaneSlug}`,
    )
  }

  async createMemory(
    memoryLaneSlug: string,
    title: string,
    description: string,
    timestamp: string,
    images: string[],
  ) {
    return this.post(MEMORIES, {
      memory_lane_slug: memoryLaneSlug,
      title,
      description,
      timestamp,
      images,
    })
  }

  async updateMemory(
    id: number,
    memoryLaneSlug: string,
    title: string,
    description: string,
    timestamp: string,
    images: string[],
  ) {
    return this.put(`${MEMORIES}/${id}`, {
      memory_lane_slug: memoryLaneSlug,
      title,
      description,
      timestamp,
      images,
    })
  }

  async deleteMemory(id: number) {
    return this.delete(`${MEMORIES}/${id}`)
  }
}

export const memoriesService = new MemoriesService()
