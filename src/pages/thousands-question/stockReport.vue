<template>
  <div>
    <div class="arketSearch">
      <select name="" v-model="selectedFactory" @change="changeFactory">
        <option value="0">所有工厂</option>
        <option v-bind:value="factory.id" v-for="factory in factories" :key="factory">{{factory.value}}</option>
      </select>
      <select name="" id="" v-model="selectedStockHouse">
        <option value="0">库存地点</option>
        <option :value="stockHouse.id" v-for="stockHouse in stockHouses" :key="stockHouse">{{stockHouse.value}}</option>
      </select>
      <button class="searchBtn" @click="search">搜索</button>
    </div>
    <j-table title="办事处库存" v-bind:colModels="specColModels" idField="spec" v-bind:fixedRules="fixedRules"
             v-bind:url="'/api/stock/count-spec'" @findZspth="findZspth">
    </j-table>
    <j-table v-if="showZspth" v-bind:title="specName" v-bind:colModels="zspthColModels" v-bind:fixedRules="fixedRules"
             idField="ztsph" @findDetail="findDetail" v-bind:url="ztsphUrl"></j-table>
    <j-table v-if="showDetail" v-bind:title='ztsphName' v-bind:url="'/api/stock/page'"
             v-bind:fixedRules="detailRules"
             v-bind:colModels="detailColModels" v-bind:lockCol="releaseLockCol">
    </j-table>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">明细库存</span>
      </p>
      <table class="details">
        <tbody>
        <tr>
          <th>客户名称</th>
          <td>60000700-单面 SE PERC 4BB 航华图形</td>
        </tr>
        <tr>
          <th>等级</th>
          <td>A</td>
        </tr>
        <tr>
          <th>档位</th>
          <td>高压</td>
        </tr>
        </tbody>
      </table>
      <div class="tableList">
        <el-table size="mini"
      :data="tableData3"
      style="width: 100%" show-summary :header-cell-style="headerCell" :cell-style="cellStyle">
      <el-table-column
        header-align="center"
        prop="date"
        label="档位/膜色"
        width="105" fixed="left">
      </el-table-column>
        <el-table-column label="A" header-align="center">
          <el-table-column
            align="right"
            prop="madeUpA"
            label="成品库">
          </el-table-column>
          <el-table-column
            align="right"
            prop="repairA"
            label="返工库"
            width="80">
          </el-table-column>
        </el-table-column>
      <el-table-column label="B" header-align="center">
        <el-table-column
          align="right"
          prop="madeUpB"
          label="成品库">
        </el-table-column>
        <el-table-column
          align="right"
          prop="repairB"
          label="返工库">
        </el-table-column>
      </el-table-column>
      <el-table-column label="C" header-align="center">
        <el-table-column
          align="right"
          prop="madeUpC"
          label="成品库">
        </el-table-column>
        <el-table-column
          align="right"
          prop="repairC"
          label="返工库">
        </el-table-column>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="total"
        label="总计">
      </el-table-column>
    </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import JTable from '../../components/jtable/jtable.vue'
import global from  '@/components/Global.vue'
export default {
  name: 'stock-report',
  data: function () {
    return {
      specColModels: Array,
      zspthColModels: Array,
      detailColModels: Array,
      releaseLockCol: [0],
      detailLockRow: true,
      showZspth: false,
      showDetail: false,
      specName: '',
      ztsphName: '',
      ztsphUrl: '',
      detailRules: [],
      selectedFactory: '0',
      selectedStockHouse: '0',
      fixedRules: [],
      factories: [],
      stockHouses: [],
      headerCell:global.headerCell,
      cellStyle:global.cellStyle,
      tableData3: [{
        date: '20.80-20.90%',
        madeUpA: 0,
        repairA: 0,
        madeUpB:240,
        repairB:0,
        madeUpC:0,
        repairC:0,
        total:240
      }, {
        date: '21.30-21.40%',
        madeUpA: 480,
        repairA: 0,
        madeUpB:2520,
        repairB: 0,
        madeUpC:0,
        repairC:0,
        total:3000
      }, {
        date: '21.40-21.50%',
        madeUpA: 2640,
        repairA: 0,
        madeUpB:6960,
        repairB: 0,
        madeUpC:2040,
        repairC:0,
        total:11640
      }, {
        date: '21.50-21.60%',
        madeUpA: 2160,
        repairA: 0,
        madeUpB:7440,
        repairB: 0,
        madeUpC:3360,
        repairC:0,
        total:12960
      }, {
        date: '21.70-21.80%',
        madeUpA: 7800,
        repairA: 0,
        madeUpB:27360,
        repairB: 0,
        madeUpC:9000,
        repairC:0,
        total:44160
      }, {
        date: '21.90-22.00%',
        madeUpA: 36120,
        repairA: 0,
        madeUpB:120000,
        repairB: 0,
        madeUpC:26160,
        repairC:0,
        total:182280
      },{
        date: '21.90-22.00%',
        madeUpA: 85920,
        repairA: 0,
        madeUpB:182160,
        repairB: 0,
        madeUpC:16800,
        repairC:0,
        total:284880
      },{
        date: '21.90-22.00%',
        madeUpA: 14280,
        repairA: 0,
        madeUpB:25320,
        repairB: 0,
        madeUpC:3480,
        repairC:0,
        total:43080
      }]
    }
  },
  created () {
    this.baseInfo = this.$route.query
    this.specColModels = [
      {
        'field': 'spec',
        'label': '规格',
        'clickEvent': 'findZspth',
        'tdTextColor': '#26a2ff'
      },
      {
        'field': 'clabsSum',
        'label': '库存',
        'formatterWeight': 'ton'
      }
    ]
    this.zspthColModels = [
      {
        'field': 'ztsph',
        'label': '批号',
        'clickEvent': 'findDetail',
        'tdTextColor': '#26a2ff'
      },
      {
        'field': 'spec',
        'label': '规格'
      },
      {
        'field': 'clabsSum',
        'label': '库存',
        'formatterWeight': 'ton'
      }
    ]
    this.detailColModels = [
      {
        'field': 'ztsph',
        'label': '批号',
        'spanW': '80px'
      },
      {
        'field': 'werks-lgort',
        'label': '库存地',
        'spanW': '80px',
        'joiner': '/'
      },
      {
        'field': 'matnr-maktx',
        'label': '物料描述',
        'spanW': '160px',
        'joiner': '/'
      },
      {
        'field': 'charg-weight',
        'label': '批次号/件重',
        'spanW': '110px',
        'joiner': '/'
      },
      {
        'field': 'clabs',
        'label': '数量',
        'spanW': '80px',
        'formatterWeight': 'ton'
      },
      {
        'field': 'number',
        'label': '件数',
        'spanW': '80px',
        'units': '件'
      }
    ]
  },
  mounted () {
    this.getSelectData()
  },
  methods: {
    getSelectData () {
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.get('api/store-house/factory/list').then((res) => {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].key !== 'ALL') {
              this.factories.push(
                {
                  'value': res.data[i].factoryName,
                  'id': res.data[i].factoryCode
                }
              )
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeFactory: function () {
      this.stockHouses = []
      this.selectedStockHouse = '0'
      this.$axios.get('/api/store-house/store/list/' + this.selectedFactory).then((res) => {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].key !== 'ALL') {
              this.stockHouses.push(
                {
                  'value': res.data[i].storeHouseName,
                  'id': res.data[i].storeHouseCode
                }
              )
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    search: function () {
      var rules = []
      if (this.selectedFactory !== '0') {
        rules.push({
          'field': 'werks',
          'option': 'EQ',
          'values': [this.selectedFactory]
        })
      }
      if (this.selectedStockHouse !== '0') {
        rules.push({
          'field': 'lgort',
          'option': 'EQ',
          'values': [this.selectedStockHouse]
        })
      }
      this.fixedRules = rules
      this.showZspth = false
      this.showDetail = false
    },
    findZspth (id, con) {
      this.showZspth = true
      this.specName = con
      this.showDetail = false
      this.ztsphUrl = '/api/stock/count-zspth/' + con
    },
    findDetail (id, con) {
      this.showDetail = true
      this.ztsphName = con
      this.detailRules = [
        {
          'field': 'spec',
          'option': 'EQ',
          'values': [this.specName]
        },
        {
          'field': 'ztsph',
          'option': 'EQ',
          'values': [this.ztsphName]
        }
      ]
      this.fixedRules.forEach(frule => {
        this.detailRules.push(frule)
      })
    }
  },
  components: {
    JTable
  }
}
</script>

<style scoped>
  .arketSearch {
    padding: 5px 2% 2px 2%;
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
</style>
