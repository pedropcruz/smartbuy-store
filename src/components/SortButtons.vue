<template>
  <div data-test="sort-by-name">
    Name:
    <button
      @click.prevent="sortData('name', 'asc')"
      type="button"
      class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
      :class="keyRef === 'name' && orderRef === 'asc' ? 'opacity-100' : 'opacity-25'"
    >
      ASC
    </button>
    <button
      @click.prevent="sortData('name', 'desc')"
      type="button"
      class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
      :class="keyRef === 'name' && orderRef === 'desc' ? 'opacity-100' : 'opacity-25'"
    >
      DESC
    </button>
  </div>
  <div data-test="sort-by-price">
    <span>Price: </span>
    <button
      @click.prevent="sortData('salePrice', 'asc')"
      type="button"
      class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
      :class="keyRef === 'salePrice' && orderRef === 'asc' ? 'opacity-100' : 'opacity-25'"
    >
      ASC
    </button>
    <button
      @click.prevent="sortData('salePrice', 'desc')"
      type="button"
      class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
      :class="keyRef === 'salePrice' && orderRef === 'desc' ? 'opacity-100' : 'opacity-25'"
    >
      DESC
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/services/products'
import { ref, type PropType } from 'vue'

const props = defineProps({
  keyProperty: {
    type: String as PropType<keyof IProduct>,
    required: true
  },
  sort: {
    type: String as PropType<'asc' | 'desc'>,
    required: true
  }
})

const keyRef = ref(props.keyProperty)
const orderRef = ref(props.sort)

const sortData = (key: keyof IProduct, order: 'asc' | 'desc') => {
  keyRef.value = key
  orderRef.value = order
  emit('sort', { key, order })
}

const emit = defineEmits(['sort'])
</script>

<style lang="scss" scoped></style>
