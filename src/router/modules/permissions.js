import Layout from '@/layout'
export default {
  path: '/permissions',
  component: Layout,
  name: 'permissions',
  children: [
    {
      path: '',
      component: () => import('@/views/permissions'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
