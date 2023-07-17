import { type Ref, ref, reactive } from 'vue'
import ProductsApi, {
  type IProduct,
  type IProductDetailed,
  type IProductResponse,
  type TSort
} from '../services/products'
import type { ICategory } from '@/services/categories'

const PAGE_SIZE = 10

export const useProductItem = (fetchType: 'onlyOnSale' | 'all' = 'all') => {
  const isModalOpen = ref(false)
  const isLoading = ref(false)
  const currentPage = ref(1)
  const data: Ref<IProduct[]> = ref([])
  const productDetailed: Ref<IProduct | null> = ref(null)
  const selectedCategory: Ref<ICategory | null> = ref(null)
  let sort = reactive<TSort>({
    key: 'name',
    order: 'asc'
  })

  const cleanData = () => {
    data.value.splice(0, data.value.length)
  }

  const fetchProductsOnlyOnSale = async () => {
    isLoading.value = true
    try {
      const { products: onlyOnSaleProducts } = await ProductsApi.fetchProductsOnlyOnSale()
      data.value = [...onlyOnSaleProducts]
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProducts = async (categoriesFilter?: ICategory, changeSort?: TSort) => {
    isLoading.value = true
    try {
      const { products } = await ProductsApi.fetchProducts(
        { pageSize: PAGE_SIZE, page: currentPage.value },
        categoriesFilter,
        changeSort ? { key: changeSort.key, order: changeSort.order } : { key: sort.key, order: sort.order }
      )

      if (currentPage.value === 1) {
        data.value = [...products]
      } else {
        data.value = [...data.value, ...products]
      }

      currentPage.value++
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const showProductDetailModal = (product: IProduct) => {
    if (!product) return
    isModalOpen.value = true
    productDetailed.value = product
  }

  const deleteProduct = (sku: number) => {
    data.value = data.value.filter((product) => product.sku !== sku)
  }

  const handleNewProductName = (newProduct: IProductDetailed) => {
    if (!newProduct) return
    const product = data.value.find((product) => product.sku === newProduct.sku)
    if (product) {
      product.name = newProduct.name
    }
  }

  const prevProduct = (skuNumber: number) => {
    const dataIndex = data.value.findIndex((product) => product.sku === skuNumber)
    if (dataIndex > 0) {
      productDetailed.value = data.value[dataIndex - 1]
    }
  }

  const nextProduct = (skuNumber: number) => {
    const dataIndex = data.value.findIndex((product) => product.sku === skuNumber)
    if (dataIndex <= data.value.length) {
      productDetailed.value = data.value[dataIndex + 1]
    }
  }

  const fetchData = async (categoriesFilter?: ICategory, sort?: TSort) => {
    if (fetchType === 'onlyOnSale') {
      await fetchProductsOnlyOnSale()
    } else {
      await fetchProducts(categoriesFilter, sort)
    }
  }

  const updateProducts = (categoriesFilter: ICategory) => {
    currentPage.value = 1
    cleanData()
    selectedCategory.value = categoriesFilter
    fetchData(categoriesFilter)
  }

  const sortProducts = (key: keyof IProduct, order: 'asc' | 'desc') => {
    currentPage.value = 1
    cleanData()
    sort = { key, order }
    fetchData(selectedCategory.value!, sort)
  }

  return {
    isLoading,
    currentPage,
    isModalOpen,
    data,
    sort,
    cleanData,
    fetchData,
    updateProducts,
    sortProducts,
    showProductDetailModal,
    deleteProduct,
    handleNewProductName,
    prevProduct,
    nextProduct,
    productDetailed,
    selectedCategory
  }
}
