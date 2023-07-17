import api from '.'
import { buildCategoryAttributeForURL, buildQueryAPIKey, buildSortForURL } from '@/utils/urlHelper'

import type { ICategory } from '@/services/categories'

export interface IProduct {
  sku: number
  name: string
  salePrice: number
  image: string | null
  startDate: string
  onSale: boolean
}

export interface IProductResponse {
  from: number
  to: number
  currentPage: number
  total: number
  totalPages: number
  queryTime: string
  totalTime: string
  partial: boolean
  canonicalUrl: string
  products: IProduct[]
}

export interface IImage {
  rel: string
  unitOfMeasure: string
  width: string
  height: string
  href: string
  primary: boolean
}

export interface IProductDetailed {
  image: string
  name: string
  longDescription: string
  genre: string | null
  sku: number
  salePrice: number
  startDate: string
  shippingLevelsOfService: IShippingService[]
}

export interface IShippingService {
  serviceLevelId: number
  serviceLevelName: string
  unitShippingPrice: number
}

export type TProductDetailedResponse = IProductResponse & {
  products: IProductDetailed[]
}

export interface IPagination {
  page: number
  pageSize: number
}

export type TSort = {
  key: keyof IProduct
  order: 'asc' | 'desc'
}

export default {
  fetchProducts: (
    { pageSize, page }: IPagination,
    categoryFilter?: ICategory,
    sort?: TSort
  ): Promise<IProductResponse> =>
    api
      .get(`/products${categoryFilter ? `(${buildCategoryAttributeForURL(categoryFilter, 'id')})` : ''}`, {
        params: {
          ...buildQueryAPIKey,
          pageSize,
          page,
          sort: sort ? buildSortForURL(sort) : '',
          format: 'json',
          show: 'sku,name,salePrice,image,startDate,onSale'
        }
      })
      .then((response) => response.data),

  fetchProductsOnlyOnSale: (): Promise<IProductResponse> =>
    api
      .get(`/products(onSale=true)`, {
        params: { ...buildQueryAPIKey, pageSize: 5, format: 'json', show: 'sku,name,salePrice,image,startDate,onSale' }
      })
      .then((response) => response.data),

  fetchDetailedProduct: (productSku: number): Promise<TProductDetailedResponse> =>
    api
      .get(`/products(sku=${productSku.toString()})`, {
        params: {
          ...buildQueryAPIKey,
          format: 'json',
          show: 'name,genre,longDescription,sku,salePrice,startDate,image,shippingLevelsOfService'
        }
      })
      .then((response) => response.data)
}
