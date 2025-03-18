<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import NewSection from "@/components/NewSection.vue";
import NewHeader from "@/components/NewHeader.vue";
import ChatBox from "@/components/ChatBox.vue";
import Login from "@/components/Login.vue";
import Slider from "@/components/Slider.vue";
import PlayerRanking from "@/components/PlayerRanking.vue";
import NewsEventsContainer from "@/components/NewsEventsContainer.vue";
import OnlinePlayers from "@/components/OnlinePlayers.vue";
import DiscordUsers from "@/components/DiscordUsers.vue";
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
          <div class="content">
              <div class="part1">
                  <online-players/>
              </div>
              <div class="part2">
                  <chat-box/>
                  <player-ranking/>
                  <news-events-container/>
                  <!-- <router-view></router-view> -->
              </div>
              <div class="part3">
                  <discord-users/>
              </div>
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

.main {
    background-color: transparent;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    font-weight: normal;
    margin: 0 auto;
}

section {
    position: relative;
    width: 100%;
    height: 40vh; /* 减小到40%视窗高度 */
    padding: 20px; /* 进一步减小内边距 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(to bottom, #1c0522, #2b1055);
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    transition: transform 0.3s ease;
}

section img#moon {
    mix-blend-mode: screen;
    transform: translateY(30px);
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
}

section img#mountains_front {
    z-index: 10;
}

#text {
    position: absolute;
    right: -350px;
    top: 30%; /* 调整文本位置更靠上 */
    transform: translateY(-50%);
    color: #fff;
    white-space: nowrap;
    font-size: 3.5vw; /* 进一步减小字体大小 */
    z-index: 9;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    to {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    }
}

#btn {
    text-decoration: none;
    display: inline-block;
    padding: 8px 25px; /* 进一步减小按钮内边距 */
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.9);
    color: #2b1055;
    font-size: 1.2em; /* 进一步减小字体大小 */
    z-index: 9;
    position: absolute;
    bottom: 30%; /* 调整按钮位置更靠上 */
    transform: translateY(0);
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

#btn:hover {
    background: #fff;
    transform: translateY(-5px); /* 减小悬停时的上移距离 */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.sec {
    position: relative;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #1c0522, #2b1055);
    min-height: 100vh;
}

.content {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
    height: auto;
    padding: 20px;
    gap: 30px;
}

.part1, .part3 {
    background: rgba(128, 128, 128, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    min-height: 200px;
    width: 25%;
    height: 600px;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
}

.part1:hover, .part3:hover {
    transform: translateY(-5px);
}

.part2 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #1e1e2d;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    min-height: 600px;
    max-height: 3800px;
}

.part2 :deep(.chat-box) {
    width: 95%;
    max-width: 900px;
    margin: 0 auto;
    height: auto;
    min-height: 300px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    padding: 15px;
}

.part2 :deep(.ranking-container) {
    width: 95%;
    max-width: 900px;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 600px;
    display: flex;
    flex-direction: column;
}

.part2 :deep(.table-rows) {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.part2 :deep(.chat-box-container) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.part2 :deep(.chat-messages) {
    flex: 1;
    overflow-y: auto;
    max-height: 250px;
    min-height: 150px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.sec h2 {
    font-size: 3.5em;
    margin-bottom: 10px;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.sec p {
    font-size: 1em;
    color: #fff;
    line-height: 1.6;
}

.online-players, .discord-users {
    text-align: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
    box-sizing: border-box;
}

.online-players h2, .discord-users h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.online-players .count, .discord-users .count {
    font-size: 48px;
    font-weight: bold;
    color: #00ff00;
    text-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
    margin: 10px 0;
}

.online-players .label, .discord-users .label {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 2px;
}

@media (max-width: 768px) {
    section {
        height: 100vh;
        padding: 50px;
    }
    
    .content {
        flex-direction: column;
    }
    
    .part1, .part2, .part3 {
        width: 100%;
        height: auto;
    }
    
    #text {
        font-size: 6vw;
    }
}
</style>