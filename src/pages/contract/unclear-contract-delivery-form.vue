<template>
  <div>
    <j-table v-if="organizationColFlag" title='机构发货未清报表' v-bind:url="'/api/contract/delivery-unclear-organization'"
             v-bind:colModels="organizationCols" @organizationClickFun="organizationDetailDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table v-if="directorColFlag" title='客户经理发货未清报表' v-bind:url="directorUrl" idField="fkId"
             v-bind:colModels="directorCols" @directorClickFun="directorDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table v-if="memberColFlag" title='合同发货未清报表' v-bind:url="membeUrl" idField="fkId"
             v-bind:colModels="memberCols" @memberClickFun="memberDetail" :fiexedTabaleNav="false">
    </j-table>
    <j-table v-if="contractColFlag"  v-bind:title="contractName" v-bind:url="contractUrl" idField="fkId"
             v-bind:colModels="contractCols"  @planClickFun="planDetail" :fiexedTabaleNav="false" @orderClickFun="orderDetail">
    </j-table>
    <j-table v-if="orderFlag"  v-bind:title='orderName' v-bind:url="orderUrl"
             v-bind:colModels="orderCols"  :fiexedTabaleNav="false" >
    </j-table>
    <j-table v-if="planFlag"  v-bind:title='planName' v-bind:url="planUrl"
             v-bind:colModels="planCols"  :fiexedTabaleNav="false" >
    </j-table>

  </div>
</template>

<script>

import JTable from '../../components/jtable/jtable.vue'
import {Indicator} from 'mint-ui'

export default {
  name: 'unclear-contract-delivery-form',
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

      memberColFlag: false,
      memberUrl: '',
      memberName: '',

      contractColFlag: false,
      contractUrl: '',
      contractName: '',

      orderFlag: false,
      orderUrl: '',
      orderName: '',

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
        'field': 'totalAmount',
        'label': '合同总量(MW)'
      },
      {
        'field': 'totalDeliveryAmount',
        'label': '发货总量(MW)'
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
        'field': 'totalAmount',
        'label': '合同总量(MW)'
      },
      {
        'field': 'totalDeliveryAmount',
        'label': '发货总量(MW)'
      },
      {
        'field': 'finishingRate',
        'label': '完成率'
      }
    ]
    this.memberCols = [
      {
        'field': 'contractNumber',
        'label': '合同',
        'clickEvent': 'memberClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'abbrevation',
        'label': '客户'
      },
      {
        'field': 'totalAmount',
        'label': '合同总量(MW)'
      },
      {
        'field': 'totalDeliveryAmount',
        'label': '发货总量(MW)'
      },
      {
        'field': 'finishingRate',
        'label': '完成率'
      }
    ]
    this.contractCols = [
      {
        'field': 'crmNumber-contractLineNumber',
        'label': '合同行项目',
        'joiner': '/'
      },
      {
        'field': 'siliconCrystalValue',
        'label': '晶体'
      },
      {
        'field': 'mainGridValue',
        'label': '主栅'
      },
      {
        'field': 'conversionRate',
        'label': '转换率'
      },
      {
        'field': 'zwpc',
        'label': '片瓦转换值'
      },
      {
        'field': 'gradeKey',
        'label': '等级'
      },
      {
        'field': 'totalAmount',
        'label': '合同总量(MW)',
        'clickEvent': 'planClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'totalDeliveryAmount',
        'label': '发货总量(MW)',
        'clickEvent': 'orderClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'finishingRate',
        'label': '完成率'
      }
    ]
    this.orderCols = [
      {
        'field': 'orderNumber-orderLineNumber',
        'label': '订单',
        'joiner': '/'
      },
      {
        'field': 'siliconCrystalValue',
        'label': '晶体'
      },
      {
        'field': 'mainGridValue',
        'label': '主栅'
      },
      {
        'field': 'conversionRate',
        'label': '转换率'
      },
      {
        'field': 'zwpc',
        'label': '片瓦转换值'
      },
      {
        'field': 'gradeKey',
        'label': '等级'
      },
      {
        'field': 'totalAmount',
        'label': '订单总量(MW)'
      },
      {
        'field': 'totalDeliveryAmount',
        'label': '发货总量(MW)'
      },
      {
        'field': 'finishingRate',
        'label': '完成率'
      }
    ]
    this.planCols = [
      {
        'field': 'planDate',
        'label': '计划日期'
      },
      {
        'field': 'materialDesp',
        'label': '产品信息'
      },
      {
        'field': 'quantity',
        'label': '要货数(MW)'
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
      this.membeUrl = '/api/contract/delivery-unclear-operator'
      this.directorUrl = '/api/contract/delivery-unclear-total-operator'
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
        this.directorUrl = '/api/contract/delivery-unclear-total-operator/cn'
      } else {
        this.directorUrl = '/api/contract/delivery-unclear-total-operator/fo'
      }
      this.directorColFlag = true
      this.orderFlag = false
      this.planFlag = false
      this.memberColFlag = false
      this.contractColFlag = false
    },

    directorDetail (id, fieldName, title, content) {
      this.memberColFlag = true
      this.membeUrl = '/api/contract/delivery-unclear-operator/' + id
      this.orderFlag = false
      this.planFlag = false
      this.contractColFlag = false
    },

    memberDetail (id, fieldName, title, content) {
      this.contractColFlag = true
      this.contractUrl = '/api/contract/delivery-unclear-contract/' + id
      this.orderFlag = false
      this.planFlag = false
      this.contractName = fieldName + '的未清合同明细发货'
    },

    orderDetail (id, fieldName, title, content) {
      this.orderUrl = '/api/contract/delivery-unclear-item/' + id
      this.orderFlag = true
      this.planFlag = false
      this.orderName = content[0] + '的订单及发货'
    },
    planDetail (id, fieldName, title, content) {
      this.planUrl = '/api/contract/delivery-plan-by-contract-item/' + content[0]
      this.orderFlag = false
      this.planFlag = true
      this.planName = content[0] + '的发货计划'
    }
  },
  components: {
    JTable
  }
}
</script>

<style scoped>

</style>
