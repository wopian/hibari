import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from '../views/Home'
import User from '../views/User'
import Anime from '../views/Anime'
import Manga from '../views/Manga'

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
      component: User
    },
    {
      path: '/anime/:slug',
      component: Anime
    },
    {
      path: '/manga/:slug',
      component: Manga
    }
  ]
})
