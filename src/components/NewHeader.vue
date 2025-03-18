<script setup>
import { ref } from 'vue';
import Login from './Login.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showLoginModal = ref(false);

const goToForum = () => {
  router.push({ name: 'Fpage' });
};
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#" class="logo-text">明月谷</a>
      </div>
      <div class="nav-links">
        <a href="#home">首页</a>
        <a href="#about">关于</a>
        <a @click="goToForum" style="cursor: pointer">论坛</a>
        <a href="#contact">联系我们</a>
      </div>
      <div class="auth-buttons">
        <button class="login-btn" @click="showLoginModal = true">
          登录/注册
        </button>
      </div>
    </nav>
  </header>

  <!-- 登录模态框 -->
  <div v-if="showLoginModal" class="modal-overlay" @click="showLoginModal = false">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="showLoginModal = false">×</button>
      <Login @close="showLoginModal = false" />
    </div>
  </div>
</template>

<style scoped>
header {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 10px 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
}

.logo-text {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.logo-text:hover {
  color: #00ffff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: 0.3s;
  padding: 4px 12px;
  border-radius: 20px;
}

.nav-links a:hover {
  background: #fff;
  color: #2b1055;
}

.login-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #fff;
  color: #2b1055;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 400px;
  background: rgba(30, 30, 45, 0.95);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  margin: auto;
  animation: modalFadeIn 0.3s ease forwards;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 确保 Login 组件内的样式不会影响模态框布局 */
.modal-content :deep(.modal) {
  position: static;
  width: 100%;
  height: 100%;
}

.modal-content :deep(.container) {
  position: relative;
  width: 100%;
  height: 100%;
}

.modal-content :deep(.form-box) {
  position: relative;
  width: 100%;
  height: 100%;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  header {
    padding: 20px;
  }

  .nav-links {
    display: none;
  }

  .modal-content {
    width: 95%;
    padding: 20px;
  }
}
</style>