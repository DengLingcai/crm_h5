<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">门店详情</span>
      </p>
      <table class="details">
        <tbody>
        <tr>
          <th>省份</th>
          <td>{{storeData.provinceName}}</td>
        </tr>
        <tr>
          <th>地区</th>
          <td>{{storeData.city == null ? "" : storeData.city.cityName}}</td>
        </tr>
        <tr>
          <th>区县</th>
          <td>{{storeData.area == null ? "" : storeData.area.areaName}}</td>
        </tr>
        <tr>
          <th>经营品牌</th>
          <td>{{storeData.brandName}}</td>
        </tr>
        <tr>
          <th>经销商法人</th>
          <td>{{storeData.legalPerson}}</td>
        </tr>
        <tr>
          <th>对公户</th>
          <td>{{storeData.forPublicHouseholds}}</td>
        </tr>
        <tr>
          <th>客户</th>
          <td>{{storeData.customerName}}</td>
        </tr>
        <tr>
          <th>联系电话</th>
          <td>{{storeData.contactNumber}}</td>
        </tr>
        <tr>
          <th>传真号码</th>
          <td>{{storeData.faxNumber}}</td>
        </tr>
        <tr>
          <th>售后电话</th>
          <td>{{storeData.afterSalesCall}}</td>
        </tr>
        <tr>
          <th>门店的名称</th>
          <td>{{storeData.storeName}}</td>
        </tr>
        <tr>
          <th>店面地址</th>
          <td>{{storeData.storeAddress}}</td>
        </tr>
        <tr>
          <th>是否专卖</th>
          <td>{{storeData.whetherToMonopolize == true ? "是" : "否" }}</td>
        </tr>
        <tr>
          <th>店面面积</th>
          <td>{{storeData.storeArea}}</td>
        </tr>
        <tr>
          <th>样品门数量</th>
          <td>{{storeData.numberOfSampleDoors}}</td>
        </tr>
        <tr>
          <th>样品门款式</th>
          <td>{{storeData.sampleDoorStyle}}</td>
        </tr>
        <tr>
          <th>本月基本款符合情况、样品质量情况</th>
          <td>{{storeData.qualitySituation}}</td>
        </tr>
        <tr>
          <th>对比销售道具情况</th>
          <td>{{storeData.compareSalesItems}}</td>
        </tr>
        <tr>
          <th>本月小区活动情况</th>
          <td>{{storeData.communityActivityThisMonth}}</td>
        </tr>
        <tr>
          <th>导购员数量</th>
          <td>{{storeData.numberOfGuides}}</td>
        </tr>
        <tr>
          <th>进店量</th>
          <td>{{storeData.intoTheStore}}</td>
        </tr>
        <tr>
          <th>零售量</th>
          <td>{{storeData.retailVolume}}</td>
        </tr>
        <tr>
          <th>成交率</th>
          <td>{{storeData.turnoverRate}}</td>
        </tr>
        <tr>
          <th>发货量</th>
          <td>{{storeData.shipment}}</td>
        </tr>
        <tr>
          <th>业务员</th>
          <td>{{storeData.createByName}}</td>
        </tr>
        <tr>
          <th>最后修改业务员</th>
          <td>{{storeData.lastUpdateByName}}</td>
        </tr>
        <tr>
          <div v-if="storeData.attachments" class="ModuleContainer">
            <p class="newTitle">
              <span class="topModuleTitle">相关附件</span>
            </p>
            <AccessList :options="storeData.attachments"></AccessList>
          </div>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>


export default {
  name: 'store-manage-details',
  props: {},
  data: function () {
    return {
      receptionId: -1,
      storeData: {},
      baseInfo: {},
      isShow: ''
    }
  },
  components: {

  },
  mounted () {
    this.baseInfo = this.$route.query
    this.receptionId = this.baseInfo.id
    this.isShow = true
    this.loadDetail()
  },
  methods: {
    loadDetail () {
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/storme-manage-entity/detail/' + this.receptionId).then((rep) => {
        this.storeData = rep.data
      }).catch(() => {

      })
    }

  }
}
</script>

<style scoped>

</style>
