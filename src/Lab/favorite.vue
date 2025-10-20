<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const favorites = ref([]);

onMounted(() => {
  const stored = localStorage.getItem("favoriteProducts");
  favorites.value = stored ? JSON.parse(stored) : [];
});

const goToDetail = (id) => {
  router.push({ name: "Userchitiet", params: { id } });
};

const goToHome = () => {
  router.push({ name: "Home" });
};

const goToCart = () => {
  router.push({ name: "Cartpage" });
};

const goToLogin = () => {
  router.push({ name: "Login" });
};
</script>

<template>
  <div class="favorites-page">
    <!-- Header -->
    <header class="header">
      <div class="nav-left">
        <button @click="goToHome">Trang chủ</button>
        <button @click="goToCart">🛒</button>
        <button @click="goToLogin">🔐</button>
      </div>
      <div class="nav-right">
        <h4>Cửa hàng của Thành</h4>
      </div>
    </header>

    <!-- Main -->
    <main class="main">
      <h2 class="title">Sản phẩm yêu thích</h2>

      <div v-if="favorites.length === 0" class="empty">
        Bạn chưa yêu thích sản phẩm nào.
      </div>

      <div v-else class="product-grid">
        <div v-for="p in favorites" :key="p.id" class="product-card">
          <img :src="p.image || 'https://placehold.co/600x400'" />
          <h5>{{ p.title }}</h5>
          <p class="price">{{ p.price.toLocaleString() }}₫</p>
          <button class="btn-view" @click="goToDetail(p.id)">Xem chi tiết</button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      © 2025 Cửa hàng của Thành. Mọi quyền được bảo lưu.
    </footer>
  </div>
</template>

<style scoped>
.favorites-page {
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

.nav-left button {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 5px;
}

.nav-left button:hover {
  background-color: white;
  color: #212529;
}

.nav-right h4 {
  font-size: 20px;
  font-weight: bold;
}

/* Main */
.main {
  flex-grow: 1;
  padding: 40px 60px;
}

.title {
  font-size: 26px;
  margin-bottom: 24px;
  text-align: center;
  color: #dc3545;
}

.empty {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-card h5 {
  font-size: 18px;
  margin-bottom: 6px;
}

.product-card .price {
  font-size: 16px;
  color: #dc3545;
  margin-bottom: 10px;
}

.btn-view {
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-view:hover {
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