<script setup>
import { ref } from 'vue';

const props = defineProps({
  featuredNews: {
    type: Object,
    required: true
  }
});

const comments = ref([]);
const newComment = ref('');
const showComments = ref(false);

const getNewsTypeStyle = (type) => {
  switch(type) {
    case 'update':
      return { backgroundColor: '#4CAF50', icon: '🔄' };
    case 'season':
      return { backgroundColor: '#2196F3', icon: '🏆' };
    case 'event':
      return { backgroundColor: '#FF9800', icon: '🎮' };
    default:
      return { backgroundColor: '#9E9E9E', icon: '📢' };
  }
};

const toggleComments = () => {
  showComments.value = !showComments.value;
};

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.unshift({
      id: comments.value.length + 1,
      user: '当前用户',
      avatar: '👤',
      content: newComment.value,
      date: new Date().toLocaleString(),
      likes: 0
    });
    newComment.value = '';
  }
};
</script>

<template>
  <div class="news-events">
    <div class="featured-news">
      <div class="news-header">
        <div class="news-type" :style="{ backgroundColor: getNewsTypeStyle(featuredNews.type).backgroundColor }">
          {{ getNewsTypeStyle(featuredNews.type).icon }}
        </div>
        <div class="news-meta">
          <span class="news-date">{{ featuredNews.date }}</span>
          <span class="news-author">作者：{{ featuredNews.author }}</span>
          <span class="news-views">👁️ {{ featuredNews.views }}</span>
          <span class="news-likes">❤️ {{ featuredNews.likes }}</span>
        </div>
      </div>
      
      <h2 class="news-title">{{ featuredNews.title }}</h2>
      
      <div class="news-content">
        <p v-for="(paragraph, index) in featuredNews.content.split('\n\n')" 
           :key="index" 
           class="news-paragraph">
          {{ paragraph }}
        </p>
      </div>

      <div class="news-footer">
        <button class="like-button" @click="featuredNews.likes++">
          ❤️ 点赞 ({{ featuredNews.likes }})
        </button>
        <button class="comment-button" @click="toggleComments">
          💬 评论 ({{ comments.length }})
        </button>
      </div>
    </div>

    <div v-if="showComments" class="comments-section">
      <div class="comment-input">
        <textarea 
          v-model="newComment" 
          placeholder="写下你的评论..."
          rows="3"
        ></textarea>
        <button @click="addComment">发表评论</button>
      </div>

      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <span class="comment-avatar">{{ comment.avatar }}</span>
            <span class="comment-user">{{ comment.user }}</span>
            <span class="comment-date">{{ comment.date }}</span>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-footer">
            <button class="like-button" @click="comment.likes++">
              ❤️ {{ comment.likes }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-events {
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  width: 100%;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.featured-news {
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.news-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.news-type {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.news-meta {
  display: flex;
  gap: 15px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.news-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.4;
}

.news-content {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.news-paragraph {
  margin-bottom: 15px;
}

.news-footer {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.like-button, .comment-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.like-button:hover, .comment-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.comments-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
}

.comment-input {
  margin-bottom: 20px;
}

.comment-input textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 10px;
}

.comment-input button {
  background: #4CAF50;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.comment-input button:hover {
  background: #45a049;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.comment-avatar {
  font-size: 20px;
}

.comment-user {
  font-weight: 600;
  color: #fff;
}

.comment-date {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.comment-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 10px;
}

.comment-footer {
  display: flex;
  justify-content: flex-end;
}

/* 添加动画效果 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-item {
  animation: slideIn 0.3s ease forwards;
}
</style> 