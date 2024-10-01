<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ChatBox from "@/components/ChatBox.vue";
// 使用 ref 绑定 DOM 元素
const stars = ref(null);
const moon = ref(null);
const mountains_behind = ref(null);
const text = ref(null);
const btn = ref(null);
const mountains_front = ref(null);
const header = ref(null);

const scrolling = () => {
  let value = window.scrollY;
  console.log("HI", value);

  if (stars.value) stars.value.style.left = value * 0.25 + 'px';
  if (moon.value) moon.value.style.top = value * 1.05 + 'px';
  if (mountains_behind.value) mountains_behind.value.style.top = value * 0.5 + 'px';
  if (mountains_front.value) mountains_front.value.style.top = value * 0 + 'px';
  if (text.value) {
    text.value.style.marginRight = value * 4 + 'px';
    text.value.style.marginTop = value * 1.5 + 'px';
  }
  if (btn.value) btn.value.style.marginTop = value * 1.5 + 'px';
  if (header.value) header.value.style.top = value * 0.5 + 'px';
};

onMounted(() => {
  window.addEventListener("scroll", scrolling);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrolling);
});
</script>

<template>
  <section>
    <img src="@/assets/images/stars.png" id="stars" ref="stars">
    <img src="@/assets/images/moon.png" id="moon" ref="moon">
    <img src="@/assets/images/mountains_behind.png" id="mountains_behind" ref="mountains_behind">
    <h2 id="text" ref="text">明月谷</h2>
    <a href="#sec" id="btn" ref="btn">PLAY.4399MC.CN</a>
    <img src="@/assets/images/mountains_front.png" id="mountains_front" ref="mountains_front">
  </section>

  <div class="sec" id="sec">
    <chat-box/>
    <h2>bbbbbbbbbbbbbbbb</h2>
    <p>(内容随意发挥)hhhhhhhhhh.</p>
  </div>
</template>

<style scoped>
section {
  position: relative;
  width: 100%;
  height: 50vh;
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
section::before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, #1c0522, transparent);
  z-index: 1000;
}

section img {
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

section img#moon {
  mix-blend-mode: screen;
  transform: translateY(30px); /* 向上移动 20 像素 */
  object-fit: contain; /* 确保图像不被裁剪 */
}

section img#mountains_front {
  z-index: 10;
}

#text {
  position: absolute;
  right: -350px;
  top: 0px;
  color: #fff;
  white-space: nowrap;
  font-size: 4.5vw;
  z-index: 9;
  transform: translateY(-60px); /* 向上移动 20 像素 */
}

#btn {
  text-decoration: none;
  display: inline-block;
  padding: 8px 30px;
  border-radius: 40px;
  background: #fff;
  color: #2b1055;
  font-size: 1.5em;
  z-index: 9;
  transform: translateY(-20px); /* 向上移动 20 像素 */
}

.sec {
  position: relative;
  padding: 100px;
  background: #1c0522;
  min-height: 2000px;
}

.sec h2 {
  font-size: 3.5em;
  margin-bottom: 10px;
  color: #fff;
}

.sec p {
  font-size: 1em;
  color: #fff;
}
</style>
