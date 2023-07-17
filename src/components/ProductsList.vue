<template>
  <div class="flex flex-wrap -mx-3 mb-16 relative" data-test="products-list">
    <ProductItemVue
      v-for="product in products"
      :key="`product-${product.startDate}`"
      :product="product"
      @delete="deleteProduct"
      @select="showProductDetailModal"
    />
    <p v-if="!isLoading && !products.length" data-test="not-found">No products found :(</p>
  </div>
  <div ref="scrollObserver" class="h-[1px]"></div>
  <SpinnerVue v-if="isLoading" />
  <Teleport to="body">
    <ProductDetailModal
      v-if="isModalOpen && productDetailed"
      :key="productDetailed.sku"
      @close="isModalOpen = false"
      :product="productDetailed"
      @update:name="handleNewProductName"
      @prev:product="prevProduct"
      @next:product="nextProduct"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type PropType, watch } from 'vue'

import ProductItemVue from '@/components/ProductItem.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import SpinnerVue from '@/components/Spinner.vue'

import { useProductItem } from '@/composable/useProductItem'

import type { ICategory } from '@/services/categories'
import type { TSort } from '@/services/products'

let observer: IntersectionObserver | null = null

const scrollObserver = ref()

const props = defineProps({
  selectedCategory: {
    type: Object as PropType<ICategory>,
    required: false
  },
  sortOption: {
    type: Object as PropType<TSort>,
    required: false
  }
})

const {
  data: products,
  productDetailed,
  showProductDetailModal,
  isModalOpen,
  fetchData,
  deleteProduct,
  handleNewProductName,
  prevProduct,
  nextProduct,
  sortProducts,
  updateProducts,
  isLoading
} = useProductItem('all')

watch(
  () => props.selectedCategory,
  async (category) => {
    if (!category) return
    await updateProducts(category)
  }
)

watch(
  () => props.sortOption,
  async (option) => {
    if (!option) return
    await sortProducts(option.key, option.order)
  }
)

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver((entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      fetchData(props.selectedCategory)
    }
  })
  observer.observe(scrollObserver.value!)
}

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>
