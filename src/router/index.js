import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')

  },

  {
    path: '/',
    name: 'layout',
    component: () => import('../views/layout/layout.vue'),
    children: [
      { // 默认子路由首页
        path: '',
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      { // 问答
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa/qa.vue')
      },
      { // 视频
        path: '/video',
        name: 'video',
        component: () => import('../views/video/video.vue')
      },
      { // 我的
        path: '/my',
        name: 'my',
        component: () => import('../views/my/my.vue')
      }
    ]
  }, {
    path: '/searc',
    name: 'searc',
    component: () => import('../views/search/search.vue')
  }, {
    path: '/article/:article_id',
    name: 'article',
    component: () => import('../views/article/index.vue'),
    props: true // 开启props传参
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('../views/user-profile/user-rinfo.vue')
    // props: true // 开启props传参
  }

]

const router = new VueRouter({
  routes
})

export default router
