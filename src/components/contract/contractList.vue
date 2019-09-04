<template>
  <div class="order-company-info">
    <div class="order-company-info">
      <div class="list-block media-list">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="orderInfo">
                  <p class="newTitle">
                    <span class="topModuleTitle">{{orderInfos.assortValue}}信息</span>
                  </p>
                  <div class="list_table">
                    <table class="order-table" border="1" cellspacing="0">
                      <tr v-for="(orderinfo,key) in orderInfos.values" :key="key">
                        <td>
                          <div style="display: flex;">
                            <img :src="pictureUrl" alt="" width="45px" height="45px">
                            <div class="production-info">
                              <p>晶体：{{orderinfo.siliconCrystalValue}}</p>
                              <p>主栅：{{orderinfo.mainGridValue}}</p>
                              <p>工艺：{{orderinfo.processValue}}</p>
                              <p>转化率：{{orderinfo.conversionRate}}
                                <span v-if="orderinfo.conversionRateEnd">-</br>{{orderinfo.conversionRateEnd}}</span>%
                                <span v-if="orderinfo.rateBool">及以上</span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p>等级：{{orderinfo.gradeValue}}</p>
                          <p class="orderWeight" v-if="orderinfo.unitValue ==='W' && orderinfo.quantity > 100000">数量：{{orderinfo.quantity/1000000| moneyFilter}}MW</p>
                          <p v-else>数量：{{orderinfo.quantity}} {{orderinfo.unitValue}}</p>
                          <p v-if="orderinfo.unitValue === 'PC'">MW量：{{orderinfo.quantity*orderinfo.zwpc/1000000| moneyFilter}}MW</p>
                          <p v-if="orderInfos.showPrice && !orderInfos.foreignTrade">价格单位：{{orderinfo.kpein}}{{orderinfo.unitValue}}</p>
                          <p v-if="orderInfos.showPrice && !orderInfos.foreignTrade" style="color: red;">价格：{{orderinfo.kpeinPrice}}&nbsp;{{orderInfos.currencyKey}}</p>
                          <p v-if="orderInfos.showPrice && orderInfos.foreignTrade" style="color: red;">FOB价：{{orderinfo.fobPrice}}&nbsp;{{orderInfos.currencyKey}}/W</p>
                          <p v-if="orderInfos.showPrice && orderInfos.foreignTrade && orderinfo.freight">运费：{{orderinfo.freight}}&nbsp;{{orderInfos.currencyKey}}/W</p>
                          <p v-if="orderInfos.showPrice && orderInfos.foreignTrade" style="color: red;">FOB本币：{{orderinfo.fobCurrency}}&nbsp;CNY/W</p>
                          <p v-if="orderInfos.showPrice && orderInfos.foreignTrade && orderinfo.commission" style="color: red;">佣金：{{orderinfo.commission}}&nbsp;{{orderInfos.currencyKey}}/W</p>
                          <p v-if="orderInfos.showPrice && orderInfos.foreignTrade">汇率：{{orderinfo.parities}}&nbsp;</p>
                          <p v-if="orderInfos.showPrice && orderinfo.remark">备注：{{orderinfo.remark}}&nbsp;</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="total haveSubmit" style="display: flex;">
                    <div class="total_price" v-if="orderInfos.showPrice">
                      <span style="font-size:14px">总计：</span><span style="font-size:14px">{{wearsSign}}{{orderInfos.totalAmount | moneyFilter}}万 &nbsp;{{orderInfos.currencyKey}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import defaultPicture from '../../assets/img/nophoto.png'

export default {
  name: 'order-list',
  props: ['orderInfos', 'wearsSign', 'contract'],
  data: function () {
    return {
      causeVisible: false,
      isShowModel: false,
      isShowCause: false,
      exportSale: false,
      value1: '',
      isConfirmPrice: true,
      cause: this.lowReason,
      optionGroups: [],
      tpTypeKey: false,
      fileList: [],
      fileLists: [],
      formData: '',
      attachmentList: '',
      baseInfo: '',
      pictureUrl: ''
    }
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.pictureUrl = defaultPicture
  },
  computed: {
    allTotal: function () {
      return this.finalAmount
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    upload () {
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.post('/api/operator/assist_list', this.formData).then((res) => {
        if (res && res.length > 0) {
          this.attachmentList.push(res[0])
          if (this.attachmentList.length === this.fileList.length) {
            console.log('一起上传')
            console.log(this.attachmentList)
          }
        }
      }).catch((err) => {
        console.log(err
        )
      })
    },
    success (file, fileList) {
      console.log(file, fileList)
    },
    before (file) {
      console.log(file)
    },
    change (file, fileList) {
      this.formData = new FormData()
      for (let i in fileList) {
        this.formData.append('file', fileList[i].raw)
        this.formData.append('fkType', 'DEFAULT')
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.post('/api/file/upload-multi', this.formData, config).then((res) => {
        console.log(res.data)
        this.$emit('uploadList', res.data)
        Toast('上传成功')
      }).catch((err) => {
        console.log(err
        )
      })
      this.$axios.get('/api/dict/list/express_company').then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err
        )
      })
    }
  },
  filters: {
    moneyFilter: function (value) {
      var realval = Number(value).toFixed(2)
      return Number(realval)
    }
  }
}
</script>

<style scoped>
  .list-block {
    margin: 0.5rem 0.6rem;
  }

  table tr td:nth-of-type(1) {
    overflow: hidden;
    position: relative;
    margin-left: 50%;
    border: none;
    padding: 0.3rem 0;
  }

  table tr td:nth-of-type(1) img {
    float: left;
    position: relative;
    transform: translateY(35%);
    margin: 0 0.5rem;
  }

  table tr td:nth-of-type(1) .production-info {
    text-align: left;
    float: left;
  }

  td p {
    margin: 0;
  }

  .order-table {
    font-size: 0.6rem;
  }

  .order-table td input {
    border: 1px solid #e5e5e5;
    text-align: center;
    height: 1.5rem;
  }

  .list-block ul {
    border-radius: 0.4rem;
  }

  .list-block .item-content {
    padding-left: 0;
  }

  .list-block .item-content .item-inner {
    background-image: none;
    padding: 0 0 0 0;
  }

  .order-infomation .item-inner {
    padding: 0.5rem 0.5rem !important;
  }

  table {
    width: 95%;
    margin: 0 auto;
    font-size: 0.4rem;
    color: #282828;
    text-align: center;
    border: none;
  }

  table tr, table td {
    border: none;
    border: 1px solid #e5e5e5;
  }

  table tr td:nth-of-type(2) p:nth-of-type(4) {
    color: red;
  }

  .order-table td button {
    color: #1F4C95;
  }

  .total {
    width: 93%;
    margin: 0.5rem;
    /*float: right;*/
    /*margin-right: 0.5rem;*/
  }

  .total span:nth-of-type(2) {
    color: red;
  }

  .orderInfo {
    text-align: left;
    margin-top: 0.5rem;
  }

  .order-info-icon {
    font-size: 0.8rem !important;
    margin: 0 0.5rem;
  }

  .orderInfo > p:nth-of-type(1) {
    font-size: 0.7rem;
    color: #282828;
    margin-bottom: 0.2rem;
  }

  .confirm {
    border: none;
    border-radius: 2px;
    margin: 0.2rem 0;
  }

  .waitConfirm {
    padding: 0.2rem;
    background-color: rgb(236, 103, 94);
  }

  .alreadyConfirm {
    padding: .1rem .3rem;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #000 !important;
    font-size: .6rem;
    font-weight: 500;
  }

  .disable {
    display: none;
  }

  .orderPrice {
    color: red;
  }

  .haveSubmit {
    justify-content: space-between;
    display: block;
  }

  .haveSubmit button {
    background-color: #26a2ff;
    color: #ffffff;
    border: 0;
    font-size: 0.7rem;
    border-radius: 4px;
    padding: 0.2rem 0.5rem 0.1rem 0.5rem;
  }

  .casue {
    width: 95%;
    margin: 0 0.44rem;
    padding-left: 0.5rem;
    border: 1px solid #e5e5e5;
    border-top: none;
    font-size: 0.6rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background-color: #F5F5F5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: -1px;
  }

  .casue span:nth-of-type(1) {
    /*margin-left: 0.3rem;*/
    color: #8E8E8E;
  }

  .casue span:nth-of-type(2) {
    /*margin-left: 0.3rem;*/
    color: #282828
  }

  .mint-popup-4 {
    width: 100%;
  }

  .total_price {
    font-size: 0.8rem;
    padding-left: 5px;
    text-align: right;
  }

  .list_table {
    overflow-x: scroll;
    margin: 0 0.3rem;
  }

  .order-table th, .order-table td {
    white-space: nowrap;
    padding: 0 0.5rem;
  }

  .clear {
    clear: both;
  }

  .btn {
    font-size: 0.5rem;
  }

  .backOrder {
    color: #ffffff;
    background-color: #ec675d !important;
  }

  .backtodo {
    text-align: right;
    padding: 19px;
    font-size: 13px;
    color: #0894ec;
    padding-bottom: 9px;
    padding-top: 0px;
  }
</style>
