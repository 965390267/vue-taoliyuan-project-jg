<template>
<div class="home">
           <div class="body">
            <div class="video-wrap">

                <div class="fengmian-wrap"  :style="{backgroundImage:'url('+coursedetail.cover+')'}">

                </div>
                <div class="right-corse-mes">
                    <ul>
                        <li><em>课程名称:</em> {{coursedetail.name}}</li>
                        <li><em>讲师:</em> 臧志鸿</li>
                        <li ><em >原价:</em><em class='red'>￥{{coursedetail.price}}</em></li>

                        <li v-if="coursedetail.discountPrice"><em>现价:</em> ￥{{coursedetail.discountPrice}}</li>
                       
                        <li> <mu-button color="secondary">去购买</mu-button> </li>
                    </ul>
                </div>
            </div>
            <!--header end-->
            <div class="switch-tabs">
                <div class="tabs">
                    <!-- <span class="part active" @click="switchTo(0)"><a hidefocus="true">课程介绍</a></span>
                    <span class="part" @click="switchTo(1)"><a hidefocus="true">课程目录</a></span> -->
<mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  center>
    <mu-tab>课程介绍</mu-tab>
    <mu-tab>课程目录</mu-tab>
   
  </mu-tabs>
                </div>

                <div class=" slefsave">
                  
                        <div class="swiper-slide " v-if="active1 === 0">
                            <div class="content-slide">
                                <p>简介：在本课程中，老师带领大家认识Spring中的重要概念IoC，然后介绍如何对Spring Bean进行管理。</p>

                            </div>
                        </div>

                        <div class="swiper-slide" v-if="active1 === 1">
                            <div class="content-slide">
                                <div class="Cataloglist">
                                    <h3>
                                        第1章 node.js 调试入门
                                    </h3>
                                    <ul>
                                        <li><router-link to='/courseplay'><span class="play-btn"></span> 1-1 Inspector 介绍
                                                (13:00)</router-link></li>
                                        <li><a href="playpage.html"><span class="play-btn"></span> 1-1 Inspector 介绍
                                                (13:00)</a></li>
                                     
                                    </ul>
                                    <h3>
                                        第2章 node.js 调试入门
                                    </h3>
                                    <ul>
                                        <li><a href="playpage.html"><span class="play-btn"></span> 1-1 Inspector 介绍
                                                (13:00)</a></li>
                                        <li><a href="playpage.html"><span class="play-btn"></span> 1-1 Inspector 介绍
                                                (13:00)</a></li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                   
                </div>
            </div>
        </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      active1: 0,
      coursedetail:[]
    };
  },
  methods:{
       getCourseDetail(id){
 this.$http.get('cloud/course/getCourseInfoById?id='+id)
                        .then( (response)=> {
                          if(response.data.success){
                              this.coursedetail=response.data.data;
                          }else{
                             this.$router.go(-1);
                          }
                           
                           console.log( response.data.data);     
                        }).catch()
         },
  },
  mounted(){
       this.getCourseDetail(this.$route.params.cid)
      console.log(this.$route);
      
  }
}
</script>
<style scoped>
@import '../assets/css/coursedetail.css';

</style>