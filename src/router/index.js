import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home')
const CoursePage = () => import('@/components/CoursePage')
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
      name: 'coursePage',
      component: CoursePage
    },
    {
      path: '/coursepage',
      name: 'coursePage',
      component: CoursePage
    },
    {
      path: '/mystudy',
      name: 'MyStudy',
      component: MyStudy
    }
  ]
})
