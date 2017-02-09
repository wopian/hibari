import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/Home'], resolve)
    },
    {
      path: '/@:id',
      component: resolve => require(['../views/User'], resolve)
    },
    {
      path: '/anime/:slug',
      component: resolve => require(['../views/Anime'], resolve)
    },
    {
      path: '/manga/:slug',
      component: resolve => require(['../views/Manga'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['../views/404'], resolve)
    }
  ]
})
