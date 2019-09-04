<template>
  <div>
    <contractHeader :status="contract.status" :time="contract.lastModifiedDate"></contractHeader>
    <contractTarget :company="company" :baseInfo="baseInfo" :id="id" :orderId="orderId" :startTime="startTime" :contract="contract" :abbreviations="abbreviations"
    :endTime="endTime"></contractTarget>
    <contractBase :contract="contract" :isShowProfitForecasts="isShowProfitForecasts"></contractBase>
    <contractList :order-infos="orderInfos" :status="status" @uploadList="accept" :contract = "contract"></contractList>

    <div>
      <div style="text-align: center;margin-bottom: 10px;">
        <el-input v-if="financeAttachmentUpdate"
                  class="view"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入财务利润预测"
                  v-model="profitForecast">
        </el-input>
      </div>
      <div style="text-align: center;">
        <el-input v-if="approval"
          class="view"
          type="textarea"
          :rows="2"
          placeholder="请输入审批意见"
          v-model="comments">
        </el-input>
      </div>
      <div class="mint-cell-swipe-buttongroup">
        <input v-for="(option,index) in contract.optionGroup" v-if="option.name!=='update'"
               v-bind:key="index" v-on:click="confirm(option.name)"
               type="button" :value="option.content">
      </div>
      <div class="mint-cell-swipe-buttongroup" v-if="fromTodo > 0">
        <el-button v-on:click="backToDo" class="contentButton-full"><span><i class="el-icon-back" style="font-weight: 700;"></i>返回审批中心</span></el-button>
      </div>
    </div>

    <el-dialog :title="commentTitle" :visible.sync="dialogFormVisible" width="80%" open="openDialog">
      <el-form>
        <el-form-item label="内容:">
          <el-input type="textarea" v-model="logDetail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitLog">确 定</el-button>
      </div>
    </el-dialog>

    <contractFooter :details="details"></contractFooter>
    <div class="ModuleContainer" v-if="tableData.length > 0">
      <p class="newTitle">
        <span class="topModuleTitle">付款计划</span>
      </p>
      <div class="tableList">
        <el-table :showHeader="false" :data="tableData" :border="true" :highlight-current-row="true" style="width: 100%"
                  max-height="250" :cellStyle="adjustHeight">
          <el-table-column prop="time" width="110"></el-table-column>
          <el-table-column prop="rate" width="60">
          </el-table-column>
          <el-table-column prop="type">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div v-if="orderInfos.showPrice" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">商务附件</span>
      </p>
      <AccessList :options="contract.attachments" v-if="contract.attachments && contract.attachments.length>0"></AccessList>
      <AccessList :options="contract.legalAttachmentList"  v-if="contract.legalAttachmentList && contract.legalAttachmentList.length>0"></AccessList>
    </div>

    <div v-if="contract.handAttachmentList && contract.handAttachmentList.length>0" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">交付附件</span>
      </p>
      <AccessList :options="contract.handAttachmentList"></AccessList>
    </div>
    <div v-if="contract.financeAttachmentList && isShowProfitForecasts && contract.financeAttachmentList.length>0" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">利润预测附件</span>
      </p>
      <AccessList :options="contract.financeAttachmentList"></AccessList>
    </div>

    <ApprovalLog v-if="showComments" ref="approvalLog" :title="'审批日志'" :fkType="approvalFkType" :fkId="id"></ApprovalLog>

  </div>
</template>

<script>
import {Indicator, Toast} from 'mint-ui'
import contractHeader from '../../components/contract/contractHeader'
import contractTarget from '../../components/contract/contractTarget'
import contractBase from '../../components/contract/contractBase'
import contractList from '../../components/contract/contractList'
import contractFooter from '../../components/contract/contractFooter'
import * as Time from '../../untils/utils'
import * as AccessUrl from '@/untils/urlUtils'
import CommentDatails from '@/components/comment/commentDatails'
import AccessList from '@/components/access-list/access-list.vue'
import ApprovalLog from '../../components/approval/approval-log.vue'

export default {
  name: 'contract-details',
  data: function () {
    return {
      baseInfo: {},
      id: '',
      uploadLists: '',
      orderId: '',
      date: Time.getTime(new Date()),
      status: '',
      successTime: Time.getdetailTime(new Date(1527326419000)),
      startTime: Time.getTime(new Date(1027326419000)),
      endTime: Time.getTime(new Date(1627326419000)),
      isShowList: false,
      isShowTitle: false,
      isShowAddress: false,
      isShowFooter: false,
      orgCnmuber: '',
      company: {},
      orderInfos: {
        id: 0,
        values: []
      },
      dialogFormVisible: false,
      logDetail: '',
      orderDefault: {},
      authBean: {},
      backtodo: false,
      backRelease: false,
      rid: 0,
      remark: '',
      tableData: [],
      contractVisable: false,
      checkFile: '',
      fileList: [],
      details: [],
      urlAddress: 'd57cdde140b64494b79c46077041247e',
      contract: '',
      showComments: false,
      comments: '',
      fromTodo: false,
      approval: false,
      abbreviations: [],
      commentUrl: '',
      commentTitle: '',
      approvalFkType: '',
      profitForecast: '',
      financeAttachmentUpdate: false, //当前是否为财务专员审核
      isShowProfitForecasts: false,
      foreignTrade: false
    }
  },
  created: function () {
    this.baseUrl = window.location.origin
    this.orderInfos = {}
    this.company = [{
      'companyAddress': '平望小于开发区',
      'companyName': '苏州嘉信宇纺织有限公司',
      'isCollect': false,
      'orderId': 120457333,
      'receiver': '王',
      'receiverPhoneNum': '18862353222'
    }]
    this.isShowList = true
    this.orgCnmuber = '104504'
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.id = this.baseInfo.id
    this.fromTodo = this.baseInfo.fromToDo
    this.loadDetail()
  },
  methods: {
    loadDetail () {
      Indicator.open()
      this.approval = false
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/contract-approval/detail/' + this.id).then((rep) => {
        this.contract = rep.data
        this.showComments = true
        this.financeAttachmentUpdate = false
        this.abbreviations = this.contract.abbreviation.split(',')
        if (this.contract.optionGroup) {
          this.contract.optionGroup.forEach(option => {
            if (option.content.indexOf('退回') || option.content.indexOf('通过')) {
              this.approval = true
            }
            if (option.name === 'business_approve' && this.contract['businessIdentifier'] === 'FINANCE_COMMISSIONER') {
              this.financeAttachmentUpdate = true
            }
          })
        }
        if (this.contract.saleOrganizationKey === '1100' || this.contract.saleOrganizationKey === '2100' || this.contract.saleOrganizationKey === '5100') {
          this.foreignTrade = true
        } else {
          this.foreignTrade = false
        }
        this.orderInfos = {
          'id': this.contract.id,
          'values': this.contract.contractItems,
          'totalAmount': this.contract.mobileTotalAmount,
          'showPrice': this.contract.autoBean.price,
          'currencyKey': this.contract.currencyKey,
          'assortValue': this.contract.assortValue,
          'foreignTrade': this.foreignTrade
        }
        this.isShowProfitForecasts = this.contract.autoBean.profitForecasts
        console.log(this.isShowProfitForecasts)
        if (this.contract.autoBean.price) {
          this.approvalFkType = 'CONTRACT_BUSINESS,CONTRACT_FILL,CONTRACT_COLLECT'
        } else {
          this.approvalFkType = 'CONTRACT_FILL'
        }
        let contactClassName = ''
        if (this.contract.assortValue === '合同') {
          contactClassName = '合同编号'
        } else {
          contactClassName = '协议编号'
        }
        this.details = [
          {title: contactClassName, value: this.contract.crmNumber},
          {title: '销售组', value: this.contract.saleGroupValue},
          {title: '货币', value: this.contract.currencyValue},
          {title: '贸易条款', value: this.contract.tradingTermsValue},
          {title: '销售经理', value: this.contract.operatorName},
          {title: '最晚发货日期', value: this.contract.deliveryDate},
          {title: '国家', value: this.contract.landx},
          {title: '备注', value: this.contract.remark}
        ]

        this.$axios.get('/api/contract/detail-receipt-plan/' + this.id).then((rep) => {
          for (let item of rep.data) {
            this.tableData.push({
              time: item.planDate,
              rate: item.payRadio + '%',
              type: item.payWayValue
            })
          }
        })

        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },
    adjustHeight () {
      return 'padding:8px 0'
    },
    checkContract (file) {
      this.checkFile = file
      this.contractVisable = !this.contractVisable
    },
    close () {
      this.contractVisable = false
      Indicator.close()
    },
    cancel () {
      Indicator.open()
      this.$axios.get('api/contract/contract-cancel/' + this.orderInfos.id).then((res) => {
        Toast('操作成功')
        this.loadDetail()
        Indicator.close()
      }).catch((err) => {
        console.log(err)
        Indicator.close()
      })
    },
    commitSaveContract () {
      Indicator.open()
      this.$axios.post('api/contract-approval/init-commit/' + this.orderInfos.id,'').then((res) => {
        Toast('操作成功')
        this.loadDetail()
        Indicator.close()
      }).catch((err) => {
        console.log(err)
        Indicator.close()
      })
    },
    confirm (name) {
      if (name === 'commit_fill') {
        this.initCommit('api/contract-approval/init-commit-fill/')
      } else if (name === 'commit_business') {
        this.initCommit('api/contract-approval/init-commit-business/')
      } else if (name === 'commit_collect') {
        this.initCommit('api/contract-approval/commit-collect/')
      } else if (name === 'commitSap') {
        this.commitSap()
      } else if (name === 'cancel') {
        this.cancel()
      } else if (name === 'commitApproval') {
        this.commitSaveContract()
      } else if (name === 'stop') {
        this.commentUrl = '/api/contract/contract-stop/'
        this.commentTitle = '请输入终止原因'
        this.openDialog()
      } else if (name === 'roll_back') {
        this.commentUrl = '/api/contract/contract-back/'
        this.commentTitle = '请输入撤回原因'
        this.openDialog()
      }else {
        this.commitApproval(name)
      }
      this.$refs.approvalLog.getList()
    },
    commitApproval (name) {
      Indicator.open()
      let url = null
      let operationType = null
      if (name === 'quality_approve') {
        operationType = 'APPROVE'
        url = 'api/contract-approval/handle-fill-operation/'
      } else if (name === 'quality_reject') {
        operationType = 'REJECT'
        url = 'api/contract-approval/handle-fill-operation/'
      } else if (name === 'collect_approve') {
        operationType = 'APPROVE'
        url = 'api/contract-approval/handle-collect-operation/'
      } else if (name === 'collect_reject') {
        operationType = 'REJECT'
        url = 'api/contract-approval/handle-collect-operation/'
      } else if (name === 'business_approve') {
        operationType = 'APPROVE'
        url = 'api/contract-approval/handle-business-operation/'
      } else if (name === 'business_reject') {
        operationType = 'REJECT'
        url = 'api/contract-approval/handle-business-operation/'
      }
      let contractApprovalBean = {
        'comment': this.comments
      }
      if (this.financeAttachmentUpdate) {
        contractApprovalBean.profitForecast = this.profitForecast
        contractApprovalBean.financeAttachmentUpdate = 'X'
      }
      this.$axios.post(url + this.orderInfos.id + '/' + operationType, contractApprovalBean).then((res) => {
        Toast('操作成功')
        this.loadDetail()
        Indicator.close()
      }).catch((err) => {
        console.log(err)
        Indicator.close()
      })
    },
    initCommit (url) {
      Indicator.open()
      let contractApprovalBean = {
        'comment': this.comments
      }
      this.$axios.post(url + this.orderInfos.id, contractApprovalBean).then((res) => {
        Toast('操作成功')
        this.loadDetail()
        Indicator.close()
        console.log(res)
      }).catch((err) => {
        console.log(err)
        Indicator.close()
      })
    },
    commitSap () {
      Indicator.open()
      this.$axios.get('api/contract/commit-sap/' + this.orderInfos.id).then((res) => {
        Toast('操作成功')
        this.loadDetail()
        Indicator.close()
      }).catch((err) => {
        console.log(err)
        Indicator.close()
      })
    },
    commitLog () {
      let comment = {
        'cancelCommen': this.logDetail
      }
      this.$axios.post(this.commentUrl + this.orderInfos.id, comment).then((rep) => {
        Toast('操作成功')
        this.loadDetail()
      }).catch(() => {
      })
      this.dialogFormVisible = false
    },
    accept (data) {
      console.log(data)
    },
    formatUrl (data) {
      return AccessUrl.getAccessUrl(data)
    },
    backToDo () {
      this.$router.push({path: '/todo-process?&token=' + this.baseInfo.token})
    },
    openDialog () {
      this.logDetail = ''
      this.dialogFormVisible = true
    }
  },
  components: {
    ApprovalLog,
    contractHeader,
    contractTarget,
    contractBase,
    contractFooter,
    contractList,
    CommentDatails,
    AccessList
  }
}
</script>
<style>
  .mint-indicator-wrapper {
    z-index: 999
  }

  .list-block .item-content .item-inner {
    background-image: none;
    padding: 0.8rem 0 0 0;
  }

  .list-block ul {
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
  }

  .list-block {
    margin: 0.5rem 0.5rem 0 0.5rem;
  }

  .list-block .item-content {
    padding-left: 0;
  }

  ul.annex {
    padding: 0 1rem;
    text-align: left;
  }

  ul.annex li {
    list-style: none;
  }

  ul.annex li a {
    font-size: .7rem;
  }

  .circle-list {
    display: block;
    float: left;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #409eff;
    position: absolute;
    top: 4px;
    left: .7rem;
  }
</style>
