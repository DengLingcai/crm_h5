<style>
    .contract-modal {
        position: fixed;
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: scroll;
        background: rgba(139, 148, 171, 0.7);
        padding: 20px 0 0;
        z-index: 900;
    }
    .contract-modal .contract-detail {
        margin: 0 auto;
        max-width: 96%;
        height: auto;
    }
    .contract-btns{
        height: 50px;
        background-color:  #fff;
        text-align: center;
        padding-bottom:44px;
        padding-top:10px;
    }
    #mycanvas {
        min-height: 50vh;
        background: #fff;
    }
    canvas{
        margin: 0 auto;
        display: block;
        border-bottom:2px solid #aaa;
    }
    .close-btn{
        position: fixed;
        top: 65px;
        right: 0;
        width: 26px;
        height: 26px;
        z-index: 999;
        /*background-color: #666;*/
        border-radius: 50%;
        cursor: pointer;
    }
</style>

<template>
    <div v-if='visible' style="width: 100%;position: relative">

        <div class="contract-modal">
            <div class="contract-detail"
                 id="contractDetail">
                <div id="mycanvas" ref="mycanvas"></div>
                <!--合同内容-->
                <div class="contract-btns contract-operate" v-if="showBtns">

                </div>
            </div>
          <!--<iframe src="http://192.168.1.200:9090/api/file/df9504e3579b4895b14cf4212f6c9c0b/_thumbnail" frameborder="0"></iframe>-->
          <div class="close-btn" @click="closeModal">
            <!--<span style="font-weight: bold; margin-top: 2px;display: inline-block;">X</span>-->
            <i class="el-icon-error"></i>
          </div>
        </div>
    </div>

</template>

<script>
import {Indicator, Toast} from 'mint-ui'
import pdf from '../../../static/pdf/build/pdf'
export default {
  name: 'md-contract',
  props: ['visible', 'showBtns', 'checkFile'],
  data () {
    return {}
  },
  watch: {
    visible (val) {
      if (val) {
        this.contractError = false
        this.$nextTick(() => {
          this.getPdf(this.checkFile)
        })
      }
    }
  },
  methods: {
    handleError (status) { //  合同有误
      this.contractError = status
    },
    closeModal () {
      this.$emit('handleModal')
    },
    getPage (pdf, pageNumber, container, numPages) { // 获取pdf
      Indicator.close()
      let _this = this
      pdf.getPage(pageNumber).then((page) => {
        let scale = (container.offsetWidth / page.view[2])
        let viewport = page.getViewport(scale)
        let canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        container.appendChild(canvas)
        let ctx = canvas.getContext('2d')
        var renderContext = {
          canvasContext: ctx,
          transform: [1, 0, 0, 1, 0, 0],
          viewport: viewport,
          intent: 'print'
        }
        page.render(renderContext).then(() => {
          pageNumber += 1
          if (pageNumber <= numPages) {
            _this.getPage(pdf, pageNumber, container, numPages)
          }
        })
      })
    },
    getPdf (checkFile) {
      Indicator.open()
      // 此中方式接受流形式返回
      this.$refs.mycanvas.scrollTop = 0
      //                let accessToken = cache.get('TOKEN').Authorization
      //                let url = `${config.baseUrls}/api/fund/v1/contractReports/previewContractContent?access_token=${accessToken}&id=${contractData.id}&contractUrl=${contractData.contractUrl}&.pdf`
      // let url = 'http://image.cache.timepack.cn/nodejs.pdf'
      // let url = '../../../static/pdf/web/demo.pdf'
      let pdfjsLib = pdf
      pdfjsLib.PDFJS.workerSrc = '/static/pdf/build/pdf.worker.js'
      let loadingTask = pdfjsLib.getDocument(checkFile)
      loadingTask.promise.then((pdf) => {
        let numPages = pdf.numPages
        let container = document.getElementById('mycanvas')
        let pageNumber = 1
        this.getPage(pdf, pageNumber, container, numPages)
      }, function (reason) {
        // alert(reason)
        Toast(reason)
      })
    }
  },
  created () {
  }
}
</script>
