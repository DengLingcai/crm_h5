<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">铁三角日报<i class="fa fa-quora"></i></span>
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
              <p v-if="daily.arOperator">
                AR-{{daily.arOperator?daily.arOperator.name:''}},SR-{{daily.srOperator?daily.srOperator.name:''}},FR-{{daily.frOperator?daily.frOperator.name:''}}
              </p>
            </td>
          </tr>
          <tr>
            <th>主送人</th>
            <td>
              <p v-if="daily.sendOperators">
                <span v-for="(sendOperator,index) in daily.sendOperators"
                      v-bind:key="index">{{sendOperator.title}}-{{sendOperator.name}}<br/></span>
              </p>
            </td>
          </tr>
          <tr>
            <th>抄送人</th>
            <td>
              <p v-if="daily.copyOperators">
                <span v-for="(copyOperator,index) in daily.copyOperators"
                      v-bind:key="index">{{copyOperator.title}}-{{copyOperator.name}}<br/></span>
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
      <el-table :data="extendOperators" :border="true" :header-cell-style="headerCell" :cell-style="cellStyle" :highlight-current-row="true" max-height="250">
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
      <!--<el-table :data="customerRelationships" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">-->
        <!--<el-table-column fixed="left" prop="linkManOffice.name" label="部门"></el-table-column>-->
        <!--<el-table-column prop="linkMan.name" label="对接人"></el-table-column>-->
        <!--<el-table-column prop="linkMan.duty" label="岗位"></el-table-column>-->
        <!--<el-table-column prop="jobDescription" label="工作描述"></el-table-column>-->
      <!--</el-table>-->
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
      <!--<el-table :data="demandItems" :border="true" :header-cell-style="headerCell" :cell-style="cellStyle" :highlight-current-row="true" max-height="250">-->
        <!--<el-table-column fixed="left" prop="fkName" label="需求对象"></el-table-column>-->
        <!--<el-table-column prop="desp" label="需求描述"></el-table-column>-->
        <!--<el-table-column prop="reply" :formatter="boolFormat" label="是否需要回复"></el-table-column>-->
        <!--<el-table-column prop="operator.name" label="回复人"></el-table-column>-->
        <!--<el-table-column prop="replyDate" label="要求回复截止日期"></el-table-column>-->
        <!--<el-table-column prop="reversion" label="回复信息"></el-table-column>-->
      <!--</el-table>-->
      <!--v-if="isShowComment"-->
      <customerDemand title="客户需求" v-if="isShowComment" :demand="demandItems"></customerDemand>
      <!--<CommentDatails :comments="comments" v-if="isShowComment" :baseInfo="baseInfo"></CommentDatails>-->
    <!--</div>-->
  <!--</div>-->

  <div class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">交付跟踪</span>
    </p>
    <div class="tableList" v-if="iqcDailyItems">
      <el-table :data="iqcDailyItems" :border="true" :header-cell-style="headerCell" :cell-style="cellStyle" :highlight-current-row="true" max-height="250">
        <el-table-column fixed="left" prop="memberFactory" label="客户工厂"></el-table-column>
        <el-table-column prop="erdat" label="发货日期"></el-table-column>
        <el-table-column prop="invoiceQuanity" label="发货数量"></el-table-column>
        <el-table-column prop="result" label="检验结果"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>

  <div class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">产品品质跟踪</span>
    </p>
    <p class="content-p">{{frDaily?frDaily.desp:''}}</p>
    <div v-if="frDaily" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">日报附件</span>
      </p>
      <AccessList :options="frDaily?frDaily.attachments:''"></AccessList>
  </div>
    <div class="tableList">
      <p><a @click="detailPutInfo()">本日投产状况({{tablePutNumber}})</a>
      <a @click="detailCtmInfo()">本日CTM报告({{tableCtmNumber}})</a></p>
  </div>
  </div>

  <div class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">友商产品品质跟踪</span>
    </p>
    <div class="tableList" v-if="frCompetitorDailies">
      <el-table :data="frCompetitorDailies" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
        <el-table-column prop="feedBack" label="客户反馈"></el-table-column>
      </el-table>
    </div>
  </div>

  <div class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">客户产品品质跟踪</span>
    </p>
    <p class="content-p">{{frDaily?frDaily.complain:''}}</p>
  </div>

<div v-if="memberComploint" class="ModuleContainer">
  <p class="newTitle">
    <span class="topModuleTitle">客诉管理</span>
  </p>
  <p class="content-p">{{memberComploint?memberComploint.desp:''}}</p>
  <AccessList :options="complointAtt"></AccessList>
</div>

  <div class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">我提出的改进意见</span>
    </p>
    <p class="content-p">{{daily.advice}}</p>
  </div>

  <div  v-if="daily.showIntelComments" class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">内部意见(对铁三角运行状态的评价)</span>
    </p>
    <p class="content-p">{{daily.comments}}</p>
  </div>

  <div v-if="daily" class="ModuleContainer">
    <p class="newTitle">
      <span class="topModuleTitle">日报附件</span>
    </p>
    <AccessList :options="daily?daily.attachments:''"></AccessList>
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
        <el-table-column prop="content" label="情报内容"></el-table-column>
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
export default
{
  name: 'FrDaily',
  data: function () {
    return {
      showComments: false,
      dailyId: -1,
      frDailyId: -1,
      daily: {},
      member: {},
      frDaily: {},
      extendOperators: [],
      customerRelationships: [],
      iqcDailyItems: [],
      frCompetitorDailies: [],
      frAxProductDailies: [],
      demandItems: [],
      intelligenceItemList: [],
      memberComploint:{},
      complointAtt:[],
      loginOperator: {},
      baseInfo: '',
      tablePutNumber: 0,
      tableCtmNumber: 0,
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
  created(){
    // this.headerCell = {'font-size': '.6rem','background-color':'#f6f6f6','font-weight':'normal','color':'#2c3e50'}
    // this.cellStyle = {'font-size': '.6rem','white-space': 'nowrap','padding':'.3rem 0'}
  },
  create(){

  },
  mounted () {
    this.baseInfo = this.$route.query
    this.dailyId = this.baseInfo.id
    this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
    this.backtodo = this.baseInfo.backtodo
    this.showComments = true
    this.showViewLog = true
    this.loadDetail()
    this.loadIntelligenceItems()
  },
  methods: {
    adjustHeight () {
      return 'padding:8px 0'
    },
    refresh () {
      this.$refs.CommentDatails.getList()
    },
    loadDetail () {
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/daily/detail/' + this.dailyId).then((rep) => {
        this.daily = rep.data
        this.frDaily = rep.data.frDaily
        this.member = rep.data.member
        this.extendOperators = rep.data.extendOperators
        this.customerRelationships = rep.data.customerRelationships
        this.demandItems = rep.data.demandItems
        this.isShowComment = true
        this.frDailyDetail(this.frDaily.id)
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
    frDailyDetail (id) {
      this.$axios.get('/api/daily/fr-detail/' + id).then((rep) => {
        this.frDaily = rep.data
        this.iqcDailyItems = rep.data.iqcDailyItems
        this.frCompetitorDailies = rep.data.frCompetitorDailies
        this.frAxProductDailies = rep.data.frAxProductDailies
        this.frAxProductDailies.forEach(frAxProductDailie => {
          if (frAxProductDailie.type === 'CTM') {
            this.tableCtmNumber++
          } else {
            this.tablePutNumber++
          }
        })
        this.memberComploint = rep.data.memberComploint
        this.findComplointAtt()
        console.log(rep.data)
      }).catch(() => {}
      )
    },
    loadIntelligenceItems () {
      this.$axios.get('/api/link-intelligence-item/list-fkid-fktype/' + this.dailyId + '/DAILY').then((rep) => {
        this.intelligenceItemList = rep.data
      })
    },
    findComplointAtt () {
      this.$axios.get('/api/attachment/list/COMPLOINT_DAILY/'+this.memberComploint.id).then((rep) => {
      this.complointAtt = rep.data
    })
    },
    detailPutInfo() {
      document.location = 'http://action:2013?customreid=' + this.member.id + "&subId=4&pagetype=2005"
    },
    detailCtmInfo() {
      document.location = 'http://action:2013?customreid=' + this.member.id + "&subId=4&pagetype=2005"
    },
    boolFormat (row, column, cellValue) {
      if (cellValue) {
        return '是'
      } else {
        return '否'
      }
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
</style>
