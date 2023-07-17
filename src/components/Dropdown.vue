<template>
  <div class="relative">
    <button
      id="dropdownBgHoverButton"
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
      @click="isDropdownOpen = !isDropdownOpen"
    >
      {{ label }}
      <svg
        class="w-2.5 h-2.5 ml-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdownBgHover"
      class="z-10 w-48 top-12 bg-white rounded-lg shadow absolute"
      :class="{ hidden: !isDropdownOpen }"
    >
      <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownBgHoverButton">
        <li v-for="(item, index) in dropdownMenu" :key="`category-${item}-${index}`">
          <div class="flex items-center p-2 rounded hover:bg-gray-100">
            <span href="#" class="w-full ml-2 text-sm font-medium text-gray-900 rounded" @click="itemClicked(item)">{{
              labelProperty ? item[labelProperty] : item
            }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '@/services/categories'
import { ref, type PropType } from 'vue'

const props = defineProps({
  menu: {
    type: Object as PropType<Array<ICategory>>,
    required: true
  },
  labelProperty: {
    type: String as PropType<keyof ICategory>,
    required: false
  },
  dropdownLabel: {
    type: String,
    required: true
  }
})

const isDropdownOpen = ref(false)
const label = ref(props.dropdownLabel || 'All')

const dropdownMenu = [{ name: 'All', id: '' }, ...props.menu]

const emit = defineEmits(['update:selected'])

const itemClicked = (itemMenu: ICategory) => {
  isDropdownOpen.value = false
  label.value = itemMenu.name
  emit('update:selected', itemMenu)
}
</script>

<style scoped></style>
