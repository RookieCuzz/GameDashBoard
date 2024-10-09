<template>
  <div class="flex-center">
    <div id="dragContainer" ref="dragContainer">
      <!-- 绿色区域 -->
      <div id="dragBg" ref="dragBg"></div>
      <!-- 滑动容器文本 -->
      <div id="dragText" ref="dragText"></div>
      <!-- 拖动元素 -->
      <div id="dragHandler" class="dragHandlerBg" ref="dragHandler"></div>
    </div>
    <div class="btn" @click="initDrag">初始化</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const dragContainer = ref(null);
    const dragBg = ref(null);
    const dragText = ref(null);
    const dragHandler = ref(null);
    const maxHandlerOffset = ref(0);

    const initDrag = () => {
      dragText.value.textContent = '拖动滑块验证';
      dragHandler.value.addEventListener('mousedown', onDragHandlerMouseDown);
      dragHandler.value.style.left = 0;
      dragBg.value.style.width = 0;
      dragText.value.style.color = '';
      dragHandler.value.setAttribute('class', 'dragHandlerBg');
    };

    const onDragHandlerMouseDown = () => {
      document.addEventListener('mousemove', onDragHandlerMouseMove);
      document.addEventListener('mouseup', onDragHandlerMouseUp);
    };

    const onDragHandlerMouseMove = (event) => {
      const dragX = dragBg.value?.getBoundingClientRect() || {};
      let left = event.clientX - dragHandler.value.clientWidth / 2 - dragX.left;

      if (left < 0) {
        left = 0;
      } else if (left >= maxHandlerOffset.value) {
        left = maxHandlerOffset.value;
        verifySucc();
      }

      if (left > maxHandlerOffset.value) return;

      dragHandler.value.style.left = `${left}px`;
      dragBg.value.style.width = `${left}px`;
    };

    const onDragHandlerMouseUp = () => {
      document.removeEventListener('mousemove', onDragHandlerMouseMove);
      document.removeEventListener('mouseup', onDragHandlerMouseUp);
      dragHandler.value.style.left = 0;
      dragBg.value.style.width = 0;
    };

    const verifySucc = () => {
      dragText.value.textContent = '验证通过';
      dragText.value.style.color = 'white';
      dragHandler.value.setAttribute('class', 'dragHandlerOkBg');
      dragHandler.value.removeEventListener('mousedown', onDragHandlerMouseDown);
      document.removeEventListener('mousemove', onDragHandlerMouseMove);
      document.removeEventListener('mouseup', onDragHandlerMouseUp);
    };

    onMounted(() => {
      maxHandlerOffset.value = dragContainer.value.clientWidth - dragHandler.value.clientWidth;
      initDrag();
    });

    return {
      dragContainer,
      dragBg,
      dragText,
      dragHandler,
      initDrag,
    };
  },
};
</script>

<style>
.flex-center {
  display: flex;
  align-items: center;
  margin-top: 200px;
}
.btn {
  border: 1px solid blue;
  width: 60px;
  text-align: center;
  color: blue;
  height: 33px;
  line-height: 33px;
  margin-left: 15px;
  cursor: pointer;
}
/* 滑动控件容器,灰色背景 */
#dragContainer {
  position: relative;
  display: inline-block;
  background: #e8e8e8;
  width: 300px;
  height: 33px;
  border: 2px solid #e8e8e8;
}
/* 滑块左边部分,绿色背景 */
#dragBg {
  position: absolute;
  background-color: #7ac23c;
  width: 0px;
  height: 100%;
}
/* 滑动验证容器文本 */
#dragText {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 33px;
  user-select: none;
  -webkit-user-select: none;
}
/* 滑块 */
#dragHandler {
  position: absolute;
  width: 40px;
  height: 100%;
  cursor: move;
}
/* 滑块初始背景 */
.dragHandlerBg {
  background: #fff no-repeat center url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==");
}
/* 验证成功时的滑块背景 有√*/
.dragHandlerOkBg {
  background: #fff no-repeat center url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ZWE1YjY5NS1iZTg0LTRlY2QtODViZC01ZGVhMWMxZTAzODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O/Y6pgAAAEVJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==");
}
</style>
