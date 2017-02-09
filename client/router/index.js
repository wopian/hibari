import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from '../views/Home'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/@:id',
      component: resolve => require(['../views/User'], resolve),
      children: [
        {
          path: 'library',
          redirect: '/@:id',
          children: [
            {
              path: ':status',
              redirect: '/@:id'
            }
          ]
        }
      ]
    },
    {
      path: '/anime/:slug',
      component: resolve => require(['../views/Anime'], resolve)
    },
    {
      path: '/manga/:slug',
      component: resolve => require(['../views/Manga'], resolve)
    },
    // Legacy redirects for 2014-2016 Hibari
    {
      path: '/:id',
      redirect: '/@:id'
    },
    {
      path: '/:id/library',
      redirect: '/@:id'
    },
    {
      path: '/:id/library/:status',
      redirect: '/@:id'
    },
    {
      path: '*',
      component: resolve => require(['../views/404'], resolve)
    }
  ]
})
