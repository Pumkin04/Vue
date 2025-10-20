<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:3000/posts");
    products.value = res.data;
  } catch (err) {
    console.error("Lỗi tải sản phẩm:", err);
  }
};

const goToHome = () => router.push({ name: "Home" });
const goToProducts = () => router.push({ name: "User" });
const goToCart = () => router.push({ name: "Cartpage" });
const goToLogin = () => router.push({ name: "Login" });
const goToDetail = (id) => {
  router.push({ name: "Userchitiet", params: { id } });
};
onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="homepage">
    <!-- Header -->
    <header class="header">
      <div class="nav-left">
        <button @click="goToHome">Trang chủ</button>
        <button @click="goToProducts">Sản phẩm</button>
      </div>
      <div class="nav-right">
        <button @click="goToCart">🛒</button>
        <button @click="goToLogin">🔐</button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="intro">
        <h1>Chào mừng đến với cửa hàng của Thành!</h1>
        <p>Khám phá sản phẩm, bảo hành trọn đời, giao hàng siêu tốc.</p>
      </div>

      <div class="product-grid">
        <div v-for="p in products" :key="p.id" class="product-card">
          <img :src="p.image || 'https://placehold.co/600x400'" alt="product" />
          <h3>{{ p.title }}</h3>
          <p class="price">{{ p.price.toLocaleString() }}₫</p>
          <button class="btn btn-sm btn-info" @click="goToDetail(p.id)">Xem chi tiết</button>
        </div>
        <div v-if="products.length === 0" class="no-products">Không có sản phẩm nào</div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      © 2025 Cửa hàng của Thành. Mọi quyền được bảo lưu.
    </footer>
  </div>
</template>

<style scoped>
.homepage {
  width: 80vw;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #212529;
  color: white;
  flex-wrap: wrap;
  width: 100%;
}

.header button {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 5px;
}

.header button:hover {
  background-color: white;
  color: #212529;
}

.main {
  flex: 1;
  padding: 30px 20px;
}

.intro {
  text-align: center;
  margin-bottom: 40px;
}

.intro h1 {
  font-size: 42px;
  font-weight: bold;
  color: #343a40;
}

.intro p {
  font-size: 20px;
  color: #6c757d;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.product-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.product-card .price {
  font-size: 18px;
  color: #dc3545;
  margin-bottom: 15px;
}

.product-card button {
  background-color: #198754;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

.product-card button:hover {
  background-color: #157347;
}

.footer {
  background-color: #212529;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 16px;
}
</style>