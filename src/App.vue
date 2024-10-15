<script setup>
import NewHeader from "@/components/NewHeader.vue";
</script>
<template>
  <div class="main">
<!--    <slider/>-->
    <new-header/>
    <router-view></router-view>
    <!--    <login/>-->

  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.main{
  background: linear-gradient(to bottom, #1c0522, #2b1055);
  width: 100%;
  min-height: 100vh;
  height: fit-content;

}

</style>
