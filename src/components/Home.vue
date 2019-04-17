<template>
  <div class="home">
    <div class="swiper_wrap">
            <div class="bk" :style="{backgroundImage:''+filterimg+''}">
            </div>
            <!-- Swiper -->
          <swiper v-if="bannerlist.length>1" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <!-- slides -->
  <div class="swiper-slide" v-for="item in bannerlist"
                        :style="{backgroundImage:'url('+item.image+')'}" :key='item.id'>
                    </div>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
        </div>
         <div class="body">
            <h3 class="types-title">
                <span class="tit-icon icon-shizhan-l tit-icon-l"></span>
                <em>限</em>／<em>时</em>／<em>秒</em>／<em>杀</em>
                <span class="tit-icon icon-shizhan-r tit-icon-r"></span>
            </h3>
            <div class="clearfix types-content">
                <div class="index-card-container course-card-container container" v-for='(item,index) in discount' :key='index'>
                    <router-link :to="{name:'CourseDetail',params:{cid:item.courseId}}" class="course-card" >
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
                    </router-link>
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
                    <router-link :to="{name:'CourseDetail',params:{cid:item.courseId}}" class="course-card">
                        <div class="course-card-top hashadow">
                            <img class="course-banner" v-lazy="item.image">
                        </div>
                    </router-link>
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
                    <router-link :to="{name:'CourseDetail',params:{cid:item.id}}" class="course-card" >


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
                    </router-link>
                </div>
            </div>
        </div>


  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: "App",
    components: {
         swiper,
    swiperSlide
    },
  data() {
    return {
      swiperOption: {
      
          slidesPerView: 1,
          spaceBetween: 30,
         autoplay: {
　　　　delay: 2000,
　　disableOnInteraction: false
　　},
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on:{
          // 使用es6的箭头函数，使this指向vue对象
          slideChangeTransitionStart: ()=>{
            // 通过$refs获取对应的swiper对象
            let swiper = this.$refs.mySwiper.swiper;
            // let i = swiper.activeIndex;   
          
               if(swiper){
            let sty = window.getComputedStyle(swiper.slides[swiper.activeIndex], null);                                          
            this.filterimg = sty['background-image'];
               }
           
          }
        }

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
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  methods: {
    callback(index){
console.log(this);

    },
         banner() {
                   
                    this.$http.get('cloud/content/getAllBanners')
                        .then(function (response) {
                            this.bannerlist = response.data.data;
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
   this.banner();
    this.getTeacherPic();
    this.getDiscountCourses();
    this.getCommonCourses();

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/index.css';
        .swiper-container {
            width: 90%;
            height: 98%;
            border-radius: 10px;
            box-shadow: 0 8px 8px 0 rgba(7, 17, 27, .06);
        }
        
        /* .swiper-button-prev {
            background-image: url('../img/arrow.png') !important;
            height: 25px !important;
            transform: rotateZ(180deg);
        }
        .swiper-button-next {
            background-image: url('../img/arrow.png') !important;
            height: 25px !important;
        } */
</style>
