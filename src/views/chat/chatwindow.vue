<template>
  <div class="chat-window">
    <div class="top">
      <div class="head-pic">
        <HeadPortrait :imgUrl="frinedInfo.headImg" />
      </div>
      <div class="info-detail">
        <div class="name">{{ frinedInfo.name }}</div>
        <div class="detail">{{ frinedInfo.detail }}</div>
      </div>
      <div class="other-fun">
        <span class="iconfont icon-shipin" @click="video"></span>
        <span class="iconfont icon-gf-telephone" @click="telephone"></span>
        <label for="docFile">
          <span class="iconfont icon-wenjian"></span>
        </label>
        <label for="imgFile">
          <span class="iconfont icon-tupian"></span>
        </label>
        <input
            type="file"
            id="imgFile"
            @change="sendImg"
            accept="image/*"
            style="display: none"
        />
        <input
            type="file"
            id="docFile"
            @change="sendFile"
            accept="application/*,text/*"
            style="display: none"
        />
      </div>
    </div>
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== '1001'">
            <div class="chat-text" v-if="item.chatType === 0">
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType === 1">
              <img
                  :src="item.msg"
                  alt="表情"
                  v-if="item.extend.imgType === 1"
                  style="width: 100px; height: 100px"
              />
              <el-image
                  v-else
                  :src="item.msg"
                  :preview-src-list="srcImgList"
              />
            </div>
            <div class="chat-img" v-if="item.chatType === 2">
              <div class="word-file">
                <FileCard
                    :fileType="item.extend.fileType"
                    :file="item.msg"
                />
              </div>
            </div>
            <div class="info-time">
              <img :src="item.headImg" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text" v-if="item.chatType === 0">
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType === 1">
              <img
                  :src="item.msg"
                  alt="表情"
                  v-if="item.extend.imgType === 1"
                  style="width: 100px; height: 100px"
              />
              <el-image
                  v-else
                  style="max-width: 300px; border-radius: 10px"
                  :src="item.msg"
                  :preview-src-list="srcImgList"
              />
            </div>
            <div class="chat-img" v-if="item.chatType === 2">
              <div class="word-file">
                <FileCard
                    :fileType="item.extend.fileType"
                    :file="item.msg"
                />
              </div>
            </div>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.headImg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <div class="emoji boxinput" @click="clickEmoji">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div>
        <div class="emoji-content">
          <Emoji
              v-if="showEmoji"
              @sendEmoji="sendEmoji"
              @closeEmoji="clickEmoji"
          />
        </div>
        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
        <div class="send boxinput" @click="sendText">
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue';
import { animation } from '@/util/util';
import { getChatMsg } from '@/api/getData';
import HeadPortrait from '../../components/ChatRoom/HeadPortrait.vue';
import Emoji from '../../components/ChatRoom/Emoji.vue';
import FileCard from '../../components/ChatRoom/FileCard.vue';

// Props1
defineProps({
  frinedInfo: {
    type: Object,
    default: () => ({}),
  },
});

// Reactive State
const chatList = ref([]);
const inputMsg = ref('');
const showEmoji = ref(false);
const srcImgList = ref([]);
const chatContent = ref(null);

// Watcher
watch(
    () => frinedInfo,
    () => {
      getFriendChatMsg();
    }
);

// Methods
const getFriendChatMsg = async () => {
  const params = { frinedId: frinedInfo.id };
  const res = await getChatMsg(params);
  chatList.value = res;
  chatList.value.forEach(item => {
    if (item.chatType === 2 && item.extend.imgType === 2) {
      srcImgList.value.push(item.msg);
    }
  });
  scrollBottom();
};

const sendMsg = msgList => {
  chatList.value.push(msgList);
  scrollBottom();
};

const scrollBottom = () => {
  nextTick(() => {
    const scrollDom = chatContent.value;
    animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
  });
};

const clickEmoji = () => {
  showEmoji.value = !showEmoji.value;
};

const sendText = () => {
  if (inputMsg.value) {
    const chatMsg = {
      headImg: require('@/assets/img/head_portrait.jpg'),
      name: '大毛是小白',
      time: '09：12 AM',
      msg: inputMsg.value,
      chatType: 0,
      uid: '1001',
    };
    sendMsg(chatMsg);
    inputMsg.value = '';
  } else {
    alert('消息不能为空哦~');
  }
};

const sendEmoji = msg => {
  const chatMsg = {
    headImg: require('@/assets/img/head_portrait.jpg'),
    name: '大毛是小白',
    time: '09：12 AM',
    msg,
    chatType: 1,
    extend: { imgType: 1 },
    uid: '1001',
  };
  sendMsg(chatMsg);
  clickEmoji();
};

const sendImg = e => {
  const chatMsg = {
    headImg: require('@/assets/img/head_portrait.jpg'),
    name: '大毛是小白',
    time: '09：12 AM',
    msg: '',
    chatType: 1,
    extend: { imgType: 2 },
    uid: '1001',
  };
  const files = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(files);
  reader.onloadend = () => {
    chatMsg.msg = reader.result;
    srcImgList.value.push(chatMsg.msg);
    sendMsg(chatMsg);
  };
  e.target.value = null;
};

const sendFile = e => {
  const files = e.target.files[0];
  const chatMsg = {
    headImg: require('@/assets/img/head_portrait.jpg'),
    name: '大毛是小白',
    time: '09：12 AM',
    msg: files,
    chatType: 2,
    extend: { fileType: getFileType(files.type) },
    uid: '1001',
  };
  sendMsg(chatMsg);
  e.target.value = null;
};

const getFileType = mimeType => {
  switch (mimeType) {
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 1;
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 2;
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 3;
    case 'application/pdf':
      return 4;
    case 'application/zip':
    case 'application/x-zip-compressed':
      return 5;
    case 'text/plain':
      return 6;
    default:
      return 0;
  }
};

const telephone = () => alert('该功能还没有开发哦，敬请期待一下吧~🥳');
const video = () => alert('该功能还没有开发哦，敬请期待一下吧~🥳');
</script>
<style lang="scss" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {
    margin-bottom: 50px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .head-pic {
      float: left;
    }
    .info-detail {
      float: left;
      margin: 5px 20px 0;
      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    .other-fun {
      float: right;
      margin-top: 20px;
      span {
        margin-left: 30px;
        cursor: pointer;
      }
      // .icon-tupian {

      // }
      input {
        display: none;
      }
    }
  }
  .botoom {
    width: 100%;
    height: 70vh;
    background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 20px 5px;
            background-color: rgb(56, 60, 75);
            color: #fff;
            &:hover {
              background-color: rgb(39, 42, 55);
            }
          }
          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(101, 104, 115);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: rgb(29, 144, 245);
            color: #fff;
            &:hover {
              background-color: rgb(26, 129, 219);
            }
          }
          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .emoji {
        transition: 0.3s;
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
}
</style>