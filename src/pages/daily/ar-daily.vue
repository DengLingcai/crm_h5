<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">铁三角日报</span>
      </p>
      <table class="details">
        <tbody>
          <tr>
            <th>客户名称</th>
            <td>{{member.abbreviation}}</td>
          </tr>
          <tr>
            <th>汇报日期</th>
            <td>{{daily.createdDate}}</td>
          </tr>
          <tr>
            <th>汇报人</th>
            <td>
              <span v-if="daily.createOperator">{{daily.createOperator?daily.createOperator.name:''}}</span>
            </td>
          </tr>
          <tr>
            <th>核心成员</th>
            <td>
              <span v-if="daily.arOperator">AR-{{daily.arOperator?daily.arOperator.name:''}},SR-{{daily.srOperator?daily.srOperator.name:''}},FR-{{daily.frOperator?daily.frOperator.name:''}}</span>
            </td>
          </tr>
          <tr>
            <th>主送人</th>
            <td>
              <p v-if="daily.sendOperators">
                <span v-for="(sendOperator,index) in daily.sendOperators"
                    v-bind:key="index">{{sendOperator.title}}-{{sendOperator.name}}<br/>
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <th>抄送人</th>
            <td>
              <p v-if="daily.copyOperators">
                <span v-for="(copyOperator,index) in daily.copyOperators"
                    v-bind:key="index">{{copyOperator.title}}-{{copyOperator.name}}<br/>
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-button v-if="backtodo > 0" v-on:click="backToDo" class="contentButton" style="width: calc(100% - .8rem);"><span><i class="el-icon-back" style="font-weight: 700;"></i>返回日报中心</span></el-button>
    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">扩展成员</span>
      </p>
      <div class="tableList" v-if="extendOperators">
        <el-table :data="extendOperators" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
        <el-table-column fixed="left" prop="operator.department.name" label="部门"></el-table-column>
        <el-table-column prop="operator.name" label="姓名"></el-table-column>
        <el-table-column prop="assistRole" label="参与角色"></el-table-column>
        <el-table-column prop="assistReason" label="参与目的"></el-table-column>
      </el-table>
    </div>
  </div>

  <div class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">客情管理</span>
    </p>
    <div class="tableList" v-if="customerRelationships">
      <!--<table class="tableList">-->
        <!--<tr>-->
          <!--<th>部门</th>-->
          <!--<th>对接人</th>-->
          <!--<th>岗位</th>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<th colspan="3">工作描述</th>-->
        <!--</tr>-->
        <!--<tbody>-->
        <!--<template v-for="relationShip in customerRelationships">-->
          <!--<tr>-->
            <!--<td>{{relationShip.linkManOffice.name}}</td>-->
            <!--<td>{{relationShip.linkMan.name}}</td>-->
            <!--<td>{{relationShip.linkMan.duty}}</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td colspan="3" class="long-td">-->
              <!--{{relationShip.jobDescription}}-->
            <!--</td>-->
          <!--</tr>-->
        <!--</template>-->
        <!--</tbody>-->
      <!--</table>-->
      <el-steps direction="vertical">
        <el-step v-for="(item,index) in customerRelationships" v-bind:key="index" icon="el-icon-info" :title="item.linkMan.name + item.Office +item.linkMan.duty"
                 :description="item.jobDescription"></el-step>
      </el-steps>
    </div>
  </div>

<!--<div class="ModuleContainer">-->
  <!--<p class="newTitle">-->
    <!--<span class="topModuleTitle">客户需求</span>-->
  <!--</p>-->
  <!--<div class="tableList" v-if="demandItems">-->
    <!--<el-table :data="demandItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">-->
    <!--<el-table-column fixed="left" prop="fkName" label="需求对象"></el-table-column>-->
    <!--<el-table-column prop="desp" label="需求描述"></el-table-column>-->
    <!--<el-table-column prop="reply" :formatter="boolFormat" label="是否需要回复"></el-table-column>-->
    <!--<el-table-column prop="operator.name" label="回复人"></el-table-column>-->
    <!--<el-table-column prop="replyDate" label="要求回复截止日期"></el-table-column>-->
    <!--<el-table-column prop="reversion" label="回复信息"></el-table-column>-->
  <!--</el-table>-->
<!--</div>-->
<!--</div>-->
    <customerDemand title="客户需求" v-if="isShowComment" :demand="demandItems"></customerDemand>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">市场活动策划与组织</span>
      </p>
      <p class="content-p">{{arDaily?arDaily.activityPlanning:''}}</p>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">线索机会点培养及决策链管理</span>
      </p>
      <div class="tableList" v-if="decisionChains">
        <el-table :data="decisionChains" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="type" label="类型"></el-table-column>
          <el-table-column prop="fkName" label="线索/商机"></el-table-column>
          <el-table-column prop="desp" label="描述"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">竞争格局管理</span>
      </p>
      <div class="tableList" v-if="competitorItems">
        <el-table :data="competitorItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="fkName" label="竞争对手"></el-table-column>
          <el-table-column prop="desp" label="描述"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">谈判及合同签订</span>
      </p>
      <div class="tableList" v-if="contractItems">
        <el-table :data="contractItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="fkName" label="合同号"></el-table-column>
          <el-table-column prop="desp" label="进展描述"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">产品方案的适配</span>
      </p>
      <div class="tableList" v-if="programItems">
        <el-table :data="programItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="fkName" label="方案内容"></el-table-column>
          <el-table-column prop="desp" label="适配跟踪效果"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">我提出的改进意见</span>
      </p>
      <p class="content-p">{{daily.advice}}</p>
    </div>

    <div v-if="daily.showIntelComments" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">内部意见(对铁三角运行状态的评价)</span>
      </p>
      <p class="content-p">{{daily.comments}}</p>
    </div>

    <div v-if="daily.attachments" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">日报附件</span>
      </p>
      <AccessList :options="daily.attachments"></AccessList>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">关联情报</span>
      </p>
      <div class="tableList" v-if="intelligenceItemList">
        <el-table :data="intelligenceItemList" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="intelligence.bigCategoryValue" label="情报大类"></el-table-column>
          <el-table-column prop="member.abbreviation" label="关联对象"></el-table-column>
          <el-table-column prop="intelligenceInfoValue" label="信息类别"></el-table-column>
          <el-table-column prop="intelligenceTypeValue" label="情报类型"></el-table-column>
        </el-table>
      </div>
    </div>

    <CommentDatails v-if="showComments" :title="'反馈区'" fkType="DAILY" :fkId="dailyId" :addTitle="'添加'"></CommentDatails>
    <ViewLog ref="CommentDatails" v-if="showViewLog" :title="'浏览记录'" fkType="DAILY" :fkId="dailyId"></ViewLog>
  </div>
</template>

<script >

import AccessList from '@/components/access-list/access-list.vue'
import CommentDatails from '@/components/comment/commentDatails'
import customerDemand from '@/components/customer-demand/customerDemand'
import ViewLog from '@/components/view-log/viewLog'
import global from  '@/components/Global.vue'
export default {
  name: 'ArDaily',
  data: function () {
    return {
      showComments: false,
      dailyId: -1,
      arDailyId: -1,
      daily: {},
      member: {},
      arDaily: {},
      extendOperators: [],
      customerRelationships: [],
      decisionChains: [],
      competitorItems: [],
      contractItems: [],
      programItems: [],
      demandItems: [],
      intelligenceItemList: [],
      loginOperator: {},
      baseInfo: {},
      headerCell:global.headerCell,
      cellStyle:global.cellStyle,
      backtodo:'',
      isShowComment:false,
      showViewLog:false
    }
  },
  components: {
    AccessList,
    CommentDatails,
    customerDemand,
    ViewLog
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.dailyId = this.baseInfo.id
    this.showComments = true
    this.showViewLog = true
    this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
    this.backtodo = this.baseInfo.backtodo
    this.loadDetail()
    this.loadIntelligenceItems()
  },
  methods: {
    boolFormat (row, column, cellValue) {
      if (cellValue) {
        return '是'
      } else {
        return '否'
      }
    },
    adjustHeight () {
      return 'padding:8px 0'
    },
    loadDetail () {
      this.$axios.get('/api/daily/detail/' + this.dailyId).then((rep) => {
        this.daily = rep.data
        this.arDaily = rep.data.arDaily
        this.member = rep.data.member
        this.extendOperators = rep.data.extendOperators
        this.customerRelationships = rep.data.customerRelationships
        this.demandItems = rep.data.demandItems
        this.isShowComment = true
        this.arDailyDetail(this.arDaily.id)
        for(let i= 0;i<this.customerRelationships.length;i++){
          if(this.customerRelationships[i].linkManOffice!==null){
            this.customerRelationships[i].Office = '-' + this.customerRelationships[i].linkManOffice.name + '-'
          }else{
            this.customerRelationships[i].Office = '-'
          }
        }
      }).catch(() => {}
      )
    },
    arDailyDetail (id) {
      this.$axios.get('/api/daily/ar-detail/' + id).then((rep) => {
        this.arDaily = rep.data
        this.decisionChains = rep.data.decisionChains
        this.competitorItems = rep.data.competitorItems
        this.contractItems = rep.data.contractItems
        this.programItems = rep.data.programItems
      }).catch(() => {}
      )
    },
    loadIntelligenceItems () {
      this.$axios.get('/api/link-intelligence-item/list-fkid-fktype/' + this.dailyId + '/DAILY').then((rep) => {
        this.intelligenceItemList = rep.data
      })
    },
    click (event) {
      console.log(event)
    },
    handleClick (tab, event) {
      console.log(tab)
      console.log(event)
    },
    deleteRow (value, data) {
      console.log(value)
      console.log(data)
    },
    intelligenceItemDetail (id) {
      console.log(id)
    },
    backToDo(){
      window.history.back();
    }
  }
}
</script>

<style scoped>
  body {
  background: #fff;
  }

  .card-cover {
  margin: 0;
  border-radius: 0;
  padding: 0 20px 20px;
  }

  .card-border {
  border-bottom: 2px solid #dddddd;
  }

  .is-active {
  border-bottom: 2px solid #dddddd;
  }

  .content-p {
    padding-left: .9rem;
    padding-right: 0.5rem;
    text-align: left;
    font-size: 14px;
  }

  .tableList td, th {
    border:1px solid #ebeef5;
    font-size: 0.7rem;
  }
  .tableList th {
    background-color: rgb(246, 246, 246);
  }
  .tableList .long-td {
    text-align: left;
    padding: 2px 6px;
  }
</style>
