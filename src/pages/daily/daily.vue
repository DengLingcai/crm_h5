<template>
  <div>
    <div class="ModuleContainer orderInfo card-cover" style="padding: 0;">
      <el-tabs stretch v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有" name="all">
          <div style="text-align: center;padding: 10px 0;text-align: center;background-color: #e4e7ed;">
            <el-input
              class="view"
              size="small"
              placeholder="请输入客户名称"
              prefix-icon="el-icon-search"
              v-model="input">
            </el-input>
          </div>
          <div class="ModuleContainer orderInfo card-cover">
            <p class="newTitle detailsTitle">
              <span class="topModuleTitle">铁三角日报</span>
            </p>
            <el-table :data="tableData" :border="true" :highlight-current-row="true" style="width: 100%"
                      max-height="250" :cellStyle="adjustHeight">
              <el-table-column label="客户">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                    {{tableData[scope.$index].classification}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="rate" label="汇报日期">
              </el-table-column>
              <el-table-column prop="number" label="汇报人">
              </el-table-column>
              <el-table-column prop="price" label="铁三角其他成员">
              </el-table-column>
              <!--<el-table-column fixed="right" label="操作" width="80">-->
              <!--<template slot-scope="scope">-->
              <!--<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">-->
              <!--移除-->
              <!--</el-button>-->
              <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的" name="second">我的</el-tab-pane>
        <el-tab-pane label="我的客户" name="third">我的客户</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'daily',
  data: function () {
    return {
      tableData: [{
        classification: '晶科',
        rate: '2018-11-28',
        number: 'SR-林克',
        price: 'AR-刘云，FR-林',
        subtotal: '59.2万'
      }],
      input: '',
      activeName: 'all'
    }
  },
  mounted () {

  },
  methods: {
    adjustHeight () {
      return 'padding:8px 0'
    },
    click (event) {
      console.log(event)
    },
    handleClick (tab, event) {
      console.log(tab)
      console.log(event)
    },
    deleteRow (value, data) {
      console.log(value)
      console.log(data)
    }
  }
}
</script>

<style scoped>
  body {
    background: #fff;
  }

  .card-cover {
    margin: 0;
    border-radius: 0;
    padding: 0 20px 20px;
  }

  .card-border {
    border-bottom: 2px solid #dddddd;
  }

  .is-active {
    border-bottom: 2px solid #dddddd;
  }

</style>
