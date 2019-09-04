<template>
  <div>
    <mt-datetime-picker
      ref="picker" @confirm="handleConfirm"
      type="date"
      v-model="date"
      year-format="{value} 年"
      month-format="{value} 月"
      :startDate="startDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>
    <!--<span>{{formatDate(date)}}</span>-->
    <!--<input v-on:click="openPicker"-->
    <!--type="button" :value="formatDate(date)">-->
    <button class="selectTime" v-on:click="openPicker">截止至<i class="el-icon-date" style="margin: 0 .2rem;"></i>{{formatDate(date)}}收款情况</button>

    <j-table title='月度货币收款统计' v-bind:url="currencyUrl" @currecnyClickFun="currencyDetail"
                       v-bind:colModels="currencyCols"  :fiexedTabaleNav="false">
    </j-table>
    <j-table v-if='currencyFactoryFlag' v-bind:title='currencyName' v-bind:url="currencyFactoryUrl"
             v-bind:colModels="currencyFactoryCols"  :fiexedTabaleNav="false" @currencyFactoryClickFun="currencyFactoryDetail">
    </j-table>
    <j-table v-if='factroyCountryFlag' v-bind:title='currencyName+"-"+factoryName' v-bind:url="factroyCountryUrl"
             v-bind:colModels="factoryCountryCols"  :fiexedTabaleNav="false" @currencyCountryClickFun="currencyCountryDetail">
    </j-table>
    <j-table v-if='operatorFLag' v-bind:title='currencyName+"-"+factoryName+"-"+countryName' v-bind:url="operatorUrl"
             v-bind:colModels="operatorCols" :fiexedTabaleNav="false" @operatorClickFun="operatorDetail">
    </j-table>

    <j-table v-if='memberFlag' v-bind:title='currencyName+"-"+factoryName+"-"+countryName+"-"+ operatorName' v-bind:url="memberUrl"
             v-bind:colModels="memberCols" :fiexedTabaleNav="false">
    </j-table>
  </div>
</template>

<script>

import JTable from '../../components/jtable/jtable.vue'
import DialogRepicker from '@/components/dialog-repicker/dialog-repicker'
import SelectRepicker from '@/components/select-repicker/select-repicker.vue'
import dateUtil from 'element-ui/src/utils/date'

export default {
  name: 'receipt-report-by-month',
  data: function () {
    return {
      currencyName: '',
      currency: '',
      factoryName: '',
      factory: '',
      operatorId: '',
      operatorName: '',
      countryName: '',
      currencyUrl: '',
      currencyFactoryUrl: '',
      currencyFactoryFlag: false,
      factroyCountryFlag: false,
      operatorFLag: false,
      memberFlag: false,
      currencyCols: Array,
      currencyFactoryCols: Array,
      factoryCountryCols: Array,
      operatorCols: Array,
      memberCols: Array,
      date: new Date(),
      year: '',
      month: '',
      factroyCountryUrl: '',
      operatorUrl: '',
      startDate: new Date(new Date().getFullYear() - 10 + '/12/12'),
      endDate: new Date(new Date().getFullYear() + 10 + '/12/12')
    }
  },

  created () {
    this.baseInfo = this.$route.query
    this.currencyCols = [
      {
        'field': 'currency',
        'label': '货币',
        'clickEvent': 'currecnyClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'currencyKey',
        'label': '货币',
        'hidden': true
      },
      {
        'field': 'amount',
        'label': '收款(万)'
      },
      {
        'field': 'backAmount',
        'label': '退款(万)'
      }
    ]
    this.currencyFactoryCols = [
      {
        'field': 'factroy',
        'label': '公司',
        'clickEvent': 'currencyFactoryClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'factroyKey',
        'label': '公司',
        'hidden': true
      },
      {
        'field': 'currency',
        'label': '货币'
      },
      {
        'field': 'amount',
        'label': '收款(万)'
      },
      {
        'field': 'backAmount',
        'label': '退款(万)'
      }
    ]
    this.factoryCountryCols = [
      {
        'field': 'country',
        'label': '部门',
        'clickEvent': 'currencyCountryClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'countryKey',
        'label': '部门',
        'hidden': true
      },
      {
        'field': 'currency',
        'label': '货币'
      },
      {
        'field': 'amount',
        'label': '收款(万)'
      },
      {
        'field': 'backAmount',
        'label': '退款(万)'
      }
    ]
    this.operatorCols = [
      {
        'field': 'arOperatorName',
        'label': '客户经理',
        'clickEvent': 'operatorClickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'arOperatorId',
        'label': '客户经理',
        'hidden': true
      },
      {
        'field': 'currency',
        'label': '货币'
      },
      {
        'field': 'amount',
        'label': '收款(万)'
      },
      {
        'field': 'backAmount',
        'label': '退款(万)'
      }
    ]
    this.memberCols = [
      {
        'field': 'abbreviation',
        'label': '客户'
      },
      {
        'field': 'currency',
        'label': '货币'
      },
      {
        'field': 'amount',
        'label': '收款(万)'
      },
      {
        'field': 'backAmount',
        'label': '退款(万)'
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
      this.currencyUrl = '/api/receipt-report/group-currency/' + this.year + '/' + this.month
      console.log(this.currencyUrl)
      this.currencyFactoryFlag = false
      this.factroyCountryFlag = false
      this.operatorFLag = false
      this.memberFlag = false
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
//      this.data = dateUtil.format(value, 'yyyy-MM')
      this.init()
    },
    getRoot () {
      let hostname = location.hostname
      let port = location.port
      let protocol = location.protocol
      return protocol + '//' + hostname + ':' + port
    },
    currencyDetail (id, fieldName, title, content) {
      this.currencyFactoryFlag = true
      this.factroyCountryFlag = false
      this.operatorFLag = false
      this.memberFlag = false
      this.currencyName = content[0]
      this.currency = content[1]
      this.currencyFactoryUrl = '/api/receipt-report/group-currency/' + this.year + '/' + this.month + '/' + this.currency
    },
    currencyFactoryDetail (id, fieldName, title, content) {
      this.currencyFactoryFlag = true
      this.factroyCountryFlag = true
      this.operatorFLag = false
      this.memberFlag = false
      this.factoryName = content[0]
      this.factory = content[1]
      this.factroyCountryUrl = '/api/receipt-report/group-currency-factory/' + this.year + '/' + this.month + '/' + this.currency + '/' + content[1]
    },
    currencyCountryDetail (id, fieldName, title, content) {
      this.currencyFactoryFlag = true
      this.factroyCountryFlag = true
      this.operatorFLag = true
      this.memberFlag = false
      this.countryName = content[0]
      this.operatorUrl = '/api/receipt-report/group-currency-country/' + this.year + '/' + this.month + '/' + this.currency + '/' + this.factory + '/' + content[1]
    },
    operatorDetail (id, fieldName, title, content) {
      console.log('-------------------')
      this.currencyFactoryFlag = true
      this.factroyCountryFlag = true
      this.operatorFLag = true
      this.memberFlag = true
      this.operatorName = content[0]
      this.operatorId = content[1]
      this.memberUrl = '/api/receipt-report/group-currency-member/' + this.year + '/' + this.month + '/' + this.currency + '/' + this.factory + '/' + content[1]
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
