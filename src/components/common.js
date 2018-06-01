//是否为电脑
export function isPc() {
    var uaInfo = navigator.userAgent;
    var agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var i = 0; i < agents.length; i++) {
        if (uaInfo.indexOf(agents[i]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


//时间戳转时间
export function parseStamp2Date(timeStamp) {
    var date = new Date(timeStamp);
    var Year = date.getFullYear();//ie火狐下都可以 
    var Month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    var Day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    var Hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    var Minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    var Second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    return Year + '/' + Month + '/' + Day + ' ' + Hour + ':' + Minute + ':' + Second;
}

export function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
export function toAmount12(totalPrice) {
    var price = floatMul(totalPrice, 100).toString();
    var total = price;
    for (var i = 0; i < 12 - price.length; i++) {
        total = '0' + total;
    }
    return total;
}

//加
export function floatAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

//减
export function floatSub(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//乘
export function floatMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


//除
export function floatDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }

    r1 = Number(arg1.toString().replace(".", ""));

    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}
//加
Number.prototype.add = function (arg) {
    return floatAdd(arg, this);
};


//减
Number.prototype.sub = function (arg) {
    return floatSub(this, arg);
};
//乘
Number.prototype.mul = function (arg) {
    return floatMul(arg, this);
};


//除
Number.prototype.div = function (arg) {
    return floatMul(this, arg);
};


//图片压缩
//设置压缩图片的最大高度
var MAX_HEIGHT = 1000;
export function render(image, src, picname) {
    var base64Img = '';
    // 绑定 load 事件处理器，加载完成后执行
    // 获取 canvas DOM 对象
    var canvas = document.createElement("canvas");
    // 如果高度超标
    if (image.height > MAX_HEIGHT && image.height >= image.width) {
        // 宽度等比例缩放 *=
        image.width *= MAX_HEIGHT / image.height;
        image.height = MAX_HEIGHT;
    }
    //考录到用户上传的有可能是横屏图片同样过滤下宽度的图片。
    if (image.width > MAX_HEIGHT && image.width > image.height) {
        // 宽度等比例缩放 *=
        image.height *= MAX_HEIGHT / image.width;
        image.width = MAX_HEIGHT;
    }

    // 获取 canvas的 2d 画布对象,
    var ctx = canvas.getContext("2d");
    // canvas清屏，并设置为上面宽高
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 重置canvas宽高
    canvas.width = image.width;
    canvas.height = image.height;
    // 将图像绘制到canvas上
    ctx.drawImage(image, 0, 0, image.width, image.height);
    // !!! 注意，image 没有加入到 dom之中
    //        document.getElementById('img').src = canvas.toDataURL("image/png");
    base64Img = canvas.toDataURL("image/jpeg");
    //将转换结果放在要上传的图片数组里
    return base64Img;

};
// 适用于action的情况
function change(event) {
    if (this.handleClick) {
        return
    }
    let formData = {};
    var file = event.target.files[0];
    var reader = new FileReader();
    let self = this;
    let base64Img = '';
    reader.onload = function (e) {
        let img = document.createElement('img');
        img.src = this.result;
        img.onload = function () {
            base64Img = render(img, img.src, file.name);
            formData.base64Img = base64Img;
            console.log(img.src.length / 1024, base64Img.length / 1024)
            self.uploadImg(formData);
        }

    }
    reader.readAsDataURL(file);
};
function uploadImg(formData) {
    if (this.autoUpload) {
        if (!this.uploadUrl) {
            console.error('uploadUrl不应为空')
        }
        if (this.$showLoading) {
            this.$showLoading('正在上传');
        }
        axios.post(this.uploadUrl, formData)
            .then((response) => {
                if (this.$hideLoading) {
                    this.$hideLoading();
                }
                this.$refs.input.value = ''
                this.images.push({ ip: response.data.content.ip, url: response.data.content.url })
            });
    } else {
        this.$emit('upload-image', formData)
    }
}
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.href.substr(window.location.href.indexOf('?') + 1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

// 打印A8
// export function printOrder(shopCart, storeName) {
//   if (shopCart) {
//     let printArr = [];
//     let total = 0;
//     printArr.push(`            ${storeName}`);
//     printArr.push(`\n`);
//     printArr.push(`商品名称         数量      单价`);
//     printArr.push(`-------------------------------`);
//     shopCart.forEach((item) => {
//       let foodName = `${item.dishName}`;
//       if (foodName.length < 8) {
//         let l = foodName.length;
//         for (let i = 0; i < 8 - l; i++) {
//           foodName += `　`;
//         }
//       }
//       let printLine = `${foodName} x${item.count}      ￥${item.price}`
//       printArr.push(printLine);
//       total = floatAdd(total, floatMul(item.price, item.count));
//     });
//     printArr.push(`-------------------------------`);
//     printArr.push(`合计：￥${total}`);
//     try {
//       system.printOrder(printArr.join());
//     } catch (error) {
//       console.log(printArr);
//       // console.log(error)
//     }
//   }
// }
// c10打印
export function printOrder(shopCart, storeName) {
    if (shopCart) {
        let printArr = [];
        let total = 0;
        printArr.push(`                    ${storeName}`);
        printArr.push(`\n`);
        printArr.push(`商品名称                 数量          单价`);
        printArr.push(`-----------------------------------------------`);
        shopCart.forEach((item) => {
            let foodName = `${item.dishName}`;
            if (foodName.length < 10) {
                let l = foodName.length;
                for (let i = 0; i < 10 - l; i++) {
                    foodName += `　`;
                }
            }
            let printLine = `${foodName}     x${item.count}          ￥${item.price}`
            printArr.push(printLine);
            total = floatAdd(total, floatMul(item.price, item.count));
        });
        printArr.push(`-----------------------------------------------`);
        printArr.push(`合计：￥${total}`);
        try {
            system.printOrder(printArr.join());
        } catch (error) {
            console.log(printArr);
            // console.log(error)
        }
    }
}
export function formatTime(value, type) {
    var dataTime = "";
    var data = new Date();
    data.setTime(value);
    var year = data.getFullYear();
    var month = addZero(data.getMonth() + 1);
    var day = addZero(data.getDate());
    var hour = addZero(data.getHours());
    var minute = addZero(data.getMinutes());
    var second = addZero(data.getSeconds());
    if (type == "YMD") {
        dataTime = year + "-" + month + "-" + day;
    } else if (type == "YMDHMS") {
        dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    } else if (type == "YMDHM") {
        dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
    } else if (type == "HMS") {
        dataTime = hour + ":" + minute + ":" + second;
    } else if (type == "YM") {
        dataTime = year + "-" + month;
    }
    return dataTime;//将格式化后的字符串输出到前端显示
}
function addZero(val) {
    if (val < 10) {
        return "0" + val;
    } else {
        return val;
    }
}

// cookie增删改查
export function setCookie(cName, cValue, cExpire) {
    var now = new Date();
    now.setTime(now.getTime() + cExpire*24*60*60*1000);
    document.cookie = cName + "=" + escape(cValue) + ";expires=" + now.toGMTString();
}
export function getCookie(cName) {
    var cookies = document.cookie;
    if (cookies.length > 0) {
        var cStart = cookies.indexOf(cName + '=');
        if (cStart != -1) {
            cStart = cStart + cName.length + 1;
            var cEnd = cookies.indexOf(';', cStart);
            if (cEnd == -1)
                cEnd = cookies.length;
            return unescape(cookies.substring(cStart, cEnd))
        }
    } else {
        return null;
    }
}
export function expireCookie(cName) {
    var cValue = getCookie(cName);
    setCookie(cName, cValue, -1);
}  