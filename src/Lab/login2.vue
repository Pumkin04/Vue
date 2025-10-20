<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const message = ref("");
const isSuccess = ref(false);
const router = useRouter();

const handleDangNhap = async () => {
  if (!username.value || !password.value) {
    message.value = "Vui lòng nhập đầy đủ";
    isSuccess.value = false;
    return;
  }

  try {
    const res = await axios.get("http://localhost:3000/users");
    const foundUser = res.data.find(
      (u) => u.username === username.value && u.password === password.value
    );

    if (foundUser) {
      localStorage.setItem("currentUserId", foundUser.id);
      localStorage.setItem("userRole", foundUser.role);
      localStorage.setItem("userToken", "ok");

      message.value = "Đăng nhập thành công!";
      isSuccess.value = true;

      const redirectPath = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin");

      if (foundUser.role === "admin") {
        router.push({ name: "Sanpham" });
      } else {
        router.push(redirectPath || "/user");
      }
    } else {
      message.value = "Sai tài khoản hoặc mật khẩu";
      isSuccess.value = false;
    }
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    message.value = "Lỗi kết nối máy chủ";
    isSuccess.value = false;
  }
};
</script>

<template>
  <div class="login">
    <form @submit.prevent="handleDangNhap">
      <h4 class="form-title">ĐĂNG NHẬP</h4>

      <input v-model="username" type="text" placeholder="Tên đăng nhập" />
      <input v-model="password" type="password" placeholder="Mật khẩu" />

      <button type="submit" class="btn-login">Đăng nhập</button>

      <span v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
      </span>

      <p class="mt-3">
        Chưa có tài khoản?
        <a href="#" @click.prevent="router.push({ name: 'Register' })">Đăng ký</a>
      </p>
    </form>
  </div>
</template>

<style scoped>
.login {
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
}
.btn-login {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #2196f3;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
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