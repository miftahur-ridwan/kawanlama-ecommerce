<script setup lang="ts">
defineProps({
  product: {
    type: Object,
    default: () => {},
  },
})

const cartStore = useCartStore()
function alreadyInCart(productId: number) {
  const findedProduct = cartStore.cart.find((product: any) => product.id === productId)
  return !!findedProduct?.id
}
function addToCart(product: any) {
  if (product.stock < product.minimumOrderQuantity) {
    return alert('Stock not available with minimum order quantity!')
  }
  if (!alreadyInCart(product.id)) {
    cartStore.addToCart(product.id, product.minimumOrderQuantity)
  }
}
</script>

<template>
  <div class="w-full bg-white border border-slate-200 rounded-lg shadow">
    <NuxtImg :src="product.thumbnail" fit="cover" loading="lazy" />
    <div class="p-4">
      <h3 class="mb-2 text-2xl font-bold tracking-tight text-slate-900">
        {{ product.title }}
      </h3>
      <p class="mb-2 font-normal text-slate-700">
        {{ product.description }}
      </p>
      <div class="mb-2 text-sm text-slate-700 flex space-x-2">
        <p>Stock: {{ product.stock }}</p>
        <p>Min Order: {{ product.minimumOrderQuantity }}</p>
      </div>
      <BaseButton
        class="bg-blue-500 text-white"
        @click="addToCart(product)"
      >
        {{ !alreadyInCart(product.id) ? 'Add to Cart' : 'Already in Cart' }}
      </BaseButton>
    </div>
  </div>
</template>
