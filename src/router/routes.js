import Vue from 'vue'
import Router from 'vue-router'
import Index from '+/Index'
import User from '+/User'
import UserProfile from '+/User/Profile'
import UserLibrary from '+/User/Library'
import Explore from '+/Explore'
import Media from '+/Media'
import Preferences from '+/Preferences'
import Bugs from '+/Bugs'
import Errors404 from '+/Errors/404'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/@:slug',
      component: User,
      children: [
        {
          path: '',
          name: 'Profile',
          component: UserProfile
        },
        {
          path: 'anime/:status',
          name: 'Anime Library',
          component: UserLibrary,
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
          component: UserLibrary,
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
      component: Explore,
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/anime/:slug',
      name: 'Anime',
      component: Media,
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/manga',
      name: 'Explore Manga',
      component: Explore,
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/manga/:slug',
      name: 'Manga',
      component: Media,
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/preferences',
      name: 'Preferences',
      component: Preferences
    },
    {
      path: '/bugs',
      name: 'Bugs',
      component: Bugs
    },
    {
      path: '*',
      name: '404',
      component: Errors404
    }
  ]
})
