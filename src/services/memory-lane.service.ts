import ApiClient from './api-client.ts'
import { MEMORY_LANES } from '../constants/api-urls.ts'
import { MemoryLane } from '../models/memory-lane.ts'

class MemoryLanesService extends ApiClient {

  async getMemoryLanes() {
    return this.get<{ memoryLanes: MemoryLane[] }>(MEMORY_LANES)
  }

  async getMemoryLaneById(id: number) {
    return this.get<{ memoryLane: MemoryLane }>(`${MEMORY_LANES}/${id}`)
  }

  async createMemoryLane(user_name: string, slug: string, description: string) {
    return this.post(MEMORY_LANES, { user_name, slug, description })
  }

  async updateMemoryLane(
    id: number,
    user_name: string,
    slug: string,
    description: string,
  ) {
    return this.put(`${MEMORY_LANES}/${id}`, {
      user_name,
      slug,
      description,
    })
  }

  async deleteMemoryLane(id: number) {
    return this.delete(`${MEMORY_LANES}/${id}`)
  }
}

export default MemoryLanesService
