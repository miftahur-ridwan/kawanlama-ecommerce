<script setup>
const productStore = useProductStore()
await useAsyncData('product', () => productStore.fetchProducts().then(() => true))

const cartStore = useCartStore()
const { cart, cartProducts, totalQuantity, totalPrice } = storeToRefs(cartStore)
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Cart Page</h1>
    <div v-if="cart.length === 0" class="text-slate-500">
      Cart is empty.
    </div>
    <div v-else>
      <div
        v-for="product in cartProducts"
        :key="`cart-${product.id}`"
        class="flex items-center justify-between flex-wrap border-b py-2"
      >
        <div>
          <h2 class="font-semibold">{{ product.title }}</h2>
          <p class="text-gray-600">
            <span>
              Price: Rp {{ product.price.toFixed(2) }}
            </span>
            <span>
              - Stock: {{ product.stock }}
            </span>
            <span>
              - Min. Order Qty: {{ product.minimumOrderQuantity }}
            </span>
          </p>
        </div>
        <CartAction 
          :product="product"
        />
      </div>
      <div class="mt-4 flex items-center justify-between space-x-4">
        <NuxtLink
          to="/"
          class="py-1 px-4 bg-blue-500 text-white text-sm rounded-full"
        >
          Back to Product List
        </NuxtLink>
        <div class="text-right">
          <p class="font-semibold">Total Items: {{ totalQuantity }}</p>
          <p class="font-semibold">Total Price: Rp {{ totalPrice.toFixed(2) }}</p>
        </div>
      </div>
      
    </div>
    
  </div>
</template>
