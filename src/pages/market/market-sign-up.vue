<template>

  <div>

    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">市场活动信息</span>
      </p>

      <table class="details">
        <tbody>
        <tr>
          <th>类型</th>
          <td>
            {{activity.activityTypeValue}}
          </td>
        </tr>
        <tr>
          <th>标题</th>
          <td>
            {{activity.title}}
          </td>
        </tr>
        <tr>
          <th>负责部门</th>
          <td>
            {{activity.department == null ? '' : activity.department.name}}
          </td>
        </tr>
        <tr>
          <th>负责人</th>
          <td>
            {{activity.operator == null ? '' : activity.operator.name}}
          </td>
        </tr>
        <tr>
          <th>日期</th>
          <td>
            {{activity.beginDate}} - {{activity.endDate}}
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div>
      <el-input type="text" placeholder="公司名称" v-model="memberName" class="input-code"></el-input>
      <el-input type="text" placeholder="联系人" v-model="linkPeople" class="input-code"></el-input>
      <el-input type="text" placeholder="职务" v-model="position" class="input-code"></el-input>
      <el-input type="text" placeholder="联系电话" v-model="telephone" class="input-code"></el-input>
      <el-input type="text" placeholder="邮件" v-model="email" class="input-code"></el-input>
      <el-input type="number" placeholder="计划到场人数" v-model="planPeopleCount" class="input-code"></el-input>
      <!--<textarea></textarea>-->
      <!--<input type="text" placeholder="备注" v-model="telphoneNum">-->
      <div class="mint-cell-swipe-buttongroup mint-cell-full">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="备注"
          v-model="remark"
        >
        </el-input>
      </div>
      <!--<div class="input-code">-->
      <!--<input type="text" placeholder="请输入验证码" v-model="iCode">-->
      <!--<input type="button" class="input-btn" @click='sendSms' value="获取验证码">-->
      <!--</div>-->
      <input type="button" @click="singUp" class='btn' value="确定">
    </div>

  </div>
</template>

<script>
  import {Toast, Indicator} from 'mint-ui'

  export default {
    name: 'MarketSignUp',
    data: function () {
      return {
        memberName: '',
        linkPeople: '',
        position: '',
        telephone: '',
        email: '',
        planPeopleCount: null,
        remark: '',
        activityId: -1,
        activity: null
      }
    },
    created () {
      this.baseInfo = this.$route.query
      this.activityId = this.baseInfo.id
    },
    mounted () {
      this.loadDetail()
    },
    methods: {
      loadDetail: function () {
        // console.log(1111111)
        this.$axios.get('/api/market-activity/detail/' + this.activityId).then((rep) => {
          console.log(rep.data)
          this.activity = rep.data
          Indicator.close()
        }).catch(() => {
          Indicator.close()
        })

      },
      singUp: function () {

        if (!this.memberName || this.memberName === '') {
          Toast('请输入公司名称')
          return
        }

        if (!this.linkPeople || this.linkPeople === '') {
          Toast('请输入联系人')
          return
        }

        if (!this.telephone || this.telephone === '') {
          Toast('请输入联系电话')
          return
        }

        if (this.planPeopleCount <= 0) {
          Toast('至少一个计划到场人数')
          return
        }

        let obj = {
          marketActivity: {
            id: this.activityId
          },
          memberName: this.memberName,
          linkPeople: this.linkPeople,
          position: this.position,
          telephone: this.telephone,
          email: this.email,
          planPeopleCount: this.planPeopleCount,
          remark: this.remark
        }
        // console.log(this.memberName)
        // console.log(this.linkPeople)
        // console.log(this.position)
        // console.log(this.telephone)
        // console.log(this.email)
        // console.log(this.planPeopleCount)
        // console.log(this.remark)
        this.$axios.post('/api/invite-people-item/create', obj).then((rep) => {
          console.log(rep.data)
          this.memberName = ''
          this.linkPeople = ''
          this.position = ''
          this.telephone = ''
          this.email = ''
          this.planPeopleCount = null
          this.remark = ''
          Toast('报名成功')

          Indicator.close()
        }).catch((err) => {
          Toast(err.response.data.message)
          Indicator.close()
        })

      },
      sendSms: function () {
      },

    }
  }
</script>

<style scoped>
  input {
    width: 95%;
    margin: 0 auto;
    margin-top: 0.5em;
    height: 2rem;
    line-height: 2rem;
    border: 0;
    border-radius: 0.5rem;
  }

  input[type='text'], input[type='number'] {
    line-height: 1.5rem;
    height: 1.5rem;
    padding: 1rem 0.3rem;
  }
  .input-code {
    display: flex;
    width: calc(100% - .8rem);
    margin: .5rem .4rem;
    justify-content: space-between;
    /*margin: 0 auto;*/
  }

  .input-btn {
    margin-left: 0.5rem;
    background-color: #ffffff;
    color: #0081D0;
    width: 50%;
  }

  .btn {
    background-color: #0081D0;
    color: #ffffff;
    text-align: center;
    font-size: 1rem;
    border-radius: .2rem;
  }

  .test p {
    margin: 0;
    text-align: left;
  }

  .test button {
    float: left;
    margin-right: 1rem;
    margin-top: 0.5rem;
    background-color: #26a2ff;
    color: #ffffff;
    border: 0;
  }
</style>
