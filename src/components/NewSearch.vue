<template>
  <div class="search-container">
    <input
        type="text"
        class="search-input"
        v-bind:style="{ width: inputWidth + 'px' }"
        @focus="expandInput"
        @blur="shrinkInput"
        placeholder="搜索"
    />
    <a class="search-btn" href="#">
      <font-awesome-icon :icon="['fas', 'search']" />
    </a>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义一个响应式变量来控制输入框的宽度
const inputWidth = ref(100);

// 当输入框获取焦点时，将宽度设置为 200px
const expandInput = () => {
  inputWidth.value = 200;
};

// 当输入框失去焦点时，将宽度恢复为 100px
const shrinkInput = () => {
  inputWidth.value = 100;
};
</script>

<style scoped>
/* 搜索框容器样式 */
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

/* 输入框样式 */
.search-input {
  height: 34px;
  background-color: #282828;
  padding: 0 10px;
  border: 2px solid #ccc;
  border-radius: 20px;
  outline: none;
  transition: width 0.4s ease; /* 添加过渡效果 */
  font-size: 14px;
}

.search-btn {
  color: #7597de;
  width: 20px;
  height: 20px;
  border-radius: 20%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 25px;
  transition: 0.4s;
  position: relative; /* 或者 absolute，视情况而定 */
  top: 0px; /* 向上移动 10px */
  left: -35px;
}
</style>
