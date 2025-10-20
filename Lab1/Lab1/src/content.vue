<template>
  <div class="main-content">
    <section class="education">
      <h2> Học vấn</h2>
      <div class="item">
        <div class="degree">
          <strong>Công nghệ thông tin</strong> <span class="year">2021 - 2024</span>
        </div>
        <div>Đại học TopCV</div>
        <ul>
          <li>Tốt nghiệp loại Giỏi</li>
          <li>Đạt học bổng 2021 &amp; 2022</li>
          <li>Giải nhất nghiên cứu khoa học công nghệ</li>
        </ul>
      </div>
    </section>

    <section class="experience">
      <h2>💼 Kinh nghiệm làm việc</h2>
      <div class="item">
        <div class="job">
          <strong>Front End Developer</strong> <span class="year">2021 - 2024</span>
        </div>
        <div>Công ty TNHH MTV SVT</div>
        <ul>
          <li>Quản lý, phát triển trang web, tối ưu hóa giao diện và trải nghiệm người dùng.</li>
          <li>Tham gia đào tạo và nghiên cứu công nghệ mới để áp dụng vào dự án.</li>
          <li>Hỗ trợ các vấn đề kỹ thuật cho khách hàng.</li>
        </ul>
      </div>
      <div class="item">
        <div class="job">
          <strong>Flutter Developer</strong> <span class="year">2019 - 2021</span>
        </div>
        <div>Công ty CP công nghệ NDS</div>
        <ul>
          <li>Phát triển ứng dụng mobile app.</li>
          <li>Liên kết hệ thống với Apple Store, Google Play.</li>
          <li>Quản lý dự án và đào tạo nhân viên mới.</li>
        </ul>
      </div>
      <div class="item">
        <div class="job">
          <strong>Web Developer</strong> <span class="year">2017 - 2019</span>
        </div>
        <div>Công ty CP TopCV</div>
        <ul>
          <li>Phát triển hệ thống tìm việc làm và quản lý dữ liệu người dùng.</li>
          <li>Thực hiện tối ưu tốc độ truy cập và trải nghiệm khách hàng.</li>
        </ul>
      </div>
    </section>

    <section class="awards">
      <h2>🏆 Danh hiệu &amp; Giải thưởng</h2>
      <ul>
        <li>2023: Nhân viên xuất sắc năm công ty NTD</li>
        <li>2020: Nhân viên công hiến của năm DEF</li>
      </ul>
    </section>

    <section class="certs">
      <h2>📜 Chứng chỉ</h2>
      <ul>
        <li>2016: PHP, MySQL, JavaScript</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.main-content {
  background: #f8f8f8;
  color: #222;
  padding: 32px 24px;
  min-height: 100vh;
  width: 600px;
  border-radius: 0 16px 16px 0;
  box-sizing: border-box;
}
section {
  margin-bottom: 32px;
}
h2 {
  font-size: 1.25rem;
  color: #2e4d36;
  margin-bottom: 12px;
  font-weight: bold;
}
.item {
  margin-bottom: 18px;
}
.degree, .job {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 4px;
}
.year {
  color: #4e7c4e;
  font-size: 0.95rem;
  font-weight: normal;
}
ul {
  margin: 0 0 0 18px;
  padding: 0;
  font-size: 0.98rem;
}
