import Vue from 'vue'
import Router from 'vue-router'
import homeRoute from './homeRoute'
import categoryRoute from './categoryRoute'
import topicRoute from './topicRoute'
import cartRoute from './cartRoute'
import mineRoute from './mineRoute'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    homeRoute,
    categoryRoute,
    topicRoute,
    cartRoute,
    mineRoute,
    {
      path: '/',
      redirect: '/home'
    }
  ]
})