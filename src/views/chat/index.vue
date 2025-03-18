<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">
        <h1>大猫聊天室</h1>
      </div>
      <div class="online-person">
        <span class="onlin-text">聊天列表</span>
        <div class="person-cards-wrapper">
          <div
              class="personList"
              v-for="personInfo in personList"
              :key="personInfo.id"
              @click="clickPerson(personInfo)"
          >
            <PersonCard
                :personInfo="personInfo"
                :pcCurrent="pcCurrent"
            ></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <div v-if="showChatWindow">
        <ChatWindow
            :frinedInfo="chatWindowInfo"
            @personCardSort="personCardSort"
        ></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import PersonCard from "@/components//ChatRoom/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";
import { getFriend } from "@/api/getData";

export default {
  name: "Chat",
  components: {
    PersonCard,
    ChatWindow,
  },
  setup() {
    const pcCurrent = ref("");
    const personList = ref([]);
    const showChatWindow = ref(false);
    const chatWindowInfo = ref({});

    onMounted(() => {
      getFriend().then((res) => {
        console.log(res);
        personList.value = res;
      });
    });

    const clickPerson = (info) => {
      showChatWindow.value = true;
      chatWindowInfo.value = info;
      pcCurrent.value = info.id;
    };

    const personCardSort = (id) => {
      if (id !== personList.value[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < personList.value.length; i++) {
          if (personList.value[i].id == id) {
            nowPersonInfo = personList.value[i];
            personList.value.splice(i, 1);
            break;
          }
        }
        personList.value.unshift(nowPersonInfo);
      }
    };

    return {
      pcCurrent,
      personList,
      showChatWindow,
      chatWindowInfo,
      clickPerson,
      personCardSort
    };
  }
};
</script>

<style lang="scss" scoped>
.chatHome {
  display: flex;
  .chatLeft {
    width: 280px;
    .title {
      color: #fff;
      padding-left: 10px;
    }
    .online-person {
      margin-top: 100px;
      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .person-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隐藏滚动条 */
          height: 0; /* Safari,Chrome 隐藏滚动条 */
          display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px); /*垂直居中 */
      left: calc(50% - 50px); /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
      }
    }
  }
}
</style>
