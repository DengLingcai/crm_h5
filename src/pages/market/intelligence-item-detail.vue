<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">情报详情</span>
      </p>

      <table class="details">
        <tbody>
        <tr v-if="intelligenceItem.member == null ? '' : intelligenceItem.member.abbreviation">
          <th>客户</th>
          <td>{{intelligenceItem.member == null ? '' : intelligenceItem.member.abbreviation}}</td>
        </tr>
        <tr v-if="intelligenceItem.intelligence == null ? '' : intelligenceItem.intelligence.bigCategoryValue">
          <th>业务类型</th>
          <td>{{intelligenceItem.intelligence == null ? '' : intelligenceItem.intelligence.bigCategoryValue}}</td>
        </tr>
        <tr v-if="intelligenceItem.intelligenceInfoValue">
          <th>信息类别</th>
          <td>{{intelligenceItem.intelligenceInfoValue}}</td>
        </tr>
        <tr v-if="intelligenceItem.intelligenceTypeValue">
          <th>情报类型</th>
          <td>{{intelligenceItem.intelligenceTypeValue}}</td>
        </tr>
        <tr v-if="intelligenceItem.content">
          <th>内容</th>
          <td><span v-html="intelligenceItem.content"></span></td>
        </tr>
        <tr v-if="intelligenceItem.itemStatusValue">
          <th>状态</th>
          <td>{{intelligenceItem.itemStatusValue}}</td>
        </tr>
        <tr v-if="intelligenceItem.intelligence == null ? '' : intelligenceItem.intelligence.collectDate">
          <th>搜集日期</th>
          <td>{{intelligenceItem.intelligence == null ? '' : intelligenceItem.intelligence.collectDate}}</td>
        </tr>

        <tr v-if="intelligenceItem.operator == null ? '' : intelligenceItem.operator.name">
          <th>搜集人</th>
          <td>{{intelligenceItem.operator == null ? '' : intelligenceItem.operator.name}}</td>
        </tr>

        </tbody>
      </table>

    </div>

    <!--<div class="ModuleContainer">-->
    <!--<p class="newTitle">-->
    <!--<span class="topModuleTitle">友商列表</span>-->
    <!--</p>-->
    <!--<div class="tableList">-->
    <!--<el-table :data="competitorBehaviorset" :border="true" :highlight-current-row="true" max-height="250" >-->
    <!--<el-table-column fixed="left" prop="abbreviation" label="友商名称"></el-table-column>-->
    <!--<el-table-column prop="principalName" label="友商负责人"></el-table-column>-->
    <!--<el-table-column prop="principalJob" label="负责人职位"></el-table-column>-->
    <!--<el-table-column prop="principalTel" label="负责人电话"></el-table-column>-->
    <!--<el-table-column prop="content" label="备注"></el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--</div>-->
    <div v-if="intelligenceItem.attachmentList.length" class="ModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">相关附件</span>
      </p>
      <AccessList :options="intelligenceItem.attachmentList"></AccessList>
    </div>
    <!--<input type="text" v-model="comments" placeholder="可输入审批意见"/>-->
    <div class="mint-cell-swipe-buttongroup" v-if="intelligenceItem.optionGroup">
      <input v-for="(option,index) in intelligenceItem.optionGroup" v-bind:key="index"
             v-on:click="optionClick(option.name)"
             type="button" :value="option.content">
    </div>
    <CommentDatails v-if="itemId >= 1" :title="'情报反馈'" fkType="INTELLIGENCE_ITEM" :fkId="itemId"
                    :addTitle="'添加'"></CommentDatails>

    <ViewRecord v-if="itemId >= 1" :title="'浏览记录'" fkType="INTELLIGENCE_ITEM" :fkId="itemId"></ViewRecord>

  </div>

</template>

<script>

  import {Indicator} from 'mint-ui'
  import CommentDatails from '@/components/comment/commentDatails'
  import AccessList from '@/components/access-list/access-list.vue'
  import ViewRecord from '../../components/view-record/view-record-list'

  export default {
    name: 'intelligenceItem',
    props: {},
    components: {
      ViewRecord,
      CommentDatails,
      AccessList,
    },
    data: function () {
      return {
        itemId: -1,
        intelligenceItem: {},
        competitorBehaviorset: [],
        baseInfo: {},
        comments: ''
      }
    },
    mounted () {
      this.baseInfo = this.$route.query
      this.itemId = this.baseInfo.id
      this.loadDetail()
    },
    methods: {
      loadDetail () {
        Indicator.open()
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        this.$axios.get('/api/market-intelligence-item/detail/' + this.itemId).then((rep) => {
          console.log('情报')
          console.log(rep.data)
          this.intelligenceItem = rep.data
          Indicator.close()
        }).catch((err) => {
          console.log(err)
          Indicator.close()
        })
      },
      optionClick (name) {
        console.log(name + this.itemId + '-' + this.comments)

        if (name === 'edit') {
          //http://action:2678/?id=300&viewtype=SINGLEEDIT&title=情报信息编辑
          document.location = 'http://action:2678/?id=' + this.itemId + '&viewtype=SINGLEEDIT&title=情报信息编辑'
        }

        // let itemStatusKey = ''
        // if (name === 'disable') {
        //   itemStatusKey = 'invalid'
        // }
        //
        // if (name === 'effective') {
        //   itemStatusKey = 'effective'
        // }
        // this.$axios.get('/api/market-intelligence-item/update-item-status/' + this.itemId + '/' + itemStatusKey).then((rep) => {
        //   console.log(rep.data)
        //   this.intelligenceItem = rep.data
        //   this.loadDetail()
        //   Indicator.close()
        // }).catch(() => {
        //   Indicator.close()
        // })
      },
      changeStatus () {
        console.log(this.itemId)
        this.loadDetail()
      }
    }
  }
</script>

<style scoped>
</style>
