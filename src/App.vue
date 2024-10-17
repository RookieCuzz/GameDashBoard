<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import NewSection from "@/components/NewSection.vue";
import NewHeader from "@/components/NewHeader.vue";
import ChatBox from "@/components/ChatBox.vue";
import Login from "@/components/Login.vue";
import Slider from "@/components/Slider.vue";
</script>
<template>
  <div class="main">
<!--    <slider/>-->
    <new-header/>
    <router-view></router-view>
    <!--    <login/>-->
<!--    <new-section/>-->
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.main{
  background-color: transparent;
  width: 100%;
  min-height: 100vh;
  height: fit-content;
}

</style>
