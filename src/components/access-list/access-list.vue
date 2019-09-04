<template>
  <div style="margin-top: .3rem;padding: 0 1rem">
  <el-row :gutter="20">
    <el-col :span="6" style="width: 100%;">
      <div class="grid-content bg-purple" style="float: left;" v-for="(item,index) in options" v-bind:key="index">
        <!--:href="formatUrl(item.qiniuKey)"-->
        <a v-if="fileFormat.indexOf(item.fileType)!=-1" @click="goToImg(formatUrl(item.qiniuKey),index)" style="float: left;margin-bottom: 0.5rem;margin-right: 0.66rem;">
          <img :src="formatUrl(item.qiniuKey)"  alt="" class="imgclass">
          <span class="access-fileName" v-if="fileFormat.indexOf(item.fileType)==-1">{{item.fileName}}</span>
        </a>
      </div>
      <div class="grid-content bg-purple" style="float: left;width: 100%;" v-for="(item,index) in options" v-bind:key="item.qiniuKey">
        <a v-if="fileFormat.indexOf(item.fileType)==-1" @click="goToPdf(formatUrl(item.qiniuKey),item.fileType,item.fileName)"  style="display: flex;margin-bottom: .5rem;width: 100%;">
          <span class="imgclass" style="text-align: center;font-size: 0.7rem;color: #a09f9f;line-height: 1.8rem;">
            {{item.fileType}}
          </span>
          <span class="access-fileName">{{item.fileName}}</span>
        </a>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import * as AccessUrl from '@/untils/urlUtils'
export default {
  name: 'access-list',
  props: ['options','isFileType'],
  data: function () {
    return {
      fileFormat: ['png', 'gif', 'jpg', 'jpeg', 'jpe', 'gif', 'bpm', 'dib', 'PNG', 'GIF', 'JPG', 'JPEG', 'JPE', 'GIF', 'BPM', 'DIB'],
      showFileType:'',
      showAccess: false
    }
  },
  mounted(){
    if(this.isFileType){
      this.showFileType = this.isFileType.split(",")
      for(let i=0; i<this.options.length;i++){
        for(let j=0 ;j<this.options.length;j++){
          if(this.options[i].fileType.indexOf(this.showFileType[j])>-1){
            this.options.splice(i,1)
          }
        }
      }
    }
  },
  methods: {
    formatUrl (data) {
      return AccessUrl.getAccessUrl(data)
    },
    goTo: function (url) {
        document.location = 'http://action:10054?url=' + url
    },
    goToImg(qiniuKey,index){
      let imgString = ''
      for(let i=0;i<this.options.length;i++){
        if(this.fileFormat.indexOf(this.options[i].fileType)!=-1){
          imgString += this.formatUrl(this.options[i].qiniuKey)+'|'
        }
      }
      if(/(Android)/i.test(navigator.userAgent)){
        try {
          let version = MyWebView.getSysVersion().split(".")
          if(version[0]>1||(parseInt(version[0])===1&&((parseInt(version[1])>2)||(parseInt(version[1])===2&&parseInt(version[2])>3)))){
            document.location = 'http://action:10057/?url=' + imgString + '&position=' + index
          }
        }
        catch(err) {
          document.location = qiniuKey
        }
      }else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        document.location = qiniuKey
      }
    },
    goToPdf: function (url,fileType,fileName) {
      let ua = navigator.userAgent.toLowerCase();
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        document.location = 'http://action:10054?url=' + url
      } else if (/(Android)/i.test(navigator.userAgent)) {
        document.location = 'http://action:10054?url=' + url + '&fileType=' + fileType + '&fileName=' + fileName
      }
    },
  }
}
</script>

<style scoped>
.imgclass{
  width: 2rem;
  height: 2rem;
  display: block;
  outline: rgb(211, 211, 211) solid 1px;
}
</style>
