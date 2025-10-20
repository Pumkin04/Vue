<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const user = ref({ name: "" });
const message = ref("");
const currentUserId = localStorage.getItem("currentUserId");

const fetchUser = async () => {
  if (!currentUserId) {
    alert("Không tìm thấy tài khoản đang đăng nhập.");
    router.push({ name: "Login" });
    return;
  }

  try {
    const res = await axios.get(`http://localhost:3000/users/${currentUserId}`);
    user.value = { id: res.data.id, name: res.data.name };
  } catch (err) {
    console.error("Lỗi tải người dùng:", err);
    alert("Không thể tải thông tin người dùng.");
  }
};

const updateName = async () => {
  try {
    await axios.patch(`http://localhost:3000/users/${currentUserId}`, {
      name: user.value.name
    });
    message.value = "Đã cập nhật tên!";
    setTimeout(() => {
      router.push({ name: "user" });
    }, 1000);
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    message.value = "Cập nhật thất bại!";
  }
};

const goBack = () => {
  router.push({ name: "User" });
};

onMounted(fetchUser);
</script>

<template>
  <div class="form-wrapper">
    <h2>Cập nhật tên người dùng</h2>

    <form @submit.prevent="updateName">
      <label>ID người dùng:</label>
      <input :value="user.id" disabled />

      <label>Họ tên:</label>
      <input v-model="user.name" required />

      <button type="submit">Cập nhật</button>
      <button type="button" @click="goBack" class="back-btn">Quay lại</button>

      <p class="message" v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 400px;
  margin: 60px auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
}
h2 {
  margin-bottom: 20px;
  font-size: 22px;
  color: #333;
}
label {
  display: block;
  margin-top: 12px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  margin-top: 20px;
  margin-right: 10px;
  padding: 10px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #1565c0;
}
.back-btn {
  background-color: #888;
}
.back-btn:hover {
  background-color: #555;
}
.message {
  margin-top: 12px;
  font-weight: bold;
  color: #2e7d32;
}
</style>