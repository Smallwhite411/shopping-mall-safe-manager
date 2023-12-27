import { AxiosRequestConfig } from 'axios'
declare global {
  interface WebResponse<T = any> {
    code: number
    message: string
    data?: T
  }
  interface AxiosResponseI<T, D> {
    (data?: T): Promise<WebResponse<D>>
  }
  interface requestType {
    <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>
  }
  interface enumType {
    key: string
    value: string
  }
}
