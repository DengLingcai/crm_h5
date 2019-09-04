<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">商机详情</span>
      </p>
      <table class="details">
        <tbody>
        <tr>
          <th>商机编号</th>
          <td>{{businessChance.businessNumber}}</td>
        </tr>
        <tr>
          <th>商机标题</th>
          <td>{{businessChance.title}}</td>
        </tr>
        <tr>
          <th>重要程度</th>
          <td>{{businessChance.importantValue}}</td>
        </tr>
        <tr>
          <th>商机类型</th>
          <td>{{businessChance.typeValue}}</td>
        </tr>
        <tr>
          <th>商机来源</th>
          <td>{{businessChance.resourceValue}}</td>
        </tr>
        <tr>
          <th>相关客户</th>
          <td>{{businessChance.regularCustomer?businessChance.regularCustomer.abbreviation:''}}</td>
        </tr>
        <tr>
          <th>提交人</th>
          <td>{{businessChance.operator == null ? '' : businessChance.operator.name}}</td>
        </tr>
        <tr>
          <th>
            提交日期
          </th>
          <td>
            {{businessChance.submitDate}}
          </td>
        </tr>
        <tr>
          <th>客户</th>
          <td>{{businessChance.member == null ? '' : businessChance.member.abbreviation}}</td>
        </tr>
        <tr>
          <th>客户联系人</th>
          <td>{{businessChance.customerContact}}</td>
        </tr>
        <tr>
          <th>联系人职位</th>
          <td>{{businessChance.customerJob}}</td>
        </tr>
        <tr>
          <th>联系人电话</th>
          <td>{{businessChance.customerTel}}</td>
        </tr>
        <tr>
          <th>关联线索</th>
          <td>{{businessChance.clue?businessChance.clue.title:''}}</td>
        </tr>
        <tr>
          <th>关联活动</th>
          <td>{{businessChance.activity?businessChance.activity.title:''}}</td>
        </tr>
        <tr>
          <th>预计成交日期</th>
          <td>{{businessChance.transactionDate}}</td>
        </tr>
        <tr>
          <th>产品大类</th>
          <td>
            <span v-for="(materialTypes,index) in businessChance.materialTypes"
                  v-bind:key="index">{{materialTypes.name}}&nbsp;&nbsp;</span>
          </td>
          <!--<td><ng-container *ngFor="let item of businessChance?.materialTypes">-->
          <!--{{item?.name}}&nbsp;-->
          <!--</ng-container>-->
          <!--</td>-->
        </tr>

        <tr>
          <th>商机金额</th>
          <td>{{businessChance.amount}}元</td>
        </tr>
        <tr>
          <th>商机阶段</th>
          <td>{{businessChance.statusValue}}
            <a v-if="changeStatusFlag" href="javascript:;"
               @click="changeStatus">修改</a></td>
        </tr>
        <tr>
          <th>负责人</th>
          <td>{{businessChance.principal?businessChance.principal.name:''}}</td>
        </tr>
        <tr>
          <th>商机内容</th>
          <td>{{businessChance.content}}</td>
        </tr>
        </tbody>
      </table>

    </div>

    <div v-if="businessChance.attachments" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">相关附件</span>
      </p>
      <AccessList :options="businessChance.attachments"></AccessList>
    </div>

    <div class="ModuleContainer" style="position: relative">
      <p class="newTitle">
        <span class="topModuleTitle">友商列表</span>
      </p>
      <el-button v-if="changeStatusFlag" size="mini" type="primary" class="button addList" @click="addItem"
                 style="position: absolute;top: .6rem;right: .7rem;">添加
      </el-button>
      <!--<el-button v-if="changeStatusFlag" size="mini" type="danger" @click="deleteItem"-->
                 <!--style="position: absolute;top: .6rem;right: 4rem;">删除-->
      <!--</el-button>-->
      <div class="tableList">
        <el-table @selection-change="handleSelectionChange" ref="clearSelection" class="tb-edit"
                  tooltip-effect="light" :fit="true"
                  :header-cell-style="headerCell" :cell-style="cellStyle" :data="competitorBehaviorset" :border="true"
                  :highlight-current-row="true" max-height="250">
          <!--<el-table-column align="center"-->
                           <!--type="selection">-->
          <!--</el-table-column>-->
          <el-table-column label="友商" :fit="true" resizable align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-input v-if="changeStatusFlag" size="small"
                        v-model="competitorBehaviorset[scope.$index].abbreviation"></el-input>
              <span>{{competitorBehaviorset[scope.$index].abbreviation}}</span>
            </template>
          </el-table-column>
          <el-table-column label="负责人" align="center">
            <template slot-scope="scope">
              <el-input v-if="changeStatusFlag" size="small" class="el-table-input"
                        v-model="competitorBehaviorset[scope.$index].principalName"></el-input>
              <span>{{competitorBehaviorset[scope.$index].principalName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="职位" align="center">
            <template slot-scope="scope">
              <el-input v-if="changeStatusFlag" size="small" class="el-table-input"
                        v-model="competitorBehaviorset[scope.$index].principalJob"></el-input>
              <span>{{competitorBehaviorset[scope.$index].principalJob}}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" align="center">
            <template slot-scope="scope">
              <el-input v-if="changeStatusFlag" size="small" class="el-table-input"
                        v-model="competitorBehaviorset[scope.$index].principalTel"></el-input>
              <span>{{competitorBehaviorset[scope.$index].principalTel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-if="changeStatusFlag" size="small" class="el-table-input"
                        v-model="competitorBehaviorset[scope.$index].content"></el-input>
              <span>{{competitorBehaviorset[scope.$index].content}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="50" v-if="changeStatusFlag">
            <template slot-scope="scope">
              <el-button @click.native.prevent="saveCompetitor(scope.$index, competitorBehaviorset)" type="text"
                         size="small">
                保存
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <!--<el-table :data="competitorBehaviorset" :border="true" :highlight-current-row="true" max-height="250" >-->
        <!--<el-table-column fixed="left" prop="abbreviation" label="友商名称"></el-table-column>-->
        <!--<el-table-column prop="principalName" label="友商负责人"></el-table-column>-->
        <!--<el-table-column prop="principalJob" label="负责人职位"></el-table-column>-->
        <!--<el-table-column prop="principalTel" label="负责人电话"></el-table-column>-->
        <!--<el-table-column prop="content" label="备注"></el-table-column>-->
        <!--</el-table>-->
      </div>
    </div>

    <div class="ModuleContainer" style="position: relative">
      <p class="newTitle">
        <span class="topModuleTitle">友商活动跟踪</span>
      </p>
      <div class="tableList">
        <!--<button class="button addList" v-if="changeStatusFlag" @click="addItemTwo"-->
                <!--style="position: absolute;top: .6rem;right: .7rem;">-->
          <!--<span>添加</span></button>-->
        <el-button v-if="changeStatusFlag" size="mini" type="primary" class="button addList" @click="addItemTwo"
                   style="position: absolute;top: .6rem;right: .7rem;">添加
        </el-button>
        <div>
          <el-table :data="friendDealerSet" :border="true" tooltip-effect="light" :fit="true"
                    :header-cell-style="headerCell" :cell-style="cellStyle" :highlight-current-row="true"
                    max-height="250">

            <el-table-column label="友商" header-align="center">
              <template slot-scope="evenIndex">
                <el-input v-if="changeStatusFlag" size="small" class="el-table-input"
                          v-model="friendDealerSet[evenIndex.$index].name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="类型" header-align="center">
              <template slot-scope="evenIndex">


                <a href="javascript:;" @click="selectType(evenIndex.$index)"> {{
                  !friendDealerSet[evenIndex.$index].typeValue ? '选择' :
                  friendDealerSet[evenIndex.$index].typeValue}}</a>
                <!--<el-input v-if="changeStatusFlag" size="small" class="el-table-input"-->
                <!--v-model="friendDealerSet[evenIndex.$index].typeValue"></el-input>-->


              </template>

            </el-table-column>
            <el-table-column label="时间" header-align="center">
              <template v-if="changeStatusFlag" slot-scope="evenIndex">

                <!--<span v-if="provideDate">{{formatDate(provideDate)}}</span>-->

                <!--<input v-on:click="openPicker"-->
                <!--type="button" :value="'选择日期'">-->
                <a href="javascript:;" @click="openPicker(evenIndex.$index)"> {{
                  !friendDealerSet[evenIndex.$index].activityDate ? '选择日期' :
                  friendDealerSet[evenIndex.$index].activityDate}}</a>

                <!--<el-input v-if="" size="small" class="el-table-input"-->
                <!--v-model="friendDealerSet[evenIndex.$index].activityDate"></el-input>-->
              </template>
            </el-table-column>
            <el-table-column label="备注" header-align="center">
              <template slot-scope="evenIndex">
                <el-input v-if="changeStatusFlag" size="small" class="el-table-input"
                          v-model="friendDealerSet[evenIndex.$index].content"></el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="50" v-if="changeStatusFlag">
              <template slot-scope="evenIndex">
                <el-button @click.native.prevent="saveFriend(evenIndex.$index, friendDealerSet)" type="text"
                           size="small">
                  保存
                </el-button>
                <!--<el-table :data="friendDealerSet" :border="true" :highlight-current-row="true" max-height="250" >-->
                <!--<el-table-column fixed="left" prop="name" label="友商名称"></el-table-column>-->
                <!--<el-table-column prop="typeValue" label="活动类型"></el-table-column>-->
                <!--<el-table-column prop="activityDate" label="活动时间"></el-table-column>-->
                <!--<el-table-column prop="content" label="活动内容"></el-table-column>-->
                <!--</el-table>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="ModuleContainer" v-if="businessChance.optionGroup">
      <p class="newTitle">
        <span class="topModuleTitle">审批</span>
      </p>
      <div class="mint-cell-swipe-buttongroup mint-cell-full">
        <div style="text-align: center;">
          <!--<el-input-->
          <!--class="view"-->
          <!--size="small"-->
          <!--placeholder="请输入审批意见"-->
          <!--prefix-icon="el-icon-edit"-->
          <!--v-model="comments">-->
          <!--</el-input>-->
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入审批意见"
            v-model="comments">
          </el-input>
        </div>
        <!--<div class="mint-cell-swipe-buttongroup">-->
        <!--<input v-for="(option,index) in businessChance.optionGroup" v-bind:key="index" v-on:click="optionClick(option.name)" type="button" :value="option.content">-->
        <!--</div>-->
      </div>
      <div class="mint-cell-swipe-buttongroup mint-cell-full">
        <input v-for="(option,index) in businessChance.optionGroup" v-bind:key="index"
               v-on:click="optionClick(option.name)" type="button" :value="option.content">
      </div>
    </div>
    <el-button v-if="fromTodo > 0" v-on:click="backToDo" class="contentButton"><span><i class="el-icon-back"
                                                                                        style="font-weight: 700;"></i>返回审批中心</span>
    </el-button>
    <CommentDatails ref="CommentDatails" v-if="isShow" :title="'商机跟踪'" fkType="BUSINESS_CHANCE" :fkId="businessChanceId"
                    :addTitle="'添加'"></CommentDatails>
    <ApprovalLog v-if="isShow" ref="approvalLog" :title="'审批日志'" :fkType="'BUSINESS_CHANCE'"
                 :fkId="businessChanceId"></ApprovalLog>
    <DialogRepicker v-if="isShowFriend" :title="'选择友商'" :url="'/api/member/page'" :showCol="showFriend"
                    :field="friendName" @selectedValue="handleFriendSelected"></DialogRepicker>
    <DialogRepicker v-if="isShowMember" :title="'选择友商'" :url="'/api/member/page'" :showCol="showMember"
                    :field="fieldName" @selectedValue="handleMemberSelected"></DialogRepicker>
    <DialogRepicker v-if="selectVisible" :title="'选择负责人'" :url="'/api/operator/page'" :showCol="showCol" :field="field"
                    @selectedValue="handleOperatorSelected"></DialogRepicker>
    <SelectRepicker v-if="selectVisibleSingle" :title="'修改商机阶段'" :label="'value'" :options="chanceStatus"
                    @efferent="handleStatusSelected"></SelectRepicker>


    <SelectRepicker v-if="selectTypeSingle" :title="'选择友商活动类型'" :label="'value'" :options="typeStatusList"
                    @efferent="handleTypeSelected"></SelectRepicker>


    <mt-datetime-picker
      ref="picker"
      type="date"
      @confirm="currentActivityDate"
      v-model="activityDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
    >
    </mt-datetime-picker>

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
  import global from '@/components/Global.vue'
  import * as DateUtils from '../../untils/DateUtils.js'
  export default {
    name: 'BusinessChanceDetail',
    props: [],
    data: function () {
      return {
        isShow: '',
        businessChanceId: -1,
        businessChance: {},
        competitorBehaviorset: [],
        friendDealerSet: [],
        baseInfo: {},
        comments: '',
        isShowMember: '',
        isShowFriend: '',
        selectVisible: false,
        selectVisibleSingle: false,
        selectTypeSingle: false,
        changeStatusFlag: false,
        fromTodo: -1,
        chanceStatus: null,
        showCol: ['oaCode', 'name', 'title'],
        showMember: ['crmNumber', 'orgName', 'arOperator.name'],
        showFriend: ['crmNumber', 'orgName'],
        friendName: 'crmNumber-orgName',
        field: 'oaCode-name-title',
        fieldName: 'crmNumber-orgName',
        accessList: '',
        typeStatusList: null,
        currentFriendIndex: null,
        activityDateIndex: null,
        activityDate: null,
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
    created () {

    },
    mounted () {
      this.baseInfo = this.$route.query
      this.businessChanceId = this.baseInfo.id
      this.fromTodo = this.baseInfo.fromToDo
      // this.$refs.CommentDatails.getList()
      this.isShow = true
      this.isShowMember = false
      this.isShowFriend = false

      this.loadDetail()
    },
    methods: {
      deleteItem(){
        this.$refs.clearSelection.clearSelection()
      },
      dblclickRemove (row, event) {
        console.log(row)
        console.log(event)
      },
      openPicker (index) {
        console.log(index)
        this.activityDateIndex = index
        this.$refs.picker.open()
        // console.log(this.activityDate );

      },
      currentActivityDate (val) {
        console.log(val)
        this.friendDealerSet[this.activityDateIndex].activityDate = this.formatDate(val)
      },
      formatDate (dateStr) {
        return DateUtils.formatToInput(new Date(dateStr))
      },
      refresh () {
        this.$refs.CommentDatails.getList()
      },
      loadDetail () {
        Indicator.open()
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        this.$axios.get('/api/business-chance/detail/' + this.businessChanceId).then((rep) => {
          this.businessChance = rep.data
          console.log(this.businessChance)
          this.competitorBehaviorset = rep.data.competitorBehaviorset
          this.friendDealerSet = rep.data.friendDealerSet
          this.judgeFlag(this.businessChance.principal.id)
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
      },
      judgeFlag (principalId) {
        this.$axios.get('/api/operator/find-login-operator').then((rep) => {
          if (rep.data.id === principalId && this.businessChance.approvalStatusKey === 'assigned') {
            this.changeStatusFlag = true
          }
        })
      },
      optionClick (name) {
        if (name === 'assignPrincipal') {
          this.chooseOperator()
        }
        if (name === 'reject') {
          this.rejectBusiness()
        }
        if (name === 'approve') {
          this.approveBusiness()
        }
        if (name === 'submit') {
          this.submitBusiness()
        }
        if (name === 'close') {
          this.closeBusiness()
        }
        this.$refs.approvalLog.getList()
      },
      changeStatus () {
        if (!this.chanceStatus) {
          this.$axios.get('api/dict/list/business_chance_status').then((rep) => {
            this.chanceStatus = rep.data
          })
        }
        this.selectVisibleSingle = true
      },
      addItem () {
        this.isShowMember = true
      },
      addItemTwo () {
        this.isShowFriend = true
      },
      chooseOperator () {
        this.selectVisible = true
      },
      approveBusiness () {
        let comment = {
          comments: this.comments
        }
        this.$axios.post('api/business-chance/approve/' + this.businessChanceId, comment).then((rep) => {
          this.loadDetail()
        })
      },
      rejectBusiness () {
        let comment = {
          comments: this.comments
        }
        this.$axios.post('api/business-chance/back-business/' + this.businessChanceId, comment).then((rep) => {
          this.loadDetail()
        })
      },
      submitBusiness () {
        let comment = {
          comments: this.comments
        }
        this.$axios.post('api/business-chance/submit-business/' + this.businessChanceId, comment).then((rep) => {
          this.loadDetail()
        })
      },
      closeBusiness () {
        let comment = {
          comments: this.comments
        }
        this.$axios.post('api/business-chance/close-business/' + this.businessChanceId, comment).then((rep) => {
          this.loadDetail()
        })
      },
      selectDialog () {
        this.selectVisible = true
      },
      handleOperatorSelected (visible, data) {
        this.selectVisible = visible
        let comment = {
          comments: this.comments
        }
        if (data) {
          Indicator.open()
          this.$axios.post('api/business-chance/approval-business/' + this.businessChanceId + '/' + data.id, comment).then(() => {
            this.loadDetail()
            Indicator.close()
          }).catch((err) => {
            console.log(err.error.messagessss)
            Indicator.close()
          })
        }
      },
      handleStatusSelected (visible, data) {
        this.selectVisibleSingle = visible
        if (data) {
          this.$axios.put('api/business-chance/change-status/' + this.businessChanceId, data).then(() => {
            this.loadDetail()
          })
        }
      },
      handleMemberSelected (visible, data) {
        this.isShowMember = visible
        let competitorBehavior = {
          member: data['member'],
          abbreviation: data['abbreviation'],
          principalName: '',
          principalJob: '',
          principalTel: '',
          content: ''
        }
        this.competitorBehaviorset.push(competitorBehavior)
      },
      saveCompetitor (scope, data) {
        let row = data[scope]
        let competitor = {
          'businessChance': {
            'id': this.businessChanceId
          },
          'member': row['member'],
          'abbreviation': row['abbreviation'],
          'principalName': row['principalName'],
          'principalJob': row['principalJob'],
          'principalTel': row['principalTel'],
          'content': row['content']
        }
        if (row['id']) {
          competitor['id'] = row['id']
        }

        Indicator.open()
        this.$axios.post('/api/competitor-behavior/create/', competitor).then((rep) => {
          data[scope].id = rep.data.id
          console.log(data[scope])
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
      },
      handleFriendSelected (visible, data) {
        this.isShowFriend = visible
        let friend = {
          member: data['member'],
          name: data['abbreviation'],
          typeValue: '',
          content: '',
          activityDate: ''
        }
        this.friendDealerSet.push(friend)
      },
      saveFriend (evenIndex, data) {
        let row = data[evenIndex]
        let friend = {
          'businessChance': {
            'id': this.businessChanceId
          },
          'member': row['member'],
          'name': row['name'],
          'typeValue': row['typeValue'],
          'content': row['content'],
          'activityDate': row['activityDate']
        }
        if (row['id']) {
          friend['id'] = row['id']
        }
        Indicator.open()
        this.$axios.post('/api/friend-dealer/create/', friend).then((rep) => {
          data[evenIndex].id = rep.data.id
          console.log(data[evenIndex])
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
      },
      backToDo () {
        this.$router.push({path: '/todo-process?&token=' + this.baseInfo.token})
      },
      handleSelectionChange (val) {
        console.log(val)

      },
      selectType (index) {

        console.log('悬着类型')
        console.log(index)
        this.currentFriendIndex = index
        this.$axios.get('/api/dict/list/friend_dealer_type').then((rep) => {
          // data[evenIndex].id = rep.data.id
          // console.log(data[evenIndex])
          console.log(this.typeStatusList)
          this.typeStatusList = rep.data

          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })

        this.selectTypeSingle = true
      },
      handleTypeSelected (isShow, val) {
        this.selectTypeSingle = isShow
        console.log(val)
        this.friendDealerSet[this.currentFriendIndex].typeValue = val['value']

        // for (let i = 0; i < this.friendDealerSet.length; i++) {
        //   if (i === this.currentFriendIndex) {
        //     this.friendDealerSet[i] =
        //   }
        // }
      }
    }
  }
</script>

<style scoped>
  .tb-edit .el-input {
    display: none
  }

  .tb-edit .current-row .el-input {
    display: block
  }

  .tb-edit .current-row .el-input + span {
    display: none
  }

  .el-table-input {
    height: 1.6rem !important;
  }
</style>
