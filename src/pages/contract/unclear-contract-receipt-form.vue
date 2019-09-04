<template>
  <div>
    <j-table v-if="organizationColFlag" title='机构收款未清报表' v-bind:url="'/api/contract/receipt-unclear-organization'"
             v-bind:colModels="organizationCols" @organizationClickFun="organizationDetailDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table v-if="directorColFlag" title='客户经理收款未清报表' v-bind:url="directorUrl" idField="fkId"
             v-bind:colModels="directorCols" @directorClickFun="directorDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table v-if="memberColFlag" title='合同收款未清报表' v-bind:url="membeUrl" idField="fkId"
             v-bind:colModels="contractCols" @planClickFun="planDetail" :fiexedTabaleNav="false" @clearClickFun="clearDetail">
    </j-table>
    <!--<j-table v-if="contractColFlag"  v-bind:title="contractName" v-bind:url="contractUrl" idField="fkId"-->
             <!--v-bind:colModels="contractCols"  @planClickFun="planDetail" :fiexedTabaleNav="false" @clearClickFun="clearDetail">-->
    <!--</j-table>-->
    <j-table v-if="clearFlag"  v-bind:title='clearName' v-bind:url="clearUrl"
             v-bind:colModels="clearCols"  :fiexedTabaleNav="false" >
    </j-table>
    <j-table v-if="planFlag"  v-bind:title='planName' v-bind:url="planUrl"
             v-bind:colModels="planCols"  :fiexedTabaleNav="false" >
    </j-table>

  </div>
</template>

<script>
import {Indicator} from 'mint-ui'
import JTable from '../../components/jtable/jtable.vue'

export default {
  name: 'unclear-contract-receipt-form',
  data: function () {
    return {
      memberCols: Array,
      contractCols: Array,
      orderCols: Array,
      planCols: Array,
      directorCols: Array,
      organizationCols: Array,

      organizationColFlag: false,
      organizationUrl: '',
      organizationName: '',

      directorColFlag: false,
      directorUrl: '',
      directorName: '',

      contractColFlag: false,
      contractUrl: '',
      contractName: '',

      memberColFlag: false,
      memberUrl: '',
      memberName: '',

      clearFlag: false,
      clearUrl: '',
      clearName: '',

      planFlag: false,
      planUrl: '',
      planName: ''
    }
  },
  created () {
    this.baseInfo = this.$route.query
    this.organizationCols = [
      {
        'field': 'abbrevation',
        'label': '机构',
        'clickEvent': 'organizationClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'contractAmount',
        'label': '合同总额(万)'
      },
      {
        'field': 'remainingAmount',
        'label': '收款总额(万)'
      },
      {
        'field': 'finishingRate',
        'label': '完成率'
      }
    ]
    this.directorCols = [
      {
        'field': 'abbrevation',
        'label': '客户经理',
        'clickEvent': 'directorClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'contractAmount',
        'label': '合同总额(万)'
      },
      {
        'field': 'remainingAmount',
        'label': '收款总额(万)'
      },
      {
        'field': 'finishingRate',
        'label': '完成率'
      }
    ]
    this.memberCols = [
      {
        'field': 'abbrevation',
        'label': '客户',
        'clickEvent': 'memberClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'contractAmount',
        'label': '合同总额'
      },
      {
        'field': 'remainingAmount',
        'label': '已收金额'
      }
    ]
    this.contractCols = [
      {
        'field': 'crmNumber',
        'label': '合同'
      },
      {
        'field': 'totalAmount',
        'label': '合同总额(万)',
        'clickEvent': 'planClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'clearAmount',
        'label': '已收总额(万)',
        'clickEvent': 'clearClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'finishingRate',
        'label': '完成率'
      }
    ]
    this.clearCols = [
      {
        'field': 'date',
        'label': '收款日期'
      },
      {
        'field': 'receiptType',
        'label': '收款方式'
      },
      {
        'field': 'amount',
        'label': '收款金额(万)'
      },
      {
        'field': 'status',
        'label': '状态'
      }
    ]
    this.planCols = [
      {
        'field': 'planDate',
        'label': '计划日期'
      },
      {
        'field': 'amount',
        'label': '收款金额(万)'
      },
      {
        'field': 'payConditionValue',
        'label': '付款方式'
      }
    ]
  },
  mounted () {
    Indicator.open()
    this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
    this.$axios.get('/api/contract/login-unclear-flag').then((rep) => {
      this.organizationColFlag = rep.data.organizationColFlag
      this.directorColFlag = rep.data.directorColFlag
      this.memberColFlag = rep.data.memberColFlag
      this.membeUrl = '/api/contract/receipt-unclear-operator'
      this.directorUrl = '/api/contract/receipt-unclear-total-operator'
      Indicator.close()
    }).catch(() => {
      Indicator.close()
    })
  },
  methods: {
    getRoot () {
      let hostname = location.hostname
      let port = location.port
      let protocol = location.protocol
      return protocol + '//' + hostname + ':' + port
    },

    organizationDetailDetail (id, fieldName, title, content) {
      if (fieldName === '国内销售部') {
        this.directorUrl = '/api/contract/receipt-unclear-total-operator/cn'
      } else {
        this.directorUrl = '/api/contract/receipt-unclear-total-operator/fo'
      }
      this.directorColFlag = true
      this.clearFlag = false
      this.planFlag = false
      this.memberColFlag = false
      this.contractColFlag = false
    },

    directorDetail (id, fieldName, title, content) {
      this.memberColFlag = true
      this.membeUrl = '/api/contract/receipt-unclear-operator/' + id
      this.clearFlag = false
      this.planFlag = false
      this.contractColFlag = false
    },

    memberDetail (id, fieldValue) {
      this.contractColFlag = true
      this.contractUrl = '/api/contract/receipt-unclear-member/' + id
      this.clearFlag = false
      this.planFlag = false
      this.contractName = fieldValue + '的未清合同收款'
    },

    clearDetail (id, fieldName, title, content) {
      this.clearUrl = '/api/contract/receipt-unclear-item/' + id
      this.clearFlag = true
      this.planFlag = false
      this.clearName = content[0] + '的合同收款'
    },

    planDetail (id, fieldName, title, content) {
      this.planUrl = '/api/contract/receipt-unclear-plan/' + id
      this.clearFlag = false
      this.planFlag = true
      this.planName = content[0] + '的收款计划'
    }
  },
  components: {
    JTable
  }
}
</script>

<style scoped>

</style>
