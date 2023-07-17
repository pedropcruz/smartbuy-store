import axios, { AxiosError, type AxiosResponse, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.bestbuy.com/v1/',
  headers: {
    'Content-type': 'application/json'
  }
})

export const requestSuccess = (config: InternalAxiosRequestConfig) => {
  return config
}

export const requestError = (error: AxiosError) => {
  if (!error.request) router.push({ name: 'error', params: { error: error.message } })
  return Promise.reject(error)
}

export const responseSuccess = (response: AxiosResponse) => {
  return response
}

export const responseError = (error: AxiosError) => {
  if (!error.response) {
    router.push({ name: 'error', params: { error: error.message } })
  }

  return Promise.reject(error)
}

api.interceptors.request.use(requestSuccess, requestError)
api.interceptors.response.use(responseSuccess, responseError)

export default api
