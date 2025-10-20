<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const API_URL = "http://localhost:3000/posts";

const product = ref(null);
const loading = ref(true);
const error = ref("");

// Lấy sản phẩm theo ID từ URL
const fetchProduct = async () => {
  const id = route.params.id; // Lấy id từ URL
  if (!id) {
    error.value = "Không tìm thấy sản phẩm (thiếu ID)!";
    loading.value = false;
    return;
  }

  try {
    const res = await axios.get(`${API_URL}/${id}`);
    if (!res.data || Object.keys(res.data).length === 0) {
      throw new Error("Không tìm thấy sản phẩm!");
    }
    product.value = res.data;
  } catch (err) {
    console.error("Lỗi khi tải sản phẩm:", err);
    error.value = "Không tìm thấy sản phẩm trong cơ sở dữ liệu!";
  } finally {
    loading.value = false;
  }
};

//Quay lại trang sản phẩm
const back = () => router.push("/sanpham");

onMounted(fetchProduct);
</script>

<template>
  <div class="container py-4">
    <button @click="back" class="btn btn-secondary mb-3">← Quay lại</button>

    <!-- Khi đang tải -->
    <div v-if="loading" class="text-muted">Đang tải sản phẩm...</div>

    <!-- Khi lỗi -->
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Khi có dữ liệu -->
    <div v-else-if="product" class="card shadow p-4">
      <div class="text-center mb-3">
        <img
          :src="product.image || 'https://placehold.co/400x300?text=No+Image'"
          class="img-fluid rounded"
          style="max-height:300px"
          alt="Ảnh sản phẩm"
        />
      </div>

      <h3 class="fw-bold mb-3">{{ product.title }}</h3>

      <p><strong>Danh mục:</strong> {{ product.category || "Không có" }}</p>
      <p><strong>Giá:</strong> ${{ product.price }}</p>

      <div class="mt-3">
        <strong>Mô tả:</strong>
        <p>{{ product.description || "Không có mô tả" }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f0f2f5;
  font-family: "Segoe UI", sans-serif;
}

.container {
  max-width: 960px;
  margin: 50px auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.btn {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1565c0;
}

.text-muted {
  color: #777;
  font-style: italic;
  font-size: 16px;
  margin-bottom: 20px;
}

.alert {
  background-color: #fdecea;
  color: #d32f2f;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
}

.card {
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #ddd;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  padding: 8px;
}

h3 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  color: #444;
  margin-bottom: 12px;
}

strong {
  color: #222;
  font-weight: 600;
}
</style>
