import ApiClient from './api-client.ts'
import { MEMORY_LANES } from '../constants/api-urls.ts'

class MemoryLanesService extends ApiClient {
  async create(user_name: string, slug: string, description: string) {
    return this.post(MEMORY_LANES, { user_name, slug, description })
  }

  async update(
    slug: string,
    user_name: string,
    description: string,
  ) {
    return this.put(`${MEMORY_LANES}/${slug}`, {
      user_name,
      description,
    })
  }
}

export const memoryLanesService = new MemoryLanesService()