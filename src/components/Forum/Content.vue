<script setup>
import { ref } from 'vue';

// 帖子数据
const posts = ref([
  {
    id: 1,
    username: 'Muffin',
    avatar: '/src/assets/forum/7.jpg',
    content: 'Throw out your best memes that are created by you and are related to CCG.' +
        'Throw out your best memes that are created by you and are related to CCG.Throw out' +
        ' your best memes that are created by you and are related to CCG.Throw out your best memes ' +
        'that are created by you and are related to CCG.' +
        'Throw out your best memes that are created by you and are related to CCG.',
    meme: '/src/assets/forum/p1.jpg',
    likes: 150,
    liked: false,
    date: 'Jul 26, 2014',
    floor: '# 1',
  },
  {
    id: 2,
    username: 'musemat',
    avatar: '/src/assets/forum/8.jpg',
    content: '',
    meme: '/src/assets/forum/p3.jpg',
    likes: 163,
    liked: false,
    date: 'Jul 26, 2014',
    floor: '# 2',
  },
  {
    id: 3,
    username: 'Muffin',
    avatar: '/src/assets/forum/9.jpg',
    content: '',
    meme: '/src/assets/forum/p2.png',
    likes: 104,
    liked: false,
    date: 'Jul 26, 2014',
    floor: '# 3',
  },
]);

// 点赞/取消点赞功能
const toggleLike = (index) => {
  if (posts.value[index].liked) {
    posts.value[index].likes--;
  } else {
    posts.value[index].likes++;
  }
  posts.value[index].liked = !posts.value[index].liked;
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

    <!-- Post Container -->
    <div class="post-container">
      <!-- 动态加载帖子 -->
      <div v-for="(post, index) in posts" :key="post.id" class="post">
        <div class="profile">
          <div class="avatar">
            <img :src="post.avatar" alt="Avatar">
          </div>
          <div class="post_info">
            <div class="username">{{ post.username }}</div>
          </div>
        </div>
        <!-- 楼层信息 -->
        <div class="floor-number">{{ post.floor }}</div>
        <div class="post-content">
          <div v-if="post.content" class="text">{{ post.content }}</div>
          <div v-if="post.meme" class="meme">
            <img :src="post.meme" alt="Meme Image">
          </div>
          <button class="like-button" :class="{ liked: post.liked }" @click="toggleLike(index)">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            {{ post.liked ? '取消点赞' : '点赞' }}
          </button>
          <span class="likes-count">有 {{ post.likes }} 人觉得很赞</span>
          <span class="post-date">{{ post.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.text {
  text-align: justify;
}
.forum-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 150px;
  border-radius: 68px 68px 0 0;
}

.post-container {
  margin: 0 auto;
  padding: 20px;
  position: relative;
  background-color: #fff;
  border-radius: 12px;
}
.post-container ::before {
  background-color: #d50000;/* Soft light background for posts */
  border-radius: 5px;
  position: absolute;

}
.forum-info {
  padding: 20px;
  color: #444; /* Darker gray for text */
  position: relative;
}


.forum-title {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
}

.forum-metadata {
  font-size: 14px;
  color: #f3106e;
}

.forum-stats {
  margin-top: 10px;
  font-size: 13px;
  color: #f3106e;
}

.post {

  position: relative;
  display: flex;
  border-bottom: 1px solid #e0e0e0; /* Light gray for post separator */
  margin-bottom: 20px;
  margin-top: 10px;
}

.profile {
  padding-right: 15px; /* Light gray for profile border */
  margin-bottom: 20px;
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

.username {
  font-weight: 600;
  color: #f3106e;
  text-align: center;
  font-size: 18px;

}

.post-date {
  font-size: 12px;
  color: #888;
  position: absolute;
  right: 10px; /* 右边距 */
  bottom: 5px; /* 底部边距 */
}

.post-content {
  width: 75%;
  margin-bottom: 30px;
  margin-left: 20px;
}

.meme img {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
}

.like-button {
  background-color: #f3106e;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.like-button:hover {
  background-color: #f475a9;
}

.like-button.liked {
  background-color: #df4141;
}

.likes-count {
  margin-left: 10px;
  font-size: 14px;
  color: #555;
}

.floor-number {
  position: absolute;
  top: -20px;
  right: 0px;
  font-size: 16px;
  color: #918e8e;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-block;
}

@media (max-width: 768px) {
  .forum-container {
    padding: 15px;
    margin-top: 100px;
  }

  .post {
    flex-direction: column;
  }

  .profile {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .meme img {
    max-width: 100%;
  }
}


</style>
