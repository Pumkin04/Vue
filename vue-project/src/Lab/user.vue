<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const API_URL = "http://localhost:3000/posts";

const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    products.value = res.data;
  } catch (err) {
    console.error("Lỗi tải sản phẩm:", err);
  }
};

const goToDetail = (id) => {
  router.push({ name: "Userchitiet", params: { id } }); // Đảm bảo route có path: '/Userchitet/:id'
};

onMounted(fetchProducts);

const logout = () => {
  // Xóa thông tin đăng nhập (ví dụ token hoặc user info)
  localStorage.removeItem("userToken"); // hoặc "userInfo", tùy bạn lưu gì

  alert("Bạn đã đăng xuất!");
  router.push({ name: "Login" });
};
</script>

<template>
 
  <div class="container py-4">
     <div>
  <button class="logout-btn" @click="logout">Đăng xuất</button>
</div>
    <h2 class="mb-3">Danh sách sản phẩm</h2>

    <table border="1" cellspacing="0" cellpadding="8" width="100%">
      <thead style="background: #f2f2f2;">
        <tr>
          <th>Ảnh</th>
          <th>Tên</th>
          <th>Danh mục</th>
          <th>Giá ($)</th>
          <th>Xem chi tiết</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>
            <img
              :src="p.image || 'https://placehold.co/80x80?text=No+Image'"
              width="60"
              height="60"
              style="object-fit:cover;border-radius:8px;"
            />
          </td>
          <td>{{ p.title }}</td>
          <td>{{ p.category }}</td>
          <td>{{ p.price }}</td>
          <td>
            <button @click="goToDetail(p.id)">Xem</button>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="5" align="center">Không có sản phẩm nào</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
body {
  background-color: #f0f2f5;
  font-family: "Segoe UI", sans-serif;
}

.container {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.logout-btn {
  padding: 10px 18px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c62828;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

thead {
  background-color: #e3f2fd;
}

th {
  padding: 14px;
  text-align: left;
  font-size: 16px;
  color: #1976d2;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
}

td {
  padding: 14px;
  font-size: 15px;
  color: #444;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

td img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button.view-btn {
  padding: 8px 14px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.view-btn:hover {
  background-color: #1565c0;
}
.logout-btn {
  padding: 10px 20px;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.logout-btn:hover {
  background-color: #c62828;
  transform: scale(1.05);
}
</style>