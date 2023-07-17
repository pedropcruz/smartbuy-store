<template>
  <div class="modal" @click.self="$emit('close')" data-test="modal">
    <div class="relative w-full max-w-5xl max-h-full">
      <SpinnerVue v-if="isLoading" class="relative bg-white rounded-lg shadow h-[50vh]" />
      <div v-else-if="detailedProduct" class="relative bg-white rounded-lg shadow">
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-test="close-modal"
            @click="$emit('close')"
          >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b justify-between">
          <button type="button" @click="$emit('prev:product', detailedProduct?.sku)" data-test="product-slider-prev">
            <img src="@/assets/img/arrow-left.png" class="h-8 mr-8 hover:cursor-pointer" alt="arrow-left" />
          </button>
          <button type="button" @click="$emit('next:product', detailedProduct?.sku)" data-test="product-slider-next">
            <img src="@/assets/img/arrow-right.png" class="h-8 ml-8 hover:cursor-pointer" alt="arrow-right" />
          </button>
        </div>
        <div class="p-8 w-full">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <img data-test="product-image" :src="detailedProduct.image" :alt="detailedProduct.name" />
            </div>
            <div>
              <div class="mb-6">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium"
                  :class="{ 'text-green-500': hasChanges, 'text-gray-900': !hasChanges }"
                  >Product Name</label
                >
                <input
                  type="text"
                  data-test="product-name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                  :placeholder="detailedProduct.name"
                  :v-model="detailedProduct.name"
                  @keyup.enter="handleNewProductName"
                />
                <p v-if="hasChanges" class="mt-2 text-sm text-green-600" data-test="product-name-changes">
                  <span class="font-medium">Well done!</span> You have updated the product name.
                </p>
              </div>
              <div v-if="detailedProduct.genre" class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium">Genre</label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                  :placeholder="detailedProduct.genre"
                  disabled
                />
              </div>
              <div v-if="detailedProduct.longDescription" class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium">Description</label>
                <p class="mb-3 text-gray-500" data-test="product-description">{{ formatedDescription }}</p>
                <button
                  @click="showFullDescription = !showFullDescription"
                  data-test="product-show-full-description"
                  type="button"
                  class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Read {{ showFullDescription ? 'Less' : 'More' }}
                </button>
              </div>
              <div v-if="detailedProduct.shippingLevelsOfService.length > 0" class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium">Shipping Options</label>

                <div
                  class="flex items-center mb-4"
                  data-test="product-shipping-options"
                  v-for="(shipping, index) in detailedProduct.shippingLevelsOfService"
                  :key="`${shipping.serviceLevelName}-${index}`"
                >
                  <input
                    :id="`${shipping.serviceLevelName}-${index}`"
                    type="radio"
                    value=""
                    name="list-radio"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                  />
                  <label
                    :for="`${shipping.serviceLevelName}-${index}`"
                    class="ml-2 text-sm font-medium text-gray-900"
                    >{{ shipping.serviceLevelName }}</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType, computed } from 'vue'
import ProductsApi, { type IProduct, type IProductDetailed } from '@/services/products'
import SpinnerVue from '@/components/Spinner.vue'

const LIMIT_CHARACTERS = 70

const isLoading = ref(false)
const detailedProduct = ref<IProductDetailed | null>(null)
const hasChanges = ref(false)
const showFullDescription = ref(false)

const emit = defineEmits(['close', 'update:name', 'prev:product', 'next:product'])

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>
  }
})

const formatedDescription = computed(() => {
  if (!detailedProduct.value) return ''
  if (showFullDescription.value) return detailedProduct.value.longDescription
  return `${detailedProduct.value.longDescription.slice(0, LIMIT_CHARACTERS).trim()}...`
})

const handleNewProductName = (element: Event) => {
  if (!detailedProduct.value) return
  detailedProduct.value.name = (element.target as HTMLInputElement).value
  hasChanges.value = true
  emit('update:name', detailedProduct.value)
}

onMounted(async () => {
  isLoading.value = true
  try {
    const { products } = await ProductsApi.fetchDetailedProduct(props.product?.sku!)
    detailedProduct.value = products[0]
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang="postcss">
.modal {
  @apply fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full justify-center items-center flex bg-gray-900 bg-opacity-75;
}
</style>
