<script setup>
import { reactive, ref, nextTick, onMounted } from "vue";

// 初始化聊天消息
const messages = reactive([
  // 初始消息
]);

let heartbeatInterval = null;
let reconnectTimeout = null;

const newMessage = reactive({
  playerName: "测试玩家",
  message: "",
  messageTimeStamp: null,
  type: "webMessage"
}); // 用户输入的消息
const players = ref(['Player1', 'Player2', 'Player3']); // 玩家列表
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
    <div class="players-list">
      <div class="players-header">
        Players ({{ players.length }}) <span class="collapse-icon" @click="togglePlayers">[-]</span>
      </div>
      <div v-if="players.length === 0" class="no-players">
        No players.
      </div>
      <div v-else>
        <p v-for="(player, index) in players" :key="index">{{ player }}</p>
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
  background-color: #2b2b3d;
  border-radius: 8px;
  margin-left: 25vw;
  margin-right: 25vw;
  width: 50vw;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
  top: -60px;
}
.chat-box {
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: #111;
  border-radius: 8px;
  margin-right: 10px;
}
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  color: white;
}
.chat-messages p {
  margin: 4px 0;
}
.chat-input {
  padding: 10px;
  border-top: 1px solid #333;
}
.chat-input input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #222;
  color: white;
}
.players-list {
  width: 20%;
  background-color: #1e1e2d;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.players-header {
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.no-players {
  color: #888;
}
</style>
