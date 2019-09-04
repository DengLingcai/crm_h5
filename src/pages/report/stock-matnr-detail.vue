<template>
  <div>
    <syncDate ref="syncDate" :fkType="'STOCK_ITEM'" style="padding-top: .5rem"></syncDate>
    <div style="display: flex;width: calc(100% - .8rem);margin: auto;">
      <div style="font-size: .7rem;" @click="goToBack()">
        <el-button style="width: 95%;" size="mini" type="primary"><i class="el-icon-caret-left"></i>库存统计</el-button>
      </div>
      <el-select size="mini" v-model="address" @change="changeList($event)" placeholder="请选择" style="width: calc(80% - 0.8rem);">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

    </div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">{{addressId}}-{{addressId==2000?'浙江':'广东'}}工厂物料库存统计</span>
      </p>
      <template v-for="matnrDetail in matnrDetailList">
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
  import global from '@/components/Global.vue'
  import {Indicator, Toast} from 'mint-ui'
  import syncDate from '@/components/sync-date/sync-date.vue'
  export default {
    name: 'stock-matnr-detail',
    data: function () {
      return {
        headerCell: global.headerCell,
        cellStyle: global.cellStyle,
        matnrDetailList: [],
        options: [{ label: '浙江', value: 2000 }, { label: '广东', value: 1000 }],
        address:'浙江',
        addressId:2000,
      }
    },
    created() {
      this.baseInfo = this.$route.query
      this.reload()
      if(this.baseInfo.addressId){
        this.addressId = this.baseInfo.addressId
        if(this.baseInfo.addressId == 2000){
          this.address = '浙江'
        }else if(this.baseInfo.addressId == 1000){
          this.address = '广东'
        }
        this.checkAddressId()
      }
    },
    mounted() {
    },

    updated(){
      // setInterval(this.goAnchor('id'+this.baseInfo.position))
      // this.goAnchor('id'+this.baseInfo.position)
    },
    methods: {




      reload() {
        Indicator.open()
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        this.$axios.post('/api/stock/matnr-detail/'+ this.addressId, null).then((rep) => {
          this.matnrDetailList = rep.data
        Indicator.close()
      }, (err) => {
          Indicator.close()
          Toast.message('加载失败，请重试')
        })
      },
      numberFormat (row, column, cellValue) {
        if (cellValue != null) {
          var y = String(cellValue).indexOf(".") + 1;
          if(y > 0) {
            return cellValue.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
          }else{
            return cellValue.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
          }

        } else {
          return false
        }
      },
      goAnchor(selector) {
        document.querySelector('#'+selector).scrollIntoView(true)-100;
      },
      changeList(event){
        this.addressId = event
        this.checkAddressId()
        this.reload()
      },
      checkAddressId(){
        if(this.baseInfo.addressId === 1000){
          this.address = '广东'
        }
      },
      goToBack(){
        window.history.back();
      }
    },
    components: {
      syncDate
    }
  }
</script>

<style scoped>

  .arketSearch select, .arketSearch input {
    border: thin solid #ddd;
    width: 49%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    border-radius: 3px;
  }

  .arketSearch input {
    width: 75%;
  }

  .arketSearch .searchBtn {
    width: 60px;
    height: 30px;
    border-radius: 3px;
    background: #1893d5;
    color: #fff;
    border: none;
  }
</style>
