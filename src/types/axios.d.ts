/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosResponse } from 'axios'

declare module 'axios' {
  export interface AxiosResponse {
    totalCount: number
    currPage: number
    list?: any[]
    message?: string
    resultCode?: number
  }
}
