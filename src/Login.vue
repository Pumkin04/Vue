<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const message = ref('');
const isSuccess = ref(false);
const router = useRouter();

const handleDangNhap = async () => {
  if (!username.value.trim()) {
    message.value = 'Tên đăng nhập không được để trống';
    isSuccess.value = false;
    return;
  }
  if (!password.value.trim()) {
    message.value = 'Mật khẩu không được để trống';
    isSuccess.value = false;
    return;
  }

  try {
    const res = await axios.get('http://localhost:3000/users');
    const users = res.data;

    const foundUser = users.find(
      (u) => u.username === username.value && u.password === password.value
    );

    if (foundUser) {
      message.value = '✅ Đăng nhập thành công';
      isSuccess.value = true;
      localStorage.setItem('currentUserId', foundUser.id);
      localStorage.setItem('userToken', 'dummy-token');
      router.push({ name: 'ProductList' });
    } else {
      message.value = '❌ Sai tên đăng nhập hoặc mật khẩu';
      isSuccess.value = false;
    }
  } catch (err) {
    console.error('Lỗi khi gọi API:', err);
    message.value = '⚠️ Không thể kết nối đến máy chủ';
    isSuccess.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleDangNhap">
    <input type="text" v-model="username" placeholder="Tên đăng nhập" />
    <input type="password" v-model="password" placeholder="Mật khẩu" />
    <button type="submit">Đăng nhập</button>
    <span :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</span>
  </form>
</template>

<style scoped>
form {
  width: 500px;
  margin: 40px auto;
  border: 2px solid #4caf50;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
}
form input {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #1565c0;
}
.success {
  display: block;
  margin-top: 20px;
  color: green;
}
.error {
  display: block;
  margin-top: 20px;
  color: red;
}
</style>