<template>
  <div class="product-item">
    <div class="relative p-10 mb-8 bg-gray-50 flex-grow">
      <span
        v-if="product.onSale"
        class="absolute top-4 right-4 inline-flex items-center m-2 px-2 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600"
      >
        <img class="w-4 h-4" :src="DiscountSVG" />
        <span class="ml-1">Available to Sale!</span>
      </span>
      <div class="flex mx-auto max-w-max flex-col justify-center h-full mt-4" href="#">
        <img class="w-full h-full object-contain" :src="product.image!" :alt="product.name" />
      </div>
    </div>
    <p class="text-xl font-heading leading-8 mb-4 hover:underline line-clamp-1">
      {{ product.name }}
    </p>
    <p class="text-xl font-heading font-medium tracking-tighter" :class="goodPriceItemStyle(product.salePrice)">
      <span class="text-base pr-2">$</span>
      {{ product.salePrice }}
    </p>
    <div class="flex items-center justify-between mt-4">
      <button
        type="button"
        class="text-green-700 w-full hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="emit('select', product)"
      >
        Select
      </button>
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="emit('delete', product.sku)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import type { IProduct } from '@/services/products'

import DiscountSVG from '@/assets/img/discount.svg'

const emit = defineEmits(['select', 'delete'])

defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true
  }
})

const goodPriceItemStyle = (priceValue: number) => {
  if (priceValue > 50) {
    return 'text-red-500'
  } else if (priceValue < 15) {
    return 'text-green-500'
  } else {
    return ''
  }
}
</script>

<style scoped lang="postcss">
.product-item {
  @apply w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 px-3 flex flex-col;
}
</style>
