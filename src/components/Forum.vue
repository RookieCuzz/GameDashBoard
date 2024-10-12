<script setup>
import { ref } from "vue";

// 新闻列表数据
const newsList = ref([
  {
    id: 1,
    title: "New Game Update Released! 🎮",
    avtar: "../assets/forum/1.jpg",
    author: "JohnDoe",
    publish_time: "1688594520000", // 时间戳字符串（注意单位是毫秒）
    replies: 45,
    views: "8K"
  },
  {
    id: 2,
    title: "Exciting Patch Notes for Upcoming Game",
    avtar: "../assets/forum/2.jpg",
    author: "JaneDoe",
    publish_time: "1690704520000",
    replies: 30,
    views: "5K"
  },
]);

// 格式化时间戳为 "October 10, 2022"
const formatDate = (timestamp) => {
  const date = new Date(Number(timestamp)); // 将字符串时间戳转换为数字并生成日期对象
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};

// 计算相对时间 "2 hours ago" 或 "1 day ago"
const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const timeDiff = now - Number(timestamp); // 当前时间与传入时间的差值（毫秒）

  // 转换为不同时间单位的毫秒值
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (timeDiff < hour) {
    const minutesAgo = Math.floor(timeDiff / minute);
    return minutesAgo > 1 ? `${minutesAgo} minutes ago` : "1 minute ago";
  } else if (timeDiff < day) {
    const hoursAgo = Math.floor(timeDiff / hour);
    return hoursAgo > 1 ? `${hoursAgo} hours ago` : "1 hour ago";
  } else if (timeDiff < month) {
    const daysAgo = Math.floor(timeDiff / day);
    return daysAgo > 1 ? `${daysAgo} days ago` : "1 day ago";
  } else if (timeDiff < year) {
    const monthsAgo = Math.floor(timeDiff / month);
    return monthsAgo > 1 ? `${monthsAgo} months ago` : "1 month ago";
  } else {
    const yearsAgo = Math.floor(timeDiff / year);
    return yearsAgo > 1 ? `${yearsAgo} years ago` : "1 year ago";
  }
};

// 跳转到新闻详情页的函数
const goToDetails = (id) => {
  alert(`Redirecting to news details page with id: ${id}`);
};
</script>

<template>
  <div class="news-container">
    <div class="news-header">News</div>

    <div class="pagination">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>Next ></span>
    </div>

    <div class="news-box">
      <ul class="news-list">
        <!-- 使用 v-for 渲染多个新闻项 -->
        <li v-for="news in newsList" :key="news.id" class="news-item">
          <div class="news-content">
            <img :src="news.avtar" alt="Post Image" />
            <div class="news-details">
              <!-- 点击事件 -->
              <div class="news-title">
                <span
                    @click="goToDetails(news.id)">{{ news.title }}</span>
              </div>
              <div class="news-meta">
                <span class="name" @click="goToDetails(news.id)">{{ news.author }}</span> -
                <span class="date" @click="goToDetails(news.id)">{{ formatDate(news.publish_time) }}</span>
              </div>
            </div>
          </div>
          <div class="news-right">
            <p class="replies">Replies: {{ news.replies }}</p>
            <p class="views">Views: {{ news.views }}</p>
            <!-- 显示相对时间 -->
            <time>{{ getTimeAgo(news.publish_time) }}</time>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.news-box {
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.news-container {
  max-width: 800px;         /* 桌面视图限制最大宽度 */
  margin: 0 auto;           /* 居中显示 */
  padding-top: 150px;
  padding-left: 20px;       /* 添加一些左右内边距 */
  padding-right: 20px;
  box-sizing: border-box;   /* 确保内边距不会影响宽度 */
}



.news-header {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
}

.pagination {
  margin-bottom: 15px;
  color: #ffffff;
}

.pagination span {
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
}

.news-list {
  list-style-type: none;
  padding: 0;
}

.news-item {
  border-radius: 8px;
  margin: 2px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  transition: background-color 0.2s ease;
}

.news-item:hover {
  background-color: #f7f7f7;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
}

.news-content {
  display: flex;
  align-items: center;
}

.news-content img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 15px;
}

.news-details {
  font-size: 16px;
  color: #333;
}

.news-title {
  font-weight: bold;
  color: #ff4500;
  transition: color 0.3s ease;
}

.news-title span:hover {
  color: #ff6347;
  text-decoration: underline;
  cursor: pointer;
}

.news-meta {
  font-size: 14px;
  color: #888;
}

.news-meta{
  .name{
    cursor: pointer;
    transition: color 0.3s ease, text-decoration 0.3s ease;
  }
  .date{
    cursor: pointer;
    transition: color 0.3s ease, text-decoration 0.3s ease;
  }
}

/* 悬停时的下划线效果 */
.news-meta span:hover {
  color: #666;
  text-decoration: underline;
}

.news-right {
  text-align: right;
  font-size: 14px;
}

.news-right p {
  margin: 0;
}

.news-right .replies {
  color: #0073e6;
}

.news-right .views {
  color: #00a676;
}

.news-right time {
  font-size: 12px;
  color: #888;
}

/* --- 响应式设计 --- */
@media (max-width: 500px) {
  .news-container {
    max-width: 100%;        /* 宽度占满整个屏幕 */
    padding-left: 1vw;     /* 减少左右内边距 */
    padding-right: 1vw;
  }

  .news-item {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .news-right {
    text-align: left;
    margin-top: 10px;
  }

  .news-content img {
    margin-bottom: 10px;
  }

  .news-title {
    font-size: 18px;
  }

  .news-meta {
    font-size: 12px;
  }

  .news-right p {
    font-size: 12px;
  }

  .news-right time {
    font-size: 10px;
  }
}
</style>
