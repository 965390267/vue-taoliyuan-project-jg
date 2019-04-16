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
            <router-link to="/freecourse">免费课程</router-link>
          </li>
          <li>
            <router-link to="/mystudy">我的学习</router-link>
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
                      
     <mu-text-field v-model="login_mobile" label="用户名或手机号"  label-float max-length='11' underline-color='#ffab91' color='#ffab91'></mu-text-field>
                      
                    </div>
                    <div>
                      <div class="self-width">
                         <mu-text-field v-model="login_code"   full-width label="请输入验证码" label-float  underline-color='#ffab91' color='#ffab91'></mu-text-field>
                      </div>
                      
                       
                        <div id="getcode" @click='changecode'><img :src="codebase64" alt="" srcset=""></div>
                    </div>
                    <div>
                      <mu-text-field v-model="login_password"   label="密码" label-float  type="password" underline-color='#ffab91' color='#ffab91'></mu-text-field>
                       
                    </div>
                     <mu-button @click="login">登 录</mu-button>
                  
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
                       <mu-text-field v-model="regist_mobile"  label="手机号码" label-float max-length='11' underline-color='#ffab91' color='#ffab91'></mu-text-field>
                       
                    </div>
                    <div>
                       <div class="self-width">
                         <mu-text-field v-model="regist_inputcode"  full-width label="请输入验证码" label-float  underline-color='#ffab91' color='#ffab91'></mu-text-field>
                      </div>
                       
                        <button id="testcode-btn" type='button' @click='sendcode'>发送验证码</button>
                    </div>
                    <div>
                       <mu-text-field v-model="regist_password"   label="密码" label-float  type="password" underline-color='#ffab91' color='#ffab91'></mu-text-field>
                     
                    </div>
                  <mu-button @click="regist">注 册</mu-button>
                   
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
      visibility: false,
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
         isactive:'',
           usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
     
      validateForm: {
        username: '',
        password: '',
      
      }
    };
  },
  methods: {
 submit () {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      };
    },
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
        .vjs-big-play-button{
    border-radius: 100%!important;
    width: 2em !important;
}
.self-width{
  display: inline-block;
    width: 64%;
}
</style>
