<script setup> 
const greeting = "Hello from Child Component!";
</script>

<template>
    <div class="container">
         <p>this is child Component</p>
         <header><slot name="header"></slot></header>
         <footer></footer>
    </div>
</template>