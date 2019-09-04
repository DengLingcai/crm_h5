<template>
  <div>
    <div class="topModuleContainer">
      <p class="newTitle">
        <span class="topModuleTitle">晶科对我厂驻厂代表有哪些管理要求?</span>
      </p>
      <ul class="list-type">
        <li><span>类型:</span>品质客服类</li>
        <li><span>提问人：</span>市场部-刘芳</li>
        <li><span>时间：</span>2天前</li>
      </ul>
    </div>
    <CommentDatails :comments="comments" v-if="isShowComment" :baseInfo="baseInfo"></CommentDatails>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import CommentDatails from '../../components/comment/commentDatails'
import * as CommentInfo from '../../components/comment/commentData'
export default {
  name: 'thousands-questions',
  data () {
    return {
      isShowNew: false,
      baseInfo: {},
      isShowComment: false,
      fkType: String,
      news: {
        id: '',
        title: '',
        content: '',
        attachments: [],
        src: '',
        seeNum: 34,
        isBriefing: false,
        favoriteId: 3,
        isShowEye: false,
        isCommentNum: true
      },
      commentNum: 0,
      memberId: '',
      comments: {
        articleId: '',
        commentTitle: '',
        commentOperate: '',
        values: []
      }
    }
  },
  mounted () {
    this.baseInfo = this.$route.query
    console.log(this.baseInfo)
    this.getArticleInfo()
  },
  methods: {
    getArticleInfo: function () {
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/market-trend/detail/' + this.baseInfo.id + '/' + this.baseInfo.typeId).then((res) => {
        console.log(res.data.content)
        this.news.title = res.data.content.title
        this.news.content = res.data.content.content
        this.news.attachments = res.data.content.attachmentList
        this.news.favoriteId = res.data.content.favoriteId
        this.news.id = res.data.content.id
        console.log(res.data.content.member.id)
        this.memberId = res.data.content.member.id
        this.isShowNew = true
        this.getComment()
      }).catch((err) => {
        Toast('该文章已被删除')
        console.log(err)
      })
    },
    getComment: function () {
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('/api/comment/list/' + this.$route.query.fkType + '/' + this.baseInfo.id).then((res) => {
        this.getCommentInfo(res.data)
        this.commentNum = res.data.length
      }).catch((err) => {
        console.log(err)
      })
    },
    getCommentInfo: function (obj) {
      this.comments.commentTile = '评论区'
      this.comments.commentOperate = '写评论'
      this.comments.articleId = this.baseInfo.id
      this.comments.type = this.$route.query.fkType
      if (obj.length > 0) {
        for (var i in obj) {
          var personInfo = new CommentInfo.CommentPersonInfo(obj[i].operatorVo.name, obj[i].operatorVo.avatarUrl)
          var commentInfo = new CommentInfo.CommentContentInfo(obj[i].createdDate, 182, obj[i].content, true)
          this.comments.values.push(new CommentInfo.CommentData(personInfo, commentInfo))
        }
      }
      this.isShowComment = true
    }
  },
  components: {
    CommentDatails
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .topModuleContainer {
    margin: .5rem .4rem;
    background-color: #fff;
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;
    padding-bottom: 5px;
  }

  .newTitle {
    font-size: .7rem;
    margin: 0;
    color: #000;
    text-align: left;
    padding: .5rem .5rem 0 0;
    margin-left: 1rem;
    font-size: 17px;
    font-family: "Microsoft Sans Serif";
    font-weight: unset;
    color: rgba(40, 40, 40, 1);
  }

  .topModuleTitle {
    padding-left: .6rem;
    position: relative;
    display: block;
    text-align: justify;
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

  .list-type {
    padding-left: 1.6rem;
  }

  .list-type li {
    list-style: none;
    display: block;
    width: 100%;
    text-align: left;
    color: #888888;
    font-size: 1rem;
    line-height: 1.6rem;
  }

  .list-type span {
    width: 5rem;
    display: -webkit-inline-box;
  }
</style>
