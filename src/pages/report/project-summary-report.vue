<template>

    <j-table title='工程汇总表' v-bind:url="'/api/dealer-plan/queryProjectSummaryByPager'"
             v-bind:colModels="retailClons"  :fiexedTabaleNav="false">
    </j-table>

</template>

<script>
  /**
   * 工程汇总报表
   */
  import JTable from '../../components/jtable/jtable.vue'

  export default {
    name: 'project-summary-report',
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
          'field': 'mouth',
          'label': '月份',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'area',
          'label': '区县',
          'clickEvent': 'contractClickFun',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'dealer_code',
          'label': '经销商',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'brand_name',
          'label': '品牌',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'specialtyStore',
          'label': '专卖店',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'effectiveOutlet',
          'label': '有效网点',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'classA',
          'label': 'A类',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'classB',
          'label': 'B类',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'classC',
          'label': 'C类',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'classD',
          'label': 'D类',
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
          'field': 'completionRate',
          'label': '完成率',
          'clickEvent': '',
          'tdTextColor': '#0894ec'
        },
        {
          'field': 'completion',
          'label': '完成量',
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
