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
const lst = [
  {
    title: "Welcome to 明月��",
    content: "Welcome to 明月��, a world where the moonlight shines brightly. The landscape is serene and peaceful, with towering mountains and a gentle river flowing nearby. You can explore this magical world and discover hidden treasures."
  },
  {
    title: "Discover the hidden treasures",
    content: "To find hidden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, you can return it to the treasure chest to claim your reward."
  },
  {
    title: "Join the adventure",
    content: "To join the adventure, you can participate in various challenges and activities in the magical world. Each challenge will provide you with rewards and opportunities to explore new areas and discover hidden treasures."
  },
  {
    title: "Stay tuned for more updates",
    content: "Stay tuned for more updates on the magical world anddden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure,  its hidden treasures. You can follow us on social media or join our community to get the latest news and updates."
  },
  {
    title: "Join our community",
    content: "Join our community on 4399MC.CN and share your experiences and discover new ways to play the magical world. You can also become a member of our exclusive forums and chat rooms to connect with other players and share your knowledge and edden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, xperiences."
  },
  {
    title: "Welcome to 明月��",
    content: "Welcome to 明月��, a world whdden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, ere the moonlight shines brightly. The landscape is serene and peaceful, with towering mountains and a gentle river flowing nearby. You can explore this magical world and discover hidden treasures."
  },
  {
    title: "Discover the hidden treasures",
    content: "To find hidden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, you can return it to the treasure chest to claim your reward."
  },
  {
    title: "Join the adventure",
    content: "To join the adventure, you can participate in various challenges and activities in the magical world. Each challenge will provide yodden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, u with rewards and opportunities to explore new areas and discover hidden treasures."
  },
  {
    title: "Stay tuned for more updates",
    content: "Stay tuned for more updates on the mdden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, agical world and its hidden treasures. You can follow us on social media or join our community to get the latest news and updates."
  },
  {
    title: "Join our community",
    content: "Join our community on 4399MC.CN and share your experiences and discover new ways to play the magical world. You can also become a member of our exclusive forums and chat rooms to connect with other players and share your knowledge and experiences."
  },
  {
    title: "Welcome to 明月��",
    content: "Welcome to 明月��, a world where the moonlight shines brightly. The landscape is serene and peaceful, with towering mountains and a gentle river flowing nearby. You can explore this magical world and discover hidden treasures."
  },
  {
    title: "Discover the hidden treasures",
    content: "To find hidden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, you can return it to the treasuredden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure, dden treasures in the magical world, you can explore the area and look for hidden items. Once you find a treasure,  chest to claim your reward."
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
]
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
<!--    <chat-box/>-->
    <div class="content">
      <div class="part1">666</div>
      <div class="part2">
        <div v-for="ele in lst">
          <div class="text-box">
            <h3>{{ ele.title }}</h3>
            <p>{{ ele.content }}</p>
          </div>
        </div>
      </div>
      <div class="part3">666</div>
    </div>


  </div>
</template>

<style scoped>

.text-box{
  width: 95%;
  margin: 10px auto;
  padding: 20px;
  height: fit-content;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}
.text-box p {
  color: black !important; /* 强制设置文字颜色为黑色 */
}

.content{
  width: 100%;
}

section {
  position: relative;
  width: 100vw;
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
  padding: 50px;
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  //align-items: center; /* 垂直居中 */
  background: linear-gradient(to bottom, #1c0522, #2b1055);
  min-height: 2000px;
  top: -10px;
}

.content {
  position: relative;
  display: flex;
  width: 2000px;
  height: 2000px;
  flex-direction: row;
  justify-content: space-between; /* 保证内容项之间的间距 */
  width: 100%; /* 确保内容占满可用宽度 */
  max-width: 1200px; /* 限制内容的最大宽度 */
}

.part1, .part2, .part3 {
  background: rgb(128, 128, 128);
  border-radius: 10px;
  min-height: 100rem;
  height: fit-content;
}

.part1{
  width: 20%; /* 初始宽度为 20% */
}

.part2 {
  width: 53%; /* 初始宽度为 50% */
}
.part3{
  width: 25%;
}
/* 使用 max-width 来根据视口宽度调整布局 */
@media (min-width: 100vw) {
  .content {
    min-width: 25%;
  }
}


@media (max-width: 1200px) {
  .part1, .part3 {
    width: 25%;
    min-width: 150px;
  }

  .part2 {
    width: 60%;
    min-width: 300px;
  }
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
