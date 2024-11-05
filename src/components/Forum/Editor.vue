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
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
    <button @click="getText">insert text</button>
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor  } from '@wangeditor/editor'

export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p><u><strong>haaaae</strong></u><u><em>aaa</em></u><u>lo</u></p><h1>你好</h1><h2><em>各位mc们</em></h2><h1 style="text-align: center; line-height: 2;"><span style="color: rgb(225, 60, 57); background-color: rgb(245, 219, 77); font-size: 29px; font-family: 微软雅黑;">我们宣布一件重要的事情</span></h1><p style="text-align: left;">今天发布了新版本：</p><p style="text-align: left;"> &nbsp; &nbsp; &nbsp; &nbsp;0.10.0版本更新了如下功能：</p><ol><li style="text-align: left;">可以发布帖子</li><li style="text-align: left;">可以与他人交流</li><li style="text-align: left;">能够做出交互动作</li></ol><div data-w-e-type="todo" style="text-align: left;"><input type="checkbox" disabled="">还是不能参与大型活动</div><div data-w-e-type="todo" style="text-align: left;"><input type="checkbox" disabled="" checked="">喜欢黑暗系</div><p style="text-align: left;"><br></p><p style="text-align: left;"><br></p>')

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
      if (src.indexOf('http') !== 0) {
        return `http://${src}`;
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
            console.log('updated image', src, alt, href);
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
    const getText = () => {
      const editor = editorRef.value.getHtml() // 获取 editor ，必须等待它渲染完之后
      console.log(editor)
    }

    return {
      editorRef,
      valueHtml,
      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      getText
    };
  }
}

</script>