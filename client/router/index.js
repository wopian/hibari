import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Home from 'components/Home'
import User from 'components/User'
import Profile from 'components/user/Profile'
import Library from 'components/user/Library'
import Anime from 'components/Anime'
import Manga from 'components/Manga'
import Bugs from 'components/Bugs'
import E404 from 'components/404'

Vue.use(Router)
Vue.use(Meta)

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
      path: '/anime/:slug',
      component: Anime
    },
    {
      path: '/manga/:slug',
      component: Manga
    },
    {
      path: '/bugs',
      name: 'Bugs',
      component: Bugs
    },
    // 404 Page
    {
      path: '*',
      component: E404
    }
  ]
})
