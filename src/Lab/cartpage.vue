<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const items = computed(() => store.state.cart.items);
const total = computed(() => store.getters["cart/totalPrice"]);
const stockWarnings = ref({});
const products = ref([]);

// Gọi API từ db.json
onMounted(async () => {
  const res = await fetch("http://localhost:3000/posts");
  products.value = await res.json();
});

// Tìm tồn kho theo ID
const findProductQuantity = (id) => {
  const product = products.value.find(p => p.id === id);
  return Number(product?.quantity) || 0;
};

const increaseQuantity = (id) => {
  const item = items.value.find(i => i.id === id);
  const max = findProductQuantity(id);

  if (item && item.quantity < max) {
    store.commit("cart/increaseQuantity", id);
    stockWarnings.value[id] = false;
  } else {
    stockWarnings.value[id] = true;
  }
};

const decreaseQuantity = (id) => {
  store.commit("cart/decreaseQuantity", id);
  stockWarnings.value[id] = false;
};

const removeItem = (id) => {
  store.commit("cart/removeFromCart", id);
  stockWarnings.value[id] = false;
};

const clearCart = () => {
  store.commit("cart/clearCart");
  stockWarnings.value = {};
};

const goBack = () => router.push("/user");
const goToHome = () => router.push("/home");
const goToLogin = () => router.push("/login");
const goToCheckout = () => router.push({ name: "Checkout" });
</script>

<template>
  <div class="cart-page">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h2 @click="goToHome" class="logo">Cửa hàng của Thành</h2>
      </div>
      <div class="header-right">
        <button @click="goToHome">Trang chủ</button>
        <button @click="goToLogin">Đăng nhập</button>
      </div>
    </header>

    <!-- Main -->
    <main class="main">
      <h2>Giỏ hàng của bạn</h2>

      <div v-if="items.length === 0" class="empty-cart">
        Giỏ hàng đang trống.
      </div>

      <ul v-else class="cart-list">
        <li v-for="item in items" :key="item.id" class="cart-item">
          <div class="item-info">
            <strong>{{ item.name }}</strong> - {{ item.price.toLocaleString() }}₫
          </div>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item.id)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)">+</button>
          </div>
          <button class="remove-btn" @click="removeItem(item.id)">Xóa</button>
          <p v-if="stockWarnings[item.id]" class="stock-warning">
            Sản phẩm đã hết hàng (Tồn kho: {{ findProductQuantity(item.id) }})
          </p>
        </li>
      </ul>

      <div v-if="items.length > 0" class="total">
        <p><strong>Tổng tiền:</strong> {{ total.toLocaleString() }}₫</p>
        <div class="action-buttons">
          <button @click="clearCart">Xóa toàn bộ</button>
          <button @click="goBack">← Quay lại</button>
          <button class="checkout-btn" @click="goToCheckout">Thanh toán</button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 Cửa hàng của Thành. Mọi quyền được bảo lưu.</p>
    </footer>
  </div>
</template>



<style scoped>
.cart-page {
  width: 80vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  overflow-x: hidden;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #212529;
  color: white;
  padding: 20px 40px;
  flex-wrap: wrap;
}

.logo {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

.header-right button {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
}

.header-right button:hover {
  background-color: white;
  color: #212529;
}

/* Main */
.main {
  flex-grow: 1;
  padding: 40px 60px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.empty-cart {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 40px;
}

/* Cart List */
.cart-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 12px;
}

.item-info {
  font-size: 16px;
  margin-bottom: 10px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.quantity-controls button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.quantity-controls button:hover {
  background-color: #1565c0;
}

.remove-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-start;
}

.remove-btn:hover {
  background-color: #c62828;
}

.stock-warning {
  color: #e53935;
  font-size: 14px;
  margin-top: 6px;
}

/* Total & Actions */
.total {
  font-size: 18px;
  margin-top: 20px;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.action-buttons button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.action-buttons button:hover {
  background-color: #5a6268;
}

.checkout-btn {
  background-color: #0d6efd;
}

.checkout-btn:hover {
  background-color: #0b5ed7;
}

/* Footer */
.footer {
  background-color: #212529;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  margin-top: auto;
}
</style>