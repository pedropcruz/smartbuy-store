import api from '.'
import { buildQueryAPIKey } from '@/utils/urlHelper'

export interface ICategoriesApiResponse {
  from: number
  to: number
  currentPage: number
  total: number
  totalPages: number
  queryTime: string
  totalTime: string
  partial: boolean
  canonicalUrl: string
  categories: ICategory[]
}

export interface ICategory {
  name: string
  id: string
}

export default {
  fetchAllCategories: (): Promise<ICategoriesApiResponse> =>
    api
      .get(`/categories`, { params: { ...buildQueryAPIKey, format: 'json', show: 'name,id' } })
      .then((response) => response.data)
}
