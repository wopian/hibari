import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from 'views/Home'
import User from 'views/User'
import Anime from 'views/Anime'
import Manga from 'views/Manga'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/@:id',
      name: 'User',
      component: User,
      children: [
        {
          path: 'library',
          name: 'Library',
          component: resolve => require(['../views/User'], resolve),
          children: [
            {
              path: ':status',
              component: resolve => require(['../views/User'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/anime/:query',
      component: Anime
    },
    {
      path: '/manga/:query',
      component: Manga
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
