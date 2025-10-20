<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const categories = ref([]);
const editingCategory = ref(null);
const API_CATEGORIES = "http://localhost:3000/categories";

const currentUserRole = localStorage.getItem("userRole");
if (currentUserRole !== "admin") {
  alert("Bạn không có quyền truy cập trang này!");
  router.push({ name: "Login" });
}

const fetchCategories = async () => {
  try {
    const res = await axios.get(API_CATEGORIES);
    categories.value = res.data;
  } catch (err) {
    console.error("Lỗi tải danh mục:", err);
  }
};

const startEdit = (cat) => {
  editingCategory.value = { ...cat };
};

const cancelEdit = () => {
  editingCategory.value = null;
};

const saveEdit = async () => {
  try {
    if (editingCategory.value.id) {
      await axios.put(`${API_CATEGORIES}/${editingCategory.value.id}`, editingCategory.value);
    } else {
      const newCat = {
        ...editingCategory.value,
        id: Math.random().toString(36).substr(2, 6),
      };
      await axios.post(API_CATEGORIES, newCat);
    }
    await fetchCategories();
    editingCategory.value = null;
    alert("Đã lưu danh mục!");
  } catch (err) {
    console.error("Lỗi lưu:", err);
    alert("Lưu thất bại!");
  }
};

const deleteCategory = async (id) => {
  if (!confirm("Bạn có chắc muốn xóa danh mục này?")) return;
  try {
    await axios.delete(`${API_CATEGORIES}/${id}`);
    await fetchCategories();
    alert("Đã xóa danh mục!");
  } catch (err) {
    console.error("Lỗi xóa:", err);
    alert("Xóa thất bại!");
  }
};

onMounted(fetchCategories);
</script>

<template>
  <div class="category-page">
    <h2>Quản lý danh mục sản phẩm</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên danh mục</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.id">
          <td>{{ cat.id }}</td>
          <td>{{ cat.name }}</td>
          <td>
            <button @click="startEdit(cat)">Sửa</button>
            <button @click="deleteCategory(cat.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="edit-form" v-if="editingCategory">
      <h3>{{ editingCategory.id ? "Sửa danh mục" : "Thêm danh mục mới" }}</h3>
      <input v-model="editingCategory.name" placeholder="Tên danh mục" />
      <button @click="saveEdit">Lưu</button>
      <button @click="cancelEdit">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
}
h2 {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}
th, td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
button {
  margin-right: 8px;
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #1565c0;
}
.edit-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}
.edit-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>