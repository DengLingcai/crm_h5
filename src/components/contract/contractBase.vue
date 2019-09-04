<template>
  <div class="order-company-info">
    <div class="order-company-info">

      <div class="list-block media-list" v-if="contract.originalContractNumber">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="orderInfo">
                  <p class="newTitle">
                    <span class="topModuleTitle">补充协议</span>
                  </p>
                  <div class="list_table">
                    <table class="order-table" border="1" cellspacing="0">

                      <tr>
                        <td style="background: #eee;padding:1em;">补充协议</td>
                        <td style="white-space: normal;">{{contract.extendAgreement}}</td>
                      </tr>
                      <tr>
                        <td style="background: #eee;padding:1em;">原合同号</td>
                        <td>{{contract.originalContractNumber}}</td>
                      </tr>
                      <tr>
                        <td style="background: #eee">原合同处理</td>
                        <td v-if="contract.originalContractDeal=== 'O'">终止</td>
                        <td v-else>继续</td>
                      </tr>
                      <!--<tr>-->
                        <!--<td style="background: #eee">更新SAP</td>-->
                        <!--<td v-if="contract.commitSap">是</td>-->
                        <!--<td v-else>否</td>-->
                      <!--</tr>-->
                      <!--<tr>-->
                        <!--<td style="background: #eee;padding:1em;" >品质审批</td>-->
                        <!--<td v-if="contract.qualityApproval">是</td>-->
                        <!--<td v-else>否</td>-->
                      <!--</tr>-->
                      <!--<tr>-->
                        <!--<td style="background: #eee">PMC审批</td>-->
                        <!--<td v-if="contract.pmcApproval">是</td>-->
                        <!--<td v-else>否</td>-->
                      <!--</tr>-->

                    </table>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="list-block media-list">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="orderInfo">
                  <p class="newTitle">
                    <span class="topModuleTitle">基本信息</span>
                  </p>
                  <div class="list_table">
                    <table class="order-table" border="1" cellspacing="0">
                      <tr>
                        <td style="background: #eee;padding:1em;">销售组织</td>
                        <td>{{contract.saleOrganizationKey}}</td>
                        <td style="background: #eee">公司</td>
                        <td>{{contract.companyValue}}</td>
                      </tr>

                      <tr>
                        <td style="background: #eee">格式合同</td>
                        <td>{{contract.formContractValue}}</td>
                        <td style="background: #eee">合同类型</td>
                        <td>{{contract.typeValue}}</td>
                      </tr>
                      <tr>
                        <td style="background: #eee">业务模式</td>
                        <td>{{contract.bussinessValue}}</td>
                        <td style="background: #eee">分销渠道</td>
                        <td>{{contract.distributionChannelValue}}</td>
                      </tr>
                      <tr>
                        <td style="background: #eee">常规产品</td>
                        <td>{{contract.normalProductValue}}</td>
                        <td style="background: #eee">工厂</td>
                        <td>{{contract.factoryKey}}</td>
                      </tr>
                      <tr>
                        <td style="background: #eee">付款条件</td>
                        <td colspan="3">{{contract.payConditionValue}}</td>
                      </tr>
                      <tr>
                        <td style="background: #eee">付款方式</td>
                        <td colspan="3"><span v-for ="(c,index) in contract.contractPayConditions" v-bind:key="index">{{c.payConditionValue}}</span></td>
                      </tr>
                      <tr v-if="contract.autoBean.price && contract.businessRemark &&contract.businessRemark.length>0">
                        <td style="background: #eee">商务说明</td>
                        <td colspan="3" style="white-space: normal;font-weight:bold">{{contract.businessRemark}}</td>
                      </tr>
                      <tr v-if="contract.payRemark">
                        <td style="background: #eee">付款备注</td>
                        <td colspan="3">{{contract.payRemark}}</td>
                      </tr>
                      <tr v-if="isShowProfitForecasts && contract.profitForecast &&contract.profitForecast.length>0">
                        <td style="background: #eee">利润预测</td>
                        <td colspan="3" style="white-space: normal;font-weight:bold">{{contract.profitForecast}}</td>
                      </tr>
                    </table>
                    <br/>
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
export default {
  name: 'order-base',
  props: ['contract', 'isShowProfitForecasts'],
  data: function () {
    return {
      causeVisible: false,
      isShowModel: false,
      isShowCause: false
    }
  },
  mounted () {
    this.baseInfo = this.$route.query
  },
  computed: {
    allTotal: function () {
      return this.finalAmount
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
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
