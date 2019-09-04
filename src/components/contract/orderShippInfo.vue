<template>
  <div class="ShippInfo">
    <p><span class="fa fa-cube color-gray ShippInfo-icon"></span>发货信息</p>
    <table class="ShippInfo-table">
      <tr v-for="ShippedInfo in ShippedInfos" v-bind:key="ShippedInfo.id">
        <td>{{ShippedInfo.key}}</td>
        <td>{{ShippedInfo.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'order-shipp-info',
  props: ['ShippedInfos']
}
</script>

<style scoped>
  .ShippInfo{
    background-color: #ffffff;
    margin: 0.5rem 0.6rem;
    border-radius: 0.4rem;
    padding-bottom: 1rem;
    text-align: left;
  }
  .ShippInfo > p:nth-of-type(1){
    font-size: 1rem;
    color: #282828;
    margin: 0 0 0.5rem 0;
  }
  .ShippInfo-icon{
    font-size: 1rem!important;
    margin: 0 0.5rem
  }
  .ShippInfo-table{
    width: 100%;
    padding-bottom: 0.5rem;
  }
  .ShippInfo-table tr{
    height: 1rem;
    line-height: 1rem;
  }
  .ShippInfo-table tr td:nth-of-type(1){
    text-align: right;
    width: 25%;
    font-size: 0.6rem;
    color: #B4B5B6;
  }
  .ShippInfo-table tr td:nth-of-type(2){
    text-align: left;
    font-size: 0.6rem;
    padding-left: 1rem;
    color: #282828;
  }
  .ShippInfo-table > tr:nth-last-of-type(1) > td:nth-of-type(2){
    color: red;
  }
</style>
