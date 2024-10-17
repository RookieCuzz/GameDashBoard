<script setup>
import { ref } from 'vue';

// 使用响应式数据
const likes = ref([150, 163, 104]); // 每个帖子初始的点赞数
const liked = ref([false, false, false]); // 每个帖子是否被点赞

const toggleLike = (index) => {
  if (liked.value[index]) {
    likes.value[index]--;
  } else {
    likes.value[index]++;
  }
  liked.value[index] = !liked.value[index];
};
</script>

<template>
  <div class="forum-container">
    <!-- Forum Info Section -->
    <div class="forum-info">
      <div class="forum-header">

        <div class="forum-title-container">
          <div class="forum-title">Halloween 2024 - Lobby Quests, Ender, Maps & More!</div>
          <div class="forum-metadata">
            <span class="author">By Camezonda</span> • <span class="date">Oct 3, 2024</span>
          </div>
        </div>
      </div>

      <div class="forum-stats">
        <span class="forum-views">1.2k 人看过</span> • <span class="forum-replies">350 条回复</span>
      </div>
    </div>
    <div class="post-container">
      <!-- Original Post -->
      <div class="post">
        <div class="profile">
          <div class="avatar">
            <img src="https://via.placeholder.com/50" alt="Avatar">
          </div>
          <div  class="post_info">
            <div class="username">Muffin</div>

          </div>
        </div>
        <div class="post-content">
          Throw out your best memes that are created by you and are related to CCG.

          <!-- 添加 meme 图像部分 -->
          <div class="meme">
            <img src="https://via.placeholder.com/600x300" alt="Meme Image">
          </div>

          <button class="like-button" :class="{ liked: liked[0] }" @click="toggleLike(0)">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            {{ liked[0] ? 'Unlike' : 'Like' }}
          </button>
          <span class="likes-count">有{{ likes[0] }}人觉得很赞</span>
          <span class="post-date">Jul 26, 2014</span>
        </div>
      </div>

      <!-- Reply 1 -->
      <div class="post">
        <div class="profile">
          <div class="avatar">
            <img src="https://via.placeholder.com/50" alt="Avatar">
          </div>
          <div  class="post_info">
            <div class="username">musemat</div>
            <div class="post-date">Jul 26, 2014</div>
          </div>
        </div>
        <div class="post-content">

          <!-- 添加 meme 图像部分 -->
          <div class="meme">
            <img src="https://via.placeholder.com/300x400" alt="Meme Image">
          </div>

          <button class="like-button" :class="{ liked: liked[1] }" @click="toggleLike(1)">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            {{ liked[1] ? 'Unlike' : 'Like' }}
          </button>
          <span class="likes-count">{{ likes[1] }}</span>
        </div>
      </div>

      <!-- Reply 2 -->
      <div class="post">
        <div class="profile">
          <div class="avatar">
            <img src="https://via.placeholder.com/50" alt="Avatar">
          </div>
          <div class="post_info">
            <div class="username">Muffin</div>
            <div class="post-date">Jul 26, 2014</div>
          </div>
        </div>
        <div class="post-content">

          <!-- 添加 meme 图像部分 -->
          <div class="meme">
            <img src="https://via.placeholder.com/400x500" alt="Meme Image">
          </div>

          <button class="like-button" :class="{ liked: liked[2] }" @click="toggleLike(2)">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            {{ liked[2] ? 'Unlike' : 'Like' }}
          </button>
          <span class="likes-count">{{ likes[2] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.forum-container{
  width: 48vw;
  margin: 0 auto;
  padding: 20px;
  margin-top: 200px;
}
.post-container {
  margin: 30px auto;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* Enhanced Forum Info Styling */
.forum-info {
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.forum-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.forum-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.forum-icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.forum-title-container {
  display: flex;
  flex-direction: column;
}

.forum-title {
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
}

.forum-metadata {
  font-size: 16px;
  color: #c9c9c9;
}

.author {
  font-weight: 600;
}

.date {
  font-style: italic;
}


.forum-stats {
  margin-top: 15px;
  font-size: 14px;
  color: #e2e2e2;
}

.forum-stats span {
  margin-right: 15px;
}

/* Post and Profile Styling */
.post {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.reply {
  padding-left: 65px;
}

.profile {
  margin-right: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.post_info{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.username {
  margin: 0 auto;
  font-weight: 700;
  color: #ff6600;
}

.post-date{
float: right;
}

.post-content {
  margin-top: 15px;
}

.meme {
  margin-top: 15px;
}

.meme img {
  max-width: 100%;
  border-radius: 8px;
}

.like-button {
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.like-button:hover {
  background-color: #e65c00;
}

.like-button.liked {
  background-color: #007bff;
}

.likes-count {
  display: inline-block;
  margin-left: 10px;
  color: #888;
}
</style>
