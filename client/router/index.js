import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Meta from 'vue-meta'
import Home from 'components/Home'
import User from 'components/User'
import Profile from 'components/user/Profile'
import Library from 'components/user/Library'
import Anime from 'components/Anime'
import Manga from 'components/Manga'
import E404 from 'components/404'

Vue.use(Router)
Vue.use(Resource)
Vue.use(Meta)

export default new Router({
  // mode: 'history',
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
    // 404 Page
    {
      path: '*',
      component: E404
    }
  ]
})
