<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import NewSection from "@/components/NewSection.vue";
import NewHeader from "@/components/NewHeader.vue";
import ChatBox from "@/components/ChatBox.vue";
</script>
<template>
  <div class="main">
    <new-header/>
    <new-section/>
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
