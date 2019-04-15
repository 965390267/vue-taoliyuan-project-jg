<template>
  <div>
    <div class="swiper_wrap" id="course-low-height">
      <!-- <div class="bk" style="background-image: url(&quot;//img1.sycdn.imooc.com/5c9229900001b4e616000540.jpg&quot;);"> -->
    </div>
    <div class="body">
            <div class="menu">
          <!-- <h1>年级分类</h1> -->
          <ul id="allClass">
            <li
              v-for="(item1,index) in courseLeavel"
              @mouseleave="reset()"
              @mouseenter="getleavel2(item1.id,item1.name,index)"
              :key="index"
            >
              <span>
                <a :class="{activecolor:isactiveColor==index}">{{item1.name}}</a>
              </span>

              <ol v-show="isactive==item1.id">
                <dl>
                  <dt>
                    <h2>
                    详细列表
                    </h2>
                  </dt>
                  <dd>
                    <p
                      v-for="(item2,index) in item1.child"
                      :key="index"
                      @click="getCourseList(item2.id)"
                    >{{item2.name}}</p>
                  
                  </dd>
                  <small>&nbsp;</small>
                </dl>
              </ol>
            </li>

            <div class="clear"></div>
          </ul>
        </div>
      <h3 class="types-title">
        <span class="tit-icon icon-shizhan-l tit-icon-l"></span>
        <span v-html="title"></span>

        <!-- <em>小</em>／<em>学</em>／<em>一</em>／<em>年</em>／<em>级</em> -->
        <span class="tit-icon icon-shizhan-r tit-icon-r"></span>
      </h3>
      <div class="clearfix types-content" id="save-padding-left">
    
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
      title: " <em>一</em>／<em>年</em>／<em>级</em>",
      filterimg: "1111",
      stage: [],
      courselist: [],
      isactive: -1,
      courseLeavel: [],
      isactiveColor:0
    };
  },
  methods: {
      reset(){
     this.isactive=-1;
      },

    getCourseList(name) {//根据年级获取课程
    this.isactive=-1;
      this.$http
        .get("cloud/course/getCoursesByGrade?grade=" + encodeURIComponent(name))
        .then(response => {
             this.courselist=response.data.data;
        })
        .catch();
    },

    getstage() {
      //获取学习阶段(小升初、初中、高中)
  let that=this;
      this.$http
        .get("cloud/level/getStage")
        .then(response => {
          if (response.data.success) {
            return response.data.data;
          }
        })
        .then(data => {
          var arr = [];
          let axiosList = [];
          data.map((item, index) => {
            arr.push(item);
            axiosList.push(
              this.$http.get("cloud/grade/getGradesByStage?stage=" + item.id)
            );
          });
          this.$http.all(axiosList).then(
            this.$http.spread(function(){
              //分别是请求的返回值
              for (let index = 0; index < arguments.length; index++) {
                arr[index].child = arguments[index].data.data;
              }
               that.courseLeavel = arr;
            })
          );
          //   this.courseLeavel = arr;
        })
        .catch();
    },
    getAllstage(id) {
      this.$http
        .get("cloud/course/getCoursesByStage?stage=" + id)
        .then(response => {
          this.courselist = response.data.data;
        })
        .catch();
    },
    getleavel2(id, name,index) {
        this.isactiveColor=index;
      var htmlTag = "";
      for (var index = 0; index < name.length; index++) {
        var char = name[index];
        htmlTag += "<em>" + char + "</em>／";
      }
      this.title = htmlTag;
      this.isactive = id;
    }
  },
  mounted() {
    //   this.getAllGrades();
    this.getstage();
    this.$nextTick(function(){

    })
   
  },beforeUpdate() {
    //    this.getCourseList(this.courseLeavel[0].child[0].name)
       console.log(this.courseLeavel);
  },
};
</script>
<style scoped>
@import "../assets/css/course.css";
@import "../assets/css/tabs.css";
.activecolor{
    color: rgb(221, 117, 117);
}
</style>
