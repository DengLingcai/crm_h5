<template>
  <div>
    <div class="ModuleContainer orderInfo">
      <p class="newTitle">
        <span class="topModuleTitle">经销商计划详情</span>
      </p>
      <table class="details">
        <tbody>
            <tr>
              <th >省份 </th>
              <td  >
                {{this.dealerData.province != null ? this.dealerData.province.provinceName : "" }}
              </td>
            </tr>
            <tr>
              <th >品牌</th>
              <td  >
                {{this.dealerData.brand != null ? this.dealerData.brand.brandName : "" }}
              </td>
            </tr>
            <tr>
              <th >经销商代码</th>
              <td  >
                {{this.dealerData.dealerPlanCode  }}
              </td>
            </tr>
            <tr>
              <th >经销商名称</th>
              <td  >
                {{this.dealerData.getDealerPlanName}}
              </td>
            </tr>
            <tr>
              <th >一月</th>
              <td  >
                {{this.dealerData.january  }}
              </td>
            </tr>
            <tr>
              <th >二月</th>
              <td  >
                {{this.dealerData.february  }}
              </td>
            </tr>
            <tr>
              <th >三月</th>
              <td  >
                {{this.dealerData.march  }}
              </td>
            </tr>
            <tr>
              <th >四月</th>
              <td  >
                {{this.dealerData.april  }}
              </td>
            </tr>
            <tr>
              <th >五月</th>
              <td  >
                {{this.dealerData.may  }}
              </td>
            </tr>
            <tr>
              <th >六月</th>
              <td  >
                {{this.dealerData.june  }}
              </td>
            </tr>
            <tr>
              <th >七月</th>
              <td  >
                {{this.dealerData.july  }}
              </td>
            </tr>
            <tr>
              <th >八月</th>
              <td  >
                {{this.dealerData.august  }}
              </td>
            </tr>
            <tr>
              <th >九月</th>
              <td  >
                {{this.dealerData.september  }}
              </td>
            </tr>
            <tr>
              <th >十月</th>
              <td  >
                {{this.dealerData.october  }}
              </td>
            </tr>
            <tr>
              <th >十一月</th>
              <td  >
                {{this.dealerData.november  }}
              </td>
            </tr>
            <tr>
              <th >十二月</th>
              <td  >
                {{this.dealerData.december  }}
              </td>
            </tr>
            <tr>
              <th >一月到六月合计</th>
              <td  >
                {{this.dealerData.januaryToJune  }}
              </td>
            </tr>
            <tr>
              <th >七月到九月合计</th>
              <td  >
                {{this.dealerData.julyToSeptember }}
              </td>
            </tr>
            <tr>
              <th >十月到十一月合计</th>
              <td  >
                {{this.dealerData.octoberToNovember  }}
              </td>
            </tr>
            <tr>
              <th >全年合计</th>
              <td  >
                {{this.dealerData.totalForTheWholeYear  }}
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'dealer-plan-detail',
    props: {},
    data: function () {
      return {
        dealerId: -1,
        dealerData: {},
        baseInfo: {},
        isShow: ''

      }
    },
    components: {

    },
    mounted () {
      this.baseInfo = this.$route.query
      this.dealerId = this.baseInfo.id
      this.isShow = true
      this.loadDetail()
    },
    methods: {
      loadDetail () {
        this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
        this.$axios.get('/api/dealer-plan/detail/' + this.dealerId).then((rep) => {
          this.dealerData = rep.data
        }).catch(() => {
        })
      }

    }
  }
</script>

<style scoped>

</style>
