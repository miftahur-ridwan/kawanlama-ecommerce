<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - KawanLama` : 'KawanLama'
  },
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>
