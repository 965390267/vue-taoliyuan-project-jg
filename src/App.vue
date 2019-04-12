<template>
  <div id="app">
    <header>
      <div class="header-wrap">
        <div class="logo"></div>
        <ul class="list">
          <li>
            <router-link to="/"><mu-button flat color="primary">首页</mu-button></router-link>
          </li>
          <li>
            <router-link to="/coursepage">课程页</router-link>
          </li>
          <li>
            <router-link to="/coursepage">免费课程</router-link>
          </li>
          <li>
            <router-link to="/mysutdy">我的学习</router-link>
          </li>
        </ul>
        <div class="search-wrap">
          <input type="text" placeholder="请输入课程名称">
          <div class="search"></div>
        </div>
        <div class="right-wrap">
          <div class="usericon"></div>
          <div class="login" @click="openlogin">
            <a>登录</a>
          </div>/
          <div class="regist" @click="openregist">
            <a>注册</a>
          </div>
        </div>
      </div>
    </header>
    <router-view/>
    <footer>
      <p>企业合作 人才招聘 联系我们 讲师招募 帮助中心 意见反馈 代码托管 友情链接</p>
      <p>&copy;2019 dffff.com 京ICP备 12003892号-11 技术支持zzh</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    
    };
  },
  methods: {
    openlogin() {},
    openregist() {},
   

  },
  mounted() {
  
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
