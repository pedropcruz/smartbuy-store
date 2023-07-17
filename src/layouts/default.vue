<template>
  <main>
    <Header />
    <slot />
  </main>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<style scoped>
main {
  @apply container mx-auto;
}
</style>
