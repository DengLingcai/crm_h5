<template>
  <el-dialog :center="false" :title="title" :visible.sync="select" @close="closeDialog()" :fullscreen="true">
    <p>
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchMemberList()"></el-button>
      </el-input>
    </p>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          style="text-align: left">
          <el-menu-item v-for="(item,index) in selectList" v-bind:key="index" index="0" @click="closeDialog(item)"
                        class="el-item-menu">
            <span slot="title" v-for="(col,i) in showCol" v-bind:key="i"><span v-if="i>0">-</span>{{item[col]}}</span>
          </el-menu-item>
          <!--<el-table-->
          <!--:show-header="false"-->
          <!--:data="selectList"-->
          <!--border-->
          <!--style="width: 100%">-->
          <!--<el-table-column v-for="(col,i) in showCol" v-bind:key="i" style="height: 30px" @click="closeDialog(col)"-->
          <!--:prop="col"-->
          <!--label="">-->
          <!--</el-table-column>-->
          <!--</el-table>-->
        </el-menu>
      </el-col>
    </el-row>
    <div class="submitButton">
      <!--<button  v-on:click='initReload()'>刷新</button>-->
      <button v-if='!page.last' v-on:click='loadMoreContent(url)'>
        加载更多（第{{this.page.number + 1}}页&nbsp;/&nbsp;共{{this.page.totalPages}}页）
      </button>
      <!--<button  v-else='!lastPage' style="background-color: white"></button>-->
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'dialog-repicker',
  props: ['title', 'url', 'showCol', 'field'],
  data: function () {
    return {
      select: true,
      input: '',
      selectList: [],
      page: {
        number: -1,
        totalPages: 0
      },
      searchFields: {}
    }
  },
  mounted () {
    this.initLoad()
  },
  methods: {
    initLoad () {
      this.searchFields = {
        number: 0,
        rules: [
          {
            field: this.field,
            option: 'LIKE_ANYWHERE',
            values: [this.input]
          }
        ]
      }
      this.getMemberList()
    },
    closeDialog (data) {
      this.select = false
      this.$emit('selectedValue', this.select, data)
    },
    getMemberList () {
      this.$axios.post(this.url, this.searchFields).then((rep) => {
        this.selectList = rep.data.content
        this.page = rep.data
      })
    },
    searchMemberList () {
      this.initLoad()
    },
    loadMoreContent () {
      this.searchFields.number++
      this.$axios.post(this.url, this.searchFields).then((rep) => {
        for (let i in rep.data.content) {
          this.selectList.push(rep.data.content[i])
        }
        this.page = rep.data
      })
    }
  }
}
</script>

<style scoped>
  .submitButton button {
    width: 95%;
    color: #ffffff;
    height: 2rem;
    border: 0;
    font-size: 0.7rem;
    margin: 1rem 0;
    border-radius: 5px;
  }

  .submitButton button:nth-child(1) {
    /*width: 85%;*/
    background-color: #26a2ff;
    color: #ffffff;
    height: 2rem;
    border: 0;
    font-size: 0.7rem;
    margin: 1rem 0;
    border-radius: 5px;
    /*float: left;*/
  }

  .submitButton button:nth-child(2) {
    width: 75%;
    background-color: #26a2ff;
    color: #ffffff;
    height: 2rem;
    border: 0;
    font-size: 0.7rem;
    margin: 1rem 0;
    border-radius: 5px;
  }
  .el-item-menu{
    padding-left: 20px;
    display: block;
    white-space: normal;
    height: auto !important;
    line-height: 1.2rem;
    padding: 8px;
  }
</style>
