export const useProductStore = defineStore('product', () => {
  const products = ref([])

  function getProductById(id: number) {
    return products.value.find((product: any) => (product.id === id)) ?? null;
  }

  async function fetchProducts() {
    const { data }: any = await useFetch('https://dummyjson.com/products?limit=0'); 
    if (data.value?.products) {
      products.value = data.value?.products
    }
  }
  return {
    products,
    getProductById,
    fetchProducts,
  }
})
