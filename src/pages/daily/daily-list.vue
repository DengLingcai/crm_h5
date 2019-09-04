<template>
  <div>
    <j-table title='铁三角' url="/api/daily/page" :conditions="daliyConditions"
             v-bind:colModels="dailyCols" @dailyClickFun="dailyDetail">
    </j-table>
  </div>
</template>

<script>

import JTable from '../../components/jtable/jtable.vue'

export default {
  name: 'daily-list',
  data: function () {
    return {
      daliyConditions:Array,
      dailyCols: Array
    }
  },
  created () {
    this.baseInfo = this.$route.query
    this.daliyConditions = [
      {
        'label': '客户或CC3姓名',
        'option': 'LIKE_ANYWHERE',
        'field': 'createName-abbreviation'
      },
    ]
    this.dailyCols = [
      {
        'field': 'reportDate',
        'label': '日期',
        'clickEvent': 'dailyClickFun',
        'tdTextColor': '#0894ec',
        'sortable': true,
      },
      {
        'field': 'name',
        'label': '日报名称',
      },
       {
         'field': 'type',
         'label': '日报类型',
         'hidden': true
       },
      {
        'field': 'id',
        'label': 'ID',
        'hidden': true
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

    dailyDetail (id, value, field, content) {
      console.log(content)
      console.log(content[1])
      let typeUrl = 'ar-daily';
      if (content[2] === 'SR') {
        typeUrl = 'sr-daily';
      }
      if (content[2] === 'FR') {
        typeUrl = 'fr-daily';
      }
      document.location = this.getRoot() + '/#/'  + typeUrl + '?backtodo=1&id=' + id + '&token=' + this.baseInfo.token
    }
  },
  components: {
    JTable
  }
}
</script>

<style scoped>

</style>
