<template>
<div class="home">
    <div class="body">
    
      <h3 class="types-title">
        <span class="tit-icon icon-shizhan-l tit-icon-l"></span>
        <!-- <span v-html="title"></span> -->

        <em>免</em>／<em>费</em>／<em>课</em>／<em>程</em>
        <span class="tit-icon icon-shizhan-r tit-icon-r"></span>
      </h3>
      <div class="clearfix types-content" >
       
        <div
          class="index-card-container course-card-container container"
          v-for="(item,index) in courselist"
          :key="index"
        >
          <router-link :to="{name:'CourseDetail',params:{cid:item.id}}" class="course-card">
            <div class="course-card-top hashadow">
              <img class="course-banner" v-lazy="item.cover">

              <div class="course-label">
                <label>Vue.js</label>
              </div>
            </div>
            <div class="course-card-content">
              <h3 class="course-card-name">{{item.name}}</h3>
              <div class="clearfix course-card-bottom">
                <div class="course-card-info">
                  <span>实战</span>
                  <span>中级</span>
                  <span>
                    <i class="icon-set_sns"></i>5148
                  </span>
                  <span class="course-star-box">
                    <i class="icon-star2 on"></i>
                    <i class="icon-star2 on"></i>
                    <i class="icon-star2 on"></i>
                    <i class="icon-star2 on"></i>
                    <i class="icon-star2 on"></i>
                  </span>
                </div>

                <div class="course-card-price sales">
                  ￥{{item.price}}
                  <span class="sales-tip">满减</span>
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
export default {
  data() {
    return {
      courselist: [],
    };
  },
  methods: {

    getCourseList() {//根据年级获取课程

      this.$http
        .get("cloud/course/getDiscountCourses")
        .then(response => {
             this.courselist=response.data.data;
        })
        .catch();
    },

  },
  mounted() {

    this.getCourseList();

  }
};
</script>
<style scoped>
@import "../assets/css/course.css";
.types-content{
    width: 80%;
    margin: 0 auto;
}
</style>
