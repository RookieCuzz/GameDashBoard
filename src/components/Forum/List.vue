<script setup>
import { ref, onMounted, watch } from "vue";
import Page from '@/components/Forum/Page.vue'
import router from "@/router/index.js";
import ToolTip from '@/components/Forum/ToolTip.vue';
const random_timestamp = (monthsAgo = 2) => {
    const currentTime = Date.now();
    const monthsInMilliseconds = monthsAgo * 30 * 24 * 60 * 60 * 1000;
    const pastTime = currentTime - Math.floor(Math.random() * monthsInMilliseconds);
    return pastTime.toString();
};

const newsList = ref([]);
const totalItems = ref(0); // 总新闻数量
const currentPage = ref(1); // 当前页码
const itemsPerPage = ref(5); // 每页显示数量

const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};

const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const timeDiff = now - Number(timestamp);

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (timeDiff < hour) {
        const minutesAgo = Math.floor(timeDiff / minute);
        return minutesAgo > 1 ? `${minutesAgo} minutes ago` : "1 minute ago"; // 使用反引号
    } else if (timeDiff < day) {
        const hoursAgo = Math.floor(timeDiff / hour);
        return hoursAgo > 1 ? `${hoursAgo} hours ago` : "1 hour ago"; // 使用反引号
    } else if (timeDiff < month) {
        const daysAgo = Math.floor(timeDiff / day);
        return daysAgo > 1 ? `${daysAgo} days ago` : "1 day ago"; // 使用反引号
    } else if (timeDiff < year) {
        const monthsAgo = Math.floor(timeDiff / month);
        return monthsAgo > 1 ? `${monthsAgo} months ago` : "1 month ago"; // 使用反引号
    } else {
        const yearsAgo = Math.floor(timeDiff / year);
        return yearsAgo > 1 ? `${yearsAgo} years ago` : "1 year ago"; // 使用反引号
    }
};
const goToDetails = (forum_id) => {
    router.push({ name: 'ForumContent', params: { forum_id } });
};

// 模拟 API 请求
const fetchNews = async (page = 1, limit = 10) => {
    const data = [
        { forum_id: 1, user_id:3, title: "New Game Update Released! 🎮", avatar: "/src/assets/forum/1.jpg", author: "JohnDoe", publish_time: random_timestamp(1), replies: 45, views: "8K" },
        { forum_id: 2, user_id:3, title: "Exciting Patch Notes for Upcoming Game", avatar: "/src/assets/forum/2.jpg", author: "JaneDoe", publish_time: random_timestamp(2), replies: 30, views: "5K" },
        { forum_id: 3, user_id:3, title: "Winter Wonderland Event Announced! ❄️", avatar: "/src/assets/forum/3.jpg", author: "SnowMan", publish_time: random_timestamp(3), replies: 12, views: "3K" },
        { forum_id: 4, user_id:3, title: "Patch Notes 1.15 Released 🛠", avatar: "/src/assets/forum/4.jpg", author: "PatchMaster", publish_time: random_timestamp(3), replies: 33, views: "7K" },
        { forum_id: 5, user_id:3, title: "Community Spotlight: Creators 🌟", avatar: "/src/assets/forum/5.jpg", author: "CommunityTeam", publish_time: random_timestamp(3), replies: 15, views: "2K" },
        { forum_id: 6, user_id:3, title: "Game Anniversary Celebration 🎉", avatar: "/src/assets/forum/6.jpg", author: "GameStudio", publish_time: random_timestamp(2), replies: 25, views: "6K" },
        { forum_id: 7, user_id:4, title: "Top 10 Game Recommendations for 2024 🏆", avatar: "/src/assets/forum/7.jpg", author: "GameCritic", publish_time: random_timestamp(1), replies: 10, views: "4K" },
        { forum_id: 8, user_id:4, title: "Player Spotlight: The Pro Gamer 🥇", avatar: "/src/assets/forum/8.jpg", author: "ProPlayer", publish_time: random_timestamp(2), replies: 20, views: "3.5K" },
        { forum_id: 9, user_id:4, title: "What’s New in Version 2.0 🚀", avatar: "/src/assets/forum/9.jpg", author: "TechDev", publish_time: random_timestamp(4), replies: 5, views: "1K" },
        { forum_id: 10, user_id:4, title: "Holiday Event Returns! 🎄", avatar: "/src/assets/forum/10.jpg", author: "FestiveFan", publish_time: random_timestamp(3), replies: 50, views: "9K" },
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
    newsList.value = data;
    totalItems.value = total;
};

onMounted(() => {
    loadPage(currentPage.value);
});

// 当页码变化时重新加载数据
watch(currentPage, (newPage) => {
    loadPage(newPage);
});

// 分页跳转函数,接受子组件传递过来的page信息
const changePage = (page) => {
    if (page !== currentPage.value) {
        currentPage.value = page;
    }
};

</script>

<template>
    <div class="news-container">
        <div class="news-header">
            <p>News</p>

        </div>
        <Page
            :current-page="currentPage"
            :total-items="totalItems"
            :items-per-page="itemsPerPage"
            :showJumpPage="true"
            @page-changed="changePage"
        />
        <div class="news-box">
            <ul class="news-list">
                <li v-for="news in newsList" :key="news.forum_id" class="news-item">
                    <div class="news-content">

                        <ToolTip :user="{
                                name: 'jamesthesignificant',
                                avatar: '/path/to/avatar.png',
                                age: 15,
                                location: 'Antarctica',
                                joined: 'Oct 30, 2024',
                                lastSeen: 'Today at 9:57 PM - Searching',
                                messages: 74,
                                reactionScore: 133,
                                points: 34
                            }">
                        <img :src="news.avatar" alt="Post Image" />
                        </ToolTip>
                        <div class="news-details">
                            <div class="news-title">
                                <span @click="goToDetails(news.forum_id)">{{ news.title }}</span>
                            </div>
                            <div class="news-meta">
                                <span class="name" @click="goToDetails(news.forum_id)">{{ news.author }}</span> -
                                <span class="date" @click="goToDetails(news.forum_id)">{{ formatDate(news.publish_time) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="news-right">
                        <p class="replies">Replies: {{ news.replies }}</p>
                        <p class="views">Views: {{ news.views }}</p>
                        <time>{{ getTimeAgo(news.publish_time) }}</time>
                    </div>
                </li>
            </ul>
        </div>
        <!--        <Page-->
        <!--            :current-page="currentPage"-->
        <!--            :total-items="totalItems"-->
        <!--            :items-per-page="itemsPerPage"-->
        <!--            :showJumpPage="true"-->
        <!--            @page-changed="changePage"-->
        <!--        />-->
    </div>
</template>

<style scoped>
.news-box {
    background-color: white;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.news-container {
    max-width: 800px;         /* 桌面视图限制最大宽度 */
    margin: 0 auto;           /* 居中显示 */
    padding-top: 150px;
    padding-left: 20px;       /* 添加一些左右内边距 */
    padding-right: 20px;
    box-sizing: border-box;   /* 确保内边距不会影响宽度 */
}



.news-header {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 20px;
}

.pagination {
    margin-bottom: 15px;
    color: #ffffff;
}

.pagination span {
    margin-right: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #ffffff;
}

.news-list {
    list-style-type: none;
    padding: 0;
}

.news-item {
    border-radius: 8px;
    margin: 2px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px;
    transition: background-color 0.2s ease;
}

.news-item:hover {
    background-color: #f7f7f7;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
}

.news-content {
    display: flex;
    align-items: center;
}

.news-content img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 15px;
}

.news-details {
    font-size: 16px;
    color: #333;
}

.news-title {
    font-weight: bold;
    color: #ff4500;
    transition: color 0.3s ease;
}

.news-title span:hover {
    color: #ff6347;
    text-decoration: underline;
    cursor: pointer;
}

.news-meta {
    font-size: 14px;
    color: #888;
}

.news-meta{
    .name{
        cursor: pointer;
        transition: color 0.3s ease, text-decoration 0.3s ease;
    }
    .date{
        cursor: pointer;
        transition: color 0.3s ease, text-decoration 0.3s ease;
    }
}

/* 悬停时的下划线效果 */
.news-meta span:hover {
    color: #666;
    text-decoration: underline;
}

.news-right {
    text-align: right;
    font-size: 14px;
}

.news-right p {
    margin: 0;
}

.news-right .replies {
    color: #0073e6;
}

.news-right .views {
    color: #00a676;
}

.news-right time {
    font-size: 12px;
    color: #888;
}

/* --- 响应式设计 --- */
@media (max-width: 500px) {
    .news-container {
        max-width: 100%;        /* 宽度占满整个屏幕 */
        padding-left: 1vw;     /* 减少左右内边距 */
        padding-right: 1vw;
    }

    .news-item {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .news-right {
        text-align: left;
        margin-top: 10px;
    }

    .news-content img {
        margin-bottom: 10px;
    }

    .news-title {
        font-size: 18px;
    }

    .news-meta {
        font-size: 12px;
    }

    .news-right p {
        font-size: 12px;
    }

    .news-right time {
        font-size: 10px;
    }
}
</style>