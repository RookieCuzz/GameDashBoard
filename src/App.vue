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
      <section>
          <img src="@/assets/images/stars.png" id="stars" ref="stars">
          <img src="@/assets/images/moon.png" id="moon" ref="moon">
          <img src="@/assets/images/mountains_behind.png" id="mountains_behind" ref="mountains_behind">
          <h2 id="text" ref="text">明月谷</h2>
          <a href="#sec" id="btn" ref="btn">PLAY.4399MC.CN</a>
          <img src="@/assets/images/mountains_front.png" id="mountains_front" ref="mountains_front">
          <new-header/>
      </section>

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
    width: 100%;
    height: auto;               /* 高度自适应 */
    display: flex;              /* 使用 flex 布局 */
    flex-direction: column;     /* 垂直排列内容 */
    font-weight: normal;
    margin: 0 auto;
}


</style>

<style scoped>

.content{
    width: 100%;
    min-width: 25%;
}

section {
    position: relative;
    width: 100%;
    height: 300px;
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
    display: flex;              /* 使用 flex 布局 */
    flex-direction: column;     /* 垂直排列内容 */
    justify-content: center;    /* 垂直居中子元素 */
    align-items: center;        /* 水平居中子元素 */
    background: linear-gradient(to bottom, #1c0522, #2b1055);
    height: auto;               /* 高度自适应 */
    min-height: 100vh;          /* 确保最小高度为视口高度 */
}

.content {
    position: relative;
    display: flex;              /* 使用 flex 布局 */
    /*flex-direction: row;        !* 水平排列 .part1, .part2, .part3 *!*/
    /*justify-content: center;    !* 水平居中 .part1, .part2, .part3 *!*/
    width: 100%;
    /*max-width: 1200px;          !* 限制最大宽度 *!*/
    height: auto;               /* 高度自适应 */
    padding: 10px;              /* 适当的内边距 */
}

.part1, .part3 {
    background: rgb(128, 128, 128);
    border-radius: 10px;
    min-height: 200px;           /* 设置最小高度 */
    width: 20%;                  /* 固定宽度 */
    height: 600px;                /* 高度自适应 */
    flex-shrink: 0;              /* 防止收缩 */
}
.part2 {
    /*background: #ccc;           !* 设置背景色以便查看 *!*/
    border-radius: 10px;
    width: 60%;                  /* 固定宽度 */
    height: auto;                /* 高度自适应 */
    min-height: 200px;           /* 最小高度，防止过小 */
    flex-grow: 1;                /* 占用剩余空间 */
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