<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">报价详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>报价编号</th>
          <td>{{quotedPrice.quotedPriceNumber}}</td>
        </tr>
        <tr>
          <th>客户</th>
          <td>
            <span v-if="quotedPrice.member">{{quotedPrice.member.abbreviation}}</span>
          </td>
        </tr>
        <tr>
          <th>客户联系人</th>
          <td>{{quotedPrice.memberContractor}}</td>
        </tr>
        <tr>
          <th>负责人</th>
          <td>
            <span v-if="quotedPrice.operator">{{quotedPrice.operator.name}}</span>
          </td>
        </tr>
        <tr>
          <th>关联商机</th>
          <td>
            <span v-if="quotedPrice.businessChance">{{quotedPrice.businessChance.title}}</span>
          </td>
        </tr>
        <tr>
          <th>报价日期</th>
          <td>{{quotedPrice.beginDate}}</td>
        </tr>
        <tr>
          <th>有效截止日期</th>
          <td>{{quotedPrice.endDate}}</td>
        </tr>
        <tr>
          <th>付款方式</th>
          <td>{{quotedPrice.payWayValue}}</td>
        </tr>
        <tr>
          <th>报价币种</th>
          <td>{{quotedPrice.currencyValue}}</td>
        </tr>
        <tr>
          <th>付款条件</th>
          <td>{{quotedPrice.conditionValue}}</td>
        </tr>
        <tr>
          <th>报价阶段</th>
          <td>{{quotedPrice.statusValue}}
            <a v-if="changeStatusFlag" href="javascript:;"
               @click="changeStatus">修改</a></td>
        </tr>
        <tr>
          <th>整单折扣</th>
          <td>{{quotedPrice.discount}}</td>
        </tr>
        <tr>
          <th>报价金额</th>
          <td>{{quotedPrice.amount}}元</td>
        </tr>
        <tr>
          <th>报价备注</th>
          <td>{{quotedPrice.remark}}</td>
        </tr>
        <tr>
          <th>利润预测</th>
          <td>{{quotedPrice.profitForecast}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="quotedPrice.attachments" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">相关附件</span>
      </p>
      <AccessList :options="quotedPrice.attachments"></AccessList>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">报价产品</span>
      </p>
      <div class="tableList">
        <el-table :data="quotedPriceItemSet" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="materialType.name" label="产品大类"></el-table-column>
          <el-table-column prop="gears" label="档位"></el-table-column>
          <el-table-column prop="quantity" label="数量(W)"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="unitValue" label="单位"></el-table-column>
          <el-table-column prop="totalPrice" label="小计"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer" v-if="quotedPrice.optionGroup">
      <p class="newTitle">
        <span class="topModuleTitle">审批</span>
      </p>
      <div>
        <div class="mint-cell-swipe-buttongroup mint-cell-full">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入审批意见"
            v-model="comments">
          </el-input>
        </div>
        <div class="mint-cell-swipe-buttongroup mint-cell-full">
          <input v-for="(option,index) in quotedPrice.optionGroup" v-bind:key="index" v-on:click="optionClick(option.name)" type="button" :value="option.content">
        </div>
      </div>
      <!--<el-button v-if="fromTodo > 0" v-on:click="backToDo">返回审批中心</el-button>-->
    </div>
    <el-button v-if="fromTodo > 0"  v-on:click="backToDo" class="contentButton"><span><i class="el-icon-back" style="font-weight: 700;"></i>返回审批中心</span></el-button>
    <CommentDatails v-if="showComments" :title="'报价跟踪'" fkType="QUOTED_PRICE" :fkId="quotedPriceId" :addTitle="'添加'"></CommentDatails>
    <ApprovalLog v-if="showApprovalLog" ref="approvalLog" :title="'审批日志'" :fkType="'QUOTED_PRICE'" :fkId="quotedPriceId"></ApprovalLog>

    <SelectRepicker v-if="selectVisibleSingle" :title="'修改报价阶段'" :label="'value'" :options="chanceStatus" @efferent="handleStatusSelected"></SelectRepicker>

  </div>

</template>

<script>

import {Indicator} from 'mint-ui'
import CommentDatails from '@/components/comment/commentDatails'
import ApprovalLog from '../../components/approval/approval-log.vue'
import DialogRepicker from '@/components/dialog-repicker/dialog-repicker.vue'
import SelectRepicker from '@/components/select-repicker/select-repicker.vue'
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
import AccessList from '@/components/access-list/access-list.vue'
import global from  '@/components/Global.vue'
export default {
  name: 'QuotedPriceDetail',
  props: {},
  data: function () {
    return {
      quotedPriceId: -1,
      quotedPrice: {},
      quotedPriceItemSet: [],
      baseInfo: {},
      comments: '',
      selectVisible: false,
      selectVisibleSingle: false,
      fromTodo: false,
      chanceStatus: null,
      showComments: false,
      showApprovalLog: false,
      changeStatusFlag: false,
      headerCell:global.headerCell,
      cellStyle:global.cellStyle
    }
  },
  components: {
    ElButton,
    CommentDatails,
    ApprovalLog,
    DialogRepicker,
    SelectRepicker,
    AccessList
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.quotedPriceId = this.baseInfo.id
    this.fromTodo = this.baseInfo.fromToDo

    this.showComments = true
    this.showApprovalLog = true

    this.loadDetail()
  },
  methods: {
    loadDetail () {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/quoted_price/detail/' + this.quotedPriceId).then((rep) => {
        this.quotedPrice = rep.data
        this.judgeFlag(rep.data.operator.id)
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })

      this.$axios.get('/api/quoted_price_item/find-by-quotedPriceId/' + this.quotedPriceId).then((data) => {
        this.quotedPriceItemSet = data.data
      }).catch(() => {
        Indicator.close()
      })
    },

    judgeFlag(operatorId) {
      this.$axios.get('/api/operator/find-login-operator').then((rep) => {
        if (rep.data.id === operatorId && this.quotedPrice.approvalStatus === 'approvaledInCrm') {
          this.changeStatusFlag = true;
        }
      })
    },

    optionClick (name) {
      let comment = {
        comments: this.comments
      }
      if (name === 'profitForecast') {
        this.$axios.post('api/quoted_price/quoted-price-profit-forecast/' + this.quotedPriceId, comment).then(() => {
          this.loadDetail()
          Indicator.close()
        }).catch((err) => {
          console.log(err.error.message)
          Indicator.close()
        })
      }
      if (name === 'approve') {
        this.$axios.post('api/quoted_price/quoted-price-approval/' + this.quotedPriceId, comment).then(() => {
          this.loadDetail()
          Indicator.close()
        })
      }
      if (name === 'reject') {
        this.$axios.post('api/quoted_price/quoted-price-back/' + this.quotedPriceId, comment).then(() => {
          this.loadDetail()
          Indicator.close()
        }).catch((err) => {
          console.log(err.error.messagessss)
          Indicator.close()
        })
      }
      if (name === 'submit') {
        this.$axios.post('api/quoted_price/quoted-price-submit/' + this.quotedPriceId, comment).then(() => {
          this.loadDetail()
          Indicator.close()
        }).catch((err) => {
          console.log(err.error.messagessss)
          Indicator.close()
        })
      }
      if (name === 'recall') {
        this.$axios.post('api/quoted_price/quoted-price-recall/' + this.quotedPriceId, comment).then(() => {
          this.loadDetail()
          Indicator.close()
        }).catch((err) => {
          console.log(err.error.messagessss)
          Indicator.close()
        })
      }
      if (name === 'cancel') {
        this.$axios.post('api/quoted_price/quoted-price-cancel/' + this.quotedPriceId, comment).then(() => {
          this.loadDetail()
          Indicator.close()
        }).catch((err) => {
          console.log(err.error.messagessss)
          Indicator.close()
        })
      }
      this.$refs.approvalLog.getList()
    },
    changeStatus () {
      console.log(!this.chanceStatus)
      if (!this.chanceStatus) {
        this.$axios.get('api/dict/list/auoted_price_status').then((rep) => {
          this.chanceStatus = rep.data
        })
      }
      this.selectVisibleSingle = true
    },
    selectDialog () {
      this.selectVisible = true
    },
    handleStatusSelected (visible, data) {
      this.selectVisibleSingle = visible
      if (data) {
        this.$axios.put('api/quoted_price/change-status/' + this.quotedPriceId, data).then(() => {
          this.loadDetail()
        })
      }
    },
    backToDo () {
      this.$router.push({path: '/todo-process?&token=' + this.baseInfo.token})
    }
  }
}
</script>

<style scoped>

</style>
