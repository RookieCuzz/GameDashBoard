<template>
  <div class="file-card">
    <img
        src="@/assets/img/fileImg/unknowfile.png"
        alt=""
        v-if="fileType == 0"
    />
    <img
        src="@/assets/img/fileImg/word.png"
        alt=""
        v-else-if="fileType == 1"
    />
    <img
        src="@/assets/img/fileImg/excel.png"
        alt=""
        v-else-if="fileType == 2"
    />
    <img
        src="@/assets/img/fileImg/ppt.png"
        alt=""
        v-else-if="fileType == 3"
    />
    <img
        src="@/assets/img/fileImg/pdf.png"
        alt=""
        v-else-if="fileType == 4"
    />
    <img
        src="@/assets/img/fileImg/zpi.png"
        alt=""
        v-else-if="fileType == 5"
    />
    <img src="@/assets/img/fileImg/txt.png" alt="" v-else />
    <div class="word">
      <span>{{ file?.name || '未知' }}</span>
      <span>154kb</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fileType: {
      type: Number,
      required: true,
    },
    file: {
      type: Object,
      default: null,  // 默认为 null
    },
  },
  watch: {
    file(newFile) {
      console.log(newFile); // 打印文件对象
    },
  },
  mounted() {
    console.log(this.file); // 打印传递的文件对象
    console.log(this.fileType); // 打印文件类型
  },
};
</script>

<style lang="scss" scoped>
.file-card {
  width: 250px;
  height: 100px;
  background-color: rgb(45, 48, 63);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: rgb(33, 36, 54);
  }

  img {
    width: 60px;
    height: 60px;
  }

  .word {
    width: 60%;
    margin-left: 10px;
    overflow: hidden;

    span {
      width: 90%;
      display: inline-block;
      color: #fff;
    }

    span:first-child {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span:last-child {
      font-size: 12px;
      color: rgb(180, 180, 180);
    }
  }
}
</style>
