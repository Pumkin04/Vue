<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");
const message = ref("");
const isSuccess = ref(false);
const showPassword = ref(false);

const handleDangNhap = async () => {
  if (username.value === "") {
    message.value = "Tên đăng nhập không được để trống";
    isSuccess.value = false;
    return;
  } else if (password.value === "") {
    message.value = "Mật khẩu không được để trống";
    isSuccess.value = false;
    return;
  }

  try {
    // Kiểm tra tài khoản trong JSON Server
    const res = await axios.get(`http://localhost:3000/users?username=${username.value}&password=${password.value}`);

    if (res.data.length > 0) {
      const user = res.data[0];
      message.value = "Đăng nhập thành công";
      isSuccess.value = true;

      // Lưu user vào localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));



  if (user.role === "admin") {
        router.push({ name: "Sanpham" });
      } else {
        router.push({ name: "User" });
      }
    } else {
      message.value = "Sai tên đăng nhập hoặc mật khẩu";
      isSuccess.value = false;
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    message.value = "Không thể kết nối tới server";
    isSuccess.value = false;
  }
};
</script>

<template>
  <div class="login">
    <form @submit.prevent="handleDangNhap">
      <h4 class="form-title">LOGIN</h4>
      <input type="text" v-model="username" placeholder="Tên đăng nhập" />
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        placeholder="Mật khẩu"
      />
      <button type="submit" class="btn-login">Đăng nhập</button>

      <p class="mt-3">
        Chưa có tài khoản?
        <a href="#" @click.prevent="router.push({ name: 'Register' })">Đăng ký</a>
      </p>

      <span v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
      </span>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

form {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-title {
  margin-bottom: 25px;
  font-size: 26px;
  font-weight: 700;
  color: #2e7d32;
  letter-spacing: 1px;
}

form input {
  width: 100%;
  margin-top: 15px;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 15px;
  transition: 0.3s ease;
}

form input:focus {
  border-color: #4caf50;
  background: #fff;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

.btn-login {
  margin-top: 25px;
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #4caf50, #66bb6a);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-login:hover {
  background: linear-gradient(to right, #43a047, #388e3c);
}

p.mt-3 {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

p.mt-3 a {
  color: #2e7d32;
  font-weight: 600;
  text-decoration: none;
}

p.mt-3 a:hover {
  text-decoration: underline;
}

.success,
.error {
  display: block;
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
}

.success {
  color: #2e7d32;
}

.error {
  color: #c62828;
}
</style>