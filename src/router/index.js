import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: 'dashboard' */ '+/Dashboard')
    },
    {
      path: '/@:slug',
      component: () => import(/* webpackChunkName: 'user' */ '+/User'),
      children: [
        {
          path: '',
          name: 'Profile',
          component: () => import(/* webpackChunkName: 'user' */ '+/User/Profile')
        },
        {
          path: 'anime/:status',
          name: 'Anime Library',
          component: () => import(/* webpackChunkName: 'library' */ '+/User/Library'),
          meta: {
            type: 'anime'
          }
        },
        {
          path: 'anime',
          redirect: 'anime/all'
        },
        {
          path: 'manga/:status',
          name: 'Manga Library',
          component: () => import(/* webpackChunkName: 'library' */ '+/User/Library'),
          meta: {
            type: 'manga'
          }
        },
        {
          path: 'manga',
          redirect: 'manga/all'
        }
      ]
    },
    {
      path: '/anime',
      name: 'Explore Anime',
      component: () => import(/* webpackChunkName: 'explore' */ '+/Explore'),
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/anime/:slug',
      name: 'Anime',
      component: () => import(/* webpackChunkName: 'media' */ '+/Media'),
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/manga',
      name: 'Explore Manga',
      component: () => import(/* webpackChunkName: 'explore' */ '+/Explore'),
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/manga/:slug',
      name: 'Manga',
      component: () => import(/* webpackChunkName: 'media' */ '+/Media'),
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/preferences',
      name: 'Preferences',
      component: () => import(/* webpackChunkName: 'preferences' */ '+/Preferences')
    },
    {
      path: '/bugs',
      name: 'Bugs',
      component: () => import(/* webpackChunkName: 'bugs' */ '+/Bugs')
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: 'errors' */ '+/Errors/404')
    }
  ]
})
