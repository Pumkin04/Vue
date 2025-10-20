<script setup>
const info = {
  name: "Quách Đức Thành",
  title: "Sinh viên",
  phone: "0979496636",
  email: "thanhqdpk04326@gmail.com",
  address: "Buôn Ma Thuột, Đắk Lắk",
  birthday: "04/05/2004",
  gender: "Nam",
  skills: [
    "Kỹ năng giao tiếp",
    "Kỹ năng đàm phán",
    "Kỹ năng thuyết trình"
  ],
  hobbies: [
    "Đọc sách",
    "Nấu ăn",
    "Du lịch"
  ],
  objective: `Với 6 năm trong nghề lập trình, tôi muốn trở thành lập trình viên Senior của Công ty để có thể áp dụng các kiến thức và kinh nghiệm đã tích lũy, đồng thời phát triển bản thân và đóng góp vào sự thành công của doanh nghiệp.`
}
</script>

<template>
  <div class="header-container">
    <div class="avatar-section">
      <img class="avatar" src="" alt="avatar" />
    </div>
    <div class="info-section">
      <h2>{{ info.name }}</h2>
      <div class="title">{{ info.title }}</div>
      <ul class="contact">
        <li><span>📞</span> {{ info.phone }}</li>
        <li><span>✉️</span> {{ info.email }}</li>
        <li><span>📍</span> {{ info.address }}</li>
        <li><span>🎂</span> {{ info.birthday }}</li>
        <li><span>👤</span> {{ info.gender }}</li>
      </ul>
      <div class="section">
        <h3>Mục tiêu nghề nghiệp</h3>
        <p>{{ info.objective }}</p>
      </div>
      <div class="section">
        <h3>Kỹ năng</h3>
        <ul>
          <li v-for="(skill, i) in info.skills" :key="i">{{ skill }}</li>
        </ul>
      </div>
      <div class="section">
        <h3>Sở thích</h3>
        <ul>
          <li v-for="(hobby, i) in info.hobbies" :key="i">{{ hobby }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  background: #2e4d36;
  color: #fff;
  width: 320px;
  min-height: 100vh;
  padding: 32px 16px;
  border-radius: 16px 0 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
}
.info-section {
  width: 100%;
}
h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
}
.title {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #c7e8c7;
}
.contact {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  font-size: 0.98rem;
}
.contact li {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}
.contact span {
  margin-right: 8px;
}
.section {
  margin-bottom: 18px;
}
.section h3 {
  margin: 0 0 6px 0;
  font-size: 1.05rem;
  color: #c7e8c7;
}
.section ul {
  list-style: disc inside;
  margin: 0;
  padding-left: 12px;
}
.section p {
  margin: 0;
  font-size: 0.97rem;
}
</style>