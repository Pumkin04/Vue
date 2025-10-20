<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const API_URL = "http://localhost:3000/posts";

const products = ref([]);
const form = ref({
  id: null,
  title: "",
  price: "",
  category: "",
  quantity: 0,
  image: "",
  description: "",
});

const fetchProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    products.value = res.data;
  } catch (err) {
    console.error("Lỗi tải sản phẩm:", err);
  }
};

const saveProduct = async () => {
  try {
    if (form.value.id) {
      await axios.put(`${API_URL}/${form.value.id}`, form.value);
      alert("Cập nhật sản phẩm thành công!");
    } else {
      const newProduct = {
        ...form.value,
        id: Math.random().toString(36).substr(2, 6),
      };
      await axios.post(API_URL, newProduct);
      alert("Thêm sản phẩm mới thành công!");
    }
    resetForm();
    fetchProducts();
  } catch (err) {
    console.error("Lỗi khi lưu sản phẩm:", err);
  }
};

const editProduct = (product) => {
  form.value = { ...product };
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const deleteProduct = async (id) => {
  if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  } catch (err) {
    console.error("Lỗi xóa sản phẩm:", err);
  }
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => (form.value.image = event.target.result);
    reader.readAsDataURL(file);
  }
};

const resetForm = () => {
  form.value = {
    id: null,
    title: "",
    price: "",
    category: "",
    quantity: 0,
    image: "",
    description: "",
  };
};

const logout = () => {
  localStorage.removeItem("userToken");
  alert("Bạn đã đăng xuất!");
  router.push({ name: "Login" });
};

const goToUserManager = () => {
  router.push({ name: "Adminmanager" });
};
const goToCategoryManager = () => {
  router.push({ name: "Catemanager" });
};
const goToOrderManager = () => {
  router.push({ name: "Ordermanager" });
};


onMounted(fetchProducts);
</script>

<template>
  <div class="container">
    <div class="header">
      <h2>Quản lý sản phẩm</h2>
      <div class="button-group">
  <button class="category-btn" @click="goToCategoryManager">Quản lý danh mục</button>
  <button class="user-btn" @click="goToUserManager">Quản lý tài khoản</button>
  <button class="logout-btn" @click="logout">Đăng xuất</button>
  <button class="order-btn" @click="goToOrderManager">Cập nhật đơn hàng</button>

</div>

    </div>

    <table>
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>
            <img :src="p.image || 'https://placehold.co/80x80?text=No+Image'" />
          </td>
          <td>{{ p.title }}</td>
          <td>{{ p.category }}</td>
          <td>{{ p.price }}</td>
          <td>{{ p.quantity }}</td>
          <td>
            <button @click="editProduct(p)">Sửa</button>
            <button @click="deleteProduct(p.id)">Xóa</button>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="6" class="empty">Không có sản phẩm nào</td>
        </tr>
      </tbody>
    </table>

    <hr />

    <h3>{{ form.id ? "Sửa sản phẩm" : "Thêm sản phẩm mới" }}</h3>

    <form @submit.prevent="saveProduct">
      <label>Tên:</label>
      <input v-model="form.title" required />

      <label>Giá:</label>
      <input v-model="form.price" type="number" required />

      <label>Danh mục:</label>
      <select v-model="form.category" required>
        <option value="">Chọn...</option>
        <option>Điện thoại</option>
        <option>Laptop</option>
        <option>GamingPhone</option>
        <option>Phụ kiện</option>
      </select>

      <label>Số lượng:</label>
      <input v-model="form.quantity" type="number" min="0" required />

      <label>Ảnh:</label>
      <input type="file" accept="image/*" @change="handleImageUpload" />
      <div v-if="form.image">
        <img :src="form.image" width="100" />
        <button type="button" @click="form.image = ''">Xóa ảnh</button>
      </div>

      <label>Mô tả:</label>
      <textarea v-model="form.description" rows="3" required></textarea>

      <div class="form-actions">
        <button type="submit">Lưu</button>
        <button type="button" @click="resetForm">Làm mới</button>
      </div>
    </form>
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
  background: #fff;
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
.button-group {
  display: flex;
  gap: 10px;
}
.logout-btn,
.user-btn {
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.logout-btn {
  background-color: #e53935;
}
.logout-btn:hover {
  background-color: #c62828;
  transform: scale(1.05);
}
.user-btn {
  background-color: #43a047;
}
.user-btn:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}
thead {
  background-color: #e3f2fd;
}
th,
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
th {
  color: #1976d2;
  font-weight: 600;
}
td img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}
button {
  margin-right: 6px;
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #1565c0;
}
form {
  background: #fafafa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
}
form label {
  display: block;
  margin-top: 12px;
  font-weight: 600;
  color: #444;
}
form input,
form select,
form textarea {
  width: 100%;
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
}
.form-actions {
  margin-top: 20px;
}
.empty {
  text-align: center;
  font-style: italic;
  color: #999;
}
</style>