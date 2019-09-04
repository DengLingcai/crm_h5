<template>
  <div>
    <div class="ModuleContainer">
      <div class="tableList" v-if="tableCtmTds">
        <el-table :data="tableCtmTds" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column prop="standardBoard" label="组件标板"></el-table-column>
          <el-table-column prop="putDate" label="投产日期"></el-table-column>
          <el-table-column prop="bom" label="投产BOM"></el-table-column>
          <el-table-column prop="businessTypeValue" label="业务类型"></el-table-column>
          <el-table-column prop="processType" label="组件工艺类型"></el-table-column>
          <el-table-column prop="productType" label="产品大类"></el-table-column>
          <el-table-column prop="finishedCode" label="成品编码"></el-table-column>
          <el-table-column prop="memberFactory" label="客户工厂"></el-table-column>
          <el-table-column prop="sapinvoiceNumber" label="交货单号"></el-table-column>
          <el-table-column prop="arrivalBatch" label="到货批次"></el-table-column>
          <el-table-column prop="batteryEfficient" label="电池效率"></el-table-column>
          <el-table-column prop="putCount" label="投产组件数量"></el-table-column>
          <el-table-column prop="boardtype" label="组件板型"></el-table-column>
          <el-table-column prop="theoryPower" label="理论功率"></el-table-column>
          <el-table-column prop="actualPower" label="实际功率"></el-table-column>
          <el-table-column prop="ctm" label="CTM"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script >

import AccessList from '@/components/access-list/access-list.vue'
import CommentDatails from '@/components/comment/commentDatails'

export default {
  name: 'TableCtmTds',
  data: function () {
    return {
      member: {},
      memberId: {},
      tableCtmTds:[],
      loginOperator: {},
      baseInfo: {}
    }
  },
  components: {
    AccessList,
    CommentDatails
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.memberId = this.baseInfo.id
    this.showComments = true
    this.$axios.defaults.headers.common.Authorization = this.baseInfo.token

    this.loadDetail()
  },
  methods: {
    adjustHeight () {
      return 'padding:8px 0'
    },
    loadDetail () {
      this.$axios.get('/api/member/find/' + this.memberId).then((rep) => {
        this.member = rep.data
        this.ctmMemberToday(this.member)
      }).catch(() => {}
      )
    },
    arDailyDetail (member) {
      this.$axios.get('/api/ctm-report/ctm-member-today', member).then((rep) => {
        this.tableCtmTds = rep.data
      }).catch(() => {}
      )
    },
    click (event) {
      console.log(event)
    },
    handleClick (tab, event) {
      console.log(tab)
      console.log(event)
    },
    deleteRow (value, data) {
      console.log(value)
      console.log(data)
    },
    intelligenceItemDetail (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
  body {
  background: #fff;
  }

  .card-cover {
  margin: 0;
  border-radius: 0;
  padding: 0 20px 20px;
  }

  .card-border {
  border-bottom: 2px solid #dddddd;
  }

  .is-active {
  border-bottom: 2px solid #dddddd;
  }

  .content-p {
    padding-left:10px;
    text-align: left;
  }
</style>
