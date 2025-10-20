export default {
  namespaced: true,
  state: () => ({
    items: []
  }),
  mutations: {
    addToCart(state, product) {
      const id = product.id;
      const quantity = Number(product.quantity) || 1;
      const price = Number(product.price) || 0;

      const existing = state.items.find(p => p.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id,
          name: product.name || "Sản phẩm",
          price,
          quantity
        });
      }
    },
    removeFromCart(state, id) {
      state.items = state.items.filter(p => p.id !== id);
    },
    clearCart(state) {
      state.items = [];
    },
    increaseQuantity(state, id) {
      const item = state.items.find(p => p.id === id);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, id) {
      const item = state.items.find(p => p.id === id);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(p => p.id !== id);
        }
      }
    }
  },
  getters: {
    totalPrice(state) {
      return state.items.reduce((sum, p) => {
        const price = Number(p.price) || 0;
        const quantity = Number(p.quantity) || 0;
        return sum + price * quantity;
      }, 0);
    }
  }
};