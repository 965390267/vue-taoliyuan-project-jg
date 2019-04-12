// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'muse-ui/lib/styles/base.less';
import { Button, Select,Progress } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import NProgress from 'muse-ui-progress';
import 'muse-ui-progress/dist/muse-ui-progress.css';
import Toast from 'muse-ui-toast';
import './assets/css/common.css'
import './assets/css/reset.css'
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload'
import Helpers from 'muse-ui/lib/Helpers';
Vue.use(VueLazyLoad,{
  preLoad: 1.1,
  throttleWait: 400,
  attempt: 3,
  error:require('./assets/img/404.jpg'),
  loading:require('./assets/img/loading.gif')
})
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://taoliyuan.bigbigstudy.com/';
// var instance = axios.create({
//   baseURL: 'http://taoliyuan.bigbigstudy.com/',
//   timeout: 1000,
 
// });


Vue.use(Toast);
// Vue.use(NProgress);
Vue.use(Button);
Vue.use(Select);
Vue.use(Progress);
Vue.use(Helpers);
Vue.use(NProgress, {
  zIndex: 2000,          // progress z-index
  top: 0,                // position fixed top
  speed:5,            // progress speed
  color: '#ff4081',      // color
  size: 2,               // progress size
  className: ''          // progress custom class
})
Vue.config.productionTip = false


router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
 NProgress.start();
 // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {  
 // 在即将进入新的页面组件前，关闭掉进度条
 setTimeout(()=>{
  NProgress.done()
 },1000)

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
