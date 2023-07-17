import categories, { type ICategory } from '@/services/categories'
import type { TSort } from '@/services/products'

export interface IAPIKey {
  apiKey: string
}

export const buildQueryAPIKey: IAPIKey = {
  apiKey: import.meta.env.VITE_API_KEY
}

export const buildCategoryAttributeForURL = (category: ICategory, property: keyof ICategory): string => {
  return decodeURI(`categoryPath.id=${category[property]}`)
}

export const buildSortForURL = (sort: TSort): string | undefined => {
  if (!sort) return
  const { key, order } = sort
  return `&sort=${key}.${order}`
}
