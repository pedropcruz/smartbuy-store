<template>
  <div class="flex flex-wrap -mx-3 mb-16 relative" data-test="available-products-list">
    <ProductItemVue
      v-for="product in availableProducts"
      :key="`available-${product.startDate}`"
      :product="product"
      @delete="deleteProduct"
      @select="showProductDetailModal"
    />
    <SpinnerVue v-if="isLoading" />
    <p v-if="!isLoading && !availableProducts.length">No products found :(</p>
  </div>
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
import { onMounted } from 'vue'
import ProductItemVue from '@/components/ProductItem.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import SpinnerVue from '@/components/Spinner.vue'
import { useProductItem } from '@/composable/useProductItem'

const {
  data: availableProducts,
  fetchData,
  deleteProduct,
  showProductDetailModal,
  prevProduct,
  nextProduct,
  isLoading,
  handleNewProductName,
  isModalOpen,
  productDetailed
} = useProductItem('onlyOnSale')

onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
