import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 路由映射对象的配置信息
 * Note: sub-menu only appear when route children.length >= 1
 * 显示下拉菜单的话，必须要求子级元素至少有1个
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则不显示在系统侧边菜单栏，默认为false，表示显示在侧边栏
 * alwaysShow: true               如果设置为true，将会一直显示在根级菜单
 *                                    如果没有设置alwaysShow，当item有多个子路由时，
 *                                    它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             路由的名称，必须要给！ 因为组件缓存需要路由的name
 * 元信息
 * meta : {
    roles: ['admin','editor']    角色信息，用于权限控制
    title: 'title'               显示在菜单栏上面的文字和面包屑上面的文字
    icon: 'svg-name'/'el-icon-x' 显示在侧边菜单栏上面的图标内容
    breadcrumb: false            如果设置为false，将不会显示在面包屑上面  (默认为true，表示显示)
    activeMenu: '/example/list'  侧边栏菜单高亮的菜单对应的路由
  }
 */

// 导入动态路由(业务路由)
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionsRouter from './modules/permissions'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingsRouter from './modules/settings'
import socialsRouter from './modules/socials'

// 动态路由(会根据权限来进行判断)
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionsRouter,
  attendancesRouter,
  salarysRouter,
  settingsRouter,
  socialsRouter
]

// 静态路由(所有人都可以看到的，不需要权限判断的)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true, // 隐藏在左侧菜单中
    children: [{
      path: '', // 二级路由path什么都不写 表示二级默认路由
      component: () => import('@/views/import')
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 创建路由实例的方法
const createRouter = () => new Router({
  // mode: 'history', // mode表示路由的模式，默认为hash模式，如果设置成history需要服务器端的支持(上线)
  scrollBehavior: () => ({ y: 0 }), // 滚动条的控制，打开新界面，滚动会顶部
  // 路由映射  =  静态路由 + 动态路由
  routes: [...constantRoutes, ...asyncRoutes]
})
const router = createRouter()

// 重置路由实例对象
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// 暴露
export default router
