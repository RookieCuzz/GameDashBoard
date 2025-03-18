<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="{ activeNav: index === current }"
            @click="changeMenu(index)"
        >
          <div class="block"></div>
          <span class="iconfont" :class="item"></span>
        </li>
      </ul>
    </div>
    <div class="own-pic">
      <HeadPortrait :imgUrl="imgUrl"></HeadPortrait>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'; // Vue 3 router 使用
import HeadPortrait from './HeadPortrait.vue';
import { ElMessage } from 'element-plus'; // Vue 3 使用 Element Plus 提供的 Message 组件

export default defineComponent({
  components: {
    HeadPortrait,
  },
  setup() {
    // Vue 3 Composition API 的响应式数据
    const menuList = [
      'icon-xinxi',
      'icon-shipin',
      'icon-shu',
      'icon-shandian',
      'icon-shezhi',
    ];
    const current = ref(0);  // 使用 ref 定义响应式变量
    const imgUrl = require('@/assets/img/head_portrait.jpg'); // 需要调整为 Vue 3 兼容的导入方式

    // 获取 Vue Router 实例
    const router = useRouter();

    // 菜单点击事件
    const changeMenu = (index) => {
      switch (index) {
        case 0:
          router.push({ name: 'ChatHome' });
          break;
        case 1:
        case 2:
        case 3:
        case 4:
          ElMessage('该功能还没有开发哦，敬请期待一下吧~🥳');
          break;
        default:
          router.push({ name: 'ChatHome' });
      }
      current.value = index;
    };

    // 返回响应式数据和方法
    return {
      menuList,
      current,
      imgUrl,
      changeMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;
  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
    .menu-list {
      margin-left: 10px;

      li {
        margin: 40px 0 0 30px;
        list-style: none;
        cursor: pointer;
        position: relative;
        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          left: -40px;
          width: 6px;
          height: 25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }
        &:hover {
          span {
            color: rgb(29, 144, 245);
          }
          .block {
            opacity: 1;
          }
        }
      }
    }
  }
  .own-pic {
    position: absolute;
    bottom: 10%;
    margin-left: 25px;
  }
}
.activeNav {
  span {
    color: rgb(29, 144, 245);
  }
  .block {
    opacity: 1 !important;
  }
}
</style>
