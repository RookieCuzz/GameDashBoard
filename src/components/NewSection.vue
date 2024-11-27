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
          <div v-for="ele in lst">
              <div class="text-box">
                  <h3>{{ ele.title }}</h3>
                  <p>{{ ele.content }}</p>
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












</style>