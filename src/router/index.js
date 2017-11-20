import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/components/Dashboard')
    },
    {
      path: '/@:slug',
      component: () => import('@/components/User'),
      children: [
        {
          path: '',
          name: 'Profile',
          component: () => import('@/components/User')
        },
        {
          path: 'anime/:status',
          name: 'Anime Library',
          component: () => import('@/components/User/Library')
        },
        {
          path: 'anime',
          redirect: 'anime/all'
        },
        {
          path: 'manga/:status',
          name: 'Manga Library',
          component: () => import('@/components/User/Library')
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
      component: () => import('@/components/Explore'),
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/anime/:slug',
      name: 'Anime',
      component: () => import('@/components/Media'),
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/manga',
      name: 'Explore Manga',
      component: () => import('@/components/Explore'),
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/manga/:slug',
      name: 'Manga',
      component: () => import('@/components/Media'),
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/preferences',
      name: 'Preferences',
      component: () => import('@/components/Preferences')
    },
    {
      path: '/bugs',
      name: 'Bugs',
      component: () => import('@/components/Bugs')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/components/Errors/404')
    }
  ]
})
