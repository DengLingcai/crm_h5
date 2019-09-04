<template>

  <div class='pubicTable' id="pubicTable">
    <div class='pubicTableTitle'>
      <span>{{title}}</span>
      <button v-if="refresh" class="refreshButton" v-on:click='initReload()'><img
        style="width: 100%;height: auto;position: absolute;top: 0.65rem;right: 0.5rem;" src="@/assets/img/refresh.png"
        alt=""></button>
    </div>
    <div v-if="conditions" class="searchStyle">
      <div v-for="cond in conditions" :key="cond.field">
        <input v-if="cond.typeLabel" :id="cond.field" :type="cond.typeLabel" class="inputStyle" :name="cond.field"
               v-model="cond.value"/>
        <input v-else :id="cond.field" :placeholder="cond.label" class="inputStyle" type="text" :name="cond.field"
               v-model="cond.value"/>
      </div>
      <el-button type="primary" icon="el-icon-search" size="mini" class="btn btnbox btnSearch" v-on:click="search()">搜索</el-button>
      <!--<input type="button" class="btn btnbox" style="" value="搜索" v-on:click="search()"/>-->
    </div>
    <div class='tablebody' ref="tabalScroll" v-if="this.lockCol === undefined">
      <table class='publicTableBody' :class="{fiexdTableBody:fiexedTabaleNav}" id="publicTableBody" border='1'
             cellspacing='0' style="position:relative;">
        <tr>
          <th class="tableHeader" v-for='(colMod,index) in colModels' :key='index' v-bind:class="{'hidden': colMod.hidden}" >
            <span class="sort-th">{{colMod.label}}
                  <span class="sort-up-down" v-if="colMod.sortable"
                        @click="sortClick(colMod.label,colMod.field,index,colMod.sortField)">
                              <i v-show="upIndex!==index" ref="box" class="sort-up"></i>
                              <i v-show="downIndex!==index" class="sort-down"></i>
                  </span>
            </span>
          </th>
        </tr>
        <tr v-if="fiexedTabaleNav" v-show="fixedBar" class="fixed-tab" ref="tableBarFiexd">
          <th v-for='(colMod,index) in colModels' :key='index' v-bind:class="{'hidden': colMod.hidden}">
            <span :style="{width:tableWidth[index]}">{{colMod.label}}</span>
          </th>
        </tr>
        <tr v-for='(rwoContent,items) in contents' :key='rwoContent.index'>
          <td v-for='(tdContent,index) in rwoContent' :key='index' v-bind:class="{'hidden': colModels[index].hidden}"
              v-bind:style="{ textAlign: tdTextAligns[index], backgroundColor: tdBackgroundColors[index] }">
            <a v-if="dataIds[items] != -9 && tdTextColor[index]&&clickfun[index]" :style="{color:tdTextColor[index]}"
               @click="callParentEvent(items,index)">{{tdContent}}</a>
            <span v-if="dataIds[items] == -9 || !clickfun[index]" v-html="tdContent"></span>
          </td>
        </tr>
      </table>
    </div>

    <div style="display: flex;z-index: 200;" v-if="this.lockCol !== undefined">
      <div class='tablebody' ref="tabalScroll" style="position:relative;width: 50%;z-index: 300">
        <table class='publicTableBody' :class="{fiexdTableBody:fiexedTabaleNav}" id="publicTableBody" border='1'
               cellspacing='0' style="position:relative;">
          <tr>
            <th v-if="lockCol.indexOf(index) != -1" class="tableHeader" v-for='(colMod,index) in colModels' v-bind:class="{'hidden': colMod.hidden}"
                :key='index'>
              <span ref="fixedTableWidth" class="sort-th">{{colMod.label}}
                  <span class="sort-up-down" v-if="colMod.sortable"
                        @click="sortClick(colMod.label,colMod.field,index,colMod.sortField)">
                              <i v-show="upIndex!==index" ref="box" class="sort-up"></i>
                              <i v-show="downIndex!==index" class="sort-down"></i>
                  </span>
            </span>
            </th>
          </tr>
          <tr v-for='(rwoContent,items) in contents' :key='rwoContent.index'>
            <td v-if="lockCol.indexOf(index) != -1" v-for='(tdContent,index) in rwoContent' :key='index' v-bind:class="{'hidden': colModels[index].hidden}"
                v-bind:style="{ textAlign: tdTextAligns[index], backgroundColor: tdBackgroundColors[index] }">
              <a v-if="dataIds[items] != -9 &&  tdTextColor[index]&&clickfun[index]" :style="{color:tdTextColor[index]}"
                 @click="callParentEvent(items,index)">{{tdContent}}</a>
              <span v-if="dataIds[items] == -9 || !clickfun[index]" v-html="tdContent"></span>
            </td>
          </tr>
        </table>
      </div>
      <div class='tablebody' ref="tabalScroll">
        <table class='publicTableBody' :class="{fiexdTableBody:fiexedTabaleNav}" id="publicTableBody" border='1'
               cellspacing='0' style="position:relative;">
          <tr>
            <th v-if="lockCol.indexOf(index) == -1" class="tableHeader" v-for='(colMod,index) in colModels' v-bind:class="{'hidden': colMod.hidden}"
                :key='index'>
            <span ref="tableWidth" class="sort-th">{{colMod.label}}
                  <span class="sort-up-down" v-if="colMod.sortable"
                        @click="sortClick(colMod.label,colMod.field,index,colMod.sortField)">
                              <i v-show="upIndex!==index" ref="box" class="sort-up"></i>
                              <i v-show="downIndex!==index" class="sort-down"></i>
                  </span>
            </span>
            </th>
          </tr>
          <tr v-if="fiexedTabaleNav" v-show="fixedBar" class="fixed-tab fixedTabSpecial" ref="tableBarFiexd">
            <th v-if="lockCol.indexOf(index) != -1" v-for='(colMod,index) in colModels' :key='index' v-bind:class="{'hidden': colMod.hidden}">
              <span :style="{width:tableWidth[index]}">{{colMod.label}}</span>
            </th>
            <th v-if="lockCol.indexOf(index) == -1" style="position: relative;" v-for='(colMod,index) in colModels' v-bind:class="{'hidden': colMod.hidden}"
                :key='index'>
              <span :style="{width:tableWidth[index]}">{{colMod.label}}</span>
            </th>
          </tr>
          <tr v-for='(rwoContent,items) in contents' :key='rwoContent.index'>
            <td v-if="lockCol.indexOf(index) == -1" v-for='(tdContent,index) in rwoContent' :key='index' v-bind:class="{'hidden': colModels[index].hidden}"
                v-bind:style="{ textAlign: tdTextAligns[index], backgroundColor: tdBackgroundColors[index] }">
              <a v-if=" dataIds[items] != -9 && tdTextColor[index] && clickfun[index]"
                 :style="{color:tdTextColor[index]}"
                 @click="callParentEvent(items,index)">{{tdContent}}</a>
              <span v-if="dataIds[items] == -9 || !clickfun[index]" v-html="tdContent"></span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="tips && contents && contents.length > 0" class="jtable-tips"><span style='color:red'>*</span>{{tips}}
    </div>
    <div class="submitButton">
      <button v-if='!lastPage' v-on:click='loadMoreContent(url)'>加载更多（第{{this.currentPage}}页&nbsp;/&nbsp;共{{this.totalPage}}页）</button>
    </div>
    <div class="loadingReset" v-if="loading&&controlLoad"><img src="@/assets/img/loadingReset.gif" alt=""></div>
  </div>
</template>
<script>

import MtButton from '../../../node_modules/mint-ui/packages/button/src/button.vue'
import {Indicator, Toast} from 'mint-ui'
import * as Tools from '../../untils/Tools'
import * as NUmberUtils from '../../untils/NumberUtils'

export default {
  name: 'j-table',
  props: {
    title: String,
    footTip: String,
    url: String,
    colModels: Array,
    conditions: Array,
    selections: Boolean,
    direction: String,
    property: String,
    fiexedTabaleNav: Boolean,
    sonTable: Boolean,
    idField: String,
    tips: String,
    fixedRules: Array,
    refresh: Boolean,
    lockCol: Array,
    onlyWatchUrlAble: Boolean,
    controlLoad: Boolean, // 控制loading
    size: String,
    fromClientType: String,
    specialConditions: Object
  },
  data: function () {
    return {
      loading: false,
      selectFactory: '',
      selectLocation: '',
      inputValue: '',
      location: [],
      factory: [],
      lockColNum: 2,
      baseInfo: {},
      page: Object,
      contents: Array,
      lastPage: Boolean,
      pageNumber: Number,
      rules: [],
      tabalScroll: {},
      tableBarFiexd: {},
      fixedBar: false,
      sortable: false,
      tdTextAligns: [],
      tdBackgroundColors: [],
      tdTextColor: [],
      totalPage: '',
      sort: true,
      currentPage: 1,
      clickfun: [],
      dataIds: [],
      sonTableData: [],
      canvas: String,
      upIndex: -1,
      downIndex: -1

    }
  },
  mounted () {
    if (this.fixedRules) {
      for (let frule in this.fixedRules) {
        this.rules.push(this.fixedRules[frule])
      }
    }
    this.canvas = document.querySelector('.sort-up')
    var that = this
    this.baseInfo = this.$route.query
    this.initReload()

    this.tabalScroll = this.$refs.tabalScroll
    this.tableBarFiexd = this.$refs.tableBarFiexd

    if (this.fiexedTabaleNav) {
      var firsTroffsetT = document.getElementById('publicTableBody').offsetTop
      document.body.onscroll = function () {
        const bodyScrollT = document.body.scrollTop
        if (bodyScrollT > firsTroffsetT) {
          that.fixedBar = true
          that.tableBarFiexd.scrollLeft = that.tabalScroll.scrollLeft
        } else {
          that.fixedBar = false
        }
      }
      this.tabalScroll.onscroll = function () {
        var timer = ''
        clearTimeout(timer)
        timer = setTimeout(function () {
          that.tableBarFiexd.scrollLeft = that.tabalScroll.scrollLeft
        }, 0)
      }
    }
  },
  components: {
    MtButton
  },
  created () {
    this.onlyWatchUrlAble = true
  },
  beforeDestroy () {

  },
  updated () {

  },
  methods: {
    getWidthTable (tableWidth) {
      let me = this
      let fixedTableWidthNum = 0
      me.$refs.fixedTableWidth.forEach(function (value, index, array) {
        tableWidth = tableWidth.concat(me.$refs.fixedTableWidth[index].clientWidth)
        fixedTableWidthNum = fixedTableWidthNum + 1
      })
      me.$refs.tableWidth.forEach(function (value, index, array) {
        tableWidth = tableWidth.concat(me.$refs.tableWidth[index].clientWidth)
      })
      tableWidth.forEach(function (value, index, array) {
        if (fixedTableWidthNum === index + 1) {
          tableWidth[index] = tableWidth[index] + 2
        }
        tableWidth[index] = tableWidth[index] + 'px'
      })
      this.tableWidth = tableWidth
    },
    sortClick (label, field, index, sortField) {
      if (sortField) {
        // 执行操作
        this.property = sortField
      } else {
        this.property = field
      }

      this.sort = false
      if (this.upIndex !== index) {
        this.upIndex = index
        this.downIndex = -1
        this.direction = 'DESC'
      } else {
        this.direction = 'ASC'
        this.upIndex = -1
        this.downIndex = index
      }

      this.initReload()
    },
    // (id, value, field, content)
    callParentEvent (rowIndex, columnIndex) {
      this.$emit(this.clickfun[columnIndex], this.dataIds[rowIndex], this.contents[rowIndex][columnIndex], this.colModels[columnIndex].field, this.contents[rowIndex])
    },
    loadMoreContent: function (url) {
      this.loading = true
      Indicator.open()
      //   console.log(this.tableWidth)
      this.pageNumber++
      var param = {
        'number': this.pageNumber,
        'rules': this.rules,
        'direction': this.direction,
        'property': this.property,
        'size': this.size,
        'fromClientType': this.fromClientType,
        'specialConditions': this.specialConditions
      }
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.post(url, param).then((rep) => {
        let successData = rep.data.content
        if (!rep.data.content) {
          successData = rep.data
          if (rep.data.length === 0) {
            this.contents = []
          }
        }
        this.totalPage = rep.data.totalPages
        successData.forEach(content => {
          this.loading = false
          var rowContent = []
          this.colModels.forEach((colMod, index) => {
            let fields = colMod['field']
            if (fields.indexOf('-') > 0) {
              let tdContent = ''
              const joiner = colMod['joiner']
              let units = null
              if (colMod['units']) { // 单位
                units = colMod['units'].split('-')
              }
              let index = 0
              fields.split('-').forEach(field => {
                if (content[field] == null) {
                  if (colMod['nullReplace']) {
                    tdContent += colMod['nullReplace']
                  } else {
                    tdContent += '无'
                  }
                } else {
                  if (colMod['formatter'] === 'tenThousandFmt' && typeof content[field] === 'number' && content[field] !== 0 && Math.abs(content[field]) > 1000) {
                    // content[field] = Tools.number(content[field])
                    content[field] = NUmberUtils.convert(content[field], 10000, 2) + '万'
                  }
                  if (colMod['formatterWeight'] === 'ton' && typeof content[field] === 'number' && content[field] !== 0 && Math.abs(content[field]) > 1000) {
                    // content[field] = Tools.number(content[field])
                    content[field] = NUmberUtils.convert(content[field], 1000, 2) + ''
                  }

                  tdContent += content[field]
                }
                if (units) {
                  tdContent += '(' + units[index] + ')'
                }
                tdContent += joiner
                index++
              })
              tdContent = tdContent.substr(0, tdContent.length - 1)

              rowContent.push(tdContent)
            } else {
              let tdContent = null
              if (fields.indexOf('.') > 0) {
                tdContent = content
                while (fields.indexOf('.') > 0) {
                  let key = fields.substr(0, fields.indexOf('.'))
                  if (tdContent) {
                    tdContent = tdContent[key]
                    fields = fields.substr(fields.indexOf('.') + 1, fields.length)
                    if (fields.indexOf('.') <= 0 && tdContent) {
                      tdContent = tdContent[fields]
                    }
                  }
                }
              } else {
                tdContent = content[fields]
              }

              const fmt = colMod['formatter']
              if (tdContent && fmt) {
                if (fmt === 'tenThousandFmt') {
                  tdContent = NUmberUtils.convert(tdContent, 10000, 2) + '万'
                }
              }

              const Weight = colMod['formatterWeight']
              if (tdContent && Weight) {
                if (Weight === 'ton') {
                  tdContent = NUmberUtils.convert(tdContent, 1000, 2) + '吨'
                }
              }

              if (tdContent == null) {
                if (colMod['nullReplace']) {
                  tdContent = colMod['nullReplace']
                } else {
                  tdContent = '无'
                }
              }
              if (colMod['units']) {
                tdContent += '(' + colMod['units'] + ')'
              }
              if (typeof tdContent === 'number' && tdContent !== 0 && Math.abs(tdContent) > 1000) {
               tdContent = Tools.number(tdContent)
              }
              rowContent.push(tdContent)
            }
            if (colMod['tdTextAlign']) {
              this.tdTextAligns.push(colMod['tdTextAlign'])
            } else {
              this.tdTextAligns.push('center')
            }
            if (colMod['tdBackgroundColor']) {
              this.tdBackgroundColors.push(colMod['tdBackgroundColor'])
            } else {
              // this.tdBackgroundColors.push('#fff')
            }
            if (colMod['tdTextColor']) {
              this.tdTextColor.push(colMod['tdTextColor'])
            } else {
              this.tdTextColor.push('#282828')
            }

            if (colMod['clickEvent']) {
              this.clickfun.push(colMod['clickEvent'])
            } else {
              this.clickfun.push('')
            }
          })
          this.contents.push(rowContent)
          if (this.idField) {
            this.dataIds.push(content[this.idField])
          } else {
            this.dataIds.push(content['id'])
          }
        })
        this.lastPage = rep.data.last
        if (!rep.data.totalPages) {
          this.lastPage = true
        }
        this.currentPage = rep.data.number + 1
        Indicator.close()
        this.$nextTick(function () {
          if (this.lockCol !== undefined) {
            this.tableWidth = []
            this.getWidthTable(this.tableWidth)
          }
        })
        this.loading = false
      }, err => {
        Indicator.close()
        Toast(err.error.message)
      })
    },
    search: function () {
      this.rules = []
      if (this.fixedRules) {
        for (let frule in this.fixedRules) {
          this.rules.push(this.fixedRules[frule])
        }
      }
      this.conditions.forEach(cond => {
        if (cond.value) {
          let rule = {
            'field': cond.field,
            'option': cond.option,
            'values': [
              cond.value
            ]
          }
          this.rules.push(rule)
        }
        if (cond.typeLabel === 'month' || cond.typeLabel === 'text') {
          this.$emit('monthData', cond.value)
        }
      })
      if (!this.onlyWatchUrlAble) {
        this.initReload()
      }
    },
    initReload: function () {
      this.contents = []
      this.lastPage = true
      this.pageNumber = -1
      this.dataIds = []
      this.loadMoreContent(this.url)
    }
  },
  watch: {
    url (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.contents = []
        this.lastPage = true
        this.pageNumber = -1
        this.dataIds = []
        this.url = newValue

        this.loadMoreContent(this.url)
      }
    },
    fixedRules (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.contents = []
        this.lastPage = true
        this.pageNumber = -1
        this.dataIds = []
        this.fixedRules = newValue
        this.rules = []
        if (this.fixedRules) {
          for (let frule in this.fixedRules) {
            this.rules.push(this.fixedRules[frule])
          }
        }
        this.loadMoreContent(this.url)
      }
    }
  }
}
</script>

<style scoped>
  .arketSearch {
    padding: 2%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    width: 97%;
    margin: auto;
  }

  .arketSearch select, .arketSearch input {
    border: thin solid #ddd;
    width: 49%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    border-radius: 3px;
  }

  .arketSearch input {
    width: 75%;
  }

  .arketSearch .searchBtn {
    width: 60px;
    height: 30px;
    border-radius: 3px;
    background: #1893d5;
    color: #fff;
    border: none;
  }

  .tableHeader {
    background-color: #f5f5f5;
  }

  .sort-th {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .sort-up-down {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-left: 0.5em;
  }

  .sort-up {
    border-bottom: 0.4em solid #282828;
    margin-bottom: 0.1em;
    border-left: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
  }

  .sort-down {
    border-top: 0.4em solid #282828;
    margin-top: 0.1em;
    border-left: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
  }

  .tablebody {
    width: 95%;
    margin: 0 auto;
    margin-top: 0.5rem;
    color: #282828;
    overflow: scroll;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    background: #fff;
  }

  .pubicTable .pubicTableTitle {
    font-size: 0.8rem;
    color: #000000;
    margin: 0;
    text-align: left;
    padding: 0.5rem 0 0 0;
    margin-left: 0.5rem;
  }

  .pubicTableTitle {
    font-size: 0.8rem;
    margin: 0;
    color: #000;
    text-align: left;
    padding: 0.8rem 0 0.3rem 0;
    margin-left: 0.5rem;
    position: relative;
  }

  /*.pubicTableTitle button{*/
  /*width: 30px !important;*/
  /*height: 30px !important;*/
  /*background-color: #e5e5e5 !important;*/
  /*}*/
  .pubicTableTitle span {
    padding-left: 0.5rem;
    display: inline;
    position: relative;
  }

  .pubicTableTitle span:nth-child(2) {
    padding-left: 9rem;
    display: inline;
    position: relative;
    border: 0;
  }

  .pubicTableTitle span:nth-child(2):before {
    background-color: #fff;
  }

  .pubicTableTitle button {
    /*height: auto !important;*/
    margin: 0 !important;

  }

  .pubicTableTitle span:before {
    width: 3px;
    position: absolute;
    top: 1px;
    left: 0;
    height: 0.8rem;
    content: "";
    background-color: #26a2ff;
    border-radius: 3px;
  }

  .publicTableBody tr th {
    font-size: 12px;
    height: 1.5rem;
    line-height: 1.5rem;
    border: 1px solid #ddd;
  }

  .publicTableBody tr td {
    font-size: 12px;
    height: 1.5rem;
    line-height: 1.5rem;
  }

  .tableButton {
    color: #144C86;
  }

  .publicTableBody td {
    border: 1px solid #ddd;
  }

  .publicTableBody tr th:nth-of-type(1), .publicTableBody tr td:nth-of-type(1) {
    border-left: 0;
  }

  .subHead {
    margin: 0;
    font-size: 0.7rem;
    color: #144C86;
    margin-top: 0.5rem;
  }

  .sort {
    border-top: 1px solid #CCCCCC;
    margin-top: 0.5rem;
  }

  .sort p {
    margin: 0;
    padding: 0.5rem 0 0 0;
    color: #777777;
    font-size: 0.7rem
  }

  .sort p span:nth-of-type(2) {
    margin-left: 0.2rem;
    color: #282828;
  }

  .sort p span:nth-of-type(3) {
    margin-left: 0.3rem;
  }

  .mint-popup {
    width: 100%;
  }

  td, th {
    white-space: nowrap;
    padding: 0.2em 0.5em;
  }

  table {
    min-width: 100%;
    border: 0;
  }

  .pubicTable {
    background: #fff;
    margin: 0.5rem;
    padding-bottom: 20px;
  }

  .fixed-tab {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    margin: 0 0.5rem;
    width: 89.5%;
    position: fixed;
    top: 0;
    left: 2.5%;
    overflow: scroll;
    background: #fff;
    z-index: 100;
  }

  .fixedTabSpecial {
    margin: 0;
    width: 94.5%;
  }

  .fixed-tab::-webkit-scrollBar {
    display: none;
  }

  .fixed-tab table {
    overflow: scroll;
    min-width: 100%;
  }

  /*.submitButton{margin-bott:50px;}*/
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
    width: 85%;
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

  .refreshButton {
    position: absolute;
    right: 0;
    top: 0;
    height: 1rem !important;
    width: 1rem !important;
    padding: 0;
    background-color: #fff !important;
    color: #ffffff;
    height: 2rem;
    border: 0;
    font-size: 0.7rem;
    margin: 1rem 0;
    border-radius: 5px;
    /*float: left;*/
  }

  button .elseButton {
    width: 95%;
    background-color: #26a2ff;
    /*color: #ffffff;*/
    height: 2rem;
    border: 0;
    font-size: 0.7rem;
    margin: 1rem 0;
    border-radius: 5px;
  }

  .fiexdTableBody span {
    display: block;
    /*white-space: pre-wrap;*/
    word-break: break-word
  }

  .fiexdTableBody tr td:nth-child(1) {
    width: 20px;
  }

  .btnbox {
    width: 25%;
    padding: 4px;
    border: 1px solid #ccc;
    background: #e5e5e5;
    margin-left: 5px;
  }

  .jtable-tips {
    font-size: 12px;
    text-align: left;
    margin: 0.5rem 0 0 0.5rem
  }

  .jtable-tips span {
    color: #ff0000;
  }

  .searchStyle {
    font-size: 0.5rem;
    padding-left: 5px;
    padding-top: 10px;
    display: flex;
    padding-right: 5px;
  }

  .searchStyle .inputStyle {
    padding: 5px;
    margin-left: 5px;
    border: 1px solid #d5d5d5;
    float: left;
    width: 96%;
  }
  .loadingReset{
    width: 100%;
    height: 30px;
    text-align: center;
    display: block;
    line-height: 40px;
    border-bottom: 1px solid rgb(221,221,221);
  }
  .loadingReset img{
    width: 20px;
    height: 20px;
  }
  .hidden {
    display: none!important;
  }
  .btnSearch{
    background-color: #409EFF;
    border: 1px solid #409EFF;
    width: auto;
  }
  table tr:nth-child(odd){
    background-color: #f6f9fb;
  }
</style>
