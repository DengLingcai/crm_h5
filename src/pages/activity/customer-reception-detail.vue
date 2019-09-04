<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">客户接待详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>标题</th>
          <td>{{customerReception.title}}</td>
        </tr>
        <tr>
          <th>客户</th>
          <td>{{member.abbreviation}}</td>
        </tr>
        <tr>
          <th>客户联系人</th>
          <td>{{customerReception.contactName}}</td>
        </tr>
        <tr>
          <th>联系人电话</th>
          <td>{{customerReception.contactTel}}</td>
        </tr>
        <tr>
          <th>客户经理</th>
          <td>{{accountManager.name}}</td>
        </tr>
        <tr>
          <th>来访对象</th>
          <td>{{customerReception.visitingObjects}}</td>
        </tr>
        <tr>
          <th>开始日期</th>
          <td>{{customerReception.beginDate}}</td>
        </tr>
        <tr>
          <th>结束日期</th>
          <td>{{customerReception.endDate}}</td>
        </tr>
        <tr>
          <th>拜访对象</th>
          <td>{{customerReception.receptionObjects}}</td>
        </tr>
        <tr>
          <th>拜访地区</th>
          <td>{{customerReception.receptionCompanyDesp}}</td>
        </tr>
        <tr>
          <th>接待等级</th>
          <td>{{customerReception.receptionLevelDesp}}</td>
        </tr>
        <tr>
          <th>国内外</th>
          <td>{{customerReception.receptionCountryTypeDesp}}</td>
        </tr>
        <tr>
          <th>接待状态</th>
          <td>{{customerReception.receptionStatusValue}}
            <a v-if="changeStatusFlag" href="javascript:;"
               @click="changeStatus">修改</a></td>
        </tr>
        <tr>
          <th>来访原因</th>
          <td>{{customerReception.visitingReason}}</td>
        </tr>
        <tr>
          <th>申请说明</th>
          <td>{{customerReception.applyRemark}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="customerReception.attachments" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">相关附件</span>
      </p>
      <AccessList :options="customerReception.attachments"></AccessList>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">来访人员名单</span>
      </p>
      <div class="tableList">
        <el-table :data="visitorItemList" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true"
                  :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="name" label="姓名"></el-table-column>
          <el-table-column prop="departmentName" label="部门"></el-table-column>
          <el-table-column prop="jobTitle" label="职位"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="tel" label="联系电话"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">接待人员名单</span>
      </p>
      <div class="tableList">
        <el-table :data="receptionItemList" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="receptor.name" label="人员"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">接待标准与最终安排</span>
      </p>
      <table class="details">
        <tbody>
        <tr>
          <th>需要酒店</th>
          <td>{{customerReception.needHotel ? '是': '否'}}</td>
        </tr>
        <tr>
          <th>酒店级别</th>
          <td>{{customerReception.hotelLevelValue}}</td>
        </tr>
        <tr>
          <th>酒店标准</th>
          <td>{{customerReception.hotelStandard}}</td>
        </tr>
        <tr>
          <th>酒店其他诉求</th>
          <td>{{customerReception.hotelOtherAppeal}}</td>
        </tr>
        <tr>
          <th>酒店最终安排</th>
          <td>{{customerReception.hotelFinalPlan}}</td>
        </tr>
        <tr>
          <th>需要用餐</th>
          <td>{{customerReception.needMeal ? '是' : '否'}}</td>
        </tr>
        <tr>
          <th>用餐酒店</th>
          <td>{{customerReception.mealArea}}</td>
        </tr>
        <tr>
          <th>用餐标准</th>
          <td>{{customerReception.mealStandard}}</td>
        </tr>
        <tr>
          <th>用餐其他诉求</th>
          <td>{{customerReception.mealOtherAppeal}}</td>
        </tr>
        <tr>
          <th>用餐最终安排</th>
          <td>{{customerReception.mealFinalPlan}}</td>
        </tr>
        <tr>
          <th>需要用车</th>
          <td>{{customerReception.needCar ? '是' : '否'}}</td>
        </tr>
        <tr>
          <th>用车时间段</th>
          <td>{{customerReception.timeSlotCar}}</td>
        </tr>
        <tr>
          <th>用车标准</th>
          <td>{{customerReception.carStandard}}</td>
        </tr>
        <tr>
          <th>用车其他诉求</th>
          <td>{{customerReception.carOtherAppeal}}</td>
        </tr>
        <tr>
          <th>用车最终安排</th>
          <td>{{customerReception.carFinalPlan}}</td>
        </tr>

        <tr>
          <th>需要礼品</th>
          <td>{{customerReception.needGift ? '是' : '否'}}</td>
        </tr>
        <tr>
          <th>礼品份数</th>
          <td>{{customerReception.giftNum}}</td>
        </tr>
        <tr>
          <th>礼品标准</th>
          <td>{{customerReception.giftStandard}}</td>
        </tr>
        <tr>
          <th>礼品其他诉求</th>
          <td>{{customerReception.giftOtherAppeal}}</td>
        </tr>
        <tr>
          <th>礼品最终安排</th>
          <td>{{customerReception.giftFinalPlan}}</td>
        </tr>
        <tr>
          <th>需要会议室</th>
          <td>{{customerReception.needMeetingRoom ? '是' : '否'}}</td>
        </tr>
        <tr>
          <th>会议资源</th>
          <td>{{customerReception.meetingResource}}</td>
        </tr>
        <tr>
          <th>会议室预定</th>
          <td>{{customerReception.predetermineMeetingRoom}}</td>
        </tr>
        <tr>
          <th>会议名牌</th>
          <td>{{customerReception.meetingNameplate ? '是' : '否'}}</td>
        </tr>
        <tr>
          <th>会议说明</th>
          <td>{{customerReception.explainMeeting}}</td>
        </tr>
        <tr>
          <th>会议标准</th>
          <td>{{customerReception.meetingStandard}}</td>
        </tr>
        <tr>
          <th>会议其他诉求</th>
          <td>{{customerReception.meetingOtherAppeal}}</td>
        </tr>
        <tr>
          <th>会议最终安排</th>
          <td>{{customerReception.meetingFinalPlan}}</td>
        </tr>
        <tr>
          <th>票务预定</th>
          <td>{{customerReception.needPlanTicket ? '是' : '否'}}</td>
        </tr>
        <tr>
          <th>票务标准</th>
          <td>{{customerReception.planTicketStandard}}</td>
        </tr>
        <tr>
          <th>票务其他诉求</th>
          <td>{{customerReception.planTicketOtherAppeal}}</td>
        </tr>
        <tr>
          <th>票务最终安排</th>
          <td>{{customerReception.planTicketFinalPlan}}</td>
        </tr>
        <tr>
          <th>进车间</th>
          <td>{{customerReception.needVisitWorkShop ? '是' : '否'}}</td>
        </tr>
        <tr>
          <th>车间标准</th>
          <td>{{customerReception.workShopStandard}}</td>
        </tr>
        <tr>
          <th>进车间其他诉求</th>
          <td>{{customerReception.workShopOtherAppeal}}</td>
        </tr>
        <tr>
          <th>进车间最终安排</th>
          <td>{{customerReception.workShopFinalPlan}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="customerReception.meetingData" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">会议资料</span>
      </p>
      <AccessList :options="customerReception.meetingData"></AccessList>
    </div>

    <div class="ModuleContainer" v-if="customerReception.optionGroup">
      <p class="newTitle">
        <span class="topModuleTitle">审批</span>
      </p>
      <div>
        <div class="mint-cell-swipe-buttongroup mint-cell-full">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入审批意见"
            v-model="comments" v-if="isComment">
          </el-input>
        </div>
        <div class="mint-cell-swipe-buttongroup mint-cell-full">
          <input v-for="(option,index) in customerReception.optionGroup" v-on:click="optionClick(option.name)"
                 type="button" :value="option.content">
        </div>
      </div>
    </div>
    <el-button v-if="fromTodo > 0" v-on:click="backToDo" class="contentButton"><span><i
      class="el-icon-back" style="font-weight: 700;"></i>返回审批中心</span></el-button>
    <CommentDatails v-if="isShow" :title="'客户接待跟踪'" fkType="CUSTOMER_RECEPTION" :fkId="receptionId" :addTitle="'添加'"></CommentDatails>
    <ApprovalLog v-if="isShow" ref="approvalLog" :title="'审批日志'" :fkType="'CUSTOMER_RECEPTION'" :fkId="receptionId"></ApprovalLog>

    <SelectRepicker v-if="selectVisibleSingle" :title="'修改客户接待状态'" :label="'value'" :options="chanceStatus"
                    @efferent="handleStatusSelected"></SelectRepicker>

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

export default {
  name: 'CustomerReceptionDetail',
  props: {},
  data: function () {
    return {
      receptionId: -1,
      customerReception: {},
      member: {},
      accountManager: {},
      visitorItemList: [],
      receptionItemList: [],

      baseInfo: {},
      comments: '',
      selectVisible: false,
      selectVisibleSingle: false,
      fromTodo: false,
      changeStatusFlag: false,
      isComment: true,
      chanceStatus: null,
      showCol: ['oaCode', 'name', 'title'],
      field: 'oaCode-name-title',
      isShow: '',
      headerCell: global.headerCell,
      cellStyle: global.cellStyle
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
    this.receptionId = this.baseInfo.id
    this.fromTodo = this.baseInfo.fromToDo
    this.isShow = true
    this.loadDetail()
  },
  methods: {
    loadDetail () {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/customer-base-reception/detail/' + this.receptionId).then((rep) => {
        this.customerReception = rep.data
        this.member = this.customerReception.member
        this.accountManager = this.customerReception.accountManager
        this.visitorItemList = this.customerReception.visitorItems
        this.receptionItemList = this.customerReception.recepitorItems
        if (this.customerReception.approvalStatus === 'toBeCommitCrm' || this.customerReception.approvalStatus === 'returnInCrm') {
          this.isComment = false
        }
        this.judgeFlag(this.customerReception.createOperator.id)
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },

    judgeFlag (createdOperatorId) {
      this.$axios.get('/api/operator/find-login-operator').then((rep) => {
        if (rep.data.id === createdOperatorId && this.customerReception.approvalStatus === 'approvaledInCrm') {
          this.changeStatusFlag = true
        }
      })
    },

    optionClick (name) {
      console.log(name)
      if (name === 'approve') {
        this.approvalReception()
      }
      if (name === 'reject') {
        this.rejectReception()
      }
      if (name === 'submit') {
        this.submitReception()
      }
      this.$refs.approvalLog.getList()
    },
    changeStatus () {
      console.log(!this.chanceStatus)
      if (!this.chanceStatus) {
        this.$axios.get('api/dict/list/customer_reception_status').then((rep) => {
          this.chanceStatus = rep.data
        })
      }
      this.selectVisibleSingle = true
    },
    approvalReception () {
      let comment = {
        comments: this.comments
      }
      this.$axios.post('api/customer-base-reception/approval/' + this.receiptId, comment).then((rep) => {
        this.loadDetail()
      })
    },
    rejectReception () {
      let comment = {
        comments: this.comments
      }
      this.$axios.post('api/customer-base-reception/reject/' + this.receiptId, comment).then((rep) => {
        this.loadDetail()
      })
    },
    submitReception () {
      let comment = {
        comments: this.comments
      }
      this.$axios.post('api/customer-base-reception/submit/' + this.receiptId, comment).then(() => {
        this.loadDetail()
      })
    },
    handleStatusSelected (visible, data) {
      console.log(visible)
      console.log(data)
      this.selectVisibleSingle = visible
      if (data) {
        console.log(status)
        this.$axios.put('api/customer-base-reception/change-status/' + this.receiptId, data).then(() => {
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
