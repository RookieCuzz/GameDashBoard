<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useThrottle } from '@vueuse/core';

// 使用 ref 绑定 DOM 元素
const stars = ref(null);
const moon = ref(null);
const mountains_behind = ref(null);
const text = ref(null);
const btn = ref(null);
const mountains_front = ref(null);
const header = ref(null);

// 使用节流函数优化滚动性能
const handleScroll = useThrottle(() => {
  const value = window.scrollY;
  
  // 使用 transform 代替直接修改 style 属性，提高性能
  if (stars.value) stars.value.style.transform = `translateX(${value * 0.25}px)`;
  if (moon.value) moon.value.style.transform = `translateY(${value * 1.05}px)`;
  if (mountains_behind.value) mountains_behind.value.style.transform = `translateY(${value * 0.5}px)`;
  if (mountains_front.value) mountains_front.value.style.transform = `translateY(${value * 0}px)`;
  if (text.value) {
    text.value.style.transform = `translate(${value * 4}px, ${value * 1.5}px)`;
  }
  if (btn.value) btn.value.style.transform = `translateY(${value * 1.5}px)`;
  if (header.value) header.value.style.transform = `translateY(${value * 0.5}px)`;
}, 16); // 约60fps

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 优化数据结构，移除重复内容
const sections = [
  {
    title: "Welcome to 明月",
    content: "Welcome to 明月, a world where the moonlight shines brightly. The landscape is serene and peaceful, with towering mountains and a gentle river flowing nearby. You can explore this magical world and discover hidden treasures."
  },
  {
    title: "Discover the hidden treasures",
    content: "To find hidden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, you can return it to the treasure chest to claim your reward."
  },
  {
    title: "Join the adventure",
    content: "To join the adventure, you can participate in various challenges and activities in the magical world. Each challenge will provide you with rewards and opportunities to explore new areas and discover hidden treasures."
  },
  {
    title: "Stay tuned for more updates",
    content: "Stay tuned for more updates on the magical world and its hidden treasures. You can follow us on social media or join our community to get the latest news and updates."
  },
  {
    title: "Join our community",
    content: "Join our community on 4399MC.CN and share your experiences and discover new ways to play the magical world. You can also become a member of our exclusive forums and chat rooms to connect with other players and share your knowledge and experiences."
  }
];
</script>

<template>
  <div class="sections-container">
    <div v-for="(section, index) in sections" 
         :key="index" 
         class="text-box"
         :class="{ 'fade-in': true }">
      <h3>{{ section.title }}</h3>
      <p>{{ section.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.sections-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.text-box {
  width: 100%;
  padding: 25px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.text-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.text-box h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;
}

.text-box p {
  color: #34495e;
  line-height: 1.6;
  font-size: 1.1rem;
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .sections-container {
    padding: 10px;
  }
  
  .text-box {
    padding: 20px;
  }
  
  .text-box h3 {
    font-size: 1.3rem;
  }
  
  .text-box p {
    font-size: 1rem;
  }
}
</style>