<template>
  <div class="order-status" v-bind:class="order.orderStatusBackColor">
    <img :src="order.src" alt="">
    <div class="status-info">
      <p>{{order.statusDesp}}</p><p>{{time}}</p>
      <!--2018-02-02 19:30:30-->
    </div>
  </div>
</template>

<script>
import * as orderStatus from './orderStatus'
export default {
  name: 'order-header',
  props: ['time', 'status', 'statusDesp', 'nextPositionDesp'],
  data: function () {
    return {
      order: {},
      statusNextDsp: false
    }
  },
  watch: {
    'status': function (n, o) {
      this.test = n[0]
      this.updata()
    }
  },
  mounted () {
    this.order = orderStatus.getStatus(this.status)
  },
  methods: {
    updata () {
      this.order = orderStatus.getStatus(this.status)
      console.log('this.statusDesp', this.statusDesp)
      if (this.nextPositionDesp) {
        this.statusNextDsp = true
      }
    }
  }
}
</script>

<style scoped>
  .order-status{
    display: flex;
    align-items: center;
    height: 3rem;
    color: #ffffff;
    text-align: left;
  }
  .order-status .header-icon{
    font-size: 40px;
    margin: 0 0.5rem;
  }
  .order-status p{
    margin: 0;
  }
  .order-status .status-info p:nth-of-type(1){
    font-size: 0.8rem;
  }
  .order-status p:nth-of-type(2){
    font-size: 0.6rem;
  }
  .order-status img{
    margin: 0 0.5rem;
  }
  .status-success{
    background-color: #15CD11;
  }
  .status-warning{
    background-color: #f4b74f;
  }
  .status-danger{
    background-color: #ec675d;
  }
</style>
