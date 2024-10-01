<template>
  <div class="dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      other
    </button>
    <ul v-show="isDropdownOpen" :style="dropdownStyle" class="dropdown-menu">
      <li class="dropdown-item"><a href="#">1</a></li>
      <li class="dropdown-item"><a href="#">2</a></li>
      <li class="dropdown-item"><a href="#">3</a></li>
      <li class="dropdown-item"><a href="#">4</a></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';

// 控制下拉菜单开关状态
const isDropdownOpen = ref(false);
const dropdownStyle = reactive({});

// 切换下拉菜单的显隐
const toggleDropdown = (event) => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

</script>

<style scoped>
/* 按钮样式 */
.dropdown{
  display: flex;
  flex-direction: column;
  width: 59px;
  height: 40px;
  background-color: black;
  top: 0px;
}
.dropdown-button:hover {
  background-color: #3464e1;
}
/* 下拉菜单样式 */
.dropdown-menu {
  background-color: black;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 20px;
  min-width: 200px;
  z-index: 10000;
  list-style: none; /* 移除 ul 列表的默认圆点样式 */
  padding: 0; /* 可选：去掉 ul 的默认内边距 */
  margin: 0; /* 可选：去掉 ul 的默认外边距 */
}
.dropdown-button {
  position: relative;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
}



.dropdown-item {
  padding: 12px 20px;
}

.dropdown-item a {
  display: block;
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
}

.dropdown-item a:hover {
  background-color: #555;
}
</style>
