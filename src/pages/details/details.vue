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
          <td><a href="#">晶科能源股份有限公司</a></td>
        </tr>
        <tr>
          <th>汇报日期</th>
          <td>2018-12-12</td>
        </tr>
        <tr>
          <th>AR</th>
          <td>周晓峰</td>
        </tr>
        <tr>
          <th>SR</th>
          <td>李维</td>
        </tr>
        <tr>
          <th>FR</th>
          <td>林可</td>
        </tr>
        <tr>
          <th>提交人</th>
          <td>SR-李维</td>
        </tr>
        <tr>
          <th>今日工作内容</th>
          <td>
            晶科希望从本月60MW的PERC合同开始，执行额度或者账期的部分，目
            前晶科在推6月份的商票，今天沟通
            建议先从国内信用证开始做
          </td>
        </tr>
        <tr>
          <th>
            客户使用反馈
          </th>
          <td>
            反馈我司双面PERC送样，背面存在
            斑白情况，已经请客服去对接，了
            解白斑是否超出我司标准，明天继
            续跟进
          </td>
        </tr>
        <tr>
          <th>
            工作计划
          </th>
          <td>
            持续跟进客户7月份需求变化情况
          </td>
        </tr>
        <tr>
          <th>
            行情报告
          </th>
          <td>
            东磁目前两条在做SE-PERC，一条
            做双面，一条做单面，单面SE效率
            提升0.2%左右，双面SE效率调试不
            太理想，还在继续调试；
          </td>
        </tr>
        <tr>
          <th>附件</th>
          <td>
            <a v-for="(file,index) in fileList" v-bind:key="index" @click="checkContract(file.file)">{{file.name}}</a>
            <a href="http://192.168.1.200:9090/api/file/7332187d946643ef9b8a75e8b21a9fc6" target="_blank">日报附件excel</a>
            <a href="http://192.168.1.200:9090/api/file/821b953a66fa4ff58f35a39443916cf3" target="_blank">日报附件excel</a>
          </td>
        </tr>
        </tbody>
      </table>
      <div style="text-align: center;">
        <el-input
          class="view"
          size="small"
          placeholder="请输入审批意见"
          prefix-icon="el-icon-edit"
          v-model="input">
        </el-input>
      </div>

      <div class="mint-cell-swipe-buttongroup">
        <input type="button" value="退回申请">
        <input type="button" value="审批通过">
      </div>
      <md-contract :visible="contractVisable"
                   :checkFile="checkFile"
                   :showBtns="true"
                   @handleModal="close">
      </md-contract>
    </div>

    <div class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">报价产品</span>
      </p>
      <div class="tableList">
      <el-table :data="tableData" :border="true" :highlight-current-row="true" style="width: 100%" max-height="250" :cellStyle="adjustHeight">
        <el-table-column label="产品分类" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              {{tableData[scope.$index].classification}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="转化率" width="80"></el-table-column>
        <el-table-column prop="number" label="数量" width="80">
        </el-table-column>
        <el-table-column prop="number" label="单价" width="80">
        </el-table-column>
        <el-table-column prop="price" label="小计" width="80">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <CommentDatails :title="'商机跟踪'" fkType="BUSINESS_CHANCE" :fkId="'125'" :addTitle="'添加'"></CommentDatails>
    <ApprovalLog :title="'审批日志'" :fkType="'BUSINESS_CHANCE'" :fkId="'143'"></ApprovalLog>
  </div>
</template>

<script>
import CommentDatails from '../../components/comment/commentDatails'
import ApprovalLog from '../../components/approval/approval-log.vue'
export default {
  name: 'Details',
  data: function () {
    return {
      input: '',
      checkFile: '',
      showPdf: false,
      contractVisable: false,
      checkUrl: 'http://image.cache.timepack.cn/nodejs.pdf',
      isShowNew: false,
      baseInfo: {},
      memberId: '',
      tableData: [{
        classification: '单面PERC',
        rate: '22.1%',
        number: '320000',
        price: 1.85,
        subtotal: '59.2万'

      }, {
        classification: '单面PERC',
        rate: '上海',
        number: '普陀区',
        price: 200333,
        subtotal: '59.2万'
      }],
      comments: {
        articleId: '112913417',
        commentOperate: '写评论',
        commentTile: '评论区',
        commentTitle: '',
        type: 'MARKEND_TREND',
        values: [{
          commentInfo: {
            content: '评论',
            count: 182,
            isActive: true,
            time: '2018-12-29'
          },
          person: {
            headSrc: 'http://crm-cdn-open.huafeng.com/1545996883700staff_icon.png',
            name: '陈伟峰'
          }
        }]
      },
      isShowComment: true,
      fileList: [
        {
          name: '4月10.4MW单晶PERC电池采购合同4-2.pdf',
          file: 'http://192.168.1.200:9090/api/file/3708b36164ac44a3ba6f90b92cd5963d'
        },
        {
          name: '5月10.4MW单晶PERC电池采购合同4-2.pdf',
          file: 'http://image.cache.timepack.cn/nodejs.pdf'
        }
      ]
    }
  },
  components: {
    CommentDatails,
    ApprovalLog
  },
  mounted () {
    this.baseInfo = this.$route.query
  },
  methods: {
    checkContract (file) {
      console.log(this.contractVisable)
      this.checkFile = file
      this.contractVisable = !this.contractVisable
    },
    close () {
      this.contractVisable = false
    },
    deleteRow (scope, data) {
      console.log(scope, data)
    },
    adjustHeight () {
      return 'padding:8px 0'
    }
  }
}
</script>

<style scoped>
</style>
