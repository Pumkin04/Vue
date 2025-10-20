<script setup>
import { ref } from "vue"
import avatar from './assets/add.jpg'

const editMode = ref(false)

const info = ref({
  name: "Quách Đức Thành",
  job: "Lập trình viên Front-End",
  phone: "0979496636",
  email: "thanhqdpk04326@gmail.com",
  address: "Buôn Ma Thuật",
  skills: ["HTML, CSS, JavaScript", "Git, Github, GitLab", "Responsive Web"],
  certificates: ["2023 – CS50", "2022 – FreeCodeCamp", "2020 – Google UX Design"]
})

function toggleEdit() {
  editMode.value = !editMode.value
}
</script>

<template>
  <aside class="profile-card">
    <div class="card">
      <!-- Avatar -->
      <div class="avatar-box">
        <img src="./assets/add.jpg" alt="Avatar" class="avatar" />

        <div v-if="editMode">
          <input v-model="info.name" class="input" />
          <input v-model="info.job" class="input" />
        </div>
        <div v-else>
          <h2>{{ info.name }}</h2>
          <p class="job">{{ info.job }}</p>
        </div>
      </div>

      <!-- Liên hệ -->
      <div class="contact">
        <div v-if="editMode">
          <input v-model="info.phone" class="input" />
          <input v-model="info.email" class="input" />
          <input v-model="info.address" class="input" />
        </div>
        <div v-else>
          <p>📞 {{ info.phone }}</p>
          <p>✉️ {{ info.email }}</p>
          <p>📍 {{ info.address }}</p>
        </div>
      </div>

      <!-- Kỹ năng -->
      <h3>Kỹ năng</h3>
      <ul>
        <li v-for="(skill, i) in info.skills" :key="i">
          <span v-if="!editMode">{{ skill }}</span>
          <input v-else v-model="info.skills[i]" class="input" />
        </li>
      </ul>

      <!-- Chứng chỉ -->
      <h3>Chứng chỉ</h3>
      <ul>
        <li v-for="(cert, i) in info.certificates" :key="i">
          <span v-if="!editMode">{{ cert }}</span>
          <input v-else v-model="info.certificates[i]" class="input" />
        </li>
      </ul>

      <!-- Nút Sửa / Lưu -->
      <div class="action">
        <button class="btn" @click="toggleEdit">
          {{ editMode ? "Lưu" : "Sửa" }}
        </button>
      </div>
    </div>
  </aside>
</template>


<style scoped>
.profile-card {
  width: 320px;
  margin: 0 auto;
}
.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.avatar-box {
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #ddd;
}
.job {
  color: #666;
  margin-top: 5px;
}
.contact {
  margin-top: 20px;
}
h3 {
  margin-top: 20px;
  font-size: 18px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}
.input {
  width: 100%;
  padding: 6px 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn:hover {
  background: #0056b3;
}
.action {
  text-align:   ;
  margin-top: 15px;
}
</style>
