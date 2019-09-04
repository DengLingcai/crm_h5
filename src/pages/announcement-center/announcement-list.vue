<template>
  <div class="order-company-info">
    <div class="order-company-info">
      <div class="list-block media-list">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="orderInfo" style="margin: 0;">
                  <p class="newTitle" style="padding: 0;">
                    <span class="topModuleTitle">公告中心</span>
                  </p>
                  <div class="list_table" style="text-align: center;margin-bottom: .6rem;overflow: auto;">
                    <el-table :fit="true" :data="dataList" border style="width: calc(100% - 1.5rem);margin: auto" tooltip-effect="light" :cell-style="{'font-size': '.6rem','white-space': 'nowrap','padding':'.3rem 0'}" :header-cell-style="{'font-size': '.6rem','white-space': 'nowrap'}" :highlight-current-row="true">
                      <el-table-column width="210"
                        label="标题" resizable :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.row.id)" type="text" size="small" style="white-space: nowrap">{{scope.row.title}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="lastModifiedDate"
                        label="更新时间" width="140">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import * as DateUtils from '../../untils/DateUtils.js'
  export default {
    name: 'announcement-list',
    data() {
      return {
        dataList:[]
      }
    },
    created(){
      this.baseInfo = this.$route.query
    },
    mounted(){
      this.reload()
    },
    methods:{
      handleClick(id){
        console.log(id)
        this.$router.push({path: '/announcement-detail?id='+ id + '&token=' + this.baseInfo.token})
      },
      reload(){
        this.getDataList()
      },
      dateFormat(row, column, cellValue){
        return DateUtils.dateForma(new Date(cellValue))
      },
      getDataList(){
        let params = {
          direction: "DESC",
          fromClientType: "pc",
          number: 0,
          property: "lastModifiedDate",
          rules: [],
          size: 10,
          specialConditions: []
        }
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        this.$axios.post('api/article/page',params).then((res) =>{
          console.log(res.data.content)
          this.dataList = res.data.content
        })
      }
    }
  }
</script>

<style scoped>

</style>
