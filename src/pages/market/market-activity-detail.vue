<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">市场活动详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>类型</th>
          <td>
            {{activity.activityTypeValue}}
          </td>
        </tr>
        <tr>
          <th>标题</th>
          <td>
            {{activity.title}}
          </td>
        </tr>
        <tr>
          <th>负责部门</th>
          <td>
            {{activity.department == null ? '' :activity.department.name}}
          </td>
        </tr>
        <tr>
          <th>负责人</th>
          <td>
            {{activity.operator == null ? '' : activity.operator.name}}
          </td>
        </tr>
        <tr>
          <th>开始日期</th>
          <td>{{activity.beginDate}}</td>
        </tr>
        <tr>
          <th>结束日期</th>
          <td>{{activity.endDate}}</td>
        </tr>
        <tr>
          <th>重要性</th>
          <td>
            {{activity.importantValue}}
          </td>
        </tr>

        <tr>
          <th>活动状态</th>
          <td>
            {{activity.statusValue}}
            <button class="button" @click="changeStatus()" v-if="changeMarketActivityStatus">
              修改状态
            </button>
          </td>
        </tr>
        <tr>
          <th>审批状态</th>
          <td>
            {{activity.approveStatusValue}}
          </td>
        </tr>

        <tr>
          <th>发布方式</th>
          <td>
            <!--{{activity.approveStatusValue}}-->
            <span v-for="(publishWay,index) in activity.publishWaySet"
                  v-bind:key="index">{{publishWay.publishWayValue}}&nbsp;&nbsp;</span>
          </td>
        </tr>

        <tr>
          <th>已邀请名单</th>
          <td>
            <!--{{activity.approveStatusValue}}-->
            <span v-for="(item,index) in invitePeopleItemList"
                  v-bind:key="index">{{item.member == null ? '' : item.member.abbreviation}}/{{item.linkPeople}}/{{item.position}}&nbsp;&nbsp;</span>
          </td>
        </tr>

        </tbody>
      </table>

    </div>

    <!--<div class="ModuleContainer">-->
    <!--<p class="newTitle">-->
    <!--<span class="topModuleTitle">友商列表</span>-->
    <!--</p>-->
    <!--<div class="tableList">-->
    <!--<el-table :data="competitorBehaviorset" :border="true" :highlight-current-row="true" max-height="250" >-->
    <!--<el-table-column fixed="left" prop="abbreviation" label="友商名称"></el-table-column>-->
    <!--<el-table-column prop="principalName" label="友商负责人"></el-table-column>-->
    <!--<el-table-column prop="principalJob" label="负责人职位"></el-table-column>-->
    <!--<el-table-column prop="principalTel" label="负责人电话"></el-table-column>-->
    <!--<el-table-column prop="content" label="备注"></el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="ModuleContainer" v-if="activity.optionGroup">-->
    <!--&lt;!&ndash;<p class="newTitle">&ndash;&gt;-->
    <!--&lt;!&ndash;<span class="topModuleTitle">审批</span>&ndash;&gt;-->
    <!--&lt;!&ndash;</p>&ndash;&gt;-->
    <!--<div class="mint-cell-swipe-buttongroup">-->
    <!--&lt;!&ndash;<input type="text" v-model="comments" placeholder="可输入审批意见"/>&ndash;&gt;-->
    <!--<button class="button" v-bind:key="option.name" v-for="option in activity.optionGroup"-->
    <!--v-on:click="optionClick(option.name)">{{option.content}}-->
    <!--</button>-->
    <!--</div>-->

    <!--</div>-->
    <div v-if="activity.attachmentList" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">相关附件</span>
      </p>
      <AccessList :options="activity.attachmentList"></AccessList>
    </div>

    <div>
      <div v-if="activity.optionGroup" style="text-align: center;">
        <!--<el-input-->
        <!--class="view"-->
        <!--size="small"-->
        <!--placeholder="请输入审批意见"-->
        <!--prefix-icon="el-icon-edit"-->
        <!--v-model="comments">-->
        <!--</el-input>-->
        <div class="mint-cell-swipe-buttongroup mint-cell-full">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入审批意见"
            v-model="comments">
          </el-input>
        </div>
      </div>
      <div class="mint-cell-swipe-buttongroup mint-cell-full">
        <input v-for="(option,index) in activity.optionGroup" v-bind:key="index" v-on:click="optionClick(option.name)"
               type="button" :value="option.content">
      </div>
    </div>

    <ApprovalLog v-if="activityId" ref="approvalLog" :title="'审批日志'" :fkType="'MARKEND_ACTIVITY'"
                 :fkId="activityId"></ApprovalLog>

    <SelectRepicker v-if="selectVisibleSingle" :title="'修改活动状态'" :label="'value'" :options="activityStatus"
                    @efferent="handleStatusSelected"></SelectRepicker>
  </div>

</template>

<script>

  import {Indicator} from 'mint-ui'
  import ApprovalLog from '../../components/approval/approval-log.vue'
  import SelectRepicker from '@/components/select-repicker/select-repicker.vue'
  import AccessList from '@/components/access-list/access-list.vue'

  export default {
    name: 'activity',
    props: {},
    components: {
      ApprovalLog,
      SelectRepicker,
      AccessList
    },
    data: function () {
      return {
        activityId: -1,
        activity: {},
        invitePeopleItemList: {},
        competitorBehaviorset: [],
        baseInfo: {},
        comments: '',
        selectVisibleSingle: false,
        activityStatus: null,
        loginOperatorId: null,
        createdOperatorId: null,
        superiorOperatorId: null,
        adminId: null,
        changeMarketActivityStatus: false
      }
    },
    created () {
      this.baseInfo = this.$route.query
      this.activityId = this.baseInfo.id
    },
    mounted () {
      // this.$refs.approvalLog.getList()
      this.loadDetail()
    },
    methods: {
      loadDetail () {
        Indicator.open()
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        // 活动详情
        this.$axios.get('/api/market-activity/detail/' + this.activityId).then((rep) => {
          console.log(rep.data)
          this.activity = rep.data
          this.activityId = this.activity.id
          this.createOaCode = this.activity.createdBy
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })

        // 邀请人详情
        this.$axios.get('/api/invite-people-item/detail-activity/' + this.activityId).then((rep) => {
          console.log(rep.data)
          this.invitePeopleItemList = rep.data
          Indicator.close()
        }).catch(() => {
          console.log('异常')
          Indicator.close()
        })

        this.$axios.get('/api/operator/find-login-operator').then((rep) => {
          console.log(rep.data)
          this.loginOperatorId = rep.data.id
          this.$axios.get('/api/market-activity/find-operator-all-change-marketActivity-status/' + this.activityId).then((rep) => {
            console.log(rep.data)
            this.createdOperatorId = rep.data[0]
            this.superiorOperatorId = rep.data[1]
            this.adminId = rep.data[2]
            this.isChangeStatus()
            Indicator.close()
          }).catch(() => {
            console.log('异常')
            Indicator.close()
          })
          Indicator.close()
        }).catch(() => {
          console.log('异常')
          Indicator.close()
        })

      },

      isChangeStatus () {
        if (this.loginOperatorId === this.createdOperatorId || this.loginOperatorId === this.superiorOperatorId || this.loginOperatorId === this.adminId) {
          this.changeMarketActivityStatus = true
        }
      },
      optionClick (name) {
        console.log(name + this.activityId + '-' + this.comments)

        let url = ''
        if (name === 'approve') {
          url = 'api/market-activity/activity-approval/' + this.activityId
        }

        if (name === 'reject') {
          url = 'api/market-activity/activity-back/' + this.activityId
        }

        if (name === 'submit') {
          url = 'api/market-activity/activity-submit/' + this.activityId
        }

        let comment = {
          comments: this.comments
        }
        this.$axios.post(url, comment).then((rep) => {
          console.log(rep.data)
          this.activity = rep.data
          this.loadDetail()
          this.$refs.approvalLog.getList()
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
        //this.$refs.approvalLog.getList()
      },
      changeStatus () {
        console.log(this.activityId)
        this.$axios.get('api/dict/list/market_activity_status').then((rep) => {
          console.log('zidiandsd')
          console.log(rep.data)
          this.activityStatus = rep.data

          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
        this.selectVisibleSingle = true

        this.loadDetail()
      },
      handleStatusSelected (value, data) {
        this.selectVisibleSingle = false
        console.log(data)
        let obj = {
          id: this.activityId,
          status: data['key'],
          statusValue: data['value']
        }
        this.$axios.post('api/market-activity/update-status', obj).then((rep) => {
          console.log(rep.data)
          this.loadDetail()
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
      }
    }
  }
</script>

<style scoped>
</style>
