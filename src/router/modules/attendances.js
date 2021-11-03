import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  name: 'attendances',
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤管理', icon: 'skill' }
    }
  ]
}
