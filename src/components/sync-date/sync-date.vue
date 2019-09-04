<template>
    <p class="sync">库存数据最后更新于 {{sync_date}}</p>
</template>

<script>
export default {
  name: 'sync-date',
  props: ['fkType'],
  data: function () {
    return {
      sync_date: '#sync_date#',
      baseInfo: ''
    }
  },
  created () {
    this.baseInfo = this.$route.query
  },
  mounted () {
    this.reload()
  },
  methods: {
    reload () {
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('api/data-sync-version/check/' + this.fkType).then(rep => {
        this.sync_date = rep.data.syncDate
      })
    }
  }
}
</script>

<style scoped>
  .sync{
    margin: 0;font-size: .6rem;text-align: right;padding: 0 .4rem;
  }
</style>
