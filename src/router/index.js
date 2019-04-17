import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const CoursePage = () => import('@/components/CoursePage')
const FreeCourse = () => import('@/components/FreeCourse')
const CourseDetail = () => import('@/components/CourseDetail')
const CoursePlay = () => import('@/components/CoursePlay')
const MyStudy = () => import('@/components/MyStudy')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/coursepage',
      name: 'CoursePage',
      component: CoursePage
    },
    {
      path: '/freecourse',
      name: 'FreeCourse',
      component: FreeCourse
    },
    {
      path: '/mystudy',
      name: 'MyStudy',
      component: MyStudy
    }
    ,
    {
      path: '/coursedetail',
      name: 'CourseDetail',
      component: CourseDetail
    }
    ,
    {
      path: '/courseplay',
      name: 'CoursePlay',
      component: CoursePlay
    }
  
  ],
  // scrollBehavior (to, from, savedPosition) {
  //     if (savedPosition) {        
  //           return savedPosition    
  //     } else {      
  //           if (from.meta.keepAlive) {        
  //                from.meta.savedPosition = document.body.scrollTop;      
  //           }        
  //           return { x: 0, y: to.meta.savedPosition || 100 }    
  //     }  
  //   }
  
})
