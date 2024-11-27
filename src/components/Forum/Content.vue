
<script setup>
import {onMounted, ref, watch} from 'vue';
import CustomEditor from '@/components/Forum/Editor.vue'
import Page from '@/components/Forum/Page.vue'
const postList = ref([]);
const totalItems = ref(0); // 总数量
const currentPage = ref(1); // 当前页码
const itemsPerPage = ref(3); // 每页显示数量
// 帖子数据
const posts = ref();
const props = defineProps({
    forum_id: {
        type: String,
        required: true
    }
});
const fetchNews = async (page = 1, limit = 10) => {
    const data = [
        {
            id: 1,
            username: 'Muffin',
            avatar: '/src/assets/forum/7.jpg',
            content: 'Throw out your best memes that are created by you and are related to CCG.' +
                'Throw out your best memes that are created by you and are related to CCG.Throw out' +
                ' your best memes that are created by you and are related to CCG.Throw out your best memes ' +
                'that are created by you and are related  to CCG.<br><img style="max-width: 100%;" src="/src/assets/forum/p1.jpg"><br><img  style="max-width: 100%;" src="/src/assets/forum/p3.jpg"><br>' +
                'Throw out your best memes that are created by you and are related to CCG.',
            likes: 150,
            liked: false,
            date: 'Jul 26, 2014',
            floor: '# 1',
        },
        {
            id: 2,
            username: 'musemat',
            avatar: '/src/assets/forum/8.jpg',
            content: '<p><u><strong>haaaae</strong></u><u><em>aaa</em></u><u>lo</u></p><h1>你好</h1><h2><em>各位mc们</em></h2><h1 style="text-align: center; line-height: 2;"><span style="color: rgb(225, 60, 57); background-color: rgb(245, 219, 77); font-size: 29px; font-family: 微软雅黑;">我们宣布一件重要的事情</span></h1><p style="text-align: left;">今天发布了新版本：</p><p style="text-align: left;"> &nbsp; &nbsp; &nbsp; &nbsp;0.10.0版本更新了如下功能：</p><ol><li style="text-align: left;">可以发布帖子</li><li style="text-align: left;">可以与他人交流</li><li style="text-align: left;">能够做出交互动作</li></ol><div data-w-e-type="todo" style="text-align: left;"><input type="checkbox" disabled="">还是不能参与大型活动</div><div data-w-e-type="todo" style="text-align: left;"><input type="checkbox" disabled="" checked="">喜欢黑暗系</div><p style="text-align: left;"><br></p><p style="text-align: left;"><br></p>',
            likes: 163,
            liked: false,
            date: 'Jul 26, 2014',
            floor: '# 2',
        },
        {
            id: 3,
            username: 'Muffin',
            avatar: '/src/assets/forum/9.jpg',
            content: '',
            likes: 104,
            liked: false,
            date: 'Jul 26, 2014',
            floor: '# 3',
        },
        {
            id: 4,
            username: 'Muffin',
            avatar: '/src/assets/forum/4.jpg',
            content: 'Halloween is almost here! Here are some ideas for your Halloween decorations and games:',
            likes: 98,
            liked: false,
            date: 'Jul 26, 2014',
            floor: '# 4',
        },
        {
            id: 5,
            username: 'Muffin',
            avatar: '/src/assets/forum/5.jpg',
            content: 'Here are some Halloween costumes that you can make with your friends:',
            likes: 85,
            liked: false,
            date: 'Jul 26, 2014',
            floor: '# 5',
        },
        {
            id: 6,
            username: 'Muffin',
            avatar: '/src/assets/forum/6.jpg',
            content: 'Here are some Halloween games that you can play with your friends:',
            likes: 78,
            liked: false,
            date: 'Jul 26, 2014',
            floor: '# 6',
        },
        {
            id: 7,
            username: 'Muffin',
            avatar: '/src/assets/forum/7.jpg',
            content: 'Here are some Halloween costumes that you can make with your friends:',
            likes: 72,
            liked: false,
            date: 'Jul 26, 2014',
            floor: '# 7',

        }

    ];

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: data.slice((page - 1) * limit, page * limit),
                total: data.length
            });
        }, 500); // 模拟延迟
    });
};
const loadPage = async (page) => {
    const { data, total } = await fetchNews(page, itemsPerPage.value);
    postList.value = data;
    totalItems.value = total;
};

onMounted(() => {
    loadPage(currentPage.value);
    console.log(props.forum_id);
});
watch(currentPage, (newPage) => {
    loadPage(newPage);
});
const changePage = (page) => {
    if (page !== currentPage.value) {
        currentPage.value = page;
    }
};
// 点赞/取消点赞功能
const toggleLike = (index) => {
  if (posts.value[index].liked) {
    posts.value[index].likes--;
  } else {
    posts.value[index].likes++;
  }
  posts.value[index].liked = !posts.value[index].liked;
};

</script>

<template>
  <div class="forum-container">
    <!-- Forum Info Section -->
    <div class="forum-info">
      <div class="forum-header">
        <div class="forum-title-container">
          <div class="forum-title">Halloween 2024 - Lobby Quests, Ender, Maps & More!</div>
          <div class="forum-metadata">
            <span class="author">By Camezonda</span> • <span class="date">Oct 3, 2024</span>
          </div>
        </div>
      </div>
      <div class="forum-stats">
        <span class="forum-views">1.2k 人看过</span> • <span class="forum-replies">350 条回复</span>
      </div>
    </div>
      <Page
              :current-page="currentPage"
              :total-items="totalItems"
              :items-per-page="itemsPerPage"
              :showJumpPage="true"
              @page-changed="changePage"
      />
    <!-- Post Container -->
    <div class="post-container">
      <!-- 动态加载帖子 -->
      <div v-for="(post, index) in postList" :key="post.id" class="post">
        <div class="profile">
          <div class="avatar">
            <img :src="post.avatar" alt="Avatar">
          </div>
          <div class="post_info">
            <div class="username">{{ post.username }}</div>
          </div>
        </div>
        <!-- 楼层信息 -->
        <div class="floor-number">{{ post.floor }}</div>
        <div class="post-content">
          <div v-if="post.content" class="text" v-html="post.content"></div>

          <div class="like-button-wrapper">
            <button class="like-button" :class="{ liked: post.liked }" @click="toggleLike(index)">
              <font-awesome-icon :icon="['fas', 'thumbs-up']" />
              <text>{{ post.liked ? '取消点赞' : '点赞' }}</text>
            </button>
            <span class="likes-count">有 {{ post.likes }} 人觉得很赞</span>
          </div>
          <span class="post-date">{{ post.date }}</span>
        </div>
      </div>
    </div>
    <!--    这是quill富文本编辑器-->
    <div>
      <CustomEditor />
    </div>
    <button class="quill-submit">发布</button>
  </div>
</template>

<style>

.quill-submit {
  background-color: #0080ff;
  color: #fff;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 300px;
  cursor: pointer;
  border-radius: 5px; /* 添加圆角 */
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影 */
  transition: background-color 0.3s, transform 0.2s; /* 添加过渡效果 */
}
.quill-submit:hover {
  background-color: #005bb5; /* 鼠标悬停时更改背景色 */
  transform: translateY(-2px); /* 鼠标悬停时轻微上移 */
}
.quill-submit:active {
  transform: scale(0.95); /* 点击时缩小 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 点击时减小阴影 */
}
</style>

<style scoped>

.text {
  text-align: justify;
  word-wrap: break-word; /* 允许在单词边界内换行 */
  overflow-wrap: break-word; /* 兼容性 */
}
.forum-container {
  max-width: 900px;
  min-width: 20vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 68px 68px 0 0;
}

.post-container {
  margin: 0 auto;
  padding: 20px;
  position: relative;
  background-color: #fff;
  border-radius: 12px;
}
.post-container ::before {
  background-color: #d50000;/* Soft light background for posts */
  border-radius: 5px;
  position: absolute;

}
.forum-info {
  padding: 20px;
  color: #444; /* Darker gray for text */
  position: relative;
}


.forum-title {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
}

.forum-metadata {
  font-size: 14px;
  color: #f3106e;
}

.forum-stats {
  margin-top: 10px;
  font-size: 13px;
  color: #f3106e;
}

.post {

  position: relative;
  display: flex;
  border-bottom: 1px solid #e0e0e0; /* Light gray for post separator */
  margin-bottom: 20px;
  margin-top: 10px;
}

.profile {
  padding-right: 15px; /* Light gray for profile border */
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.username {
  font-weight: 600;
  color: #f3106e;
  text-align: center;
  font-size: 18px;

}

.post-date {
  font-size: 12px;
  color: #888;
  position: absolute;
  right: 10px; /* 右边距 */
  bottom: 8px; /* 底部边距 */
}

.post-content {
  width: 75%;
  margin-bottom: 50px;
  margin-left: 20px;
}
.meme {
  justify-content: center;
}
.meme img {
  width: 100%;
  margin-top: 10px;
  border: 1px solid #ddd;
}

.like-button {
  background-color: #f3106e;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.like-button:hover {
  background-color: #f475a9;
}

.like-button.liked {
  background-color: #df4141;
}

.like-button-wrapper {
  display: inline-flex;
  position: absolute;
  bottom: 10px;
  align-items: center;
}

.likes-count {
  margin-left: 10px; /* 为按钮和点赞计数之间添加间距 */
}

.floor-number {
  position: absolute;
  top: -20px;
  right: 0px;
  font-size: 16px;
  color: #918e8e;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-block;
}

@media (max-width: 800px) {

  .forum-container {
    padding: 10px;
    margin-top: 100px;
    border-radius: 40px 40px 0 0;
  }


  .username {
    font-size: 10px;
    width: fit-content;
    margin: 0 auto;
  }
  .avatar{
    width: 50px;
    height: 50px;
  }
  .post-content {
    width: 100%;
    margin-bottom: 40px;
    margin-left: 0;
    font-size: 8px;
  }


  .floor-number {
    font-size: 6px;
    top: -20px;
    right: -15px;
    padding: 4px 8px;
  }
  .post-date{
    font-size: 6px;
    right: -5px;
    bottom: 5px;
  }

  .forum-title {
    font-size: 12px;
  }
  .like-button{
    width: 35px;
    height: 15px;
    padding: 0;
    font-size: 5px;
  }
  .likes-count{
    font-size: 6px;
    margin-left: 5px;
  }

  .forum-metadata, .forum-stats {
    font-size: 6px;
  }
}

</style>
