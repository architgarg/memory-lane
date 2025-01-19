import ApiClient from './api-client.ts'
import { MEMORIES } from '../constants/api-urls'
import { MemoryLane } from '../models/memory-lane'

class MemoriesService extends ApiClient {
  async getMemoryById(id: number) {
    return this.get<{ memory: MemoryLane }>(`${MEMORIES}/${id}`)
  }

  async createMemory(
    memory_lane_id: number,
    title: string,
    description: string,
    timestamp: string,
    images: string,
  ) {
    return this.post(MEMORIES, {
      memory_lane_id,
      title,
      description,
      timestamp,
      images,
    })
  }

  async updateMemory(
    id: number,
    memory_lane_id: number,
    title: string,
    description: string,
    timestamp: string,
    images: string,
  ) {
    return this.put(`${MEMORIES}/${id}`, {
      memory_lane_id,
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
