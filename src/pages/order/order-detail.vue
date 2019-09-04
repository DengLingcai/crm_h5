<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">订单{{order.number}}</span>
        <span>{{order.statusValue}}</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>订单号</th>
          <td>{{order.number}}</td>
        </tr>
        <tr>
          <th>客户编号</th>
          <td>{{order.memberNumber}}</td>
        </tr>
        <tr>
          <th>客户名称</th>
          <td>{{order.memberName}}</td>
        </tr>
        <tr>
          <th>送达方</th>
          <td>{{order.kunwe}}</td>
        </tr>
        <tr>
          <th>订单类型</th>
          <td>{{order.auart}}</td>
        </tr>
        <tr>
          <th>合同编号</th>
          <td>{{order.contractNumber}}</td>
        </tr>
        <tr>
          <th>新建日期</th>
          <td>{{order.erdat}}</td>
        </tr>

        <tr>
          <th>请求交货日期</th><td>{{order.vdatu}}</td>
        </tr>
        <tr>
          <th>客户采购订单编号</th>
          <td>{{order.bstkd}}</td>
        </tr>

        <tr>
          <th>销售组织</th>
          <td>{{order.saleOrganizationKey}}-{{order.saleOrganizationValue}}</td>
        </tr>

        <tr>
          <th>分销渠道</th>
          <td>{{order.distributionChannelKey}}-{{order.distributionChannelValue}}</td>
        </tr>
        <tr>
          <th>付款条件</th>
          <td>{{order.payConditionKey}}-{{order.payConditionValue}}</td>
        </tr>
        <tr>
          <th>付款方式</th>
          <td>{{order.payWayKey}}-{{order.payWayValue}}</td>
        </tr>
        <tr>
          <th>凭证货币</th>
          <td>{{order.currencyKey}}-{{order.currencyValue}}</td>
        </tr>
        </tbody>
      </table>
    </div>
      <div class="ModuleContainer">
        <p class="newTitle">
          <span class="topModuleTitle">行项目</span>
        </p>
        <div class="tableList">
          <el-table :data="orderItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
            <el-table-column fixed="left" prop="lineNumber" label="行项目号"></el-table-column>
            <el-table-column prop="matnr" label="产品编号"></el-table-column>
            <el-table-column prop="arktx" label="产品名称"></el-table-column>
            <el-table-column prop="unit" label="销售单位"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="meins" label="基本单位"></el-table-column>
            <el-table-column prop="charg" label="批号"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="amount" label="小计"></el-table-column>
          </el-table>
        </div>
      </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">发货列表</span>
      </p>
      <div class="tableList">
        <el-table :data="invoices" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="number" label="发货单号"></el-table-column>
          <el-table-column prop="lineNumber" label="物流单号"></el-table-column>
          <el-table-column prop="memberName" label="客户名"></el-table-column>
          <el-table-column prop="memberNumber" label="客户编号"></el-table-column>
          <el-table-column prop="erdat" label="新建日期"></el-table-column>
          <el-table-column prop="orderNumber" label="订单行项目"></el-table-column>
          <el-table-column prop="materialNumber" label="产品编号"></el-table-column>
          <el-table-column prop="materialDesp" label="产品名称"></el-table-column>
          <el-table-column prop="quantity" label="交货数量"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="charg" label="批次号"></el-table-column>
          <el-table-column prop="saleGroupKey" label="销售组"></el-table-column>
          <el-table-column prop="distributionChannelValue" label="分销渠道"></el-table-column>
        </el-table>
      </div>
    </div>

  </div>

</template>

<script>

import {Indicator} from 'mint-ui'
import global from  '@/components/Global.vue'
export default {
  name: 'OrderDetail',
  props: {},
  data: function () {
    return {
      orderId: -1,
      order: {},
      invoices: [],
      orderItems: [],
      baseInfo: {},
      comments: '',
      headerCell:global.headerCell,
      cellStyle:global.cellStyle
    }
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.orderId = this.baseInfo.id
    this.loadDetail()
  },
  methods: {
    loadDetail () {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      // 订单详情
      this.$axios.get('/api/order/detail/' + this.orderId).then((rep) => {
        console.log(rep)
        this.order = rep.data
        this.invoices = rep.data.invoices
        this.orderItems = rep.data.orderItems
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },
    changeStatus () {
      console.log(this.orderId)
      this.loadDetail()
    }
  }
}
</script>

<style scoped>
</style>
