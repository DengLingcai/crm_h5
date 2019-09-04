<template>
  <div>
    <j-table title='销售合同' v-bind:url="'/api/work-flow/handled-contract'"
             v-bind:colModels="contractCols" @contractClickFun="contractDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table title='送样申请' v-bind:url="'/api/work-flow/handled-sample'"
             v-bind:colModels="sampleCols" @sampleClickFun="sampleDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table title='市场活动' v-bind:url="'/api/work-flow/handled-market-activity'"
             v-bind:colModels="activityCols" @activityClickFun="activityDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table title='线索' v-bind:url="'/api/work-flow/handled-clue'"
             v-bind:colModels="clueCols"  :fiexedTabaleNav="false" @clueClickFun="clueDetail">
    </j-table>
    <j-table title='商机' v-bind:url="'/api/work-flow/handled-business-chance'"
             v-bind:colModels="businessChanceCols" @businessChanceClickFun="businessChanceDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table title='报价' v-bind:url="'/api/work-flow/handled-quoted-price'"
             v-bind:colModels="quotedPriceCols" @quotedPriceClickFun="quotedPriceDetail" :fiexedTabaleNav="false">
    </j-table>
  </div>
</template>

<script>

  import JTable from '../../components/jtable/jtable.vue'

  export default {
    name: 'established-process',
    data: function () {
      return {
        activityCols: Array,
        clueCols: Array,
        businessChanceCols: Array,
        quotedPriceCols: Array,
        sampleCols: Array,
        contractCols: Array
      }
    },
    created () {
      this.baseInfo = this.$route.query

      this.contractCols = [
        {
          'field': 'crmNumber',
          'label': '编号',
          'clickEvent': 'contractClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'name',
          'label': '名称'
        },
        {
          'field': 'abbreviation',
          'label': '客户'
        },
        {
          'field': 'statusDesp',
          'label': '合同状态'
        },
        {
          'field': 'totalAmount',
          'label': '合同金额'
        },
        {
          'field': 'companyValue',
          'label': '公司'
        },
        {
          'field': 'operatorName',
          'label': '负责人'
        },
        {
          'field': 'fillStatusDesp',
          'label': '交付审批状态'
        },
        {
          'field': 'businessStatusDesp',
          'label': '商务审批状态'
        },
        {
          'field': 'collectStatusDesp',
          'label': '最终审批状态'
        }
      ]
      this.sampleCols = [
        {
          'field': 'sampleNum',
          'label': '编号',
          'clickEvent': 'sampleClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'title',
          'label': '标题'
        },
        {
          'field': 'member.abbreviation',
          'label': '客户'
        },
        {
          'field': 'sampleTypeValue',
          'label': '送样类型'
        },
        {
          'field': 'approvalStatusDesp',
          'label': '审批状态'
        }
      ]
      this.activityCols = [
        {
          'field': 'title',
          'label': '名称',
          'clickEvent': 'activityClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'activityTypeValue',
          'label': '活动类型'
        },
        {
          'field': 'beginDate',
          'label': '开始日期'
        },
        {
          'field': 'endDate',
          'label': '结束日期'
        },
        {
          'field': 'department.name',
          'label': '负责部门'
        },
        {
          'field': 'operator.name',
          'label': '负责人'
        }
      ]
      this.clueCols = [
        {
          'field': 'title',
          'label': '标题',
          'clickEvent': 'clueClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'resourceValue',
          'label': '来源'
        },
        {
          'field': 'memberContactor',
          'label': '联系人'
        },
        {
          'field': 'approvalStatusDesp',
          'label': '审批状态'
        }
      ]
      this.businessChanceCols = [
        {
          'field': 'title',
          'label': '名称',
          'clickEvent': 'businessChanceClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'abbreviation',
          'label': '客户'
        },
        {
          'field': 'typeValue',
          'label': '类型'
        },
        {
          'field': 'customerContact',
          'label': '联系人'
        },
        {
          'field': 'principalName',
          'label': '负责人'
        },
        {
          'field': 'submitDate',
          'label': '商机日期'
        }
      ]
      this.quotedPriceCols = [
        {
          'field': 'member.abbreviation',
          'label': '客户',
          'clickEvent': 'quotedPriceClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'amount',
          'label': '报价金额'
        },
        {
          'field': 'conditionValue',
          'label': '付款条件'
        },
        {
          'field': 'member.arOperatorName',
          'label': 'AR'
        },
        {
          'field': 'beginDate',
          'label': '开始日期'
        },
        {
          'field': 'endDate',
          'label': '结束日期'
        }
      ]
    },
    mounted () {
    },
    methods: {
      getRoot () {
        let hostname = location.hostname
        let port = location.port
        let protocol = location.protocol
        return protocol + '//' + hostname + ':' + port
      },

      activityDetail (id) {
        let BASE_URL = this.getRoot()
             document.location = BASE_URL  + '/market-activity-detail?backtodo=1&id=' + id + '&token=' + this.baseInfo.token
      },
      clueDetail (id) {
        let BASE_URL = this.getRoot()
        document.location = BASE_URL + '/clue-detail?fromToDo=1&id=' + id + '&token=' + this.baseInfo.token
      },
      businessChanceDetail (id) {
        let BASE_URL = this.getRoot()
        document.location = BASE_URL + '/#/business-chance-detail?fromToDo=1&id=' + id + '&token=' + this.baseInfo.token
      },
      quotedPriceDetail (id) {
        let BASE_URL = this.getRoot()
        document.location = BASE_URL + '/#/quoted-price-detail?backtodo=1&id=' + id + '&token=' + this.baseInfo.token
      },
      contractDetail (id) {
        let BASE_URL = this.getRoot()
        document.location = BASE_URL + '/#/contract-details?fromToDo=1&id=' + id + '&token=' + this.baseInfo.token
      },
      sampleDetail (id) {
        let BASE_URL = this.getRoot()
        document.location = BASE_URL + '/#/sample-detail?fromToDo=1&id=' + id + '&token=' + this.baseInfo.token
      }
    },
    components: {
      JTable
    }
  }
</script>

<style scoped>

</style>
