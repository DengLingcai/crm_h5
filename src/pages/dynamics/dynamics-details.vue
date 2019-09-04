<template>
  <div>
    <CommentDatails v-if="showComments" :title="'反馈区'" fkType="DAILY" :fkId="dailyId" :addTitle="'添加'"></CommentDatails>
  </div>
</template>

<script>
import Journal from '@/components/journal/journal'
import CommentDatails from '@/components/comment/commentDatails'
export default {
  name: 'dynamics-details',
  data: function () {
    return {
      collectValue: null,
      praiseValue: null,
      commentValue: null,
      contractVisable: false,
      checkFile: '',
      showComments: false,
      fileList: [
        {
          name: '《2018年2月上旬市场部半月报.pdf》',
          file: 'http://192.168.1.200:9090/api/file/3708b36164ac44a3ba6f90b92cd5963d'
        }
      ],
      dailyId:''
    }
  },
  created: function () {
    this.logData = [{
      'remark': '123',
      'logDate': '2018-12-24'
    }]
  },
  mounted(){
    this.baseInfo = this.$route.query
    this.dailyId = this.baseInfo.id
    this.showComments = true
  },
  methods: {
    collect () {
      this.collectValue = (this.collectValue + 1) % 2
    },
    praise () {
      this.praiseValue = (this.praiseValue + 1) % 2
    },
    comment () {
      this.commentValue = (this.commentValue + 1) % 2
    },
    checkContract (file) {
      this.checkFile = file
      console.log(this.contractVisable)
      this.contractVisable = !this.contractVisable
    },
    close () {
      this.contractVisable = false
    }
  },
  components: {
    Journal,
    CommentDatails
  }
}
</script>

<style scoped>
  .orderInfo {
    padding: 20px;
  }

  /*el-rate{*/
  /*height: 40px;*/
  /*}*/
  /*.details-dynamic span{*/
  /*display: block;*/
  /*float: left;*/
  /*width: 50px;*/
  /*height: 50px;*/
  /*background: rgba(90,193,234,1);*/
  /*border-radius: 35px;*/
  /*text-align: center;*/
  /*line-height: 50px;*/
  /*color: #fff;*/
  /*}*/
  /*.details-dynamic div{*/
  /*height: 50px;*/
  /*padding-left: 60px;*/
  /*}*/
  /*.details-dynamic div p{*/
  /*margin: 0;*/
  /*height: 25px;*/
  /*}*/
  /*.details-dynamic div p:nth-child(1){*/
  /*font-family:PingFangSC-Medium;*/
  /*font-weight:500;*/
  /*color:rgba(40,40,40,1);*/
  /*font-size: .9rem;*/
  /*}*/
  /*.details-dynamic div p:nth-child(1) button{*/
  /*width: 52px;*/
  /*height: 27px;*/
  /*border:0;*/
  /*background:rgba(242,243,245,1);*/
  /*border-radius:3px;*/
  /*float: right;*/
  /*font-weight:400;*/
  /*color:rgba(136,136,136,1);*/
  /*font-size: 0.7rem;*/
  /*}*/
  /*.details-dynamic div p:nth-child(2){*/
  /*font-family:PingFangSC-Regular;*/
  /*font-weight:400;*/
  /*color:rgba(191,191,191,1);*/
  /*font-size: 0.7rem;*/
  /*line-height: 1.5rem;*/
  /*}*/
  /*.dynamic-content{*/
  /*font-family:PingFangSC-Regular;*/
  /*font-weight:400;*/
  /*font-size: 0.7rem;*/
  /*color:rgba(40,40,40,1);*/
  /*}*/
  /*.access-label{*/
  /*color:rgba(136,136,136,1);*/
  /*}*/
  /*.accessList{*/
  /*padding: 0;*/
  /*}*/
  /*.accessList li{*/
  /*list-style: none;*/
  /*font-family:PingFangSC-Regular;*/
  /*font-weight:400;*/
  /*color:rgba(29,103,157,1);*/
  /*height: 1rem;*/
  /*display: flex;*/
  /*line-height: 1rem;*/
  /*}*/
  /*.accessList li img{*/
  /*width: 1rem;*/
  /*}*/
  /*.icon-dynamic{*/
  /*display: flex;*/
  /*font-size: .7rem;*/
  /*line-height: 1rem;*/
  /*color: #BFBFBF;*/
  /*}*/
  /*.control-icon{*/
  /*position: absolute;right: 0;*/
  /*}*/
  /*.control-icon span{*/
  /*padding-left: 0.5rem;*/
  /*}*/
</style>
