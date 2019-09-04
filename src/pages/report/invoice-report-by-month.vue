<template>
  <div>
    <mt-datetime-picker
      ref="picker" @confirm="handleConfirm"
      type="date"
      v-model="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>
    <!--<span>{{formatDate(date)}}</span>-->
    <!--<input v-on:click="openPicker"-->
           <!--type="button" :value="formatDate(date)">-->
    <button class="selectTime" v-on:click="openPicker">截止至<i class="el-icon-date" style="margin: 0 .2rem;"></i>{{formatDate(date)}}发货情况</button>

    <j-table title='月度工厂发货统计' v-bind:url="groupFactory" @factoryClickFun="factoryDetail"
             v-bind:colModels="factoryCols"  :fiexedTabaleNav="false">
    </j-table>

    <j-table title='月度产品发货统计' v-bind:url="materialUrl" @materialClickFun="materialDetail"
             v-bind:colModels="materialCols"  :fiexedTabaleNav="false">
    </j-table>

    <j-table title='月度工厂产品发货统计' v-bind:url="factoryMaterialUrl"
             v-bind:colModels="factoryMaterialCols"  :fiexedTabaleNav="false">
    </j-table>

    <j-table title='月度工厂等级发货统计' v-bind:url="factoryGradeUrl"
             v-bind:colModels="factoryGradeCols"  :fiexedTabaleNav="false">
    </j-table>

  </div>
</template>

<script>

import JTable from '../../components/jtable/jtable.vue'
import DialogRepicker from '@/components/dialog-repicker/dialog-repicker'
import SelectRepicker from '@/components/select-repicker/select-repicker.vue'
import dateUtil from 'element-ui/src/utils/date'

export default {
  name: 'invoice-report-by-month',
  data: function () {
    return {
      factoryCols: Array,
      materialCols: Array,
      factoryMaterialCols: Array,
      factoryGradeCols: Array,
      date: new Date(),
      year: '',
      month: '',
      groupFactory: '',
      materialUrl: '',
      factoryMaterialUrl: '',
      factoryGradeUrl: '',
      dateTmp: '',
      startDate: new Date(new Date().getFullYear() - 10 + '/12/12'),
      endDate: new Date(new Date().getFullYear() + 10 + '/12/12')
    }
  },

  created () {
    this.baseInfo = this.$route.query
    this.factoryCols = [
      {
        'field': 'factory',
        'label': '工厂',
        'clickEvent': 'factoryClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'quantity',
        'label': '出货(MW)'
      },
      {
        'field': 'backQuantity',
        'label': '退货(MW)'
      }
    ]
    this.materialCols = [
      {
        'field': 'material',
        'label': '产品类型',
        'clickEvent': 'materialClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'quantity',
        'label': '出货(MW)'
      },
      {
        'field': 'backQuantity',
        'label': '退货(MW)'
      }
    ]
    this.factoryMaterialCols = [
      {
        'field': 'factory',
        'label': '工厂'
      },
      {
        'field': 'material',
        'label': '产品类型'
      },
      {
        'field': 'quantity',
        'label': '出货(MW)'
      },
      {
        'field': 'backQuantity',
        'label': '退货(MW)'
      }
    ]
    this.factoryGradeCols = [
      {
        'field': 'factory',
        'label': '工厂'
      },
      {
        'field': 'grade',
        'label': '等级'
      },
      {
        'field': 'quantity',
        'label': '出货(MW)'
      },
      {
        'field': 'backQuantity',
        'label': '退货(MW)'
      }
    ]
  },
  mounted () {
    this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
    this.init()
  },

  methods: {
    init () {
      this.year = this.date.getFullYear()
      this.month = (this.date.getMonth() + 1)
      this.groupFactory = '/api/invoice-report/group-factory/' + this.year + '/' + this.month
      this.materialUrl = '/api/invoice-report/group-material/' + this.year + '/' + this.month
      this.factoryMaterialUrl = '/api/invoice-report/group-factory-material/' + this.year + '/' + this.month
      this.factoryGradeUrl = '/api/invoice-report/group-factory-grade/' + this.year + '/' + this.month
    },
    openPicker () {
      this.$refs.picker.open()
    },
    formatDate (dateStr) {
      let month = (dateStr.getMonth() + 1)
      if (month < 10) {
        month = '0' + '' + month
      }
      let day = dateStr.getDate()
      return dateStr.getFullYear() + '-' + month + '-' + day
    },
    handleConfirm (value) {
      console.log('-------------------------------')
      //this.date = dateUtil.format(value, 'yyyy-MM')
      this.init()
    },
    getRoot () {
      let hostname = location.hostname
      let port = location.port
      let protocol = location.protocol
      return protocol + '//' + hostname + ':' + port
    },
    factoryDetail (id, fieldName, title, content) {
      this.$router.push({path: '/invoice-report-by-month-factory?&token=' + this.baseInfo.token, query: {key: fieldName, type: 'werks'}})
    },
    materialDetail (id, fieldName, title, content) {
      let path = '/invoice-report-by-month-factory?token=' + this.baseInfo.token
      this.$router.push({path: path, query: {key: fieldName, type: 'material'}})
    }
  },
  components: {
    JTable,
    DialogRepicker,
    SelectRepicker
  }
}
</script>

<style scoped>
  .selectTime{
    width: 100%;
    background-color: #fff;
    border: 0;
    height: 40px;
  }
</style>
