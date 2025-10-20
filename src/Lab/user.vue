<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const router = useRouter();
const store = useStore();

const products = ref([]);
const filteredProducts = ref([]);
const favorites = ref(JSON.parse(localStorage.getItem("favoriteProducts")) || []);
const user = ref(null);
const currentUserId = localStorage.getItem("currentUserId");

const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:3000/posts");
    products.value = res.data;
    filteredProducts.value = res.data;
  } catch (err) {
    console.error("Lỗi tải sản phẩm:", err);
  }
};

const fetchUser = async () => {
  if (!currentUserId) {
    router.push({ name: "User" });
    return;
  }
  try {
    const res = await axios.get(`http://localhost:3000/users/${currentUserId}`);
    user.value = res.data;
  } catch (err) {
    console.error("Không tìm thấy người dùng:", err);
    router.push({ name: "User" });
  }
};

const filterByCategory = (category) => {
  filteredProducts.value = products.value.filter(p => p.category === category);
};

const resetFilter = () => {
  filteredProducts.value = products.value;
};

const toggleFavorite = (product) => {
  const exists = favorites.value.find(p => p.id === product.id);
  if (exists) {
    favorites.value = favorites.value.filter(p => p.id !== product.id);
  } else {
    favorites.value.push(product);
  }
  localStorage.setItem("favoriteProducts", JSON.stringify(favorites.value));
};

const goToFavorites = () => {
  router.push({ name: "Favorite" });
};

const goToDetail = (id) => {
  router.push({ name: "Userchitiet", params: { id } });
};

const goToUpdateUser = () => {
  router.push({ name: "updateuser" });
};

const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("currentUserId");
  user.value = null;
  router.push({ name: "User" });
};

const goToCart = () => {
  router.push({ name: "Cartpage" });
};

const goToOrderHistory = () => {
  router.push({ name: "Orderhistory" });
};

const goToHome = () => {
  router.push({ name: "Home" });
};

const goToLogin = () => {
  router.push({ name: "Login" });
};

onMounted(() => {
  fetchProducts();
  fetchUser();
});
</script>

<template>
  <div class="product-page">
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

    <!-- Main Content -->
    <main class="main">
      <div class="top-bar">
        <div>
          <h2>Danh sách sản phẩm</h2>
          <p v-if="user">Xin chào: <strong>{{ user.name }}</strong></p>
        </div>
        <div class="action-buttons">
          <button v-if="user" @click="logout">Đăng xuất</button>
          <button v-if="user" @click="goToUpdateUser">Cập nhật tên</button>
          <button @click="goToCart">Xem giỏ hàng</button>
          <button v-if="user" @click="goToOrderHistory">Lịch sử đơn hàng</button>
          <button @click="goToFavorites">Sản phẩm yêu thích</button>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="category-bar">
        <button @click="filterByCategory('Điện thoại')">Điện thoại</button>
        <button @click="filterByCategory('Laptop')">Laptop</button>
        <button @click="filterByCategory('Phụ kiện')">Phụ kiện</button>
        <button @click="resetFilter">Tất cả</button>
      </div>

      <!-- Grid Product Cards -->
      <div class="product-grid">
        <div v-for="p in filteredProducts" :key="p.id" class="product-card">
          <img :src="p.image || 'https://placehold.co/600x400'" />
          <h5>{{ p.title }}</h5>
          <p class="price">{{ p.price.toLocaleString() }}₫</p>
          <button class="btn-view" @click="goToDetail(p.id)">Xem chi tiết</button>
          <button class="btn-fav" @click="toggleFavorite(p)">
            {{ favorites.find(f => f.id === p.id) ? 'Bỏ yêu thích' : 'Yêu thích' }}
          </button>
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
.product-page {
  width: 80vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  overflow-x: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #212529;
  color: white;
  padding: 20px 40px;
  flex-wrap: wrap;
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
  flex-grow: 1;
  padding: 40px 60px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.action-buttons button {
  margin: 5px;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
}

.action-buttons button:hover {
  background-color: #e2e6ea;
}

.category-bar {
  margin-bottom: 30px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.category-bar button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #007bff;
  background-color: #e7f1ff;
  color: #007bff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.category-bar button:hover {
  background-color: #d0e7ff;
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

.footer {
  background-color: #212529;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
</style>