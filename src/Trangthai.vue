<script setup>
import{ref} from "vue";
const message=ref("Xin chao cac ban");
const dem=ref(0);
const tuoi=ref(0);
const changeMessage=()=>{
    message.value="đã đổi thông tin";
}
const tangdem=()=>{
 
    tuoi.value++;
}
const giamdem=()=>{
  
    tuoi.value--;
}
</script>

<template>

 <p>{{message}}</p>

<p class="dem">{{ dem }}|{{ tuoi }}</p>
<br>
<button @click="changeMessage">thay đổi thông tin</button>
<br>
<button @click="tangdem">tăng số</button>
<br>
<button @click="giamdem">giảm số</button>

<p v-if="tuoi<12">học cấp 1</p>
<p v-else-if="tuoi<16">học cấp 2</p>
<p v-else-if="tuoi<19">học cấp 3</p>
<p v-else="tuoi>=19">tốt nghiệp</p>
<br>
<br>

</template>


<style scoped>
h2{
    text-align: center;
    color: blue;
}
p{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
.dem {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>