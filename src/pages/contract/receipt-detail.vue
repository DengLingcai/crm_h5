<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">收款详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>收款编号</th>
          <td>{{receipt.number}}</td>
        </tr>
        <tr>
          <th>客户名</th>
          <td>{{receipt.memberName}}</td></tr>
        <tr>
          <th>客户编号</th>
          <td>{{receipt.memberNumber}}</td>
        </tr>
        <tr>
          <th>收款金额</th>
          <td>{{receipt.amount}}</td>
        </tr>
        <tr>
          <th>收款方式</th>
          <td>{{receipt.receiptTypeValue}}</td>
        </tr>
        <tr>
          <th>收款日期</th>
          <td>{{receipt.receiptDate}}</td>
        </tr>
        <tr>
          <th>备注</th>
          <td>{{receipt.remark}}</td>
        </tr>
        </tbody>
      </table>

    </div>

    <div class="ModuleContainer" style="position: relative;" v-if="receipt.status === 'ACCOUNT'">
      <p class="newTitle">
        <span class="topModuleTitle">已分解到如下合同</span>
      </p>
      <button class="button addList" @click="addItem">
        <span class="fa fa-pencil-square-o"></span><span>添加</span></button>
      <div class="tableList">

        <el-table :data="receiptContracts" :border="true" :highlight-current-row="true" max-height="250" >
          <el-table-column prop="contractNumber" label="合同号"></el-table-column>
          <el-table-column prop="totalAmount" label="合同金额">
          </el-table-column>
          <el-table-column label="分配金额">
            <template slot-scope="scope">
              <el-input v-model="receiptContracts[scope.$index].amount"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="receiptContracts[scope.$index].remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作"  width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="saveRow(scope.$index, receiptContracts)" type="text" size="small">
                保存
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, receiptContracts)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>

    <DialogRepicker v-if="isShow" :title="'选择合同'" :url="contractUrl" :showCol="showCol" :field="field" @selectedValue="handleContractSelected"></DialogRepicker>
  </div>

</template>

<script>

import { Indicator, Toast } from 'mint-ui'
import CommentDatails from '@/components/comment/commentDatails'
import ApprovalLog from '../../components/approval/approval-log.vue'
import DialogRepicker from '@/components/dialog-repicker/dialog-repicker.vue'
import SelectRepicker from '@/components/select-repicker/select-repicker.vue'
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
import AccessList from '@/components/access-list/access-list.vue'
import ElInput from '../../../node_modules/element-ui/packages/input/src/input.vue'
export default {
  name: 'ReceiptDetail',
  props: [],
  data: function () {
    return {
      isShow: '',
      selectVisible: false,
      selectVisibleSingle: false,
      receipt: {},
      baseInfo: {},
      receiptId: -1,
      showCol: ['crmNumber', 'name', 'abbreviation', 'memberNumber'],
      field: 'crmNumber-sapNumbers-memberName',
      receiptContracts: [],
      contractUrl: ''
    }
  },
  components: {
    ElInput,
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
    this.receiptId = this.baseInfo.id
    this.loadDetail()
  },
  methods: {
    refresh () {
      this.$refs.CommentDatails.getList()
    },
    loadDetail () {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/receipt/detail/' + this.receiptId).then((rep) => {
        this.receipt = rep.data
        this.contractUrl = '/api/contract/page-member/' + this.receipt.meId
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
      this.$axios.get('/api/receipt/detail-receipt-contract/' + this.receiptId).then((rep) => {
        const receiptContract = rep.data
        for (let i = 0; i < receiptContract.length; i++) {
          const obj = {
            'contractNumber': receiptContract[i].contractNumber,
            'assign': receiptContract[i].assign,
            'totalAmount': receiptContract[i].contract.totalAmount,
            'amount': receiptContract[i].amount,
            'contractId': receiptContract[i].contract.id,
            'remark': receiptContract[i].remark,
            'id': receiptContract[i].id
          }
          this.receiptContracts.push(obj)
        }
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },
    selectDialog () {
      this.selectVisible = true
    },
    addItem () {
      this.isShow = true
    },
    deleteRow (scope, data) {
      if (this.receiptContracts[scope].id) {
        this.$axios.delete('/api/receipt/delete-receipt-contract/' + this.receiptContracts[scope].id).then((rep) => {
          this.receiptContracts.splice(scope, 1)
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })
      } else {
        this.receiptContracts.splice(scope, 1)
      }
    },
    saveRow (scope, data) {
      let row = data[scope]
      let receiptContract = {
        'receiptTracking': {
          'id': this.receiptId
        },
        'member': {
          'id': this.receipt.meId
        },
        'contract': {
          'id': row['contractId']
        },
        'amount': row['amount'],
        'remark': row['remark']
      }

      if (row.amount > row.totalAmount) {
        Toast('分配金额不允许大于合同金额')
        return
      }
      if (row['id']) {
        receiptContract['id'] = row['id']
      }
      Indicator.open()
      this.$axios.post('/api/receipt/create-receipt-contract', receiptContract).then((rep) => {
        data[scope].id = rep.data.id
        Toast('分配成功')
        Indicator.close()
      }).catch((err) => {
        Toast(err.response.data.message)
        console.log(err.response.data.message)
        Indicator.close()
      })
    },
    handleContractSelected (visible, data) {
      this.isShow = visible
      let receiptContractAssign = {
        contractNumber: data['crmNumber'],
        totalAmount: data['totalAmount'],
        amount: 0,
        remark: '',
        contractId: data['id']
      }
      this.receiptContracts.push(receiptContractAssign)
    }
  }
}
</script>

<style scoped>
  .addList{
    background-color: #ffffff;
    color: #282828;
    border: 1px solid #E8EAEB;
    height: 1.3rem;
    font-size: 0.6rem;
    border-radius: 0.2rem;
    position: absolute;
    right: .8rem;
    top: 0.6rem;
  }
</style>
