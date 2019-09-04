<template>

  <j-table title='计划完成率' v-bind:url="'/api/dealer-plan/querySummaryByPager'"
           v-bind:colModels="retailClons"  :fiexedTabaleNav="false">
  </j-table>

</template>

<script>
  /**
   * 计划完成率报表
   */

  import JTable from '../../components/jtable/jtable.vue'


  export default {
  name: 'plan-completion-rate',
    data: function () {
      return {
        retailClons: Array
      }
    },

    created () {
      this.baseInfo = this.$route.query

      this.retailClons = [
        {
          'field': 'provinceName',
          'label': '省份',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'dealerCount',
          'label': '经销商',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'dealerName',
          'label': '经销商名称',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'dealerType',
          'label': '分类',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'targetAmount',
          'label': '目标量',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'allMouthTarget',
          'label': '一月到当月合计目标量',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'mouthActualShipment',
          'label': '当月实际发货量',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'allMouthActualShipment',
          'label': '一月到当月实际发货量',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        }
      ]

    },
    mounted () {
      this.baseInfo = this.$route.query
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      console.log("1111111111111111"+this.getRoot())
    },
    methods: {
      getRoot () {
        let hostname = location.hostname
        let port = location.port
        let protocol = location.protocol
        return protocol + '//' + hostname + ':' + port
      },

    },
    components: {
      JTable
    }
}
</script>

<style scoped>

</style>
