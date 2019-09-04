<template>
  <div class="comment">
    <div class="commentTitle">
      <p>{{title}}</p>
    </div>
    <div class="commentBody">
      <ul>
        <li v-for="(item,index) in demand" :key="index">
          <div class="commentBodyTitle">
            <div class="userInfo">
              <img src="../../assets/img/approval_def.png" alt="" width="40px" height="40px" style="margin: auto">
            </div>
            <div class="userName">
              <div>
                <p>{{item.fkName}}-{{item.officeName}}</p>
                <!--{{item.department}}-->
                <p style="color:#666;display: block">{{item.duty}}</p>
              </div>
            </div>
          </div>
          <div class="commentBodyBody">
            <div style="text-align: left;font-size: .6rem;padding-right: .5rem;">{{item.desp}}</div>
            <p style="color: #aaa; margin-top: 10px;" v-if="item.replyDate">回复截止期：{{item.replyDate}}</p>
            <div style="background-color:#EFEDED;border: 1px solid #DEDEDE;margin-right: 1rem;font-size: .6rem;font-weight: bold;" v-if="item.reversion">{{item.reversion}}</div>
            <p style="color: #aaa;text-align: right;padding-right: 1rem;" v-if="item.operator">{{item.operator.title}}{{item.operator.name}}于{{item.replyDate}}回复</p>
          </div>
          <hr v-if="index<demand.length-1" style="width: 90%;height:1px;border:none;border-top:1px solid #e5e5e5;">
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import defaultPicture from '../../assets/img/marketing_head_def.png'
  export default {
    name: 'approval-log',
    props: ['title', 'fkType', 'addTitle', 'fkId','demand'],
    data: function () {
      return {
        logList: [],
        baseInfo: '',
        defaultPic: '',
      }
    },
    create () {
      this.defaultPic = defaultPicture

    },
    mounted () {
      console.log(this.demand)
      for(let i=0;i<this.demand.length;i++){
        // if(this.demand[i].operator.department!==null){
        //   this.demand[i].department = '-' + this.demand[i].operator.department.name
        // }else{
        //   this.demand[i].department = ''
        // }
        this.demand[i].operatorName = this.demand[i].operator.name
        this.demand[i].operatorDepartmentName = this.demand[i].operator.title
        // console.log(this.demand[i].operator.name)
      }
      console.log(this.demand)
      this.baseInfo = this.$route.query
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token

    },
    methods: {
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
