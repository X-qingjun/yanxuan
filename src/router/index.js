import Vue from 'vue'
import Router from 'vue-router'
import homeRoute from './homeRoute'
import categroyRoute from './categroyRoute'
import cartRoute from './cartRoute'
import topicRoute from './topicRoute'
import mineRoute from './mineRoute'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    homeRoute,
    categroyRoute,
    cartRoute,
    topicRoute,
    mineRoute
  ]
})