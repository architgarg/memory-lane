import ApiClient from './api-client.ts'
import { MEMORY_LANES } from '../constants/api-urls.ts'
import { MemoryLane } from '@prisma/client'

class MemoryLanesService extends ApiClient {
  async create(name: string, slug: string, description: string) {
    return this.post(MEMORY_LANES, { user_name: name, slug, description })
  }

  async update(slug: string, user_name: string, description: string) {
    return this.put(`${MEMORY_LANES}/${slug}`, {
      user_name,
      description,
    })
  }

  async getBySlug(slug: string) {
    return this.get<MemoryLane>(`${MEMORY_LANES}/${slug}`)
  }
}

export const memoryLanesService = new MemoryLanesService()
