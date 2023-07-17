<template>
  <h2 class="text-2xl font-bold tracking-tight text-gray-900 my-16">Todays Best Deals For You!</h2>
  <AvailableProductsListVue />
  <div class="flex justify-between items-center my-16 w-full">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Other Products</h2>
    <div class="flex flex-row items-center">
      <SortButtonsVue
        :key-property="sortableOptions.key"
        :sort="sortableOptions.order"
        @sort="sortData($event.key, $event.order)"
      />
      <DropdownVue
        data-test="categories-dropdown"
        v-if="!isLoading"
        :menu="categoriesData"
        :dropdown-label="'All Categories'"
        label-property="name"
        @update:selected="updateData"
      />
    </div>
  </div>
  <ProductsListVue :selected-category="selectedCategory!" :sort-option="sortableOptions" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AvailableProductsListVue from '@/components/AvailableProductsList.vue'
import DropdownVue from '@/components/Dropdown.vue'
import ProductsListVue from '@/components/ProductsList.vue'
import SortButtonsVue from '@/components/SortButtons.vue'

import { useProductItem } from '@/composable/useProductItem'

import CategoriesApi, { type ICategory } from '@/services/categories'
import type { IProduct, TSort } from '@/services/products'

const isLoading = ref(false)
const categoriesData = ref<ICategory[]>([])

const { updateProducts, selectedCategory, sort } = useProductItem('all')
const sortableOptions = ref<TSort>(sort)

const updateData = async (categoriesSelected: ICategory) => {
  selectedCategory.value = categoriesSelected
  await updateProducts(categoriesSelected)
}

const sortData = async (key: keyof IProduct, order: 'asc' | 'desc') => {
  sortableOptions.value = { key, order }
}

const fetchCategories = async () => {
  isLoading.value = true
  try {
    const { categories } = await CategoriesApi.fetchAllCategories()
    categoriesData.value = categories
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped></style>
