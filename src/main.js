import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import mock from './mock'
import router from './router/index'
import store from './vuex/index'
//提示框插件
import { AlertPlugin, ConfirmPlugin, ToastPlugin } from 'vux'
//提示插件
Vue.prototype.$alert = function (content, title) {
    this.$vux.alert.show({
        title: title || '提示',
        content: content
    })
};

//提示插件
Vue.prototype.$toast = function (msg, type = 'success') {
    this.$vux.toast.show({
        text: msg,
        type: type
    })
};
Vue.prototype.$confirm = function (content, confirm) {
    this.$vux.confirm.show({
        title: '提示',
        content: content,
        onConfirm() {
            confirm();
        }
    })
};

//显示载入中
Vue.prototype.$showLoading = function (text = '加载中') {
    store.commit('SET_PAGE_LOADING', { isLoading: true, text: text })
};

//隐藏载入中
Vue.prototype.$hideLoading = function () {
    store.commit('SET_PAGE_LOADING', { isLoading: false })
};
//返回
Vue.prototype.$back = function () {
    this.$router ? this.$router.back() : window.history.back()
};
// 解决点击延迟 
FastClick.attach(document.body)

Vue.config.productionTip = false
//动画结束后自动刷新Scroll
Vue.prototype.$autoRefreshScroll = function (scroll) {
    this.$root.currentScroll.push(scroll);
};

/* eslint-disable no-new */
new Vue({
    data() {
        return {
            eventHub: new Vue(),
            currentScroll: [] //当前滚动条
        }
    },
    router,
    store,
    mounted() {
        let self = this;
        window.addEventListener('resize', function () {
            setTimeout(() => {
                if (self.currentScroll.length > 0) {
                    self.currentScroll.forEach((scroll) => {
                        scroll.refresh();
                    });
                }
            }, 300);
        }, false);
        //添加监听扫码方法
        window.onScanResult = function (result) {
            self.eventHub.$emit('onScanResult', result);
        }
    },
    render: h => h(App)
}).$mount('#app-box')