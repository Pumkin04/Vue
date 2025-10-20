<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const store = useStore();

const product = ref(null);
const related = ref([]);
const loading = ref(true);
const error = ref("");
const cartMessage = ref("");
const showCartMessage = ref(false);
const API_URL = "http://localhost:3000/posts";

const allComments = ref({});
const newComment = ref({
  name: "",
  rating: 5,
  text: ""
});

const currentUserId = localStorage.getItem("currentUserId");
const user = ref(null);

const fetchUser = async () => {
  if (!currentUserId) return;
  try {
    const res = await axios.get(`http://localhost:3000/users/${currentUserId}`);
    user.value = res.data;
    newComment.value.name = res.data.name;
  } catch {
    user.value = null;
  }
};

const fetchProduct = async (id) => {
  loading.value = true;
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    product.value = res.data;
    await fetchRelated(res.data.category, res.data.id);
    error.value = "";
    if (!allComments.value[id]) {
      allComments.value[id] = [];
    }
  } catch {
    error.value = "Không tìm thấy sản phẩm!";
    product.value = null;
    related.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchRelated = async (category, currentId) => {
  try {
    const res = await axios.get(`${API_URL}?category=${category}`);
    related.value = res.data.filter(item => item.id !== currentId);
  } catch {
    related.value = [];
  }
};

const addToCart = () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    localStorage.setItem("redirectAfterLogin", route.fullPath);
    router.push("/login");
  } else {
    store.commit("cart/addToCart", {
      id: product.value.id,
      name: product.value.title,
      price: product.value.price,
      quantity: 1
    });
    cartMessage.value = "Đã thêm vào giỏ hàng!";
    showCartMessage.value = true;
    setTimeout(() => (showCartMessage.value = false), 3000);
  }
};

const submitComment = () => {
  if (!newComment.value.text.trim()) return;
  const id = route.params.id;
  allComments.value[id].push({ ...newComment.value });
  newComment.value.text = "";
  newComment.value.rating = 5;
};

const goToProduct = (id) => {
  if (id !== route.params.id) {
    router.push(`/userchitiet/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToHome = () => router.push("/home");
const goToLogin = () => router.push("/login");
const goToCart = () => router.push("/cartpage");
const back = () => router.push("/user");

watchEffect(() => {
  const id = route.params.id;
  if (id) fetchProduct(id);
});

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="product-page">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h2 @click="goToHome" class="logo">Cửa hàng của Thành</h2>
      </div>
      <div class="header-right">
        <button @click="goToHome">Trang chủ</button>
        <button @click="goToCart">Giỏ hàng</button>
        <button @click="goToLogin">Đăng nhập</button>
      </div>
    </header>

    <!-- Main -->
    <main class="main">
      <button @click="back" class="btn-back">← Quay lại</button>

      <div v-if="loading" class="loading">Đang tải sản phẩm...</div>
      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else-if="product" class="product-detail">
        <div class="image-wrapper">
          <img :src="product.image || 'https://placehold.co/400x300?text=No+Image'" alt="Ảnh sản phẩm" />
        </div>
        <div class="info">
          <h2>{{ product.title }}</h2>
          <p><strong>Danh mục:</strong> {{ product.category || "Không có" }}</p>
          <p><strong>Giá:</strong> {{ product.price.toLocaleString() }}₫</p>
          <p><strong>Mô tả:</strong></p>
          <p>{{ product.description || "Không có mô tả" }}</p>
          <button class="btn-cart" @click="addToCart">Thêm vào giỏ hàng</button>
          <p v-if="showCartMessage" class="cart-alert">{{ cartMessage }}</p>
        </div>
      </div>

      <!-- Bình luận -->
      <div class="comment-section">
        <h3>Đánh giá & Bình luận</h3>

        <div class="comment-form">
          <p><strong>Tên:</strong> {{ newComment.name }}</p>
          <label>
            Số sao:
            <select v-model="newComment.rating">
              <option v-for="n in 5" :key="n" :value="n">{{ n }} ⭐</option>
            </select>
          </label>
          <textarea v-model="newComment.text" placeholder="Viết bình luận..." rows="3"></textarea>
          <button @click="submitComment">Gửi bình luận</button>
        </div>

        <div v-if="allComments[route.params.id]?.length > 0" class="comment-list">
          <div v-for="(cmt, index) in allComments[route.params.id]" :key="index" class="comment-item">
            <p><strong>{{ cmt.name }}</strong> — {{ cmt.rating }} ⭐</p>
            <p>{{ cmt.text }}</p>
          </div>
        </div>
      </div>

      <!-- Sản phẩm liên quan -->
      <div v-if="related.length > 0" class="related-section">
        <h3>Sản phẩm liên quan</h3>
        <div class="related-grid">
          <div
            v-for="item in related"
            :key="item.id"
            class="related-card"
            @click="goToProduct(item.id)"
          >
            <img :src="item.image || 'https://placehold.co/200x150?text=No+Image'" alt="Ảnh" />
            <h5>{{ item.title }}</h5>
            <p>{{ item.price.toLocaleString() }}₫</p>
          </div>
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
.product-page {
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

.header-left .logo {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.header-right button {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 5px;
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

.btn-back {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
}

.btn-back:hover {
  background-color: #5a6268;
}

.loading,
.error {
  font-size: 16px;
  color: #dc3545;
  margin-bottom: 20px;
}

/* Chi tiết sản phẩm */
.product-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-bottom: 40px;
}

.image-wrapper {
  flex: 1 1 300px;
  text-align: center;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  object-fit: cover;
}

.info {
  flex: 1 1 300px;
}

.info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.info p {
  font-size: 16px;
  margin-bottom: 8px;
}

.btn-cart {
  background-color: #198754;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.btn-cart:hover {
  background-color: #157347;
}

.cart-alert {
  margin-top: 10px;
  color: #198754;
  font-weight: bold;
}

/* Bình luận */
.comment-section {
  margin-top: 40px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.comment-section h3 {
  font-size: 20px;
  margin-bottom: 16px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.comment-form textarea {
  resize: vertical;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.comment-form select {
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
}

.comment-form button {
  align-self: flex-start;
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #0b5ed7;
}

.comment-list .comment-item {
  border-top: 1px solid #ddd;
  padding-top: 12px;
  margin-top: 12px;
}

.comment-item p {
  margin: 4px 0;
  font-size: 14px;
}

/* Sản phẩm liên quan */
.related-section {
  margin-top: 40px;
}

.related-section h3 {
  margin-bottom: 20px;
  font-size: 20px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.related-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.related-card:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.15);
}

.related-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.related-card h5 {
  font-size: 16px;
  margin-bottom: 6px;
}

.related-card p {
  font-size: 14px;
  color: #dc3545;
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