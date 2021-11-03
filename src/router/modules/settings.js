import Layout from '@/layout'
export default {
  path: '/settings',
  component: Layout,
  name: 'settings',
  children: [
    {
      path: '',
      component: () => import('@/views/settings'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
