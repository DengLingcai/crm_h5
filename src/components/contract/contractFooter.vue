<template>

  <div>
    <div class="list-block media-list">
      <div class="order-infomation">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-inner" style="display: -webkit-box">
                                <table class="order-table item-inner">
                    <tr v-for="(detail,index) in details" v-bind:key="index" style="display: flex">
                    <td v-if = "detail.value">{{detail.title}}：</td>
                    <td class="orderNum" style="white-space: normal;">{{detail.value}}</td>
                  </tr>
                </table>
                <div style="height: 100%;">
                <button ref="copy" class="copyButton" data-clipboard-action="copy" data-clipboard-target=".orderNum" @click="copyLink">复制</button>
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
import * as Time from '../../untils/utils'
import { Toast } from 'mint-ui'
import Clipboard from 'clipboard'

export default {
  name: 'order-footer',
  props: ['details'],
  data: function () {
    return {
      date: Time.getTime(new Date()),
      copyBtn: null,
      link: 'text',
      ridValue: 0
    }
  },
  mounted () {
    if (this.rid) {
      this.ridValue = this.rid
    }
    this.copyBtn = new Clipboard(this.$refs.copy)
  },
  created () {
    // console.log(this.rid)
  },
  methods: {
    copyLink: function () {
      let _this = this
      let clipboard = _this.copyBtn
      clipboard.on('success', function () {
        Toast('复制成功')
      })
      clipboard.on('error', function () {
        Toast('该浏览器不支持复制')
      })
    },
    backFun: function () {
      this.$router.push({path: '/todoProcess?&token=' + this.$route.query.token})
    },
    backReleaseFun: function () {
      console.log(this.ridValue)
      this.$router.push({path: '/releaseOrder?backtodo=1&id=' + this.ridValue + '&token=' + this.$route.query.token})
    }
  }
}
</script>

<style scoped>

</style>
