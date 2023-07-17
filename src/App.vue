<template>
  <component :is="$route.meta.layout || DefaultLayout">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/default.vue'
</script>
