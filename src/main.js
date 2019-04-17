// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'muse-ui/lib/styles/base.less';
import { Alert,Button, Select,Progress ,TextField,Tabs,Icon,Snackbar,Form,Checkbox,Pagination} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import NProgress from 'muse-ui-progress';
import 'muse-ui-progress/dist/muse-ui-progress.css';
import Toast from 'muse-ui-toast';
import './assets/css/common.css';
import './assets/css/reset.css';
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload'
import Helpers from 'muse-ui/lib/Helpers';
import VueVideoPlayer from 'vue-video-player';
Vue.use(VueVideoPlayer);

Vue.use(VueLazyLoad,{
  preLoad: 1.1,
  throttleWait: 400,
  attempt: 3,
  error:require('./assets/img/404.jpg'),
  loading:require('./assets/img/loading.gif')
});
Vue.use(Icon);
Vue.use(Snackbar);
Vue.use(Toast,{
  position: 'top',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: '',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: '',      // 成功信息图标
  infoIcon: '',                 // 信息信息图标
  warningIcon: '',     // 提醒信息图标
  errorIcon: ''              // 错误信息图标
});
Vue.use(Pagination);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Alert);
// Vue.use(NProgress);
Vue.use(Button);
Vue.use(Select);
Vue.use(Progress);
Vue.use(Helpers);
Vue.use(TextField);
Vue.use(Tabs);
Vue.use(NProgress, {
  zIndex: 2000,          // progress z-index
  top: 0,                // position fixed top
  speed:5,            // progress speed
  color: '#ff4081',      // color
  size: 2,               // progress size
  className: ''          // progress custom class
});
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://taoliyuan.bigbigstudy.com/';
// axios.defaults.withCredentials=true;//让ajax携带cookie
// 超时时间
axios.defaults.timeout = 5000;
var loadinginstace;
axios.interceptors.request.use(config => {
  //  ui Loading方法

  return config
}, error => {
 
  //  Toast.error('加载超时');
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  // Toast.error('加载超时');

  if(!data.data.success){
    Toast.message(data.data.msg);
  }
return data
}, error => {

   Toast.message('加载超时');
return Promise.reject(error)
})

router.beforeEach((to, from , next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//     if (localStorage.getItem('pass')=='pass') {  // 通过vuex state获取当前的token是否存在
//         next();
//     }
//     else {
//         next({
//             path: '/login',
//             query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//     }
// }
// else {
//     next();
// }


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
