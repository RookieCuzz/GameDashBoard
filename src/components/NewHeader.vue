<script setup>
import NewSearch from "@/components/NewSearch.vue";
import NewDropDown from "@/components/NewDropDown.vue";
import { ref, onMounted, reactive } from 'vue';
import {useRouter} from "vue-router";
const router = useRouter(); // 获取路由实例
// 控制下拉菜单开关状态
const isDropdownOpen = ref(false);
const dropdownStyle = reactive({});
const goToLogin = () => {
  // 使用 Vue Router 的 push 方法进行页面跳转
  router.push({ name: 'LoginRegister' });
};
// 切换下拉菜单的显隐
const toggleDropdown = (event) => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<template>
  <header>
    <div class="child1">
      <a href="#" class="logo">Logo</a>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wiki</a></li>
        <li class="other">
          <a href="#" @click="toggleDropdown">Other</a>
          <ul v-show="isDropdownOpen" :style="dropdownStyle" class="dropdown-menu">
            <li class="dropdown-item"><a href="#">AAAA</a></li>
            <li class="dropdown-item"><a href="#">bbbb</a></li>
            <li class="dropdown-item"><a href="#">CCCC</a></li>
            <li class="dropdown-item"><a href="#">DDDD</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <ul>
      <li><new-search/></li>
      <li><a href="#" @click="goToLogin">登录</a></li>
      <li><a href="#">注册</a></li>
    </ul>
  </header>
</template>

<style scoped>
.child1{
  display: inline-flex;
  flex-direction: row;
}
.dropdown-item {
  margin-left: 3px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.dropdown-menu{
  display: flex;
  flex-direction: column;
  background-color: #2b1055;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 10px;
  min-width: 30px;
  z-index: 777;
  list-style: none; /* 移除 ul 列表的默认圆点样式 */
  padding: 0; /* 可选：去掉 ul 的默认内边距 */
  margin: 0; /* 可选：去掉 ul 的默认外边距 */
}
.other{
  display: flex;
  position: absolute;
  top: 23px;
  left: 360px;
  flex-direction: column;

}
header {
  //overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 30px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
}

header .logo {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: 2em;
  text-transform: uppercase; /* 大写 */
  letter-spacing: 2px; /* 字符间距 */
}

header ul {
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

header ul li {
  list-style: none;
  margin-left: 20px;
}

header ul li a {
  text-decoration: none;
  padding: 6px 15px;
  color: #fff;
  border-radius: 20px;
}

header ul li a:hover,
header ul li a.active {
  background: #fff;
  color: #2b1055;
}
</style>