<template>
  <nav data-test="navbar">
    <RouterLink to="/" class="flex items-center">
      <img data-test="logo-img" src="@/assets/img/logo.svg" class="h-8 mr-3" alt="SmartBuy Logo" />
    </RouterLink>
    <div class="flex md:order-2">
      <button
        data-collapse-toggle="navbar-search"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-search"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
      <ul
        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
      >
        <li v-for="route in $router.getRoutes().splice(0, 2)" :key="route.path">
          <RouterLink
            :to="route.path"
            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 capitalize"
            :class="{
              'block py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0':
                isActiveRoute(route.path)
            }"
            aria-current="page"
          >
            {{ route.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const isActiveRoute = (routePath: string) => routePath === router.currentRoute.value.path
</script>

<style scoped>
nav {
  @apply flex flex-wrap items-center justify-between mx-auto p-4;
}
</style>
