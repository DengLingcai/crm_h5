<template>
  <div class="list-block media-list">
    <ul>
      <li>
        <div class="item-content">
          <div class="item-inner item-inner-padding-bottom">
            <div class="orderInfo" style="display: flex">
              <div class="order-info-icon">
                <i class="el-icon-location"></i>
              </div>
              <div class="order-info-body" style="line-height: 30px;">
                <p v-for="(abbreviation) in abbreviations" v-bind:key="abbreviation">{{abbreviation}}</p>
                <p class="color-gray" style="word-wrap:break-word;">交期：{{contract.beginDate}} 到 {{contract.endDate}} </p>
                <p class="color-gray" style="word-wrap:break-word;">交付审批状态：<strong v-bind:class="{ red: contract.fillStatusDesp === '已退回', green: contract.fillStatusDesp === '已完成'}">{{contract.fillStatusDesp}}</strong></p>
                <p class="color-gray" style="word-wrap:break-word;">商务审批状态：<strong v-bind:class="{ red: contract.businessStatusDesp === '已退回', green: contract.businessStatusDesp === '已完成'}">{{contract.businessStatusDesp}}</strong></p>
                <p class="color-gray" style="word-wrap:break-word;" v-if = "contract.collectStatusDesp">最终审批状态：<strong v-bind:class="{ red: contract.collectStatusDesp === '已退回', green: contract.collectStatusDesp === '已完成'}">{{contract.collectStatusDesp}}</strong></p>
              </div>
            </div>
          </div>
          <div class="collect-icon" v-on:click='collection' v-if="isCollect"><span class="fa fa-star"><span class="inIcon"></span>收藏</span></div>
          <!--<div class="collect-icon" v-on:click='collection' v-else><span class="fa fa-star" :class="{'collect': (!isCollect)}"><span class="inIcon"></span>取消</span></div>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'contract-target',
  props: ['company', 'startTime', 'endTime', 'contract', 'abbreviations'],
  data: function () {
    return {
      addressVisible: false,
      isCollect: false
    }
  },
  mounted () {
    this.isCollect = this.company.isCollect
  },
  updated () {

  },
  methods: {
    checkAddress: function () {
      this.addressVisible = true
      this.isShowModel = true
      console.log('修改')
    },
    collection: function () {
      if (!this.isCollect) {
        MessageBox.confirm('', {
          message: '确认取消关注',
          title: '提示',
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            this.isCollect = true
          }
        }).catch(err => {
          if (err === 'cancel') {
          }
        })
      } else {
        this.isCollect = false
      }
    }
  }
}
</script>

<style scoped>
  .red {
    color:red;
  }
  .green {
    color:green;
  }
  .list-block .item-content .item-inner{
    background-image: none;
    padding:0.8rem  0 0 0;
  }
  .list-block ul{
    border-radius: 0.4rem;
  }
  .list-block{
    margin: 0.5rem 0.6rem;
  }
  .list-block .item-content{
    padding-left: 0;
    position: relative;
  }
  .orderInfo{
    text-align: left;
    margin-bottom: 0.5rem;
  }
  .orderInfo .order-info-body > p {
    margin: 0;
    font-size: 0.7rem;
  }
  .orderInfo .order-info-body > p:nth-of-type(1){
    color: #000000;
    font-size: 0.7rem;
  }
  .order-info-icon{
    font-size: 1.2rem;
    margin: -5px 0.5rem 0;
  }
  .collect-icon{
    position: absolute;
    top:0.5rem;
    right: 0;
    background-color: #F0F1F3;
    height: 1.2rem;
    line-height: 1.32rem;
    width: 3rem;
    border-bottom-left-radius: 0.75rem;
    border-top-left-radius: 0.75rem;
    color: #959698;
    font-size: 0.7rem;
  }
  .edit-size {
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
  .mint-popup-4{
    width: 100%;
  }
  .collect{
    color: orange;
  }
  .inIcon {
    margin-right: 5px;
  }
  .confirm{
    border: none;
    border-radius: 2px;
    color: #ffffff!important;
    margin: 0.2rem 0;
  }
  .waitConfirm{
    padding: 0.2rem;
    background-color: rgb(236,103,94);
    font-size:0.7rem;
  }
  .moreList{float:right;margin-right:0.5rem;background-color: #26a2ff}
  .collect-icon .fa-star{position:relative;padding-left:0.9rem;}
  .collect-icon .fa-star:before{position: absolute; top:-0.1rem;left:0.2rem;content:"";padding:0.4rem;margin-right:0.1rem}
  .collect-icon .fa-star:before{background:url("../../assets/img/f-start.png") no-repeat center;
    background-size:contain;}
  .collect-icon .collect:before{background:url("../../assets/img/f-start-hover.png") no-repeat center;
    background-size:contain;}
</style>
<style>
  .mint-toast{
    z-index:5000
  }
</style>
