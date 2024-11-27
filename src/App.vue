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
    <section>
        <img src="@/assets/images/stars.png" id="stars" ref="stars">
        <img src="@/assets/images/moon.png" id="moon" ref="moon">
        <img src="@/assets/images/mountains_behind.png" id="mountains_behind" ref="mountains_behind">
        <h2 id="text" ref="text">明月谷</h2>
        <a href="#sec" id="btn" ref="btn">PLAY.4399MC.CN</a>
        <img src="@/assets/images/mountains_front.png" id="mountains_front" ref="mountains_front">
    </section>
  <div class="main">
<!--    <slider/>-->
    <new-header/>
      <div class="sec" id="sec">
          <!--    <chat-box/>-->
          <div class="content">
              <div class="part1"></div>
              <div class="part2">
              <router-view></router-view>
              </div>
              <div class="part3"></div>
          </div>


      </div>
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
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
}



</style>

<style scoped>



.content{
    width: 100%;
}

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
    flex-direction: row;
    justify-content: space-between; /* 保证内容项之间的间距 */
    width: 100%; /* 确保内容占满可用宽度 */
    max-width: 1200px; /* 限制内容的最大宽度 */
}

.part1, .part3 {
    background: rgb(128, 128, 128);
    border-radius: 10px;
    min-height: 100rem;
    height: fit-content;
}
.part2 {
    border-radius: 10px;
    min-height: 100rem;
    height: fit-content;
}
.part2 {
    width: 70%; /* 初始宽度为 50% */
}
.part1{
    width: 15%; /* 初始宽度为 20% */
}

.part3{
    width: 15%;
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