<template>
  <div class="wrapper">
    <!-- Phần Lab 2: Xếp loại học lực -->
    <div class="lab2">
      <h4>Xếp loại học lực</h4>

      <input  
        type="number"
        v-model.number="inputDiem"
        placeholder="Nhập điểm (0-10)"
        @keyup.enter="kiemTraDiem"
      />

      <!-- Thông báo lỗi -->
      <p v-if="error" class="error">{{ error }}</p>

      <!-- Kết quả -->
      <p v-if="ketQua">{{ ketQua }}</p>
    </div>

    <hr />

    <!-- Phần Đăng nhập -->
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
        <span v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
          {{ message }}
        </span>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

/* --- Lab 2: Xếp loại học lực --- */
const inputDiem = ref(null);
const ketQua = ref("");
const error = ref("");

const kiemTraDiem = () => {
  if (inputDiem.value === null || inputDiem.value === "") {
    error.value = "Vui lòng nhập điểm.";
    ketQua.value = "";
    return;
  }

  if (inputDiem.value < 0 || inputDiem.value > 10) {
    error.value = "Điểm phải nằm trong khoảng 0 - 10.";
    ketQua.value = "";
    return;
  }

  error.value = "";
  const dtb = inputDiem.value;

  if (dtb < 5) ketQua.value = "Xếp loại: Yếu";
  else if (dtb < 6.5) ketQua.value = "Xếp loại: Trung bình";
  else if (dtb < 8) ketQua.value = "Xếp loại: Khá";
  else if (dtb < 9) ketQua.value = "Xếp loại: Giỏi";
  else ketQua.value = "Xếp loại: Xuất sắc";
};

/* --- Đăng nhập --- */
const username = ref("");
const password = ref("");
const message = ref("");
const isSuccess = ref(false);
const showPassword = ref(false);

const handleDangNhap = () => {
  if (username.value === "") {
    message.value = "Tên đăng nhập không được để trống";
    isSuccess.value = false;
  } else if (password.value === "") {
    message.value = "Mật khẩu không được để trống";
    isSuccess.value = false;
  } else if (username.value === "admin" && password.value === "123456") {
    message.value = "Đăng nhập thành công";
    isSuccess.value = true;
  } else {
    message.value = "Sai tên đăng nhập hoặc mật khẩu";
    isSuccess.value = false;
  }
};
</script>

<style scoped>
.wrapper {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* --- Lab 2 --- */
.lab2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
}
.lab2 input {
  margin-top: 10px;
  padding: 10px;
  width: 220px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.3s;
}
.lab2 input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 5px #4caf50;
}
.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

/* --- Form đăng nhập --- */
.login {
  text-align: center;
}
form {
  background: #fff;
  padding: 30px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
  margin-top: 15px;
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
.btn-login {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #4caf50;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.btn-login:hover {
  background: #43a047;
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
