<template>
  <div class="list-block media-list">
    <div class="orderDairy">
      <ul class="dTrack">
        <p class="newTitle">
          <span class="topModuleTitle">审批日志</span>
        </p>
        <hr class="clearBoth" style="border:1px solid rgba(221,221,221,1);width: 91%;">
        <li  v-for='data in dataList' :key='data.index'>
          <span class="circle-list"></span>
          <p>{{data.remark}}</p>
          <span>{{data.logDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'journal',
  props: ['dataList'],
  data: function () {
    return {

    }
  }
}
</script>

<style scoped>
.dTrack{
  padding-bottom: .7rem;
}
.dTrack li{
  color: #282828;
}
</style>
