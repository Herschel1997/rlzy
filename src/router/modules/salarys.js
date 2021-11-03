import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  name: 'salarys',
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资管理', icon: 'money' }
    }
  ]
}
