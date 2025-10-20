<template>
  <div class="cv">
    <Sidebar />
    <Content />
  </div>
   <p>lab2</p>
    <login />
</template>

<script setup>
import Sidebar from './Slider.vue'
import Content from './Content.vue'
import login from '../login.vue';
</script>

<style scoped>
.cv {
  display: flex;
  max-width: 900px;
  margin: 20px auto;
  border: 1px solid #ddd;
  font-family: Arial, sans-serif;
}
</style>
