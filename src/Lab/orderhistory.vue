<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const orders = computed(() => store.getters["orderHistory/allOrders"]);

const goHome = () => router.push("/home");

const repeatOrder = (order) => {
  order.items.forEach(item => {
    store.commit("cart/addToCart", {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    });
  });
  router.push("/checkout");
};
</script>

<template>
  <div class="history-page">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h2 class="logo" @click="goHome">Cửa hàng của Thành</h2>
      </div>
      <div class="header-right">
        <button @click="goHome">Trang chủ</button>
      </div>
    </header>

    <!-- Main -->
    <main class="main">
      <h2>Lịch sử đơn hàng</h2>

      <div v-if="orders.length === 0" class="empty">
        Bạn chưa có đơn hàng nào.
      </div>

      <ul v-else class="order-list">
        <li v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-left">
            <p><strong>Mã đơn:</strong> {{ order.id }}</p>
            <p><strong>Ngày:</strong> {{ order.date }}</p>
            <p><strong>Phương thức:</strong> {{ order.method }}</p>
            <p><strong>Tổng tiền:</strong> {{ order.total.toLocaleString() }}₫</p>
            <ul class="item-list">
              <li v-for="item in order.items" :key="item.id">
                {{ item.name }} × {{ item.quantity }}
              </li>
            </ul>
          </div>
          <div class="order-right">
            <span class="status-label">{{ order.status }}</span>
            <button class="repeat-btn" @click="repeatOrder(order)">Mua lại</button>
          </div>
        </li>
      </ul>

      <button class="back-btn" @click="goHome">← Quay lại Trang chủ</button>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 Cửa hàng của Thành. Mọi quyền được bảo lưu.</p>
    </footer>
  </div>
</template>

<style scoped>
.history-page {
  width: 80vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #212529;
  color: white;
  padding: 20px 40px;
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
  font-size: 26px;
  margin-bottom: 24px;
  text-align: center;
  color: #2c3e50;
}

.empty {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.order-list {
  list-style: none;
  padding: 0;
}

.order-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.order-left {
  flex: 1;
}

.order-card p {
  margin: 6px 0;
  font-size: 15px;
}

.item-list {
  margin-top: 10px;
  padding-left: 20px;
}

.item-list li {
  font-size: 14px;
  margin-bottom: 4px;
}

.order-right {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.status-label {
  background-color: #007bff;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
}

.repeat-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.repeat-btn:hover {
  background-color: #218838;
}

/* Button */
.back-btn {
  margin-top: 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #5a6268;
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
