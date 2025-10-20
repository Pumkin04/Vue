<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const users = ref([]);
const editingUser = ref(null);
const API_USERS = "http://localhost:3000/users";

const currentUserRole = localStorage.getItem("userRole");
if (currentUserRole !== "admin") {
  alert("Bạn không có quyền truy cập trang này!");
  router.push({ name: "Login" });
}

const fetchUsers = async () => {
  try {
    const res = await axios.get(API_USERS);
    users.value = res.data;
  } catch (err) {
    console.error("Lỗi tải danh sách người dùng:", err);
  }
};

const startEdit = (user) => {
  editingUser.value = { ...user };
};

const cancelEdit = () => {
  editingUser.value = null;
};

const saveEdit = async () => {
  try {
    await axios.put(`${API_USERS}/${editingUser.value.id}`, editingUser.value);
    await fetchUsers();
    editingUser.value = null;
    alert("Đã cập nhật tài khoản!");
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    alert("Cập nhật thất bại!");
  }
};

const deleteUser = async (id) => {
  if (!confirm("Bạn có chắc muốn xóa tài khoản này?")) return;
  try {
    await axios.delete(`${API_USERS}/${id}`);
    await fetchUsers();
    alert("Đã xóa tài khoản!");
  } catch (err) {
    console.error("Lỗi xóa:", err);
    alert("Xóa thất bại!");
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="admin-page">
    <h2>Quản lý tài khoản</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên đăng nhập</th>
          <th>Họ tên</th>
          <th>Vai trò</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.role }}</td>
          <td>
            <button @click="startEdit(u)">Sửa</button>
            <button @click="deleteUser(u.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="editingUser" class="edit-form">
      <h3>Sửa tài khoản</h3>
      <label>Họ tên:</label>
      <input v-model="editingUser.name" />

      <label>Vai trò:</label>
      <select v-model="editingUser.role">
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button @click="saveEdit">Lưu</button>
      <button @click="cancelEdit">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  max-width: 900px;
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
.edit-form input, .edit-form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>