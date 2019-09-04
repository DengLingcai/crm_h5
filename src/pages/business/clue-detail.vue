<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">线索详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>线索编号</th>
          <td>{{clue.clueNumber}}</td>
        </tr>
        <tr>
          <th>线索标题</th>
          <td>{{clue.title}}</td>
        </tr>
        <tr>
          <th>线索来源</th>
          <td>{{clue.resourceValue}}</td>
        </tr>
        <tr v-if="isActivity">
          <th>关联活动</th>
          <td>
            <span v-if="clue.marketActivity">{{clue.marketActivity.title}}</span>
          </td>
        </tr>
        <tr v-if="isIntelligence">
          <th>关联情报</th>
          <td>
            <span v-if="clue.intelligenceItem">{{clue.intelligenceItem.content}}</span>
          </td>
        </tr>
        <tr v-if="isOldMember">
          <th>老客户</th>
          <td>
            <span v-if="clue.oldMember">{{clue.oldMember.abbreviation}}</span>
          </td>
        </tr>
        <tr>
          <th>提交人</th>
          <td>
            <span v-if="clue.submitter">
              {{clue.submitter.name}}
            </span>
          </td>
        </tr>
        <tr>
          <th>提交日期</th>
          <td>{{clue.submitDate}}</td>
        </tr>
        <tr>
          <th>客户</th>
          <td>
            <span v-if="clue.member">{{clue.member.abbreviation}}</span>
          </td>
        </tr>
        <tr>
          <th>联系人</th>
          <td>{{clue.memberContactor}} / {{clue.memberContactorPhone}}</td>
        </tr>
        <tr>
          <th>线索阶段</th>
          <td>{{clue.statusValue}}
            <a v-if="changeStatusFlag" href="javascript:;"
               @click="changeStatus">修改</a></td>
        </tr>
        <tr>
          <th>
            重要程度
          </th>
          <td>{{clue.importantValue}}</td>
        </tr>
        <tr>
          <th>
            产品大类
          </th>
          <td>
            <span v-for="(materialType,index) in clue.materialTypes"
                  v-bind:key="index">{{materialType.name}}&nbsp;&nbsp;</span>
          </td>
        </tr>
        <tr>
          <th>
            负责人
          </th>
          <td>
            <span v-if="clue.principal">{{clue.principal.name}}</span>
          </td>
        </tr>
        <tr>
          <th>
            线索内容
          </th>
          <td>{{clue.content}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="clue.attachments" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">相关附件</span>
      </p>
      <AccessList :options="clue.attachments"></AccessList>
    </div>

    <div class="ModuleContainer" v-if="clue.optionGroup">
      <p class="newTitle">
        <span class="topModuleTitle">审批</span>
      </p>
      <div>
        <div class="mint-cell-swipe-buttongroup mint-cell-full">
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
        <div class="mint-cell-swipe-buttongroup mint-cell-full">
          <input v-for="(option,index) in clue.optionGroup" v-on:click="optionClick(option.name)"
                 type="button" :value="option.content">
        </div>
      </div>
    </div>
    <el-button v-if="fromTodo > 0" v-on:click="backToDo" class="contentButton"><span><i
      class="el-icon-back" style="font-weight: 700;"></i>返回审批中心</span></el-button>
    <CommentDatails v-if="isShow" :title="'线索跟踪'" fkType="CLUE" :fkId="clueId" :addTitle="'添加'"></CommentDatails>
    <ApprovalLog v-if="isShow" ref="approvalLog" :title="'审批日志'" :fkType="'CLUE'" :fkId="clueId"></ApprovalLog>

    <DialogRepicker v-if="selectVisible" :title="'选择负责人'" :url="'/api/operator/page'" :showCol="showCol" :field="field"
                    @selectedValue="handleOperatorSelected"></DialogRepicker>
    <SelectRepicker v-if="selectVisibleSingle" :title="'修改线索阶段'" :label="'value'" :options="chanceStatus"
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
    name: 'ClueDetail',
    props: {},
    data: function () {
      return {
        clueId: -1,
        clue: {},
        member: {},
        baseInfo: {},
        comments: '',
        isActivity: false,
        isIntelligence: false,
        isOldMember: false,
        selectVisible: false,
        selectVisibleSingle: false,
        fromTodo: false,
        changeStatusFlag: false,
        chanceStatus: null,
        showCol: ['oaCode', 'name', 'title'],
        field: 'oaCode-name-title',
        isShow: ''
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
      this.clueId = this.baseInfo.id
      this.fromTodo = this.baseInfo.fromToDo
      this.isShow = true
      this.loadDetail()
    },
    methods: {
      loadDetail () {
        Indicator.open()
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        this.$axios.get('/api/clue/detail/' + this.clueId).then((rep) => {
          this.clue = rep.data
          this.member = this.clue.member
          if (this.clue.resourceKey === 'market_activity') {
            this.isActivity = true
            this.isIntelligence = false
            this.isOldMember = false
          } else if (this.clue.resourceKey === 'market_intelligence') {
            this.isActivity = false
            this.isIntelligence = true
            this.isOldMember = false
          } else if (this.clue.resourceKey === 'customer_introduce') {
            this.isActivity = false
            this.isIntelligence = false
            this.isOldMember = true
          }
          this.judgeFlag(this.clue.principal.id)
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
      },

      judgeFlag (principalId) {
        this.$axios.get('/api/operator/find-login-operator').then((rep) => {
          if (rep.data.id === principalId && this.clue.approvalStatus === 'assigned') {
            this.changeStatusFlag = true
          }
        })
      },

      optionClick (name) {
        console.log(name)
        if (name === 'assignPrincipal') {
          this.chooseOperator()
        }
        if (name === 'disable') {
          this.disableClue()
        }
        if (name === 'close') {
          this.closeClue()
        }
        this.$refs.approvalLog.getList()
      },
      changeStatus () {
        console.log(!this.chanceStatus)
        if (!this.chanceStatus) {
          this.$axios.get('api/dict/list/clue_status').then((rep) => {
            this.chanceStatus = rep.data
          })
        }
        this.selectVisibleSingle = true
      },
      disableClue () {
        let comment = {
          comments: this.comments
        }
        this.$axios.post('api/clue/clue-approval-close/' + this.clueId, comment).then((rep) => {
          this.loadDetail()
        })
      },
      closeClue () {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$axios.post('api/clue/clue-close/' + this.clueId, this.comments, config).then((rep) => {
          this.loadDetail()
        })
      },
      chooseOperator () {
        this.selectVisible = true
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
          this.$axios.post('api/clue/clue-approval/' + this.clueId + '/' + data.id, comment).then(() => {
            this.loadDetail()
            this.$refs.approvalLog.getList()
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
          this.$axios.put('api/clue/change-status/' + this.clueId, data).then(() => {
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
