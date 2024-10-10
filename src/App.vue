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
  background-color: transparent;
  width: 100%;
  height: 1000px;
}

</style>
