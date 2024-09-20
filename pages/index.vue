<script setup>
const productStore = useProductStore()
await useAsyncData('product', () => productStore.fetchProducts().then(() => true))
const { products } = storeToRefs(productStore)

const cartStore = useCartStore()
const { totalQuantity } = storeToRefs(cartStore)
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductItem
        v-for="product in products"
        :key="`product-${product.id}`"
        :product="product"
      />
    </div>
    <NuxtLink
      to="cart"
      class="fixed bottom-4 right-4 py-1 px-4 bg-blue-500 text-white text-sm rounded-full"
    >
      Cart {{ totalQuantity > 0 ? `${totalQuantity} items` : '' }}
    </NuxtLink>
  </div>
</template>
