<script setup>
const onlineCount = 675;
</script>

<template>
  <div class="online-players">
    <h2>在线玩家</h2>
    <div class="count">{{ onlineCount }}</div>
    <div class="label">Players Online</div>
  </div>
</template>

<style scoped>
.online-players {
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.online-players h2 {
  font-size: 20px;
  margin-bottom: 5px;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.online-players .count {
  font-size: 36px;
  font-weight: bold;
  color: #00ff00;
  text-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  margin: 5px 0;
}

.online-players .label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style> 