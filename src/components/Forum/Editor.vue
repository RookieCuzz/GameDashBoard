<template>
  <div>
<!--    <p style="margin-top: 100px;color: #FFF;font-weight: revert;"><strong>你好你好你好你好</strong>你好你好你好</p>-->
    <Toolbar
        style="border-bottom: 1px solid #ccc; margin-top: 50px"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 300px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
    <div class="quill-submit" @click="sendText">发布</div>
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor  } from '@wangeditor/editor'

export default {
  components: { Editor, Toolbar },
  setup(_, {emit}) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref()
    // 模拟 ajax 异步获取内容
    onMounted(() => {
      // setTimeout(() => {
      //   valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      // }, 1500)
    })
    // 自定义校验图片
    const customCheckImageFn = (src, alt, url) => {
      if (!src) {
        return;
      }
      if (src.indexOf('http') !== 0) {
        return '图片网址必须以 http/https 开头';
      }
      return true;
    };

// 转换图片链接
    const customParseImageSrc = (src) => {
      if (src.indexOf('https://') !== 0) {
        return `https://${src}`;
      }
      return src;
    };
    const toolbarConfig = {
      excludeKeys: [
        'bold',
        "codeBlock",
        "insertTable",
        "fullScreen"
      ],
      insertKeys: {
        index:12,
        keys: ["|", "fontSize", "fontFamily", "lineHeight", "|"]
      }
    }
    const editorConfig = {
      placeholder: '请输入内容.........',
      MENU_CONF: {
        'insertImage': {
          onInsertedImage(imageNode) {
            if (imageNode == null) return;
            const { src, alt, href } = imageNode;
            console.log('inserted image111', src, alt, href);
          },
          checkImage: customCheckImageFn,
          parseImageSrc: customParseImageSrc,
        },
        'editImage': {
          onUpdatedImage(imageNode) {
            if (imageNode == null) return;
            const { src, alt, href } = imageNode;
          },
          checkImage: customCheckImageFn,
          parseImageSrc: customParseImageSrc,
        }
      }
    };
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！

    }
    // const getText = () => {
    //   const editor = editorRef.value.getHtml() // 获取 editor ，必须等待它渲染完之后
    //   console.log(editor)
    // }
    const sendText = () => {
        if (editorRef.value.getText().trim() === '')
            console.log('不允许输出空值')
        else{
            emit('editorHtmlText', editorRef.value.getHtml())
            valueHtml.value = ''; // 同步清空绑定的 v-model 内容
        }

    }

    return {
      editorRef,
      valueHtml,
      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      // getText,
      sendText
    };
  }
}

</script>
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
