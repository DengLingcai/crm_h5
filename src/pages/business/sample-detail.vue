<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">送样申请详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>样片申请编号</th>
          <td>{{sample.sampleNum}}</td>
        </tr>
        <tr>
          <th>送样申请标题</th>
          <td>{{sample.title}}</td>
        </tr>
        <tr>
          <th>审批状态</th>
          <td>{{sample.statusDesp}} - {{sample.approvalStatusDesp}}</td>
        </tr>

        <tr>
          <th>客户</th>
          <td>{{sample.member?sample.member.abbreviation:''}}</td>
        </tr>
        <tr>
          <th>销售区域</th>
          <td>{{sample.salesAreaValue}}</td>
        </tr>
        <tr>
          <th>申请人</th>
          <td>{{sample.operator?sample.operator.name:''}}</td>
        </tr>
        <tr>
          <th>销售经理</th>
          <td>{{sample.arOperator?sample.arOperator.name:''}}</td>
        </tr>
        <tr>
          <th>申请日期</th>
          <td>{{sample.applicateDate}}</td>
        </tr>
        <tr>
          <th>是否收费</th>
          <td>{{sample.free ? '是':'否'}}</td>
        </tr>
        <tr>
          <th>收费样片合同号</th>
          <td>{{sample.contractNum}}</td>
        </tr>
        <tr>
          <th>客户收件人</th>
          <td>{{sample.recipient}}</td>
        </tr>
        <tr>
          <th>收件地址</th>
          <td>{{sample.address}}</td>
        </tr>
        <tr>
          <th>收件人电话</th>
          <td>{{sample.addresseePhone}}</td>
        </tr>
        <tr>
          <th>送样次数</th>
          <td>{{sample.sendTimesValue}}</td>
        </tr>
        <tr>
          <th>本月累计免费样品数量</th>
          <td>{{sample.monthFreeNum}}</td>
        </tr>
        <tr>
          <th>样片合计数量</th>
          <td>{{sample.totalCount}}</td>
        </tr>
        <tr>
          <th>送样类型</th>
          <td>{{sample.sampleTypeValue}}</td>
        </tr>
        <tr>
          <th>是否量产</th>
          <td>{{sample.massProduction ? '是':'否'}}</td>
        </tr>
        <!--<tr>-->
        <!--<th>是否留样(OA)</th>-->
        <!--<td v-if="sample.nodeIdentifier === 'pinzhibushenpi_yexz' && sample.optionGroup">-->
        <!---->

        <!--</td>-->
        <!--<td>{{sample.reservedSample ? '是':'否'}}</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<th>留样数量(OA)</th>-->
        <!--<td>{{sample.reservedSampleCount}}</td>-->
        <!--</tr>-->
        <tr>
          <th>用途</th>
          <td>
            <span v-for="(sampleApplication,index) in sampleApplications"
                  v-bind:key="index">{{sampleApplication}}、</span>
          </td>
        </tr>
        <tr>
          <th>用途备注</th>
          <td>{{sample.appRemark}}</td>
        </tr>
        <tr>
          <th>关联商机</th>
          <td>{{sample.businessChance == null ? '' :sample.businessChance.title}}</td>
        </tr>
        <tr>
          <th>制样方</th>
          <td>{{sample.producerValue}}</td>
        </tr>
        <tr>
          <th>可靠性测试</th>
          <td>
            <span v-for="(reliabilityTest,index) in reliabilityTests" v-bind:key="index">{{reliabilityTest}}、</span>
          </td>
        </tr>
        <tr>
          <th>可靠性测试备注</th>
          <td>{{sample.reliabilityRemark}}</td>
        </tr>
        <!--<tr>-->
        <!--<th>期望样品提供日期</th>-->
        <!--<td>{{sample.expectProvideDate}}</td>-->
        <!--</tr>-->


        <tr>
          <th>是否留样</th>
          <td v-if="sample.nodeIdentifier === 'pinzhibushenpi_yexz' && sample.optionGroup">
            <el-switch v-model="reservedSample" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <!--<nz-switch v-model="reservedSample" nzCheckedChildren="是" nzUnCheckedChildren="否"></nz-switch>-->
          </td>
          <td v-else>
            {{sample.reservedSample? '是': '否'}}
          </td>
        </tr>
        <tr>
          <th>留样数量</th>
          <td v-if="sample.nodeIdentifier === 'pinzhibushenpi_yexz' && sample.optionGroup">
            <!--[readonly]="!reservedSample"-->
            <!--<input v-if="reservedSample"  type="number" nz-input placeholder="请输入留样数量"-->
            <!--v-model="reservedSampleCount">-->
            <el-input v-if="reservedSample" size="mini" v-model="reservedSampleCount" type="number"
                      placeholder="请输入留样数量"></el-input>
            <!--<span v-if="reservedSample">{{reservedSampleCount}}</span>-->

          </td>
          <td v-else>
            {{sample.reservedSampleCount}}
          </td>
        </tr>
        <tr v-if="!sample.massProduction">
          <th>非量产产品样品预计投产数量</th>
          <td v-if="sample.nodeIdentifier === 'yanfabushenhe'  && sample.optionGroup">
            <el-input type="number" placeholder="预计投产数量"
                      v-model="massProductionCount"></el-input>
          </td>
          <td v-else>
            {{sample.massProductionCount}}
          </td>
        </tr>

        <tr>
          <th>预计样品提供日期</th>

          <td v-if="sample.nodeIdentifier === 'pmcshenpi_xunn'&& sample.optionGroup">
            <mt-datetime-picker
              ref="picker"
              type="date"
              v-model="provideDate"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              :startDate="startDate"
              :endDate="endDate"
            >
            </mt-datetime-picker>
            <span v-if="provideDate">{{formatDate(provideDate)}}</span>

            <input v-on:click="openPicker"
                   type="button" :value="'选择日期'">

          </td>
          <td v-else>
            {{sample.provideDate}}
          </td>
        </tr>
        <tr>

          <th>是否需提前物流准备</th>
          <td v-if="sample.nodeIdentifier === 'pmcshenpi_xunn' && sample.optionGroup">
            <el-switch v-model="logisticsPreparation" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </td>
          <td v-else>
            {{sample.logisticsPreparation? '是': '否'}}
          </td>
        </tr>

        <tr>
          <th>样片制作人员</th>
          <td v-if="sample.trackNodeIdentifier === 'xuanzeyangpianzhizuochulibumen' && sample.optionGroup">
            <span v-if="productOperator">{{productOperator.name}}</span>
            <a href="javascript:;" @click="selectProductOperator()">选择</a>
          </td>
          <td v-else>
            {{sample.productOperator==null ? '' : sample.productOperator.name}}
          </td>
        </tr>

        <tr v-if="sample.nodeIdentifier === '_ALL_DONE'">
          <th>送样投产结果</th>
          <td v-if="sample.trackNodeIdentifier === 'touchanjieguoluru' && sample.optionGroup">
            <span v-if="massProductionResult">{{massProductionResult.value}}</span>
            <a href="javascript:;" @click="selectMassProductionResultValue()">选择</a>

          </td>
          <td v-else>
            {{sample.massProductionResultValue}}
          </td>
        </tr>

        <tr v-if="sample.nodeIdentifier === '_ALL_DONE'">
          <th>录入日期</th>
          <td>{{sample.massProductionDate}}</td>
        </tr>

        <tr v-if="sample.nodeIdentifier === '_ALL_DONE'">
          <th>投产结果说明</th>
          <td v-if="sample.trackNodeIdentifier === 'touchanjieguoluru' && sample.optionGroup">
            <el-input size="mini" v-model="massProductionResultRemark" placeholder="请输入"></el-input>
          </td>

          <td v-else>
            {{sample.massProductionResultRemark}}
          </td>

        </tr>

        </tbody>
      </table>
    </div>

    <div class="ModuleContainer" v-if="sampleItem.length">
      <p class="newTitle">
        <span class="topModuleTitle">样片明细</span>
      </p>

      <div class="list_table">
        <table class="order-table" border="1" cellspacing="0">
          <tr v-for="(sampleinfo,index) in sampleItem" :key="index">
            <td style="max-width: 160px;">
              <div style="display: flex;">
                <img :src="pictureUrl" alt="pictureUrl" width="45px" height="45px" style="margin-top: -12px;">
                <div class="production-info">
                  <p class="newline">{{sampleinfo.productName}}</p>
                  <p>料号：{{sampleinfo.materialNum?sampleinfo.materialNum:'无'}}</p>
                  <p v-if="sampleinfo.remark" style="font-weight: bold" class="newline">备注：{{sampleinfo.remark}}</p>
                </div>
              </div>
            </td>
            <td style="text-align: left;padding: 10px 10px;">
              <p>功率(W)：{{sampleinfo.efficiencyConvertManual?sampleinfo.efficiencyConvertManual:''}}</p>
              <p>效率：{{sampleinfo.effectiveness}}</p>
              <p>单位：{{sampleinfo.unitValue}}</p>
              <p>数量：{{sampleinfo.amount}}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="ModuleContainer" v-if="historySamples.length">
      <p class="newTitle">
        <span class="topModuleTitle">历史送样</span>
      </p>
      <div class="tableList">
        <el-table :data="historySamples" :header-cell-style="headerCell" :cell-style="cellStyle" :border="true" :highlight-current-row="true" max-height="250">
          <el-table-column fixed="left" prop="title" label="名称"></el-table-column>
          <el-table-column prop="massProductionResultValue" label="送样结果"></el-table-column>
          <el-table-column prop="massProductionResultRemark" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ModuleContainer" v-if="sample.attachmentList.length">
      <p class="newTitle">
        <span class="topModuleTitle">附件</span>
      </p>
      <AccessList :options="sample.attachmentList"></AccessList>
    </div>

    <div class="ModuleContainer" v-if="sample.experimentalReport.length">
      <p class="newTitle">
        <span class="topModuleTitle">样片实验报告</span>
      </p>
      <AccessList :options="sample.experimentalReport"></AccessList>
    </div>

    <div class="ModuleContainer" v-if="sample.inspectionReport.length">
      <p class="newTitle">
        <span class="topModuleTitle">样片检验报告</span>
      </p>
      <AccessList :options="sample.inspectionReport"></AccessList>
    </div>

    <div>
      <div class="ModuleContainer" v-if="sampleTwoAttachments">
        <p class="newTitle">
          <span class="topModuleTitle">投产跟踪附件</span>
        </p>
        <AccessList :options="sampleTwoAttachments"></AccessList>
      </div>

    </div>

    <div class="mint-cell-swipe-buttongroup" v-if="sample.optionGroup" style="width: calc(100% - .8rem);">
      <div style="text-align: center;">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入审批意见"
          v-model="comments">
        </el-input>
      </div>
      <div class="mint-cell-swipe-buttongroup" style="width: 100%;">
        <input v-for="(option,index) in sample.optionGroup" v-bind:key="index" v-on:click="optionClick(option.name)"
               type="button" :value="option.content">
      </div>
    </div>
    <el-button v-if="fromTodo > 0" v-on:click="backToDo" class="contentButton" style="width: calc(100% - .8rem);"><span><i
      class="el-icon-back" style="font-weight: 700;"></i>返回审批中心</span></el-button>
    <ApprovalLog v-if="sampleId > 0" ref="approvalLog" :title="'审批日志'" :fkType="'SAMPLE,SAMPLE_TRACK'"
                 :fkId="sampleId"></ApprovalLog>

    <DialogRepicker v-if="selectVisible" :title="'样片制作人员'" :url="'/api/operator/page'" :showCol="showCol" :field="field"
                    @selectedValue="handleOperatorSelected"></DialogRepicker>

    <!--<DialogRepicker v-if="selectMassVisible" :title="'送样投产结果'" :url="'/api/dict/list/mass_production_result'" :showCol="showCol" :field="field"-->
    <!--@selectedValue="handleOperatorSelected"></DialogRepicker>-->

    <SelectRepicker v-if="selectMassVisible" :title="'送样投产结果'" :label="'value'" :options="massProductionResults"
                    @efferent="handleStatusSelected"></SelectRepicker>

  </div>
</template>

<script>
  import {Toast, Indicator} from 'mint-ui'
  import * as DateUtils from '../../untils/DateUtils.js'
  import ApprovalLog from '../../components/approval/approval-log.vue'
  import DialogRepicker from '@/components/dialog-repicker/dialog-repicker'
  import Upload from '@/components/upload/upload.component'
  import AccessList from '@/components/access-list/access-list.vue'
  import SelectRepicker from '@/components/select-repicker/select-repicker.vue'
  import defaultPicture from '../../assets/img/nophoto.png'
  import global from  '@/components/Global.vue'
export default {
  name: 'SampleDetail',
  props: {},
  components: {
    ApprovalLog,
    DialogRepicker,
    Upload,
    AccessList,
    SelectRepicker
  },
  data: function () {
    return {
      sampleId: -1,
      sample: {},
      sampleItem: [],
      historySamples: '',
      reliabilityTests: [],
      sampleApplications: [],
      baseInfo: {},
      comments: '',
      massProductionCount: null, // 非量产产品预计投产数量OA
      reservedSample: true,
      reservedSampleCount: null,
      provideDate: null,
      logisticsPreparation: true,
      productOperator: null,
      experimentalReport: null,
      inspectionReport: null,
      massProductionResult: null,
      massProductionResults: null,
      massProductionResultRemark: null,
      sampleTwoAttachments: null,
      massProductionEdit: false,
      selectVisible: false,
      selectMassVisible: false,
      startDate: new Date(),
      endDate: new Date(new Date().getFullYear() + 10 + '/12/12'),
      showCol: ['oaCode', 'name', 'title'],
      field: 'oaCode-name-title',
      fromTodo: false,
      pictureUrl: '',
      headerCell:global.headerCell,
      cellStyle:global.cellStyle
    }
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.sampleId = this.baseInfo.id
    this.fromTodo = this.baseInfo.fromToDo
    this.pictureUrl = defaultPicture
    this.loadDetail()
  },
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    formatDate (dateStr) {
      return DateUtils.formatToInput(new Date(dateStr))
    },
    loadDetail () {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/sample/detail/' + this.sampleId).then((rep) => {
        console.log(rep.data)
        this.sample = rep.data
        for (let i of this.sample.reliabilityTests) {
          this.reliabilityTests.push(i.reliabilityValue)
        }
        for (let i of this.sample.sampleApplications) {
          this.sampleApplications.push(i.applicationValue)
        }
        if (this.sample.experimentalReport && this.sample.experimentalReport.length > 0) {
          this.experimentalReport = []
          for (let i of this.sample.experimentalReport) {
            this.experimentalReport.push(i)
          }
        }
        if (this.sample.inspectionReport && this.sample.inspectionReport.length > 0) {
          this.inspectionReport = []
          for (let i of this.sample.inspectionReport) {
            this.inspectionReport.push(i)
          }
        }
        if (this.sample.status === 'RECEIVED') {
          this.massProductionEdit = true
        }

        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })

      // 投产附件
      this.$axios.get('/api/attachment/list/SAMPLETWO/' + this.sampleId).then(rep => {
        console.log('--投产结果附件--')
        console.log(rep.data)
        if (rep.data && rep.data.length > 0) {
          this.sampleTwoAttachments = rep.data
        }
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })

      this.$axios.get('/api/sample_item/find-by-sampleId/' + this.sampleId).then((rep) => {
        this.sampleItem = rep.data
        console.log(this.sampleItem)
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })

        this.$axios.get('/api/sample/find-history-sample/' + this.sampleId).then((rep) => {
          this.historySamples = rep.data
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
      },
      optionClick (name) {
        console.log(name + this.sampleId + '-' + this.comments)

        let data = {
          'reservedSample': this.reservedSample, // 是否留样OA
          'reservedSampleCount': this.reservedSampleCount, // 留样数量OA
          'nodeIdentifier': this.sample.nodeIdentifier,
          'trackNodeIdentifier': this.sample.trackNodeIdentifier,
          'massProductionCount': this.massProductionCount, // 非量产产品预计投产数量OA
          'provideDate': this.formatDate(this.provideDate), // 样品预计提供日期OA
          'logisticsPreparation': this.logisticsPreparation, // 是否提前物流准备OA
          'productOperator': this.productOperator, // 样片制作人员
          'experimentalReport': this.experimentalReport, // 样片实验报告
          'inspectionReport': this.inspectionReport, // 样片检验报告
          'massProductionResult': this.massProductionResult, // 投产结果
          'massProductionResultRemark': this.massProductionResultRemark, // 投产结果说明
          'sampleTwoAttachments': this.sampleTwoAttachments // 投产附件
        }

        // if (name === 'save-mass-production') {
        //   if (!data.massProductionResult) {
        //     Toast('请选择投产结果')
        //     return
        //   }
        //
        //   this.$axios.post('api/sample/handle-mass-production-result-update/' + this.sampleId, data).then((rep) => {
        //     Toast('更新成功')
        //     this.loadDetail()
        //     Indicator.close()
        //   }).catch(() => {
        //     Indicator.close()
        //   })
        //   return
        // }

        let node = 'approval'

        if (name === 'approve') {
          if (this.sample.nodeIdentifier === 'pinzhibushenpi_yexz') {
            if (data.reservedSample && data.reservedSampleCount <= 0) {
              Toast('请输入留样数量')
              return
            }
          }

          if (this.sample.nodeIdentifier === 'yanfabushenhe') {
            if (!this.sample.massProduction && !data.massProductionCount) {
              Toast('请输入非量产产品样品预计投产数量')
              return
            }
          }

          if (this.sample.nodeIdentifier === 'pmcshenpi_xunn') {
            if (!this.provideDate) {
              Toast('请选择预计样品提供日期')
              return
            }
          }

          if (this.sample.trackNodeIdentifier === 'xuanzeyangpianzhizuochulibumen') {
            if (!data.productOperator) {
              Toast('请选择样片制作人员')
              return
            }
            node = 'track'
          }

          if (this.sample.trackNodeIdentifier === 'lurushiyanbaogaojianyanbaogao') {
            // if ((!data.experimentalReport || data.experimentalReport.length === 0) && (!data.inspectionReport || data.inspectionReport.length === 0)) {
            Toast('请到电脑端上传实验报告')
            return
            // }
            node = 'track'
          }

          if (this.sample.trackNodeIdentifier === 'lurujianyanbaogao') {
            // if (!data.inspectionReport || data.inspectionReport.length === 0) {
            Toast('请电脑端上传上传检验报告')
            return
            // }
            node = 'track'
          }

          if (this.sample.trackNodeIdentifier === 'fahuoluru' || this.sample.trackNodeIdentifier === 'pmcquerenkucun') {
            node = 'track'
          }

          if (this.sample.trackNodeIdentifier === 'touchanjieguoluru') {
            if (!data.massProductionResult) {
              Toast('请选择投产结果')
              return
            }
            node = 'track'
          }

        }

        let operationType = null
        if (name === 'reject') {
          operationType = 'REJECT'
        } else if (name === 'approve') {
          operationType = 'APPROVE'
        } else if (name === 'commit_approval') {
          operationType = 'INIT_COMMIT'
        } else if (name === 'cancel') {
          operationType = 'CANCEL'
        }

        data.comments = this.comments
        if (node === 'approval') {
          this.$axios.post('api/sample/handle-operation/' + this.sampleId + '/' + operationType, data).then((rep) => {
            Toast('更新成功')
            this.loadDetail()
            this.$refs.approvalLog.getList()
            Indicator.close()
          }).catch(() => {
            Indicator.close()
          })
        }

        if (node === 'track') {
          this.$axios.post('api/sample/handle-track-operation/' + this.sampleId + '/' + operationType, data).then((rep) => {
            Toast('更新成功')
            this.loadDetail()
            this.$refs.approvalLog.getList()
            Indicator.close()
          }).catch(() => {
            Indicator.close()
          })
        }

      },
      changeStatus () {
        console.log(this.sampleId)
        this.loadDetail()
      },
      selectProductOperator () {
        this.selectVisible = true
      },
      handleOperatorSelected (value, data) {
        this.selectVisible = value
        console.log(value, data)
        this.productOperator = data
      },
      handleUpload (data) {
        console.log(data)
        if (!this.experimentalReport) {
          this.experimentalReport = []
        }
        // this.experimentalReport.push(data[0])

        this.loadDetail()
      },

      handleUploadInspectionReport (data) {
        console.log(data)
        if (!this.inspectionReport) {
          this.inspectionReport = []
        }
        // this.inspectionReport.push(data[0])

        this.loadDetail()
      },
      handleUploadSampleTwoAttachments (data) {
        console.log(data)
        // if (!this.this.inspectionReport) {
        //   this.this.inspectionReport = []
        // }
        // this.inspectionReport.push(data[0])

        // this.loadDetail()
        if (!this.sampleTwoAttachments) {
          this.sampleTwoAttachments = []
        }
        for (let i of data) {
          this.sampleTwoAttachments.push(i)
        }
      },
      selectMassProductionResultValue () {
        this.$axios.get('api/dict/list/mass_production_result').then((rep) => {
          this.massProductionResults = rep.data
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
        this.selectMassVisible = true
      },
      handleStatusSelected (value, data) {
        this.selectMassVisible = value
        console.log(value, data)
        this.massProductionResult = data
        // let obj = {
        //   id: this.activityId,
        //   status: data['key'],
        //   statusValue: data['value']
        // }
        // this.productOperator = data
      },
      backToDo () {
        this.$router.push({path: '/todo-process?&token=' + this.baseInfo.token})
      }
    }
  }
</script>
<style scoped>
  .list-block {
    margin: 0.5rem 0.6rem;
  }

  table tr td:nth-of-type(1) {
    overflow: hidden;
    position: relative;
    margin-left: 50%;
    border: none;
    overflow-x: auto;
    /*padding: 0.3rem 0;*/
  }

  table tr td:nth-of-type(1) img {
    float: left;
    position: relative;
    transform: translateY(35%);
    margin: 0 0.5rem;
  }

  table tr td:nth-of-type(1) .production-info {
    text-align: left;
    float: left;
  }

  td p {
    margin: 0;
  }

  .order-table {
    font-size: 0.6rem;
  }

  .order-table td input {
    border: 1px solid #e5e5e5;
    text-align: center;
    height: 1.5rem;
  }

  .list-block ul {
    border-radius: 0.4rem;
  }

  .list-block .item-content {
    padding-left: 0;
  }

  .list-block .item-content .item-inner {
    background-image: none;
    padding: 0 0 0 0;
  }

  .order-infomation .item-inner {
    padding: 0.5rem 0.5rem !important;
  }

  table {
    width: 95%;
    margin: 0 auto;
    font-size: 0.4rem;
    color: #282828;
    text-align: center;
    border: none;
  }

  table tr, table td {
    border: none;
    border: 1px solid #e5e5e5;
  }

  .order-table td button {
    color: #1F4C95;
  }

  .total {
    width: 93%;
    margin: 0.5rem;
    /*float: right;*/
    /*margin-right: 0.5rem;*/
  }

  .total span:nth-of-type(2) {
    color: red;
  }

  .orderInfo {
    text-align: left;
    margin-top: 0.5rem;
  }

  .order-info-icon {
    font-size: 0.8rem !important;
    margin: 0 0.5rem;
  }

  .orderInfo > p:nth-of-type(1) {
    font-size: 0.7rem;
    color: #282828;
    margin-bottom: 0.2rem;
  }

  .confirm {
    border: none;
    border-radius: 2px;
    margin: 0.2rem 0;
  }

  .waitConfirm {
    padding: 0.2rem;
    background-color: rgb(236, 103, 94);
  }

  .alreadyConfirm {
    padding: .1rem .3rem;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #000 !important;
    font-size: .6rem;
    font-weight: 500;
  }

  .disable {
    display: none;
  }

  .orderPrice {
    color: red;
  }

  .haveSubmit {
    justify-content: space-between;
    display: block;
  }

  .haveSubmit button {
    background-color: #26a2ff;
    color: #ffffff;
    border: 0;
    font-size: 0.7rem;
    border-radius: 4px;
    padding: 0.2rem 0.5rem 0.1rem 0.5rem;
  }

  .casue {
    width: 95%;
    margin: 0 0.44rem;
    padding-left: 0.5rem;
    border: 1px solid #e5e5e5;
    border-top: none;
    font-size: 0.6rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background-color: #F5F5F5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: -1px;
  }

  .casue span:nth-of-type(1) {
    /*margin-left: 0.3rem;*/
    color: #8E8E8E;
  }

  .casue span:nth-of-type(2) {
    /*margin-left: 0.3rem;*/
    color: #282828
  }

  .mint-popup-4 {
    width: 100%;
  }

  .total_price {
    font-size: 0.8rem;
    padding-left: 5px;
    text-align: right;
  }

  .list_table {
    overflow-x: scroll;
    margin: 0 0.3rem;
  }

  .order-table th, .order-table td {
    white-space: nowrap;
    /*padding: 0 0.5rem;*/
  }

  .clear {
    clear: both;
  }

  .btn {
    font-size: 0.5rem;
  }

  .backOrder {
    color: #ffffff;
    background-color: #ec675d !important;
  }

  .backtodo {
    text-align: right;
    padding: 19px;
    font-size: 13px;
    color: #0894ec;
    padding-bottom: 9px;
    padding-top: 0px;
  }
</style>
