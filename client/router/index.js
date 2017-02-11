import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from 'views/Home'
import User from 'views/User'
import Profile from 'components/user/Profile'
import Library from 'components/user/Library'
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
      path: '/@:slug',
      component: User,
      children: [
        {
          path: '',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'library',
          name: 'Library',
          component: Library,
          children: [
            {
              path: ':status',
              component: Library
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
      path: '/:slug',
      redirect: '/@:slug'
    },
    {
      path: '/:slug/library',
      redirect: '/@:slug/library'
    },
    {
      path: '/:slug/library/:status',
      redirect: '/@:slug/library/:status'
    },
    {
      path: '*',
      component: resolve => require(['../views/404'], resolve)
    }
  ]
})
