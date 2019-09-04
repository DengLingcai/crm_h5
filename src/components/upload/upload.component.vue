<template>
  <!--:on-preview="handlePreview"-->
  <!--:on-remove="handleRemove"-->
  <!--:file-list="fileList"-->
  <!--:before-upload="before"-->
  <el-upload
    class="upload-demo"
    ref="upload"
    :multiple="true"
    action="/file/upload-multi"
    :show-file-list="false"
    :on-success="success"
    :on-change="change"
    :http-request="upload"
    :auto-upload="false">
    <!--<a slot="trigger" size="small" type="primary"><i class="el-icon-upload2"></i><span-->
      <!--style="font-size: 0.7rem;">上传附件</span></a>-->
    <el-button slot="trigger" size="small" type="primary"><i class="el-icon-upload2"></i>上传附件</el-button>
    <!--<a style="margin-left: 10px;" size="small" type="success" @click="submitUpload()"><span style="font-size: 0.7rem;">上传到服务器</span></a>-->
    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
  </el-upload>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  name: 'upload',
  props: ['id', 'fkType'],
  mounted () {
    this.baseInfo = this.$route.query
  },
  methods: {
    upload () {
      console.log(this.formData)
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.post('/api/operator/assist_list', this.formData).then((res) => {
        if (res && res.length > 0) {
          this.attachmentList.push(res[0])
          if (this.attachmentList.length === this.fileList.length) {
            console.log('一起上传')
            console.log(this.attachmentList)
          }
        }
      }).catch((err) => {
        console.log(err
        )
      })
    },
    success (file, fileList) {
      console.log(file, fileList)
    },
    change (file, fileList) {
      this.formData = new FormData()
      for (let i in fileList) {
        this.formData.append('file', fileList[i].raw)
        this.formData.append('fkType', this.fkType)
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.defaults.headers.common.Authorization = this.baseInfo.token
      this.$axios.post('/api/file/upload-multi/' + this.id, this.formData, config).then((res) => {
        console.log(res.data)
        this.$emit('uploadValue', res.data)
        Toast('上传成功')
      }).catch((err) => {
        console.log(err
        )
      })
    }
  }
}
</script>

<style scoped>
.upload-demo{
  padding: 0 1rem;
  text-align: left;
}
</style>
