import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import blog from '@/views/blog'
import about from '@/views/about'
import detail from '@/views/blogDetail'

import admin from '@/admin/index'

Vue.use(Router)

const vueRouter =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{ auto: false},
      children: [
        {
          path: 'blog',
          name: 'blog',
          component: blog
        },
        {
          path: 'about',
          name: 'about',
          component: about
        }
      ]
    },
    {
      path: '/blog/detail/:id',
      name: 'detail',
      component: detail,
      meta: { auto: false },
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: { auto: true },
      children: []
    }
  ]
})

vueRouter.beforeEach((toolbar, from, next)=> {
  if (toolbar.meta.auto) {
    if (sessionStorage.getItem('loginUser') === null){
      vueRouter.push({ name: 'Index' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default vueRouter
