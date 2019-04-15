<template>
  <div id="app">
    <header>
      <div class="header-wrap">
        <div class="logo"></div>
        <ul class="list">
          <li >
            <router-link to="/" >首页</router-link>
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
          <mu-text-field style='width:100%' underline-color='#ffa000' v-model="search" placeholder="请输入课程名称"></mu-text-field>
          <!-- <input type="text" placeholder="请输入课程名称"> -->
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
      <!-- 登录弹窗 -->
        <div class="login-regist-alert" v-show='login_dialog' style='display: none;'>
            <div class="white_alert_box">
                <div class="close-btn" @click='closelogin'></div>
                <div class="ani_head">
                    <div class="hand"></div>
                    <div class="hand hand-r"></div>
                </div>
                <h3>登录</h3>
                <form>
                    <div>
                        <input type="text" name="username" v-model="login_mobile" class="login-username"
                            placeholder="用户名或手机号">
                    </div>
                    <div>
                        <input type="text" name="login-code" v-model="login_code" id='login-password'
                            class="login-password" placeholder="请输入验证码">
                        <div id="getcode" @click='changecode'><img :src="codebase64" alt="" srcset=""></div>
                    </div>
                    <div>
                        <input type="password" name="password" v-model="login_password" class="login-password"
                            placeholder="密码">
                    </div>
                    <button id="login-btn" type="button" @click='login'>登 录</button>
                </form>
            </div>
        </div>
        <!-- 登录弹窗 -->
        <!-- 注册弹窗 -->
        <div class="regist-alert" v-show='regist_dialog' style='display: none;'>
            <div class="white_alert_box">
                <div class="close-btn" @click='closeregist'></div>
                <div class="ani_head">
                    <div class="hand"></div>
                    <div class="hand hand-r"></div>
                </div>
                <h3>注册</h3>
                <form>
                    <div>
                        <input type="text" name="username" v-model="regist_mobile" class="regist-username"
                            placeholder="手机号码">
                    </div>
                    <div>
                        <input type="text" id='testcode' v-model="regist_inputcode" name="text" class="regist-password"
                            placeholder="请输入验证码">
                        <button id="testcode-btn" type='button' @click='sendcode'>发送验证码</button>
                    </div>
                    <div>
                        <input type="password" v-model="regist_password" name="regist-password" class="password"
                            placeholder="密码">
                    </div>

                    <button id="regist-btn" type="button" @click='regist'>注 册</button>
                </form>
            </div>
        </div>
        <!-- 注册弹窗 -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      login_dialog:false,//登录弹窗
        regist_dialog:false,//注册弹窗
        login_mobile:'',//登录账号
        login_password:'',//登录密码
        regist_mobile:'',//注册手机号
        regist_inputcode:'',//输入验证码
        regist_password:'',//注册密码
        codebase64:'',
        login_code:'',
        search:'',
         isactive:''
    };
  },
  methods: {
 
       changecode(){
               this.getcodepic()
        },
        getcodepic(){
          
            this.$http.get('cloud/user/verifyCode',{
                headers: {
                    'Content-Type':'application/octet-stream;charset=gb2312'
                  },
                  responseType: 'blob'
              })
            .then( (response)=> {
                const blob = new Blob([response.data])
                this.codebase64= URL.createObjectURL(blob)
 console.log(this);
 
    
            }).catch()
        },
        openlogin(){
            this.login_dialog=true;
            this.getcodepic()
        },
        openregist(){
             this.regist_dialog=true;
            
        },
        closelogin(){
            this.login_dialog=false;
        },
        closeregist(){
            this.regist_dialog=false;
        },
        sendcode(){
           
            this.$http.get( 'cloud/user/createRegisterAuthCode', {
                params: {
             phone:this.regist_mobile
                }
            })
            .then( (response)=> {
            //    alert()
            }).catch()
        },
        login(){
         
          this.$http.post('cloud/user/login', {
              params: {
                username:this.login_mobile,
                password:this.login_password,
                code:this.login_code
              }
          })
          .then( (response)=> {
         console.log(response);
         
          }).catch()
          
        },
        regist(){
           
            this.$http.post('cloud/user/register', {
                params: {
                  phone :this.regist_mobile,
                  password:this.regist_password,
                  code:this.regist_inputcode
                }
            })
            .then( (response)=> {
           console.log(response);
           
            }).catch()
            
            console.log(this.regist_mobile,this.regist_inputcode,this.regist_password);
        }
  },
  mounted() {

  },
    beforeDestroy() {
        clearInterval(this.counttimer);
    },
};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
.swiper-pagination-bullet {
            width: 20px!important;
            height: 4px!important;
            border-radius: 2px!important;
        }
        .swiper-pagination-bullet-active {
            background: #ffd666!important;
        }
</style>
