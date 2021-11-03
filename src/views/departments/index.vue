<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card>
        <!-- 用了一个行列布局 -->
        <tree-tools :tree-node="company" :is-root="true" @addDept="addDept" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <tree-tools slot-scope="{ data }" :tree-node="data" @updateList="getDepartments" @editDept="editDept" @addDept="addDept" />
        </el-tree>
      </el-card>

    </div>
    <add-dept ref="add-dept" :tree-node="node" @updateList="getDepartments" />
  </div>
</template>

<script>
// 导入树形组件
import treeTools from './components/tree-tools.vue'
// 导入获取部门信息请求
import { getDepartments } from '@/api/departments'
// 导入树形处理部门方法
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Departments',
  components: { treeTools, AddDept },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      company: {},
      departs: [],
      node: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const { companyName, depts } = await getDepartments()
      this.company = { name: companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(depts, '') // 需要将其转化成树形结构
    },
    addDept(node) {
      this.node = node
      this.$refs['add-dept'].showDialog = true
    },
    editDept(node) {
      this.node = node
      this.$refs['add-dept'].showDialog = true
      this.$refs['add-dept'].getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
