<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const quantity = ref(props.product.quantity)
watch(() => props.product.quantity, (newQuantity) => {
  quantity.value = newQuantity
})

function decreaseQuantity() {
  if (quantity.value > props.product.minimumOrderQuantity) {
    quantity.value--
    updateQuantity()
  } else {
    alert(`Minimum order quantity is ${props.product.minimumOrderQuantity}!`)
  }
}

function increaseQuantity() {
  if (quantity.value < props.product.stock) {
    quantity.value++
    updateQuantity()
  } else {
    alert('Not enough stock!')
  }
}

function updateQuantity() {
  if (quantity.value < props.product.minimumOrderQuantity) {
    alert(`Minimum order quantity is ${props.product.minimumOrderQuantity}!`)
    quantity.value = props.product.minimumOrderQuantity
  } else if (quantity.value > props.product.stock) {
    alert('Not enough stock!')
    quantity.value = props.product.stock
  }
  cartStore.updateProductQty(props.product.id, quantity.value)
}

function removeProduct() {
  cartStore.removeProduct(props.product.id)
}
</script>

<template>
  <div class="flex items-center">
    <BaseButton
      class="bg-slate-300"
      @click="decreaseQuantity"
    >
      -
    </BaseButton>
    <input
      type="number"
      v-model.number="quantity"
      @change="updateQuantity"
      :min="product.minimumOrderQuantity"
      :max="product.stock"
      class="w-16 text-center border-t border-b"
    >
    <BaseButton
      class="bg-slate-300"
      @click="increaseQuantity"
    >
      +
    </BaseButton>
    <BaseButton
      class="ml-4 bg-red-300"
      @click="removeProduct"
    >
      X
    </BaseButton>
  </div>
</template>
