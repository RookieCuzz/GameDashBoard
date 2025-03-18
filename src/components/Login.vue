<template>
  <div class="modal" @click.self="closeModal">
    <div class="container" ref="containerRef">
      <div class="form-box" ref="formBoxRef" :style="{ transform: `translateX(${transRate}px)` }">
        <!-- 注册 -->
        <div class="register-box" :class="{hidden:!switchLogin}">
          <h1>注册</h1>
          <input type="text" placeholder="用户名" v-model="username">
          <input type="email" placeholder="邮箱" v-model="email">
          <!-- 验证码输入框和按钮 -->
          <div class="verification-box">
            <input type="text" v-model="verificationCode" placeholder="----" maxlength="4" @input="limitVerificationCode">
            <button @click="getVerificationCode" :disabled="isButtonDisabled" id="emailButton">{{ buttonText }}</button>
          </div>
          <input type="password" placeholder="请设置密码" v-model="password" @input="checkPasswordStrength" />
          <p v-if="!isPassOK" style="color: red">请输入八位以上包含两种字符的密码</p>
          <button class="registerX" :disabled="!isPassOK" @click="tryRegister">注册</button>
          <div class="switch-form">
            <span>已有账号？</span>
            <button @click="switchLoginEvent" class="switch-btn">去登录</button>
          </div>
        </div>
        <!-- 登录 -->
        <div class="login-box" :class="{hidden:switchLogin}">
          <h1>登录</h1>
          <input type="text" placeholder="用户邮箱" v-model="loginForm.email">
          <input type="password" placeholder="密码" v-model="loginForm.password">
          <button @click="tryLogin">登录</button>
          <div class="switch-form">
            <span>没有账号？</span>
            <button @click="switchLoginEvent" class="switch-btn">去注册</button>
          </div>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎来到<span>XXX</span></h2>
        <p>快来加入<span>新的旅途</span>吧</p>
        <img src="@/assets/images/icon.png" alt="">
        <p>已有账号</p>
        <button id="login" @click="switchLoginEvent">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到<span>XXX</span></h2>
        <p>快来加入<span>游戏</span>吧</p>
        <img src="@/assets/images/icon.png" alt="">
        <p>没有账号？</p>
        <button id="register" @click="switchLoginEvent">去注册</button>
      </div>
    </div>
    <button class="close-button" @click.stop="closeModal">✗</button>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import { ElNotification } from 'element-plus';
import {useRouter} from "vue-router";
import CryptoJS from 'crypto-js'; // 引入 crypto-js 库
import apiClient from '@/axios'; // 引入全局 axios 实例
const transRate = ref('0'); // 初始值设为0，表示显示登录表单
const switchLogin = ref(true); // 修改初始值为 true，表示初始显示注册表单
const router = useRouter(); // 获取路由实例
const emit = defineEmits(['close']);

// 使用 computed 来动态判断密码是否符合条件
const isPassOK = computed(() => checkPasswordStrength());
// 密码强度检测函数
const checkPasswordStrength = () => {
  // 密码长度 >= 8
  if (password.value.length < 8) return false;

  // 检查是否包含两种字符类型
  const hasLetters = /[a-zA-Z]/.test(password.value); // 包含字母
  const hasNumbers = /\d/.test(password.value);        // 包含数字
  const hasSpecialChars = /[\W_]/.test(password.value); // 包含特殊字符

  // 必须包含至少两种类型的字符
  const valid =
      (hasLetters && hasNumbers) ||
      (hasLetters && hasSpecialChars) ||
      (hasNumbers && hasSpecialChars);

  return valid;
};
const password = ref('');

const closeModal = () => {
  emit('close');
};

const getAESPassword= password=>{

  const key = CryptoJS.enc.Hex.parse("7f9d3f47b1a8e0dfb8c9a987f1b3d6a4c8e2f74b1a927e34d6f9e8c2a1b4f5c3");
  const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");  // 16字节IV

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,  // 使用CBC模式
    padding: CryptoJS.pad.Pkcs7  // 使用PKCS7填充
  });
  const encryptedBase64 = encrypted.toString();  // 返回Base64编码的加密结果
  return encryptedBase64;
}

const tryRegister = () => {
  // 用户名不能为空或空格
  if (!username.value || username.value.trim() === '') {
    ElNotification({
      title: '注册失败',
      message: '用户名不能为空或空格',
      type: 'error',
      duration: 3000,
      zIndex: 9999,
      offset: 200,
    });
    return;
  }

  // 邮箱正则验证
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email.value)) {
    ElNotification({
      title: '注册失败',
      message: '请输入正确的邮箱格式',
      type: 'error',
      duration: 3000,
      zIndex: 9999,
      offset: 200,
    });
    return;
  }

  // 验证码必须是4位数字或字母组合
  const codePattern = /^[a-zA-Z0-9]{4}$/;
  if (!codePattern.test(verificationCode.value)) {
    ElNotification({
      title: '注册失败',
      message: '验证码必须是4位字母或数字的组合',
      type: 'error',
      duration: 3000,
      zIndex: 9999,
      offset: 200,
    });
    return;
  }

  // 密码不能为空
  if (!password.value || password.value.trim() === '') {
    ElNotification({
      title: '注册失败',
      message: '密码不能为空',
      type: 'error',
      duration: 3000,
      zIndex: 9999,
      offset: 200,
    });
    return;
  }

  const key = CryptoJS.enc.Hex.parse("7f9d3f47b1a8e0dfb8c9a987f1b3d6a4c8e2f74b1a927e34d6f9e8c2a1b4f5c3");
  const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");  // 16字节IV

  const encrypted = CryptoJS.AES.encrypt(password.value, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,  // 使用CBC模式
    padding: CryptoJS.pad.Pkcs7  // 使用PKCS7填充
  });
  const encryptedBase64 = encrypted.toString();  // 返回Base64编码的加密结果

  apiClient.post('/register', {
    username: username.value,
    password: encryptedBase64,
    email: email.value,
    verificationCode: verificationCode.value
  })
      .then(response => {
        if (response.data.code==400){
          ElNotification({
            title: '注册失败',
            message: response.data.message,
            type: 'error',
            duration: 3000,
            zIndex: 9999,
            offset: 200,
          });
        }
        if (response.data.code==200){
          closeModal();
          ElNotification({
            title: '注册成功',
            message: "已经帮您自动登陆",
            type: 'success',
            duration: 3000,
            zIndex: 9999,
            offset: 200,
          });
        }

      })
      .catch(error => {
        console.log("ERROR")
      });

};


// 通过 ref 获取 DOM 元素
const containerRef = ref(null);
const formBoxRef = ref(null);
// 使用 reactive 定义 loginForm 对象
const loginForm = reactive({
  email: '',
  password: ''
});

const username = ref('');
const email = ref('');
const verificationCode=ref("")
const getVerificationCode=()=>{
  // 模拟发送验证码请求

  // ElNotification({
  //   title: '发送失败',
  //   message: '验证码发送失败，请稍后重试',
  //   type: 'error',
  //   duration: 3000,
  //   zIndex: 9999,   // 设置 z-index
  //   offset: 200,    // 设置距离顶部的偏移量，使其接近页面中间
  // });
  startCountdown();
  apiClient.get('/mail/send', {
    params: {
      email: email.value,
    }
  })
      .then(response => {
        if (response.data.code==200){

          ElNotification({
            title: '发送成功',
            message: '验证码发送成功,请登录邮箱查看',
            type: 'success',
            duration: 1500,
            zIndex: 9999,   // 设置 z-index
            offset: 200,    // 设置距离顶部的偏移量，使其接近页面中间
          });
        }
        console.log( response.data);
      })
      .catch(error => {
        ElNotification({
          title: '发送失败',
          message: '请检查邮箱地址是否填写正确',
          type: 'error',
          duration: 1500,
          zIndex: 9999,   // 设置 z-index
          offset: 200,    // 设置距离顶部的偏移量，使其接近页面中间
        });
      });
}
const isButtonDisabled= ref(false);
const buttonText=ref("获取验证码");
const countDown=ref(60);

const startCountdown=()=>{

  isButtonDisabled.value = true;
  const interval = setInterval(() => {
    if (countDown.value > 0) {
      buttonText.value = `重新获取(${countDown.value--}秒)`;
    } else {
      clearInterval(interval);
      isButtonDisabled.value = false;
      buttonText.value = "获取验证码";
      countDown.value = 60;  // 重置倒计时
    }
  }, 1000);

  };


const tryLogin= () =>{
  console.log("登录账户密码为",loginForm)
  apiClient.post("/login",
    {
      email: loginForm.email,
      password: getAESPassword(loginForm.password)

  }).then(response=>{


      if (response.data.code==200){
        ElNotification({
          title: '登录成功',
          message: ' ',
          type: 'success',
          duration: 1500,
          zIndex: 9999,   // 设置 z-index
          offset: 200,    // 设置距离顶部的偏移量，使其接近页面中间
        });
        closeModal();
      }else {
        ElNotification({
          title: '登录失败',
          message: response.data.message,
          type: 'error',
          duration: 1500,
          zIndex: 9999,   // 设置 z-index
          offset: 200,    // 设置距离顶部的偏移量，使其接近页面中间
        });
      }

      }

  ).catch(error=>{

    console.log("错误>",error);
    // ElNotification({
    //   title: '登录失败',
    //   message: error.data.message,
    //   type: 'error',
    //   duration: 1500,
    //   zIndex: 9999,   // 设置 z-index
    //   offset: 200,    // 设置距离顶部的偏移量，使其接近页面中间
    // });

  })

}



const switchLoginEvent = () => {
  switchLogin.value = !switchLogin.value;
  // 切换表单时应用动态计算的滑动距离
  const containerWidth = containerRef.value.offsetWidth;
  const formBoxWidth = formBoxRef.value.offsetWidth;

  // 修改计算方式，确保正确切换
  if (switchLogin.value) {
    transRate.value = `${containerWidth - formBoxWidth}`; // 切换到注册
  } else {
    transRate.value = '0'; // 切换到登录
  }
};

// 在组件挂载后，获取元素的宽度并计算滑动距离
onMounted(() => {
  const containerWidth = containerRef.value.offsetWidth;
  const formBoxWidth = formBoxRef.value.offsetWidth;
  transRate.value = `${containerWidth - formBoxWidth}`; // 初始显示注册
  document.body.style.overflow = 'hidden';
});

// 在组件卸载时恢复页面滚动
onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
// const switchLoginEvent = () => {
//   switchLogin.value = !switchLogin.value;
//   transRate.value = switchLogin.value ? '105' : '0'; // 根据 switchLogin 值切换 transform 百分比
// };

// 限制验证码输入
const limitVerificationCode = (e) => {
  // 只允许输入字母和数字
  verificationCode.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8000;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #a262ad;
  z-index: 8001;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #fff;
  transform: rotate(90deg);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container {
  background-color: #fff;
  width: 800px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.form-box {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #9370DB, #87CEEB);
  width: 400px;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: transform 0.5s ease-in-out;
}

.register-box, .login-box {
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.register-box.hidden, .login-box.hidden {
  display: none;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 5px;
  font-size: 24px;
  font-weight: 600;
}

.verification-box {
  display: flex;
  background-color: transparent;
  width: 85%;
  color: #fff;
  border: none;
  margin: 0;
  font-size: 14px;
  position: relative;
  letter-spacing: 2px;
  gap: 10px;
}

.verification-box input {
  padding: 12px 15px;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  color: #333;
  letter-spacing: 5px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border: none;
  height: 45px;
  width: 85%;
  box-sizing: border-box;
  margin: 0;
}

.verification-box button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0 15px;
  font-size: 14px;
  transition: all 0.3s ease;
  height: 45px;
  width: 15%;
  min-width: 80px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  line-height: 45px;
  vertical-align: middle;
}

.verification-box button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.verification-box button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

input {
  background-color: rgba(255, 255, 255, 0.9);
  width: 85%;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 12px 15px;
  margin: 0;
  font-size: 14px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  height: 45px;
}

input::placeholder {
  color: #666;
}

input:focus {
  background-color: #fff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(163, 98, 173, 0.3);
}

.form-box button {
  width: 85%;
  margin-top: 10px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 12px;
  color: #a262ad;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  height: 45px;
}

.form-box button:hover {
  background-color: #a262ad;
  color: #f6f6f6;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.registerX:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.con-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  padding: 40px;
}

.con-box.left {
  left: 0;
}

.con-box.right {
  right: 0;
}

.con-box h2 {
  color: #8e9aaf;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 15px;
}

.con-box p {
  font-size: 14px;
  letter-spacing: 1px;
  color: #8e9aaf;
  text-align: center;
  margin: 5px 0;
}

.con-box span {
  color: #d3b7d8;
  font-weight: 600;
}

.con-box img {
  width: 120px;
  height: 120px;
  opacity: 0.9;
  margin: 30px 0;
}

.con-box button {
  margin-top: 20px;
  background-color: #fff;
  color: #a262ad;
  border: 1px solid #d3b7d8;
  padding: 10px 30px;
  border-radius: 25px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  height: 40px;
  min-width: 120px;
}

.con-box button:hover {
  background-color: #d3b7d8;
  color: #fff;
  transform: translateY(-2px);
}

.switch-form {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
}

.switch-btn {
  background: none;
  border: none;
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  height: 24px;
}

.switch-btn:hover {
  color: #f0f0f0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

</style>
