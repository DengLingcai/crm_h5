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
    <button class="selectTime" v-on:click="openPicker">
      <span style="font-size: 0.6rem;line-height: 24.8px;color: #26a2ff;margin: 0;position: absolute;left: .4rem;" href="#"  @click="toBack()">
        <i class="el-icon-caret-left"></i>
        <span>返回</span>
      </span>
      截止至<i class="el-icon-date" style="margin: 0 .2rem;"></i>{{formatDate(date)}}发货情况</button>

    <j-table v-bind:title='factoryName' v-bind:url="factoryCountryUrl" v-if='factoryFLag' v-bind:fixedRules="detailRules"
             v-bind:colModels="factoryCountryCols"  :fiexedTabaleNav="false" @currencyCountryClickFun="currencyCountryDetail">
    </j-table>

    <j-table v-if='operatorFLag' v-bind:title='factoryName +"-"+countryName' v-bind:url="operatorUrl" v-bind:fixedRules="detailRules"
             v-bind:colModels="operatorCols"  :fiexedTabaleNav="false" @operatorClickFun="operatorDetail">
    </j-table>

    <j-table v-if='memberFlag' v-bind:title='factoryName+"-"+countryName+"-"+ operatorName' v-bind:url="memberUrl"
             v-bind:colModels="memberCols" :fiexedTabaleNav="false" v-bind:fixedRules="detailRules">
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
      factoryCountryCols: Array,
      operatorId: '',
      operatorName: '',
      countryName: '',
      countryCode: '',
      factoryName: '',
      factoryCode: '',
      type: '',
      factoryCountryUrl: '',
      detailRules: [],
      date: new Date(),
      dateTmp: '',
      startDate: new Date(new Date().getFullYear() - 10 + '/12/12'),
      endDate: new Date(new Date().getFullYear() + 10 + '/12/12'),
      operatorFLag: false,
      memberFlag: false,
      operatorCols: Array,
      memberCols: Array,
      factoryFLag: false
    }
  },

  created () {
    this.baseInfo = this.$route.query
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
        'field': 'quantity',
        'label': '出货(MW)'
      },
      {
        'field': 'backQuantity',
        'label': '退货(MW)'
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
        'field': 'quantity',
        'label': '出货(MW)'
      },
      {
        'field': 'backQuantity',
        'label': '退货(MW)'
      }
    ]
    this.memberCols = [
      {
        'field': 'abbreviation',
        'label': '客户'
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
    this.factoryName = this.baseInfo.key
    this.type = this.baseInfo.type
    console.log(this.baseInfo)
    console.log(this.baseInfo.type)
    console.log(this.baseInfo.factoryName)
    if (this.type === 'material') {
      this.factoryCode = this.factoryName
    } else {
      if (this.factoryName === '广东') {
        this.factoryCode = '1000'
      } else if (this.factoryName === '浙江') {
        this.factoryCode = '2000'
      } else {
        this.factoryCode = '5000'
      }
    }
    this.detailRules = [
      {
        'field': this.factoryCode
      }
    ]
    this.factoryFLag = true
    this.operatorFLag = false
    this.memberFlag = false
    this.init()
  },

  methods: {
    init () {
      this.year = this.date.getFullYear()
      this.month = (this.date.getMonth() + 1)
      this.factoryCountryUrl = '/api/invoice-report/group-type-country/' + this.year + '/' + this.month + '/' + this.type
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
      this.init()
    },
    getRoot () {
      let hostname = location.hostname
      let port = location.port
      let protocol = location.protocol
      return protocol + '//' + hostname + ':' + port
    },
    currencyCountryDetail (id, fieldName, title, content) {
      this.operatorFLag = true
      this.memberFlag = false
      this.countryName = content[0]
      this.countryCode = content[1]
      this.operatorUrl = '/api/invoice-report/group-type-operator/' + this.year + '/' + this.month + '/' + this.type + '/' + content[1]
    },
    operatorDetail (id, fieldName, title, content) {
      this.operatorFLag = true
      this.memberFlag = true
      this.operatorName = content[0]
      this.operatorId = content[1]
      this.memberUrl = '/api/invoice-report/group-type-member/' + this.year + '/' + this.month + '/' + this.type + '/' + this.countryCode + '/' + content[1]
    },
    toBack(){
      window.history.back();  //返回上一页
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
