import { skipHydrate } from 'pinia'
import { useStorage } from '@vueuse/core'

interface Cart {
  id: number;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const cart: any = useStorage('cart', [])

  const cartProducts = computed(() => {
    const productStore = useProductStore()
    return cart.value.map((product: any) => {
      const findedProduct: any = productStore.getProductById(product.id)
      return {
        ...product,
        title: findedProduct?.title,
        price: findedProduct?.price,
        stock: findedProduct?.stock,
        minimumOrderQuantity: findedProduct?.minimumOrderQuantity,
      }
    })
  })

  const totalQuantity = computed(() => {
    return cart.value.reduce((total: number, cartVal: Cart) => total + cartVal.quantity, 0)
  })

  const totalPrice = computed(() => {
    const productStore = useProductStore()
    return cart.value.reduce((total: number, cartVal: Cart) => {
      const product: any = productStore.getProductById(cartVal.id)
      return total + product.price * cartVal.quantity
    }, 0)
  })

  function addToCart(productId: number, quantity: number) {
    cart.value.push({ id: productId, quantity })
  }

  function updateProductQty(productId: number, quantity: number) {
    const findedProduct: any = cart.value.find((fCart: any) => fCart.id === productId)
    if (findedProduct) {
      findedProduct.quantity = quantity
    }
  }

  function removeProduct(productId: number) {
    cart.value = cart.value.filter((cartFilter: any) => cartFilter.id !== productId)
  }

  return {
    cart: skipHydrate(cart),
    cartProducts,
    totalQuantity,
    totalPrice,
    addToCart,
    updateProductQty,
    removeProduct,
  }
})
