<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const name = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const message = ref("");
const isSuccess = ref(false);

const handleDangKy = async () => {
  // Kiểm tra rỗng
  if (!name.value || !username.value || !password.value || !confirmPassword.value) {
    message.value = "Vui lòng điền đầy đủ thông tin";
    isSuccess.value = false;
    return;
  }

  // Kiểm tra trùng mật khẩu
  if (password.value !== confirmPassword.value) {
    message.value = "Mật khẩu nhập lại không khớp";
    isSuccess.value = false;
    return;
  }

  try {
    // Kiểm tra username đã tồn tại chưa
    const res = await axios.get(`http://localhost:3000/users?username=${username.value}`);
    if (res.data.length > 0) {
      message.value = "Tên đăng nhập đã tồn tại";
      isSuccess.value = false;
      return;
    }
     setTimeout(() => {
      router.push({ name: "Login" });
    }, 2000);

    // Thêm user mới
    const newUser = {
      name: name.value,
      username: username.value,
      password: password.value,
      role: "user",
    };
    await axios.post("http://localhost:3000/users", newUser);

    message.value = "Đăng ký thành công! Chuyển hướng sang đăng nhập...";
    isSuccess.value = true;

    // Chuyển hướng sau 1s
    setTimeout(() => {
      router.push({ name: "Login2" });
    }, 1000);
  } catch (error) {
    console.error("Đăng ký lỗi:", error);
    message.value = "Có lỗi xảy ra, vui lòng thử lại";
    isSuccess.value = false;
  }
};
</script>

<template>
  <div class="register">
    <form @submit.prevent="handleDangKy">
      <h4 class="form-title">ĐĂNG KÝ</h4>

      <input v-model="name" type="text" placeholder="Họ và tên" />
      <input v-model="username" type="text" placeholder="Tên đăng nhập" />
      <input v-model="password" type="password" placeholder="Mật khẩu" />
      <input v-model="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />

      <button type="submit" class="btn-register">Đăng ký</button>

      <span v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
      </span>

      <p class="mt-3">
        Đã có tài khoản?
        <a href="#" @click.prevent="router.push({ name: 'Login' })">Đăng nhập</a>
      </p>
    </form>
  </div>
</template>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
form {
  background: #fff;
  padding: 30px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
}
.form-title {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
}
form input {
  width: 100%;
  display: block;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  background: #f0f7ff;
  transition: 0.3s;
}
form input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 6px #4caf50;
}
.btn-register {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #2196f3;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.btn-register:hover {
  background: #1976d2;
}
.success {
  display: block;
  margin-top: 15px;
  color: #2e7d32;
  font-weight: bold;
}
.error {
  display: block;
  margin-top: 15px;
  color: #c62828;
  font-weight: bold;
}
</style>
