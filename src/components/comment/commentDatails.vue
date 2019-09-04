<template>
  <div class="comment">
    <div class="commentTitle">
      <p>{{title}}</p>
      <button class="button" @click="openDialog"><span class="fa fa-pencil-square-o"></span><span>{{addTitle}}</span></button>
    </div>
    <div class="commentBody">
      <ul>
        <li v-for="(item,index) in logList" :key="index">
          <div class="commentBodyTitle">
            <div class="userInfo">
              <img src="@/assets/img/marketing_head_def.png" alt="" width="40px" height="40px" style="margin: auto">
            </div>
            <div class="userName">
              <div>
                <p>{{item.deptName}} {{item.jobTitle}} {{item.username}}</p>
                <p style="color:#666">{{item.createdDate}}</p>
                <span class="icon-dynamic" @click="praise(item.fkType,item.id,item.praiseStatus,item.liked,index)" style="float: right;">
                <el-rate v-if="item.createdBy != '匿名用户'"
                  v-model="item.praiseStatus"
                  :max="1"
                  :disabled="true"
                  :disabled-void-icon-class="'el-icon-praise-commit'"
                  disabled-void-color="#BFBFBF"
                  :icon-classes="['el-icon-praise-commit']"
                  void-icon-class="'el-icon-praise-commit'"
                  :colors="['#FF9900']">
                </el-rate>
                <span v-if="item.createdBy != '匿名用户'">{{item.likedCount}}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="commentBodyBody">
            <p v-if="item.type==='OA'">
              操作类型：{{item.operation?item.operation:'暂无'}}</p>
            <p v-if="item.type==='OA'">审批意见：<span v-if="item.content" v-html="item.content"></span> <span v-else>未填写</span></p>
            <p v-if="item.type==='CRM'">{{item.content?item.content:'未填写'}}</p>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog title="添加评论" :visible.sync="dialogFormVisible" width="80%" open="openDialog">
      <el-form>
        <el-form-item label="内容:" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="logDetail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitLog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import defaultPicture from '../../assets/img/marketing_head_def.png'
export default {
  name: 'comment',
  props: ['title', 'fkType', 'addTitle', 'fkId'],
  data: function () {
    return {
      defaultPic: '',
      praiseStatus: 0,
      logList: '',
      baseInfo: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      logDetail: '',
      formLabelWidth: '50px'
    }
  },
  created () {
    console.log()
    this.defaultPic = defaultPicture
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
    this.getList()
  },
  methods: {
    praise (fkType, id, praiseStatus, liked, index) {
      praiseStatus = (praiseStatus + 1) % 2
      this.logList[index].praiseStatus = praiseStatus
      console.log(this.logList)
      let comment = {
        'fkType': 'COMMENT',
        'fkId': id
      }
      if (praiseStatus === 1) {
        this.$axios.post('/api/like-record/add', comment).then((rep) => {
          this.getList()
        }).catch((err) => {
          console.log(err)
        })
      } else if (praiseStatus === 0) {
        this.$axios.delete('/api/like-record/remove/' + liked).then((rep) => {
          this.getList()
        }).catch((err) => {
          console.log(err)
        })
      }
      this.getList()
    },
    getList () {
      this.$axios.get('/api/comment/list/' + this.fkType + '/' + this.fkId).then((rep) => {
        console.log(rep)
        this.logList = rep.data
        for (let i in this.logList) {
          this.logList[i]['praiseStatus'] = rep.data[i].liked > 0 ? 1 : 0
        }
      }).catch(() => {
      })
    },
    closed ($event) {
      console.log($event)
    },
    openDialog () {
      this.logDetail = ''
      this.dialogFormVisible = true
    },
    commitLog () {
      let comment = {
        'fkType': this.fkType,
        'fkId': this.fkId,
        'content': this.logDetail
      }
      this.$axios.post('/api/comment/create', comment).then((rep) => {
        console.log(rep)
        Toast('操作成功')
        this.getList()
      }).catch(() => {
      })
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
  .commentBody p{
    margin: 0;
    padding: 0;
    font-size: 0.7rem;
  }
  .commentBody li:first-child{
    margin-top: 0.7rem;
  }
  .commentBody li{

    margin-bottom:1.3rem
  }
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .comment{
    margin: 0.5rem 0.4rem;
    background-color: #ffffff;
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
  }
  .comment .commentTitle {
    /*font-size: 0.7rem;*/
    margin: 0;
    margin-left: 1rem;
    color: #000;
    text-align: left;
    padding: 0.5rem 0 0 0;
    /*margin-left: 0.5rem;*/
    margin-right: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .comment .commentTitle p:nth-of-type(1){
    /* border-left: 3px solid #26a2ff; */
    padding-left: 0.4rem;
    position: relative;
    /*font-size: 17px;*/
  }
  /*.comment .commentTitle p:nth-of-type(1)::before{*/
    /*position: absolute;*/
    /*top: 3px;*/
    /*left: 0;*/
    /*content: "";*/
    /*height: 1rem;*/
    /*width: 3px;*/
    /*border-radius: 3px;*/
    /*background-color: #0095DA;*/
  /*}*/
  .commentTitle .button{
    background-color: #ffffff;
    color: #282828;
    border: 1px solid #E8EAEB;
    height: 1.5rem;
    font-size: 0.6rem;
    border-radius: 0.2rem;
  }
  .button span:nth-of-type(1){
    font-size: 0.7rem;
    margin-right: 0.1rem;
    color: #e5e5e5;
  }
  .userInfo{
    width: 20%;
    display: flex;
    align-items: center;
  }
  .userInfo .userName{
    text-align: left;
    margin-left: 0.6rem;
  }
  .userName{
    width: 80%;
    text-align: left;
  }
  .userName>p{color:#888;font-size:18px;margin-bottom:0.4rem;}
  .userName .userTime{color:#bfbfbf;font-size:0.7rem;line-height:0.5rem;margin-bottom: 0.4rem;}
  .userInfo img{
    border-radius: 50px;
  }
  .thumbUp span:nth-of-type(1){
    margin-right: 0.2rem;
  }
  .commentBodyTitle {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    justify-items: center;
    align-items: center;
    padding-bottom: 10px;
  }
  .thumbUpActive{
    color: #FAADAF;
  }
  .commentBodyBody{
    text-align: left;
    margin-left: 20%;
    padding-left: 0.3rem;
  }
  .commentBodyBody p{
    color: #282828;
    font-size: .6rem;
    overflow: auto;
    padding-right: 2rem;
  }
  .commentBody ul{
    padding-bottom: 1rem;
  }
  .fa-edit:before, .fa-pencil-square-o:before{content:"";background:url("../../assets/img/marketing_review.png") center no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
    padding: 0.5rem;
    background-size: 0.7rem;
  }
  .newTitle {
    font-size: .7rem;
    margin: 0;
    color: #000;
    text-align: left;
    padding: .7rem .5rem 0 0;
    margin-left: 1rem;
    font-size: 17px;
    font-family: "Microsoft Sans Serif";
    font-weight: unset;
    color: rgba(40, 40, 40, 1);
  }
  .newTitle span:before {
    position: absolute;
    top: 3px;
    left: 0;
    content: "";
    height: 1rem;
    width: 3px;
    border-radius: 3px;
    background-color: #0095DA;
  }
  .commentTitle p::before {
    position: absolute;
    top: 4px;
    left: 0;
    content: "";
    height: .7rem;
    width: 3px;
    border-radius: 3px;
    background-color: #0095DA;
  }
  .icon-dynamic{
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
