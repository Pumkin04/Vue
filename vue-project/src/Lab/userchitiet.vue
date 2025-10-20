<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const loading = ref(true);
const error = ref("");
const API_URL = "http://localhost:3000/posts";

// 🟢 Lấy sản phẩm theo ID
const fetchProduct = async () => {
  const id = route.params.id;
  if (!id) {
    error.value = "Không tìm thấy sản phẩm (thiếu ID)!";
    loading.value = false;
    return;
  }

  try {
    const res = await axios.get(`${API_URL}/${id}`);
    product.value = res.data;
  } catch (err) {
    console.error("❌ Lỗi khi tải sản phẩm:", err);
    error.value = "Không tìm thấy sản phẩm trong cơ sở dữ liệu!";
  } finally {
    loading.value = false;
  }
};

// 🔙 Quay lại danh sách sản phẩm
const back = () => router.push("/user");

onMounted(fetchProduct);
</script>

<template>

  <div class="container py-4">
    <button @click="back" class="btn btn-secondary mb-3">← Quay lại</button>

    <!-- Khi đang tải -->
    <div v-if="loading">Đang tải sản phẩm...</div>

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
      <h3>{{ product.title }}</h3>
      <p><strong>Danh mục:</strong> {{ product.category || "Không có" }}</p>
      <p><strong>Giá:</strong> ${{ product.price }}</p>
      <p><strong>Mô tả:</strong></p>
      <p>{{ product.description || "Không có mô tả" }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.btn {
  padding: 6px 12px;
  border: none;
  background: #666;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background: #444;
}
.alert {
  background-color: #f8d7da;
  color: #842029;
  padding: 10px;
  border-radius: 4px;
}
.card {
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>
