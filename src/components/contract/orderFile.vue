<template>
  <div class="orderFile">
    <p><span class="fa fa-cube color-gray orderFile-icon"></span>文件</p>
    <div class="orderFileList">
      <p v-for="file in files" :key="file.id">
        <a href="">{{file.fileName}}</a>
        <span class="fa fa-arrow-circle-o-down downLoad"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-file',
  props: ['files']
}
</script>

<style scoped>
  .orderFile{
    background-color: #ffffff;
    margin: 0.5rem 0.6rem;
    border-radius: 0.4rem;
    padding-bottom: 1rem;
    text-align: left;
  }
  .orderFile > p:nth-of-type(1){
    font-size: 1rem;
    color: #282828;
    margin: 0 0 0.5rem 0;
    padding-top: 0.5rem;
  }
  .orderFile-icon{
    font-size: 1rem!important;
    margin: 0 0.5rem
  }
  .orderFileList p{
    margin: 0 0 0 0.5rem;
    font-size: 0.7rem;
  }
  .downLoad{
    color: #008DF2;
    margin-left: 0.5rem;
  }
</style>
