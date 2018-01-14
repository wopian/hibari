import Vue from 'vue'
import Router from 'vue-router'
import Index from '+/Index'
import User from '+/User'
import UserProfile from '+/User/Profile'
import UserLibrary from '+/User/Library'
import Explore from '+/Explore'
import Media from '+/Media'
import Groups from '+/Groups'
import ExploreGroups from '+/ExploreGroups'
import Preferences from '+/Preferences'
import Bugs from '+/Bugs'
import Errors404 from '+/Errors/404'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/@:slug',
      component: User,
      children: [
        {
          path: '',
          name: 'profile',
          component: UserProfile
        },
        {
          path: 'anime/:status',
          name: 'anime library',
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
          name: 'manga library',
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
      name: 'explore anime',
      component: Explore,
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/anime/:slug',
      name: 'anime',
      component: Media,
      meta: {
        type: 'anime'
      }
    },
    {
      path: '/manga',
      name: 'explore manga',
      component: Explore,
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/manga/:slug',
      name: 'manga',
      component: Media,
      meta: {
        type: 'manga'
      }
    },
    {
      path: '/groups',
      name: 'explore groups',
      component: ExploreGroups
    },
    {
      path: '/groups/:slug',
      name: 'groups',
      component: Groups
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: Preferences
    },
    {
      path: '/bugs',
      name: 'bugs',
      component: Bugs
    },
    {
      path: '*',
      name: '404',
      component: Errors404
    }
  ]
})
