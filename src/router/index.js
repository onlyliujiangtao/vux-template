import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Hello = r => require.ensure([], () => r(require('@/components/Hello')), 'Hello');
const login = r => require.ensure([], () => r(require('@/components/HelloFromVux')), 'login');

export default new Router({
  routes: [
    {path: '/hello', name: 'Hello', component: Hello},
    {path: '/', name: '登录',  redirect: '/login' },
    {path: '/login',name: 'login',component: login},
  ]
})
