<script setup>
const discordCount = 1280;
</script>

<template>
  <div class="discord-users">
    <div class="discord-header">
      <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_white_RGB.png" alt="Discord" class="discord-logo">
      <h2>Discord</h2>
    </div>
    <div class="count">{{ discordCount }}</div>
    <div class="label">Online Members</div>
  </div>
</template>

<style scoped>
.discord-users {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.discord-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
}

.discord-logo {
  width: 24px;
  height: 24px;
}

.discord-header h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.count {
  font-size: 48px;
  font-weight: bold;
  color: #00ff00;
  text-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  margin: 10px 0;
}

.label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style> 