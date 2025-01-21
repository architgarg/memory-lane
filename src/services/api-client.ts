import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASEURL } from '../constants/api-urls.ts'

interface ErrorResponse {
  error: string
}

class ApiClient {
  protected client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: BASEURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const errorMessage =
          (error.response?.data as ErrorResponse)?.error ?? 'An error occurred'
        return Promise.reject(new Error(errorMessage))
      },
    )
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.client.get(url)
    return response.data
  }

  protected async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post(url, data, config)
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
