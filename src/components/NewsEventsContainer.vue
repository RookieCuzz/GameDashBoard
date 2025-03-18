<script setup>
import { ref } from 'vue';
import NewsEvents from './NewsEvents.vue';

const newsEvents = ref([
  {
    id: 1,
    title: '服务器重大更新：全新游戏模式即将上线',
    content: '我们很高兴地宣布，服务器将于本周六进行重大更新！本次更新将带来全新的游戏模式，包括：\n\n1. 生存竞技模式：全新的PVP体验\n2. 创造模式：无限资源，自由建造\n3. 冒险模式：精心设计的剧情任务\n\n同时，我们还将优化服务器性能，提升游戏体验。更新期间服务器将暂停服务，预计持续2小时。\n\n敬请期待！',
    date: '2024-03-20',
    type: 'update',
    author: '管理员',
    views: 1234,
    likes: 88
  },
  {
    id: 2,
    title: '新赛季"龙之崛起"即将开始',
    content: '新赛季"龙之崛起"即将开始！\n\n赛季特色：\n1. 全新赛季专属皮肤\n2. 赛季限定称号\n3. 赛季排行榜奖励\n4. 特殊赛季任务\n\n参与即可获得丰厚奖励，快来加入吧！',
    date: '2024-03-19',
    type: 'season',
    author: '游戏管理员',
    views: 986,
    likes: 156
  },
  {
    id: 3,
    title: '大型PVP竞技赛即将开始',
    content: '本周日将举办大型PVP竞技赛！\n\n比赛规则：\n1. 1v1淘汰赛制\n2. 装备统一发放\n3. 公平竞技环境\n\n奖励设置：\n- 冠军：1000钻石\n- 亚军：500钻石\n- 季军：300钻石\n\n报名时间：即日起至本周六',
    date: '2024-03-18',
    type: 'event',
    author: '活动策划',
    views: 856,
    likes: 234
  }
]);
</script>

<template>
  <div class="news-events-container">
    <div v-for="news in newsEvents" :key="news.id" class="news-item">
      <news-events :featured-news="news" />
    </div>
  </div>
</template>

<style scoped>
.news-events-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.news-item {
  width: 100%;
  margin-bottom: 20px;
}

.news-item:last-child {
  margin-bottom: 0;
}
</style> 