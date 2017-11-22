import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('+/Dashboard' /* webpackChunkName: 'dashboard' */)
    },
    {
      path: '/@:slug',
      component: () => import('+/User' /* webpackChunkName: 'user' */),
      children: [
        {
          path: '',
          name: 'Profile',
          component: () => import('+/User/Profile' /* webpackChunkName: 'user' */)
        },
        {
          path: 'anime/:status',
          name: 'Anime Library',
          component: () => import('+/User/Library' /* webpackChunkName: 'library' */),
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
          component: () => import('+/User/Library' /* webpackChunkName: 'library' */),
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
      component: () => import('+/Explore' /* webpackChunkName: 'explore' */),
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/anime/:slug',
      name: 'Anime',
      component: () => import('+/Media' /* webpackChunkName: 'media' */),
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/manga',
      name: 'Explore Manga',
      component: () => import('+/Explore' /* webpackChunkName: 'explore' */),
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/manga/:slug',
      name: 'Manga',
      component: () => import('+/Media' /* webpackChunkName: 'media' */),
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/preferences',
      name: 'Preferences',
      component: () => import('+/Preferences' /* webpackChunkName: 'preferences' */)
    },
    {
      path: '/bugs',
      name: 'Bugs',
      component: () => import('+/Bugs' /* webpackChunkName: 'bugs' */)
    },
    {
      path: '*',
      name: '404',
      component: () => import('+/Errors/404' /* webpackChunkName: 'errors' */)
    }
  ]
})
