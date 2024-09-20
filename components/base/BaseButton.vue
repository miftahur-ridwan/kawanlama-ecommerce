<script lang="ts" setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    class="py-1 px-2 text-sm rounded-md hover:opacity-80"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
