<template>
  <div>
    <j-table style="margin-bottom: 0" title='2000-浙江工厂库存统计' v-bind:url="'/api/stock/werk-summary/2000'" v-bind:colModels="matnrCols" v-bind:tips="' 统计单位：片'" @clickFun="stockWerksDetailZheJiang">
    </j-table>
    <syncDate ref="syncDate" :fkType="'STOCK_ITEM'"></syncDate>
    <div><a @click="stockDetail(2000)" style="text-decoration: underline;">点击查看浙江工厂所有物料库存明细</a></div>
    <div class="ModuleContainer orderInfo" v-if="matnrDetailListZheJiang.length">
      <p class="newTitle">
        <span class="topModuleTitle">2000-浙江工厂物料库存统计</span>
      </p>

      <template v-for="matnrDetail in matnrDetailListZheJiang">
        <div :id="'id'+ matnrDetail.matnr" style="padding-top: 15px;">
          <table class="details" style="margin-bottom: 0;">
            <tbody>
            <tr>
              <th>物料</th>
              <td>{{matnrDetail.matnr}} - {{matnrDetail.alias}}</td>
            </tr>
            <tr>
              <th>等级/档位</th>
              <td>{{matnrDetail.chargGrade}} / {{matnrDetail.atwrt}}</td>
            </tr>
            </tbody>
          </table>

          <div class="tableList">
            <el-table size="mini"
                      :data="matnrDetail.items"
                      style="width: 100%" :header-cell-style="headerCell" :cell-style="cellStyle">
              <el-table-column
                header-align="center"
                prop="efficiency"
                label="档位/膜色"
                width="105" fixed="left">
              </el-table-column>
              <el-table-column label="A" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoatingA"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoatingA"
                  label="返工库":formatter="numberFormat"
                  width="80">
                </el-table-column>
              </el-table-column>
              <el-table-column label="B" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoatingB"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoatingB"
                  label="返工库" :formatter="numberFormat">
                </el-table-column>
              </el-table-column>
              <el-table-column label="C" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoatingC"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoatingC"
                  label="返工库" :formatter="numberFormat">
                </el-table-column>
              </el-table-column>
              <el-table-column label="5" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoating5"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoating5"
                  label="返工库" :formatter="numberFormat">
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="subTotal"
                align="right"
                label="总计" :formatter="numberFormat">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </div>
    <j-table title='1000-广东工厂库存统计' v-bind:url="'/api/stock/werk-summary/1000'" v-bind:colModels="matnrCols" v-bind:tips="' 统计单位：片'" @clickFun="stockWerksDetailGuangDong">
    </j-table>
    <syncDate ref="syncDate" :fkType="'STOCK_ITEM'"></syncDate>
    <div><a @click="stockDetail(1000)" style="text-decoration: underline;">点击查看广东工厂所有物料库存明细</a></div>
    <div class="ModuleContainer orderInfo" v-if="matnrDetailListGuangDong.length">
      <p class="newTitle">
        <span class="topModuleTitle">1000-广东工厂物料库存统计</span>
      </p>

      <template v-for="matnrDetail in matnrDetailListGuangDong">
        <div :id="'id'+ matnrDetail.matnr" style="padding-top: 15px;">
          <table class="details" style="margin-bottom: 0;">
            <tbody>
            <tr>
              <th>物料</th>
              <td>{{matnrDetail.matnr}} - {{matnrDetail.alias}}</td>
            </tr>
            <tr>
              <th>等级/档位</th>
              <td>{{matnrDetail.chargGrade}} / {{matnrDetail.atwrt}}</td>
            </tr>
            </tbody>
          </table>

          <div class="tableList">
            <el-table size="mini"
                      :data="matnrDetail.items"
                      style="width: 100%" :header-cell-style="headerCell" :cell-style="cellStyle">
              <el-table-column
                header-align="center"
                prop="efficiency"
                label="档位/膜色"
                width="105" fixed="left">
              </el-table-column>
              <el-table-column label="A" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoatingA"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoatingA"
                  label="返工库":formatter="numberFormat"
                  width="80">
                </el-table-column>
              </el-table-column>
              <el-table-column label="B" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoatingB"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoatingB"
                  label="返工库" :formatter="numberFormat">
                </el-table-column>
              </el-table-column>
              <el-table-column label="C" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoatingC"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoatingC"
                  label="返工库" :formatter="numberFormat">
                </el-table-column>
              </el-table-column>
              <el-table-column label="5" header-align="center">
                <el-table-column
                  align="right"
                  prop="finishedCoating5"
                  label="成品库" :formatter="numberFormat">
                </el-table-column>
                <el-table-column
                  align="right"
                  prop="reworkCoating5"
                  label="返工库" :formatter="numberFormat">
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="subTotal"
                align="right"
                label="总计" :formatter="numberFormat">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import JTable from '../../components/jtable/jtable.vue'
import global from '@/components/Global.vue'
import {Indicator, Toast} from 'mint-ui'
import syncDate from '@/components/sync-date/sync-date.vue'
import DialogRepicker from '@/components/dialog-repicker/dialog-repicker'
import SelectRepicker from '@/components/select-repicker/select-repicker.vue'
import dateUtil from 'element-ui/src/utils/date'

export default {
  name: 'stock-werks-summary',
  data: function () {
    return {
      headerCell: global.headerCell,
      cellStyle: global.cellStyle,
      matnrDetailListZheJiang: [],
      matnrDetailListGuangDong: [],
      matnrCols: Array,
      position: '',
      baseInfo: ''
    }
  },

  created () {
    this.baseInfo = this.$route.query
    this.matnrCols = [
      {
        'field': 'matnr',
        'label': '料号',
        'clickEvent': 'clickFun',
        'tdTextColor': '#0894ec'
      },
      {
        'field': 'alias',
        'label': '名称',
        'tdTextAlign': 'left'
      },
      {
        'field': 'qtyGradeA',
        'label': 'A',
        'tdTextAlign': 'right'
      },
      {
        'field': 'qtyGradeB',
        'label': 'B',
        'tdTextAlign': 'right'
      },
      {
        'field': 'qtyGradeC',
        'label': 'C',
        'tdTextAlign': 'right'
      },
      {
        'field': 'qtyGradeO',
        'label': 'O',
        'tdTextAlign': 'right'
      },
      {
        'field': 'subTotal',
        'label': '小计',
        'tdTextAlign': 'right'
      }
    ]
  },
  mounted () {
    // this.$refs.syncDate.reload()
  },

  methods: {
    stockDetail (addressId) {
      // this.$router.push('/stock-matnr-detail?position='+ position+'&token=' + this.baseInfo.token)
      this.$router.push('/stock-matnr-detail?addressId=' + addressId + '&token=' + this.baseInfo.token)
    },
    stockWerksDetailZheJiang (i, matnr) {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.post('/api/stock/matnr-detail/' + 2000 + '/' + matnr, null).then((rep) => {
        this.matnrDetailListZheJiang = rep.data
        Indicator.close()
      }, (err) => {
        Indicator.close()
        Toast.message('加载失败，请重试')
      })
    },
    stockWerksDetailGuangDong (i, matnr) {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.post('/api/stock/matnr-detail/' + 1000 + '/' + matnr, null).then((rep) => {
        this.matnrDetailListGuangDong = rep.data
        Indicator.close()
      }, (err) => {
        Indicator.close()
        Toast.message('加载失败，请重试')
      })
    },
    numberFormat (row, column, cellValue) {
      if (cellValue != null) {
        var y = String(cellValue).indexOf('.') + 1
        if (y > 0) {
          return cellValue.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        } else {
          return cellValue.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        }
      } else {
        return false
      }
    }
  },
  components: {
    JTable,
    syncDate
  }
}
</script>

<style scoped>
  .selectTime {
    width: 100%;
    background-color: #fff;
    border: 0;
    height: 40px;
  }
</style>
