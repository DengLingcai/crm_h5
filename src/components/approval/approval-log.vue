<template>
  <div class="comment">
    <div class="commentTitle">
      <p>{{title}}</p>
    </div>
    <div class="commentBody">
      <img v-if="approvalImg" :src="formatUrl(approvalImg)" @click="goToImg(formatUrl(approvalImg),0)" alt="" style="padding: 0 .5rem;width: calc(100% - 1rem)">
      <ul>
        <li v-for="(item,index) in logList" :key="index">
          <div class="commentBodyTitle">
            <div class="userInfo">
              <img src="../../assets/img/approval_def.png" alt="" width="40px" height="40px" style="margin: auto">
            </div>
            <div class="userName">
              <div>
                <p>{{item.operatroDeptName}} {{item.operatorTitle}} {{item.operatorName}}</p>
                <p style="color:#666">{{item.operatorDate}}</p>
              </div>
            </div>
          </div>
          <div class="commentBodyBody">
            <p>
              <strong>{{item.resultValue?item.resultValue:'暂无'}}处理,签字意见：{{item.comments?item.comments:'暂无'}}</strong>

              <br v-if="item.nextNodeOperators">
              {{item.nextNodeOperators}}
            </p>
            <p style="color: #aaa; margin-top: 10px;">系统处理结果：{{item.success ? '操作成功':'操作失败'}}</p>
            <p style="color: #aaa">原因:{{item.errorMsg?item.errorMsg:'无'}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import defaultPicture from '../../assets/img/marketing_head_def.png'
import * as AccessUrl from '@/untils/urlUtils'
export default {
  name: 'approval-log',
  props: ['title', 'fkType', 'addTitle', 'fkId'],
  data: function () {
    return {
      logList: [],
      baseInfo: '',
      defaultPic: '',
      approvalImg: ''
    }
  },
  // watch: {
  //   fkId (newValue, oldValue) {
  //     console.log(newValue)
  //     this.getList()
  //   }
  // },
  create () {
    this.defaultPic = defaultPicture
  },
  mounted () {
    this.baseInfo = this.$route.query
    this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
    this.getList()
  },
  methods: {
    getList () {
      this.logList = []
      this.getApprovalImg()
      this.$axios.get('/api/approval-flow-log/list-by-fktypes-fkid/' + this.fkType + '/' + this.fkId).then((rep) => {
        for (let i in rep.data) {
          this.logList.push(rep.data[i])
        }
      }).catch(() => {
      })
    },
    getApprovalImg () {
      let fkTypeValue = this.fkType.split(',')
      console.log(fkTypeValue)
      this.$axios.get('/api/approval/approval-flow-picture-url-by-identifier/' + fkTypeValue[fkTypeValue.length - 1]).then((rep) => {
        console.log(rep)
        this.approvalImg = rep.data ? rep.data.smallApprovalFlowPictureUrl : ''
      }).catch(() => {
      })
    },
    formatUrl (data) {
      return AccessUrl.getAccessUrl(data)
    },
    goToImg (qiniuKey, index) {
      let imgString = ''
      imgString += qiniuKey + '|'
      if (/(Android)/i.test(navigator.userAgent)) {
        try {
          let version = MyWebView.getSysVersion().split('.')
          if (version[0] > 1 || (parseInt(version[0]) === 1 && ((parseInt(version[1]) > 2) || (parseInt(version[1]) === 2 && parseInt(version[2]) > 3)))) {
            document.location = 'http://action:10057/?url=' + imgString + '&position=' + index
          }
        } catch (err) {
          document.location = qiniuKey
        }
      } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        document.location = qiniuKey
      }
    }
  }
}
</script>

<style scoped>
  .commentBody p{
    margin: 0;
    padding: 0;
    font-size: 0.6rem;
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
