import ApiClient from './api-client.ts'
import { IMAGES } from '../constants/api-urls.ts'

class ImageUploadService extends ApiClient {
  async upload(file: File) {
    const formData = new FormData()
    formData.append('fileToUpload', file)

    const response = await this.post<{ url: string }>(IMAGES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.url
  }
}

export const imageUploadService = new ImageUploadService()
