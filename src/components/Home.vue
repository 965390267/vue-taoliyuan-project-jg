<template>
  <div class="home">
    <div class="swiper_wrap">
            <div class="bk" :style="{backgroundImage:''+filterimg+''}">
            </div>
            <!-- Swiper -->
            <slider :pages="pages" :sliderinit="sliderinit">
    <!-- slot  -->
          </slider>
        </div>

         <div class="body">
            <h3 class="types-title">
                <span class="tit-icon icon-shizhan-l tit-icon-l"></span>
                <em>限</em>／<em>时</em>／<em>秒</em>／<em>杀</em>
                <span class="tit-icon icon-shizhan-r tit-icon-r"></span>
            </h3>
            <div class="clearfix types-content">

                <div class="index-card-container course-card-container container" v-for='(item,index) in discount' :key='index'>
                    <a target="_blank" class="course-card" href="" data-track="sztj-1-2">


                        <div class="course-stat new">
                           新课
                         
                        </div>
                        <div class="course-card-top hashadow">
                            <img class="course-banner" v-lazy="item.cover">


                            <div class="course-label">
                                <!-- <label>剩余{{item.diff.hour}}小时{{item.diff.minute}}分{{item.diff.second}}秒</label> -->

                            </div>
                        </div>
                        <div class="course-card-content">
                            <h3 class="course-card-name">{{item.name}}</h3>
                            <div class="clearfix course-card-bottom">
                                <div class="course-card-info">
                                    <span>已有 <em> {{item.buyerNum}}</em>购买</span>
                                    <!-- <span class="course-star-box">剩余3天5小时10分30秒</span> -->
                                </div>


                                <div class="course-card-price sales">
                                    <span class="source-price">￥{{item.price}}</span>
                                    <span class="cost-price">￥{{item.discountPrice}}</span>
                                    <span class="sales-tip">限时优惠<i class="sales-timer js-sales-timer"
                                            data-timer="631543"></i></span> </div>
                            </div>
                        </div>
                    </a>
                </div>


            </div>

            <h3 class="types-title">
                <span class="tit-icon icon-new-l tit-icon-l"></span>
                <em>推</em>／<em>荐</em>／<em>名</em>／<em>师</em>
                <span class="tit-icon icon-new-r tit-icon-r"></span>
            </h3>
            <div class="clearfix types-content">
                <div class="index-card-container course-card-container container" v-for="(item,index) in teacherlist"
                    :key='index'>
                    <a class="course-card" :href="'course.html?cid='+item.courseId">


                        <div class="course-card-top hashadow">
                            <img class="course-banner" v-lazy="item.image">


                        </div>

                    </a>
                </div>



            </div>
            <h3 class="types-title">
                <span class="tit-icon icon-tech-l tit-icon-l"></span>
                <em>系</em>／<em>列</em>／<em>课</em>／<em>程</em>
                <span class="tit-icon icon-tech-r tit-icon-r"></span>
            </h3>
            <div class="clearfix types-content">

                <div class="index-card-container course-card-container container" v-for="(item,index) in common"
                    :key='index'>
                    <a target="_blank" class="course-card" href="" data-track="sztj-1-4">


                        <div class="course-stat hot">
                            热门
                        </div>
                        <div class="course-card-top hashadow">
                            <img class="course-banner" v-lazy="item.cover">


                            <div class="course-label">
                                <label>JavaScript</label>
                                <label>算法与数据结构</label>
                            </div>
                        </div>
                        <div class="course-card-content">
                            <h3 class="course-card-name">{{item.name}} </h3>
                            <div class="clearfix course-card-bottom">
                                <div class="course-card-info">
                                    <span>已有 <em> {{item.buyerNum}}</em>购买</span><em>￥{{item.price}}元</em>
                                    <!-- <span>实战</span><span>中级</span><span><i class="icon-set_sns"></i>1030</span>
                                    <span class="course-star-box"><i class="icon-star2 on"></i><i
                                            class="icon-star2 on"></i><i class="icon-star2 on"></i><i
                                            class="icon-star2 on"></i><i class="icon-star2 on"></i></span> -->
                                </div>


                                <div class="course-card-price sales">

                                    <!-- <span class="sales-tip">满减</span> -->

                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>


  </div>
</template>

<script>
import slider from 'vue-concise-slider'// 引入slider组件
export default {
  name: "App",
  
    components: {
        slider
    },
  data() {
    return {
       pages:[
          {
            title: '',
            style:{
             background:'#4bbfc3',
            }
          },
          {
           title: '',
           style:{
            background:'#4bbfc3',
            }
          },
          {
            title: 'slide3',
            style:{
              background:'#4bbfc3',
            },
          }
        ],
       //滑动配置[obj]
        sliderinit: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay:1000,//自动滚动[ms]
          loop:true,//循环滚动
          direction:'vertical',//方向设置，垂直滚动
          infinite:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
        },
      bannerlist: [],
      teacherlist: [],
      filterimg: "",
      discount: [],
      common: [],
      counttimer: null,
      timecount: 0
    };
  },
  methods: {
         swiper() {
                   
                    this.$http.get('cloud/content/getAllBanners')
                        .then(function (response) {

                            this.bannerlist = response.data.data;

                            // that.$nextTick(function () {
                            //     var swiper = new Swiper('.swiper-container', {
                            //         observe: true,
                            //         observeParents: true,
                            //         // observeSlideChildren: true,
                            //         speed: 1000,
                            //         slidesPerView: 1,
                            //         spaceBetween: 30,
                            //         loop: true,
                            //         // autoplay: true,
                            //         autoplay: {
                            //             delay: 3000
                            //         }, //可选选项，自动滑动
                            //         pagination: {
                            //             el: '.swiper-pagination',
                            //             clickable: true,
                            //         },
                            //         navigation: {
                            //             nextEl: '.swiper-button-next',
                            //             prevEl: '.swiper-button-prev',
                            //         },
                            //         on: {
                            //             slideChangeTransitionStart: function () {

                            //                 var sty = window.getComputedStyle(this
                            //                     .slides[this.activeIndex], null)

                            //                 that.filterimg = sty['background-image'];
                            //             }
                            //         }
                            //     });
                            // })


                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });

                },
    getTeacherPic() {
      
        this.$http.get("cloud/content/getAllTeachersImage")
        .then(
          function(response) {
            this.teacherlist = response.data.data;
          }.bind(this)
        )
        .catch();
    },
    getDiscountCourses() {
      
        this.$http.get( "cloud/course/getDiscountCourses")
        .then(
          function(response) {
             this.discount =response.data.data;
            // this.setCountTime(response.data.data);
            // setInterval(
            //   function() {
            //     this.setCountTime(response.data.data);
            //   }.bind(this),
            //   1000
            // );
          }.bind(this)
        )
        .catch();
    },
    getCommonCourses() {
      
        this.$http.get("cloud/course/getCommonCourses")
        .then(
          function(response) {
            this.common = response.data.data;
          }.bind(this)
        )
        .catch();
    }
  },
  mounted() {
     this.swiper();
    this.getTeacherPic();
    this.getDiscountCourses();
    this.getCommonCourses();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/index.css';
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
