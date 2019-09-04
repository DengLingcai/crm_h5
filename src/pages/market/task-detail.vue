<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">任务详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>任务编号</th>
          <td>{{task.taskNumber}}</td>
        </tr>
        <tr>
          <th>任务类型</th>
          <td>{{task.typeValue}}</td>
        </tr>
        <tr>
          <th>提醒时间</th>
          <td>{{task.remindTimeValue}}小时</td>
        </tr>
        <tr>
          <th>创建人</th>
          <td>{{task.founder.name}}</td>
        </tr>
        <tr>
          <th>开始日期</th>
          <td>{{task.startTime}}</td>
        </tr>
        <tr>
          <th>结束日期</th>
          <td>{{task.endTime}}</td>
        </tr>
        <tr>
          <th>任务名称</th>
          <td>{{task.title}}</td>
        </tr>
        <tr>
          <th>状态</th>
          <td>{{task.statusValue}}</td>
        </tr>
        <tr>
          <th>责任人</th>
          <td>{{task.receiver.name}}</td>
        </tr>
        <tr>
          <th>
            协办人
          </th>
          <td>
            {{task.collaboratorSetStr}} <a href="javascript:;" @click="changeStatus()">添加协办人</a>
          </td>
        </tr>
        <tr>
          <th>备注</th>
          <td>{{task.remark}}</td>
        </tr>
        <tr>
          <th>拒绝情况</th>
          <td>{{task.rejectDesp}}</td>
        </tr>
        </tbody>
      </table>

    </div>

    <!--<div class="ModuleContainer">-->
    <!--<p class="newTitle">-->
    <!--<span class="topModuleTitle">任务协作人</span>-->
    <!--</p>-->
    <!--<div class="tableList">-->
    <!--<el-table :data="collaboratorSet" :border="true" :highlight-current-row="true" max-height="250">-->
    <!--<el-table-column fixed="left" prop="name" label="姓名"></el-table-column>-->
    <!--<el-table-column prop="title" label="职位"></el-table-column>-->
    <!--&lt;!&ndash;<el-table-column prop="telOne" label="电话"></el-table-column>&ndash;&gt;-->
    <!--</el-table>-->
    <!--</div>-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--<div class="ModuleContainer" v-if="optionGroup">-->
    <!--<div class="mint-cell-swipe-buttongroup">-->
    <!--<button class="button" v-bind:key="option.name" v-for="option in optionGroup"-->
    <!--v-on:click="optionClick(option.name)">{{option.content}}-->
    <!--</button>-->
    <!--</div>-->

    <!--</div>-->
    <div v-if="task.attachmentList" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">相关附件</span>
      </p>
      <Upload fkType="COLLABORATIVE_TASK" :id="this.baseInfo.id" @uploadValue="handleUpload"></Upload>
      <AccessList ref="accessList" :options="task.attachmentList"></AccessList>
    </div>
    <div class="mint-cell-swipe-buttongroup mint-cell-full">
      <div v-if="optionGroup.length >= 1" style="text-align: center;">
        <!--<el-input-->
          <!--class="view"-->
          <!--size="small"-->
          <!--placeholder="请输入拒绝/完成/退回说明"-->
          <!--prefix-icon="el-icon-edit"-->
          <!--v-model="comments">-->
        <!--</el-input>-->
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入拒绝/完成/退回说明"
          v-model="comments">
        </el-input>
      </div>

    </div>
    <div class="mint-cell-swipe-buttongroup mint-cell-full">
    <input v-for="(option,index) in optionGroup" v-bind:key="index" v-on:click="optionClick(option.name)"
           type="button" :value="option.content">
    </div>
    <CommentDatails :title="'任务反馈'" fkType="COLLABORATIVE_TASK" :fkId="taskId" :addTitle="'添加'"></CommentDatails>
    <DialogRepicker v-if="selectVisible" :title="'选择协办人'" :url="'/api/operator/page'" :showCol="showCol" :field="field"
                    @selectedValue="handleOperatorSelected"></DialogRepicker>
  </div>

</template>

<script>
import {Indicator, Toast} from 'mint-ui'
import CommentDatails from '@/components/comment/commentDatails'
import DialogRepicker from '@/components/dialog-repicker/dialog-repicker'
import AccessList from '@/components/access-list/access-list.vue'
import Upload from '@/components/upload/upload.component'
export default {
  name: 'TaskDetail',
  props: {},
  data: function () {
    return {
      taskId: -1,
      task: {},
      receiverSet: [],
      collaboratorSet: [],
      optionGroup: null,
      baseInfo: {},
      comments: '',
      selectVisible: false,
      showCol: ['oaCode', 'name', 'title'],
      field: 'oaCode-name-title'
    }
  },
  components: {
    CommentDatails,
    DialogRepicker,
    Upload,
    AccessList
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.taskId = this.baseInfo.id
    this.loadDetail()
  },

  methods: {
    loadDetail () {
      Indicator.open()
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/task/detail/' + this.taskId).then((rep) => {
        console.log(rep.data)
        this.task = rep.data
        this.taskId = this.task.id
        this.collaboratorSet = rep.data.collaboratorSet
        this.receiverSet = rep.data.receiverSet

        if (this.task.optionGroup && this.task.optionGroup.length > 0) {
          this.optionGroup = []
          for (let key in this.task.optionGroup) {
            console.log(this.task.optionGroup[key].name)
            if (this.task.optionGroup[key].name !== 'addCollaborator' && this.task.optionGroup[key].name !== 'feedBack') {
              this.optionGroup.push(this.task.optionGroup[key])
            }
          }
          console.log(this.optionGroup)
        }
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },
    optionClick (name) {
      let url = '/api/task/'
      if (name === 'receive') {
        url += 'update-receive-task/' + this.taskId
        this.updateStatus(url)
      }
      if (name === 'finish') {
        url += 'update-finish-task/' + this.taskId
        let comment = {
          content: this.comments
        }
        this.updateStatusWithComment(url, comment)
      }
      if (name === 'confirmFinish') {
        url += 'update-confirm-finish-task/' + this.taskId
        this.updateStatus(url)
      }
      if (name === 'back') {
        // 退回
        url += 'update-reform-task/' + this.taskId
        let comment = {
          content: this.comments
        }
        this.updateStatusWithComment(url, comment)
      }

      if (name === 'reject') {
        // 退回
        url += 'update-reject-task/' + this.taskId
        let comment = {
          content: this.comments
        }
        this.updateStatusWithComment(url, comment)
      }

      console.log(name + this.taskId + '-' + this.comments)
    },
    changeStatus () {
      console.log(this.taskId)
      this.selectVisible = true
      // this.handleOperatorSelected(true)
      this.loadDetail()
    },
    updateStatus (url) {
      this.$axios.get(url).then((rep) => {
        console.log(rep.data)
        this.loadDetail()
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },
    updateStatusWithComment (url, commnent) {
      if (!this.comments || this.comments === '') {
        Toast('说明必填')
        return
      }
      this.$axios.post(url, commnent).then((rep) => {
        console.log(rep.data)
        this.loadDetail()
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },
    handleOperatorSelected (value, data) {
      this.selectVisible = value
      console.log(value, data)
      let arr = [data]
      let task = {
        id: this.taskId,
        collaboratorSet: arr
      }
      this.$axios.post('/api/task/update-collaborator', task).then((rep) => {
        console.log(rep.data)
        this.loadDetail()
        Indicator.close()
      }).catch(() => {
        Indicator.close()
      })
    },
    handleUpload (data) {
      console.log(data)
      this.loadDetail()
    }
  }
}
</script>

<style scoped>

</style>
