<template>
  <j-table title='收款记录' v-bind:url="'/api/receipt/page'"
           v-bind:colModels="receiptCols" @contractClickFun="receiptDetail" :fiexedTabaleNav="false">
  </j-table>
</template>

<script>

  import JTable from '../../components/jtable/jtable.vue'
  export default {
    name: 'receipt-list',
    data: function () {
      return {
        receiptCols: Array
      }
    },
    components:{
      JTable
    },
    created (){
      this.baseInfo = this.$route.query
      this.receiptCols = [
        {
          'field': 'number',
          'label': '收款单号',
          'clickEvent': 'contractClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'member.abbreviation',
          'label': '客户名'
        },
        {
          'field': 'amount',
          'label': '收款金额'
        },
        {
          'field': 'typeDesp',
          'label': '收款类型'
        },
        {
          'field': 'receiptTypeValue',
          'label': '收款方式'
        },
        {
          'field': 'receiptDate',
          'label': '收款日期'
        },
        {
          'field': 'companyValue',
          'label': '公司代码'
        },
        {
          'field': 'currencyKey',
          'label': '货币'
        },
        {
          'field': 'statusDesp',
          'label': '状态'
        }
      ]
    },
    methods:{
      receiptDetail (id) {
        this.$router.push({path: '/receipt-detail?id='+ id + '&token=' + this.baseInfo.token})
      },
    }
  }
</script>

<style scoped>

</style>
