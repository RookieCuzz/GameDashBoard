<script setup>
import { ref } from 'vue';
import CountryFlag from './CountryFlag.vue';

const rankings = ref([
  { rank: 1, country: 'India', name: 'xinecraft', rating: '2850', lastSeen: '2 months ago' },
  { rank: 2, country: 'Poland', name: 'typecko', rating: '2780', lastSeen: '11 months ago' },
  { rank: 3, country: 'Pakistan', name: 'nafeesahmad', rating: '2745', lastSeen: '9 months ago' },
  { rank: 4, country: 'Saudi Arabia', name: 'NachosKid', rating: '2690', lastSeen: '1 year ago' },
  { rank: 5, country: 'Saudi Arabia', name: 'BALINEVER', rating: '2655', lastSeen: '1 year ago' },
  { rank: 6, country: 'Pakistan', name: 'gganjdunv', rating: '2620', lastSeen: '11 months ago' },
  { rank: 7, country: 'Algeria', name: 'iD7br', rating: '2590', lastSeen: '2 years ago' },
  { rank: 8, country: 'Romania', name: 'Stefi2015', rating: '2565', lastSeen: '10 months ago' },
  { rank: 9, country: 'Romania', name: 'LucaLuk2', rating: '2540', lastSeen: '10 months ago' },
  { rank: 10, country: 'Pakistan', name: 'LaeeqAhmad', rating: '2520', lastSeen: '3 months ago' }
]);

// 获取国旗表情
const getCountryFlag = (country) => {
  const flags = {
    'India': '🇮🇳',
    'Poland': '🇵🇱',
    'Pakistan': '🇵🇰',
    'Saudi Arabia': '🇸🇦',
    'Algeria': '🇩🇿',
    'Romania': '🇷🇴'
  };
  return flags[country] || '🏳️';
};
</script>

<template>
  <div class="ranking-container">
    <div class="ranking-header">
      <h3>Top 10 Players</h3>
    </div>
    <div class="ranking-table">
      <div class="table-header">
        <div class="rank">#</div>
        <div class="flag">Flag</div>
        <div class="name">Name</div>
        <div class="rating">Rating</div>
        <div class="last-seen">Last Seen</div>
      </div>
      <div v-for="player in rankings" :key="player.rank" class="table-row">
        <div class="rank" :class="'rank-' + player.rank">{{ player.rank }}</div>
        <div class="flag">
          <country-flag :country="player.country" />
        </div>
        <div class="name">{{ player.name }}</div>
        <div class="rating">{{ player.rating }}</div>
        <div class="last-seen">{{ player.lastSeen }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ranking-container {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  width: 100%;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.ranking-header {
  padding: 16px 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ranking-header h3 {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.5px;
}

.ranking-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
}

.table-header {
  display: grid;
  grid-template-columns: 50px 60px 1fr 100px 120px;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 1;
}

.table-rows {
  overflow-y: auto;
  flex: 1;
}

.table-row {
  display: grid;
  grid-template-columns: 50px 60px 1fr 100px 120px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  font-size: 14px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.01);
}

.table-row:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateX(4px);
}

.rank {
  font-weight: 600;
  color: #fff;
  text-align: center;
}

.rank-1 {
  color: #FFD700;
}

.rank-2 {
  color: #C0C0C0;
}

.rank-3 {
  color: #CD7F32;
}

.flag {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.name {
  color: #fff;
  font-weight: 500;
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rating {
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 600;
  font-family: 'Monaco', monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
}

.table-row:hover .rating {
  background: rgba(255, 255, 255, 0.1);
}

.rank-1 .rating {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
}

.rank-2 .rating {
  color: #C0C0C0;
  background: rgba(192, 192, 192, 0.1);
}

.rank-3 .rating {
  color: #CD7F32;
  background: rgba(205, 127, 50, 0.1);
}

.last-seen {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  text-align: right;
  padding-right: 8px;
}

/* 最后一行不需要底部边框 */
.table-row:last-child {
  border-bottom: none;
}

/* 添加滚动条样式 */
.ranking-table::-webkit-scrollbar {
  width: 6px;
}

.ranking-table::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 3px;
}

.ranking-table::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.ranking-table::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style> 