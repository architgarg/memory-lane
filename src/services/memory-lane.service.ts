import ApiClient from './api-client.ts'
import { MEMORY_LANES } from '../constants/api-urls.ts'
import { MemoryLane } from '../models/memory-lane.ts'

class MemoryLanesService extends ApiClient {

  async getById(id: string) {
    return this.get<{ memoryLane: MemoryLane }>(`${MEMORY_LANES}/${id}`)
  }

  async create(user_name: string, slug: string, description: string) {
    return this.post(MEMORY_LANES, { user_name, slug, description })
  }

  async update(
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

  async deleteById(id: number) {
    return this.delete(`${MEMORY_LANES}/${id}`)
  }
}

export const memoryLanesService = new MemoryLanesService()