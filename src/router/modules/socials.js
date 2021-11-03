import Layout from '@/layout'
export default {
  path: '/socials',
  component: Layout,
  name: 'socials',
  children: [
    {
      path: '',
      component: () => import('@/views/socials'),
      meta: { title: '社保管理', icon: 'table' }
    }
  ]
}
