<script setup>
import { reactive, ref, nextTick, onMounted } from "vue";

// 初始化聊天消息
const messages = reactive([
  '<span class="player">xinecraft</span> left the game',
  '<span class="admin">[WEB] superadmin</span>: test',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="stranger">[Stranger] xinecraft</span>: test',
  '<span class="player">xinecraft</span> left the game',
  '<span class="admin">[WEB] superadmin</span>: test',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="stranger">[Stranger] xinecraft</span>: test',
  '<span class="player">xinecraft</span> left the game',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="player">xinecraft</span> left the game',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="stranger">[Stranger] xinecraft</span>: test',
  '<span class="stranger">[Stranger] xinecraft</span>: test',
  '<span class="player">xinecraft</span> left the game',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="player">xinecraft</span> left the game',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="player">xinecraft</span> left the game',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="player">xinecraft</span> left the game',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="stranger">[Stranger] xinecraft</span>: test',
  '<span class="player">xinecraft</span> left the game',
  '<span class="player">xinecraft</span> joined the game',
  '<span class="player">xinecraft</span> left the game',
  '<span class="admin">[WEB] superadmin</span>: test',
  '<span class="player">KavyanshiGone</span> joined the game',
  '<span class="player">KavyanshiGone</span> was slain by Zombified Piglin',
  '<span class="player">KavyanshiGone</span> left the game'
]); // 初始消息

let heartbeatInterval = null;
let reconnectTimeout = null;

const newMessage = reactive({
  playerName: "测试玩家",
  message: "",
  messageTimeStamp: null,
  type: "webMessage"
}); // 用户输入的消息
const players = ref([
  { name: 'Player_Alpha', status: 'online', level: 42 },
  { name: 'Minecraft_Pro', status: 'online', level: 38 },
  { name: 'Diamond_Hunter', status: 'away', level: 55 },
  { name: 'Redstone_Engineer', status: 'online', level: 47 },
  { name: 'Nether_Explorer', status: 'offline', level: 33 },
  { name: 'End_Dragon', status: 'online', level: 60 },
  { name: 'Village_Guard', status: 'away', level: 28 },
  { name: 'Cave_Spelunker', status: 'online', level: 45 }
]); // 玩家列表
const showPlayer = ref(true); // 是否显示玩家列表

// 引用 chat-messages 容器
const chatMessagesRef = ref(null);
let ws = ref(null);

// 发送消息的函数
  const sendMessage = () => {
    newMessage.messageTimeStamp = new Date().getTime();
    if (newMessage.message.trim()) {
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log(newMessage);
        ws.send(JSON.stringify(newMessage));
      } else {
        console.error('WebSocket 未连接或已关闭');
      }

      newMessage.message = ''; // 清空输入框
      // 确保消息 DOM 更新后滚动到底部
      nextTick(() => {
        if (chatMessagesRef.value) {
          chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
        }
      });
    }
  };

// 心跳包函数
const startHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval); // 避免重复定时
  }

  // 每隔 30 秒发送心跳包
  heartbeatInterval = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const heartbeatMessage = JSON.stringify({ type: "heartbeat", messageTimeStamp: Date.now() });
      ws.send(heartbeatMessage); // 发送心跳包
    }
  }, 30000); // 30 秒
};

// 停止心跳包
const stopHeartbeat = () => {
  if (heartbeatInterval) {
    console.log("心跳包已经关闭")
    clearInterval(heartbeatInterval);
  }
};

// 尝试重新连接 WebSocket
const attemptReconnect = () => {
  clearTimeout(reconnectTimeout);
  reconnectTimeout = setTimeout(() => {
    console.log("正在尝试重新连接 WebSocket...");
    initializeWebSocket(); // 重新初始化 WebSocket 连接
  }, 5000); // 5 秒后重新连接
};

// 格式化聊天消息
function formatChatMessage(chatMessageDTO) {
  const playerName = chatMessageDTO.playerName;
  const message = chatMessageDTO.message;
  return `<span class="player">${playerName}</span>: ${message}`;
}

// 切换显示玩家列表
const togglePlayers = () => {
  showPlayer.value = !showPlayer.value;
};

// 获取状态颜色
const getStatusColor = (status) => {
  switch(status) {
    case 'online': return '#00ff00';
    case 'away': return '#ffff00';
    case 'offline': return '#ff0000';
    default: return '#666666';
  }
};

// 获取状态文本
const getStatusText = (status) => {
  switch(status) {
    case 'online': return '●';
    case 'away': return '○';
    case 'offline': return '×';
    default: return '?';
  }
};

// 初始化 WebSocket
const initializeWebSocket = () => {

    ws = new WebSocket('ws://43.248.186.18:8081/webchat');

    ws.onopen = () => {
      console.log('WebSocket 已连接');
      startHeartbeat();
    };

  ws.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    if (messageData.type === "heartbeat") {
      return; // 忽略心跳消息
    }
    messages.push(formatChatMessage(messageData)); // 格式化并添加到消息中

    // 确保消息 DOM 更新后滚动到底部
    nextTick(() => {
      if (chatMessagesRef.value) {
        chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
      }
    });
  };

  ws.onclose = () => {
    console.log('WebSocket 连接已关闭');
    stopHeartbeat(); // 停止心跳包
    attemptReconnect(); // 尝试重新连接
  };

  console.log(ws);
};

// 在组件挂载时初始化 WebSocket
  onMounted(() => {
    console.log("挂载了一次")
    initializeWebSocket();
  });
</script>


<template>
  <div class="chat-container">
    <div class="chat-box">
      <div class="chat-title">全服聊天</div>
      <div class="chat-messages" ref="chatMessagesRef">
        <p v-for="(message, index) in messages" :key="index" v-html="message"></p>
      </div>
      <div class="chat-input">
        <input
            type="text"
            v-model="newMessage.message"
            @keyup.enter="sendMessage"
            placeholder="Say something.."
        />
      </div>
    </div>
    <div class="players-list" :class="{ 'collapsed': !showPlayer }">
      <div class="players-header" @click="togglePlayers">
        <span class="header-title">Players ({{ players.length }})</span>
        <span class="collapse-icon">{{ showPlayer ? '[-]' : '[+]' }}</span>
      </div>
      <div v-if="showPlayer" class="players-content">
        <div v-if="players.length === 0" class="no-players">
          No players.
        </div>
        <div v-else>
          <div v-for="(player, index) in players" :key="index" class="player-item">
            <span class="status-indicator" :style="{ color: getStatusColor(player.status) }">
              {{ getStatusText(player.status) }}
            </span>
            <div class="player-info">
              <span class="player-name">{{ player.name }}</span>
              <span class="player-level">Lv.{{ player.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keep your original styles here */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #1e1e2d;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.chat-container {
  display: flex;
  background-color: #1a1a1a;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 400px;
  padding: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  top: 0;
  border: 1px solid #333;
  font-family: 'Courier New', monospace;
}
.chat-box {
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000;
  border-radius: 4px;
  margin-right: 15px;
  border: 1px solid #333;
}
.chat-title {
  padding: 10px;
  color: #00ffff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #333;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
}
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  color: #00ff00;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 11px;
  line-height: 1.3;
  min-height: 200px;
  max-height: 300px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 20, 0, 0.8));
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
}
.chat-messages p {
  margin: 0;
  padding: 2px 4px;
  max-width: 100%;
  word-wrap: break-word;
  font-family: 'Courier New', monospace;
  border-left: 2px solid rgba(0, 255, 0, 0.2);
  background: rgba(0, 20, 0, 0.2);
  transition: all 0.2s ease;
}
.chat-messages p:hover {
  background: rgba(0, 30, 0, 0.3);
  border-left-color: rgba(0, 255, 0, 0.4);
  transform: translateX(2px);
}
.chat-messages p .player {
  color: #00ff00;
  font-weight: bold;
  margin-right: 6px;
  text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
  position: relative;
  display: inline-block;
}
.chat-messages p .admin {
  color: #ff0000;
  font-weight: bold;
  margin-right: 6px;
  text-shadow: 0 0 8px rgba(255, 0, 0, 0.5);
  position: relative;
  display: inline-block;
}
.chat-messages p .stranger {
  color: #ffa500;
  font-weight: bold;
  margin-right: 6px;
  text-shadow: 0 0 8px rgba(255, 165, 0, 0.5);
  position: relative;
  display: inline-block;
}
.chat-messages p .player::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, #00ffff, transparent);
  opacity: 0.5;
}
.chat-input {
  padding: 6px;
  border-top: 1px solid #333;
  background-color: #000;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: auto;
}
.chat-input input {
  width: 100%;
  padding: 4px;
  border: none;
  background-color: rgba(0, 20, 0, 0.3);
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  outline: none;
  box-sizing: border-box;
  margin: 0;
  border-radius: 3px;
  border: 1px solid rgba(0, 255, 0, 0.2);
  transition: all 0.2s ease;
}
.chat-input input:focus {
  border-color: rgba(0, 255, 0, 0.4);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);
}
.chat-input input::placeholder {
  color: #006400;
}
.players-list {
  width: 15%;
  background-color: #1a1a1a;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #333;
  color: #00ff00;
  transition: all 0.3s ease;
}

.players-list.collapsed {
  width: 50px;
  padding: 10px 5px;
  cursor: pointer;
}

.players-list.collapsed .players-content {
  display: none;
}

.players-header {
  font-weight: bold;
  color: #00ffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.players-header:hover {
  color: #00ff00;
}

.header-title {
  color: #00ffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.players-list.collapsed .header-title {
  display: none;
}

.players-header .collapse-icon {
  cursor: pointer;
  color: #00ff00;
  font-family: monospace;
  transition: transform 0.3s ease;
}

.players-list.collapsed .collapse-icon {
  transform: rotate(-90deg);
}

.players-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  max-height: calc(100% - 40px);
}
.player-item {
  display: flex;
  align-items: center;
  padding: 5px 8px;
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 3px;
  transition: background-color 0.2s;
}
.player-item:hover {
  background-color: rgba(0, 255, 0, 0.1);
}
.status-indicator {
  margin-right: 8px;
  font-size: 12px;
}
.player-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.player-name {
  color: #00ff00;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}
.player-level {
  color: #00ffff;
  font-size: 11px;
  opacity: 0.8;
}
.no-players {
  color: #006400;
  text-align: center;
  padding: 10px;
  font-size: 13px;
}
/* 自定义滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}
.chat-messages::-webkit-scrollbar-track {
  background: #1a1a1a;
}
.chat-messages::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}
.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #444;
}
/* 玩家列表滚动条样式 */
.players-content::-webkit-scrollbar {
  width: 4px;
}
.players-content::-webkit-scrollbar-track {
  background: #1a1a1a;
}
.players-content::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}
.players-content::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>
