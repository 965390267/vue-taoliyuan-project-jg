import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/view/Home')
const CoursePage = () => import('@/view/CoursePage')
const FreeCourse = () => import('@/view/FreeCourse')
const CourseDetail = () => import('@/view/CourseDetail')
const CoursePlay = () => import('@/view/CoursePlay')
const MyStudy = () => import('@/view/MyStudy')

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
    },
    {
      path: '*',
      component: Home
    }],
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
