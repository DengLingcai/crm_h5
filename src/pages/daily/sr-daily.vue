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
            <td>{{daily.createOperator?daily.createOperator.name:''}}</td>
          </tr>
          <tr>
            <th>核心成员</th>
            <td>AR-{{daily.arOperator?daily.arOperator.name:''}},SR-{{daily.srOperator?daily.srOperator.name:''}},FR-{{daily.frOperator?daily.frOperator.name:''}}</td>
          </tr>
          <tr>
            <th>主送人</th>
            <td><span v-for="(sendOperator,index) in daily.sendOperators"
                      v-bind:key="index">{{sendOperator.title}}-{{sendOperator.name}}<br/></span></td>
        </tr>
        <tr>
          <th>抄送人</th>
          <td><span v-for="(copyOperator,index) in daily.copyOperators"
                    v-bind:key="index">{{copyOperator.title}}-{{copyOperator.name}}<br/></span></td>
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
  <span class="topModuleTitle">技术交流情况</span>
  </p>
  <div class="tableList">
  <el-table :data="technicalExchangeItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
  <el-table-column fixed="left" prop="fkName" label="客户名称"></el-table-column>
  <el-table-column prop="desp" label="交流内容"></el-table-column>
  </el-table>
  </div>
  </div>

  <div class="ModuleContainer">
  <p class="newTitle">
  <span class="topModuleTitle">公司技术/产品推广</span>
  </p>
  <div class="tableList">
  <el-table :data="productPromotionItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
  <el-table-column fixed="left" prop="productbName" label="产品名称"></el-table-column>
  <el-table-column prop="fkName" label="客户名称"></el-table-column>
  <el-table-column prop="feedBack" label="反馈意见"></el-table-column>
  </el-table>
  </div>
  </div>

  <div class="ModuleContainer">
  <p class="newTitle">
  <span class="topModuleTitle">产品方案的适配</span>
  </p>
  <div class="tableList">
  <el-table :data="productAdaptationItems" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
  <el-table-column fixed="left" prop="daptation" label="方案内容"></el-table-column>
  <el-table-column prop="desp" label="适配跟踪效果"></el-table-column>
  </el-table>
  </div>
  </div>


<div class="ModuleContainer">
  <p class="newTitle">
    <span class="topModuleTitle">我提出的改进意见</span>
  </p>
  <p>{{daily.advice}}</p>
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
  <div class="tableList">
    <el-table :data="intelligenceItemList" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
    <el-table-column fixed="left" prop="intelligence.bigCategoryValue" label="情报大类"></el-table-column>
    <el-table-column prop="member.abbreviation" label="关联对象"></el-table-column>
    <el-table-column prop="intelligenceInfoValue" label="信息类别"></el-table-column>
    <el-table-column prop="intelligenceTypeValue" label="情报类型"></el-table-column>
    <el-table-column prop="content" label="情报内容"></el-table-column>
  </el-table>
</div>
</div>

<!--<div class="ModuleContainer">-->
  <!--<p class="newTitle">-->
    <!--<span class="topModuleTitle">反馈区</span>-->
  <!--</p>-->
  <!--<div class="tableList">-->
    <!--<CommentDatails ref="CommentDatails" :title="'SR日报'" fkType="DAILY" :fkId="dailyId" :addTitle="'新评论'"></CommentDatails>-->
<!--</div>-->
<!--</div>-->
    <CommentDatails ref="CommentDatails" v-if="showComments" :title="'反馈区'" fkType="DAILY" :fkId="dailyId" :addTitle="'新评论'"></CommentDatails>
    <ViewLog ref="CommentDatails" v-if="showViewLog" :title="'浏览记录'" fkType="DAILY" :fkId="dailyId"></ViewLog>
</div>
</template>

<script >
import AccessList from '@/components/access-list/access-list.vue'
import CommentDatails from '@/components/comment/commentDatails'
import customerDemand from '@/components/customer-demand/customerDemand'
import ViewLog from '@/components/view-log/viewLog'
import global from  '@/components/Global.vue'
export
default
{
  name: 'SrDaily',
  data: function () {
    return {
      isShow: '',
      dailyId: -1,
      srDailyId: -1,
      daily: {},
      member: {},
      srDaily: {},
      extendOperators: [],
      customerRelationships: [],
      technicalExchangeItems: [],
      productPromotionItems: [],
      productAdaptationItems: [],
      demandItems: [],
      intelligenceItemList: [],
      loginOperator: {},
      baseInfo: {},
      headerCell:global.headerCell,
      cellStyle:global.cellStyle,
      backtodo:'',
      showViewLog:false,
      showComments:false
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
    this.showViewLog  = true
    this.backtodo = this.baseInfo.backtodo
    this.isShow = false
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
        this.srDaily = rep.data.srDaily
        this.member = rep.data.member
        this.extendOperators = rep.data.extendOperators
        this.customerRelationships = rep.data.customerRelationships
        this.demandItems = rep.data.demandItems
        this.isShowComment = true
        this.srDailyDetail(this.srDaily.id)
        for(let i= 0;i<this.customerRelationships.length;i++){
          if(this.customerRelationships[i].linkManOffice!==null){
            this.customerRelationships[i].Office = '-' + this.customerRelationships[i].linkManOffice.name + '-'
          }else{
            this.customerRelationships[i].Office = '-'
          }
        }
        console.log(rep.data)
      }).catch(() => {}
      )
    },
    srDailyDetail (id) {
      this.$axios.get('/api/daily/sr-detail/' + id).then((rep) => {
        this.srDaily = rep.data
        this.technicalExchangeItems = rep.data.technicalExchangeItems
        this.productPromotionItems = rep.data.productPromotionItems
        this.productAdaptationItems = rep.data.productAdaptationItems
        console.log(rep.data)
      }).catch(() => {}
      )
    },
    loadIntelligenceItems () {
      this.$axios.get('/api/link-intelligence-item/list-fkid-fktype/' + this.dailyId + '/DAILY').then((rep) => {
      this.intelligenceItemList = rep.data
    })
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
  .content-p {
    padding-left: .9rem;
    padding-right: 0.5rem;
    text-align: left;
    font-size: 14px;
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

</style>
