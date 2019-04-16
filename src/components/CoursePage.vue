<template>
  <div>
    <div class="swiper_wrap" id="course-low-height">
      <!-- <div class="bk" style="background-image: url(&quot;//img1.sycdn.imooc.com/5c9229900001b4e616000540.jpg&quot;);"> -->
    </div>
    <div class="body">
    
      <h3 class="types-title">
        <span class="tit-icon icon-shizhan-l tit-icon-l"></span>
        <span v-html="title"></span>

        <!-- <em>小</em>／<em>学</em>／<em>一</em>／<em>年</em>／<em>级</em> -->
        <span class="tit-icon icon-shizhan-r tit-icon-r"></span>
      </h3>
      <div class="clearfix types-content" id="save-padding-left">
            <div class="menu">
          <!-- <h1>年级分类</h1> -->
          <ul id="allClass">
            <li
              v-for="(item1,index) in courseLeavel"
              @mouseleave="reset()"
              @mouseenter="setTitle(item1.id,item1.name,index)"
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
                      @click="getCourseList(item2.id,item2.name)"
                    >{{item2.name}}</p>
                  
                  </dd>
                  <small>&nbsp;</small>
                </dl>
              </ol>
            </li>

            <div class="clear"></div>
          </ul>
        </div>
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
      
    <mu-pagination raised circle :total="total" :current.sync="current"></mu-pagination>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total:0,
       current: 1,
      title: " <em>一</em>／<em>年</em>／<em>级</em>",
      filterimg: "1111",
      stage: [],
      courselist: [],
      isactive: -1,
      courseLeavel: [],
      isactiveColor:0,
      htmlTag:''
    };
  },
  methods: {
      reset(){
     this.isactive=0;

      },

    getCourseList(id,name) {//根据年级获取课程
    this.isactive=-1;
 if(name){
          for (var index = 0; index < name.length; index++) {
        var char = name[index];
        this.htmlTag += "<em>" + char + "</em>／";
      }
       this.title = this.htmlTag;
}
      
      this.$http
        .get("cloud/course/getCoursesByGrade?grade=" +id)
        .then(response => {
          if(response.data.success){
              this.courselist=response.data.data;
             this.total=Math.ceil((this.courselist.length)/6);

         
          }else{
            this.courselist=[];
          }
             
        })
        .catch();
    },

    getstage() {
      //获取学习阶段(小升初、初中、高中),通过两次请求构造出一个二级树形结构的数组对象以便以遍历两级菜单
  let that=this;
      this.$http
        .get("cloud/level/getStage")
        .then(response => {//取得年级
          if (response.data.success) {
            return response.data.data;
          }
        })
        .then(data => {
          var arr = [];
          let axiosList = [];
          data.map((item, index) => {
            arr.push(item);
            axiosList.push(//根据年级取到对应的详细的年级列表
              this.$http.get("cloud/grade/getGradesByStage?stage=" + item.id)
            );
          });
          this.$http.all(axiosList).then(//promise.all让请求的顺序按预期执行
            this.$http.spread(function(){
              //分别是请求的返回值
              for (let index = 0; index < arguments.length; index++) {
                arr[index].child = arguments[index].data.data;
              }
               that.courseLeavel = arr;
             
               
               that.getCourseList(that.courseLeavel[0].child[0].id);//初始化的时候取到第一个的值
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
    setTitle(id, name,index) {
        this.isactiveColor=index;
        this.htmlTag='';
      // var htmlTag = "";
      for (var index = 0; index < name.length; index++) {
        var char = name[index];
        this.htmlTag += "<em>" + char + "</em>／";
      }
      this.title = this.htmlTag;
      this.isactive = id;
    }
  },
  mounted() {

    this.getstage();

  }
};
</script>
<style scoped>
@import "../assets/css/course.css";
@import "../assets/css/tabs.css";
.activecolor{
    color: rgb(221, 117, 117);
}

.mu-pagination{
  justify-content: center;
  margin-top: 30px;
}
</style>
