<template>
  <div>
  <div class="order-company-info">
    <div class="order-company-info">
      <div class="list-block media-list">
        <ul>
          <li style="padding: 0 .8rem;">
            <div class="item-content">
              <div class="item-inner" style="padding: 0;">
                <div class="orderInfo" style="margin: 0;">
                  <p class="newTitle" style="margin: 0;">
                    <span class="topModuleTitle" style="color: rgb(38, 162, 255);">{{dataList.title}}</span>
                  </p>

                </div>
                <p v-html="dataList.content" style="font-size: .65rem;float: left;text-align: left;"></p>
              </div>
            </div>
            <div class="downloadFile" v-if="attachmentList.length">
              <p>更多信息请下载下面文件</p>

              <div  class="imgFlex">
                <p class="attactTitle">附件（点击查看）</p>

              </div>
              <AccessList style="padding:0;" ref="accessList" :options="attachmentList"></AccessList>

            </div>
            <hr>
            <div class="newFooter">
              <p style="font-size: 0.6rem;line-height: 24.8px;color: #26a2ff;margin: 0;" href="#"  @click="toBack()">
                <i class="el-icon-caret-left"></i>
                <span>返回</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
    <CommentDatails ref="CommentDatails" :title="'评论区'" fkType="ARTICLE" :fkId="baseInfo.id"
                    :addTitle="'添加'"></CommentDatails>
  </div>
</template>

<script>
  import CommentDatails from '../../components/comment/commentDatails'
  import AccessList from '@/components/access-list/access-list.vue'
  export default {
    name: 'announcement-detail',
    data() {
      return {
        dataList:'',
        baseInfo: {},
        isShowComment: false,
        attachmentList: [],
        comments: {
          articleId: '',
          commentTitle: '',
          commentOperate: '',
          values: [],
        }
      }
    },
    components:{
      CommentDatails,
      AccessList
    },
    created(){
      this.baseInfo = this.$route.query
      this.comments.commentTile = '评论区'
      this.comments.commentOperate = '写评论'
      this.comments.articleId = this.baseInfo.id
      this.comments.type = this.$route.query.fkType
    },
    mounted(){
      this.reload()
    },
    methods:{
      reload(){
        this.getDataList()
      },
      getDataList(){
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        this.$axios.get('api/article/detail/'+ this.baseInfo.id).then((res) =>{
          console.log(res.data)
          this.dataList = res.data
          this.attachmentList = res.data.attachments
        })
      },
      toBack(){
        window.history.back();  //返回上一页
      }
    }
  }
</script>

<style scoped>
  .new{
    margin: 0.5rem 0.4rem;
    background-color: #ffffff;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
  }
  .new .newTitle {
    font-size: 0.7rem;
    margin: 0;
    color: #000;
    text-align: left;
    padding: 0.5rem 0.5rem 0 0;
    margin-left: 0.5rem;
  }
  .new .newTitle span:nth-of-type(1){
    /*border-left: 3px solid #26a2ff;*/
    padding-left: 0.4rem;
    position: relative;
    display: block;
    text-align:justify;
  }
  .new .newTitle span:before{
    position: absolute;
    top:2px;
    left:0;
    content:"";
    height:0.8rem;
    width:3px;
    border-radius: 3px;
    background-color:#26a2ff;
  }
  .newbody{
    padding: 0 0.5rem;
  }
  .newbody .newContent{
    font-size: 0.6rem;
    color: #282828;
    text-align: left;
    width:100%;
    overflow: hidden;
  }
  hr{
    margin: 0.5rem auto;
    border: 0;
    border-bottom: 1px solid #E8EAEB;
  }
  .newFooter{
    display: flex;
    justify-content: space-between;
    color: #909192;
    padding-bottom: 0.5rem;
  }
  .collect span:nth-of-type(2n),.comment span:nth-of-type(2n){
    margin-left: 0.2rem;
    font-size: 0.7rem;
  }
  .comment span:nth-of-type(3){
    margin-left: 0.5rem;
  }
  .downloadFile p{
    margin: 0;
    text-align: left;
    font-size: 0.7rem;
    color: #909192;
  }
  .downloadFile a{
    font-size: 0.7rem;
  }
  .brief{
    padding: 0.5rem 0;
  }
  .briefContent tr td{
    margin: 0;
    padding: 0;
    font-size: 0.6rem;
  }
  .briefContent tr td:nth-of-type(1){
    width: 30%;
    text-align: left;
  }
  .briefContent tr td:nth-of-type(3) {
    text-align: left;
  }
  .briefContent tr td:nth-of-type(2) {
    width: 20%;
    text-align: center;
    color: red;
  }
  .tip{
    text-align: left;
    font-size: 0.6rem;
    margin: 0 0 0.5rem 0;
  }
  .tip span{
    color: red;
  }
  .alreadyCollect{
    color: orange;
    position: relative;
  }
  .newContent p div:first-child{overflow: hidden}
  .collect .fa-star-o{font-size:0.7rem}
  .collect .fa:before{content:"";background:url("../../assets/img/f-start.png") no-repeat center;
    background-size:contain;padding:0.4rem;margin-right:0.1rem}
  .alreadyCollect .fa-star-o:before{content:"";background:url("../../assets/img/f-start-hover.png") no-repeat center;
    background-size:contain;padding:0.38rem;margin-right:0.1rem}
  .bigImgShow{display:block;position:fixed;top:0;left:0;bottom:0;right:0;height:100%;width:100%;background:#000;z-index:600;}
  .bigImgShow img{max-width:100%;}
  .downloadFile .fa{
    position: relative;padding-left:0.8rem;color:#336699}
  .bigImgCenter{display:flex; align-items: center; justify-content: center; flex-direction: column;}
  /*.downloadFile .fa-file-word-o:before{content:"";position: absolute;top:0;left:0;background:url('../../assets/img/fileIcon.png') center no-repeat;*/
    /*background-size:contain;padding:0.35rem;*/
  /*}*/
  .imgFlex{display: flex;flex-wrap: wrap;text-align: left}
  .imgFlex img{display: block;width:50px;height:50px;margin:0 5px;}
  .downloadFile p.attactTitle{font-size:12px; margin:10px 0;color:#282828;width:100%;text-align: left;}
  .otherFile{text-align: left;}
</style>
