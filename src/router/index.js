import Vue from 'vue'
import Router from 'vue-router'
import { setCookie, getCookie, expireCookie } from '@/components/common'

Vue.use(Router)

const main = r => require.ensure([], () => r(require('@/view/main/main')), 'main');
const login = r => require.ensure([], () => r(require('@/view/login/login')), 'login');
const router = new Router({
  routes: [
    { path: '/', name: '首页', component: main },
    { path: '/login', name: '登录', component: login },
  ]
})


router.afterEach((to, from)=>{
  if(getCookie('token')){
    /^\/login$/.test(to.path)&&router.push('/');
  }else{
    !/^\/login$/.test(to.path) && router.push('/login');
  }
})
export default router;