// utils.js

// 防抖函数
export function debounce(fn, delay = 1000) {
    let t = null;
    return function (...args) {
        if (t) clearTimeout(t);
        t = setTimeout(() => {
            fn.apply(this, args); // 使用apply传递this和参数
        }, delay);
    };
}

// 节流函数
export function throttle(fn, delay = 200) {
    let timer = null;
    return function (...args) {
        if (timer) return; // 如果定时器存在，直接返回
        timer = setTimeout(() => {
            fn.apply(this, args); // 使用apply传递this和参数
            timer = null; // 清除定时器
        }, delay);
    };
}

// 下拉动画
export function animation(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let step = (target - obj.scrollTop) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.scrollTop === target) {
            clearInterval(obj.timer);
            if (callback) callback();
        } else {
            obj.scrollTop += step;
        }
    }, 10);
}

// 文件类型判断
export function judgeFileType(file) {
    if (file == null || file == "") {
        alert("请选择要上传的图片!");
        return false;
    }
    if (file.lastIndexOf('.') === -1) {
        alert("路径不正确!");
        return false;
    }
    const AllImgExt = ".jpg|.jpeg|.gif|.bmp|.png|";
    const extName = file.substring(file.lastIndexOf(".")).toLowerCase(); // 转小写
    if (AllImgExt.indexOf(extName + "|") === -1) {
        alert(`该文件类型不允许上传。请上传 ${AllImgExt} 类型的文件，当前文件类型为 ${extName}`);
        return false;
    }
    return true;
}

// 文件类型映射
export function fileType() {
    return {
        'application/msword': 'word',
        'application/pdf': 'pdf',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.ms-excel': 'excel',
        'application/zip': 'zip',
    };
}
