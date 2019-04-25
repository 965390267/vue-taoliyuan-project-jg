<template>
<div class="home">
       <div class="body">
        <div class="video-wrap">
            <div class="prism-player" id="player-con">
                <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
            
            </div>
            <div class="Cataloglist">
                <h3>
                    第1章 node.js 调试入门
                </h3>
                <ul>
                    <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                    <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                    <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                    <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                </ul>
                <h3>
                        第2章 node.js 调试入门
                    </h3>
                    <ul>
                        <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                        <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                        <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                        <li><a href=""><span class="play-btn"></span> 1-1 Inspector 介绍 (13:00)</a></li>
                    </ul>
            </div>
        </div>

        <h3 class="types-title">
            <span class="tit-icon icon-shizhan-l tit-icon-l"></span>
            <em>推</em>／<em>荐</em>／<em>课</em>／<em>程</em>
            <span class="tit-icon icon-shizhan-r tit-icon-r"></span>
        </h3>
        <div class="clearfix types-content">
            <div class="index-card-container course-card-container container" v-for="(item,index) in common"
                    :key='index'>
                <a target="_blank" class="course-card" href="" data-track="sztj-1-1">
                    <div class="course-card-top hashadow">
                        <img class="course-banner" v-lazy="item.cover">
                        <div class="course-label">
                            <label>Vue.js</label>
                        </div>
                    </div>
                     <div class="course-card-content">
                            <h3 class="course-card-name">{{item.name}} </h3>
                            <div class="clearfix course-card-bottom">
                                <div class="course-card-info">
                                    <span>已有 <em> {{item.buyerNum}}</em>购买</span><em>￥{{item.price}}元</em>                                
                                </div>
                                <div class="course-card-price sales">
                                    <!-- <span class="sales-tip">满减</span> -->
                                </div>
                            </div>
                        </div>
                    <!-- <div class="course-card-content">
                        <h3 class="course-card-name"> Vue2.5开发去哪儿网App 从零基础入门到实战项目</h3>
                        <div class="clearfix course-card-bottom">
                            <div class="course-card-info">
                                <span>实战</span><span>中级</span><span><i class="icon-set_sns"></i>5148</span>
                                <span class="course-star-box"><i class="icon-star2 on"></i><i
                                        class="icon-star2 on"></i><i class="icon-star2 on"></i><i
                                        class="icon-star2 on"></i><i class="icon-star2 on"></i></span>
                            </div>


                            <div class="course-card-price sales">￥266.00

                                <span class="sales-tip">满减</span>

                            </div>
                        </div>
                    </div> -->
                </a>
            </div>
           
        </div>
    </div>
    </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
export default {

  data () {
    return {
              playerOptions: {
                 playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                 autoplay: true, //如果true,浏览器准备好时开始回放。
                 muted: false, // 默认情况下将会消除任何音频。
                 loop: false, // 导致视频一结束就重新开始。
                 preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: 'video/mp4',
                    src: this.videoUrl //视频url地址
                }],
                poster:'', //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            common:[],
            videoUrl:''
            }
    
  },
//   watch: {
// //更改视频源 videoUrl从弹出框组件传值
// videoUrl: function (val) {
// if (val !== '') {
// this.$refs.videoPlayer.player.src(val)
// }
// }
//   },

  methods:{
    getCommonCourses() {
      
        this.$http.get("cloud/course/getCommonCourses")
        .then(
          (response) =>{
            this.common = response.data.data;
          }
        )
        .catch();
    },
      getPlayUrl(id) {
      
        this.$http.get("cloud/course/getPlayUrl?id="+id)
        .then(
          (response)=> {
             
              
            this.videoUrl = response.data.data.url;
            this.playerOptions.sources[0].src=this.videoUrl
               console.log(this.$refs.videoPlayer);
               
                
          }
        )
        .catch();
    }

  },
  mounted(){
     
      
     this.getCommonCourses();
     this.getPlayUrl(this.$route.query.cid);

  }
}
</script>
<style scoped>
@import '../assets/css/playpage.css';
#player-con{
    width: 80%;
}
.types-content{
    width: 70%;
    margin: 0 auto;
}

</style>
