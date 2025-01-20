import axios, { AxiosInstance } from 'axios'
import { BASEURL } from '../constants/api-urls.ts'

class ApiClient {
  protected client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: BASEURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.client.get(url)
    return response.data
  }

  protected async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.post(url, data)
    return response.data
  }

  protected async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.put(url, data)
    return response.data
  }

  protected async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url)
    return response.data
  }
}

export default ApiClient
