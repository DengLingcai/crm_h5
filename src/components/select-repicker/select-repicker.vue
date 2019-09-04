<template>
  <el-dialog width="80%" :center="false" :title="title" :visible.sync="select" @close="closeDialog()">
  <el-select v-model="input" placeholder="请选择">
    <el-option
    v-for="item in options"
    :key="item.value"
    :label="item[label]"
    :value="item">
    <span style="float: left">{{ item[label] }}</span>
    </el-option>
  </el-select>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog()">取 消</el-button>
    <el-button type="primary" @click="closeDialog(input)">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'select-repicker',
  props: ['options', 'title', 'label'],
  data: function () {
    return {
      select: true,
      input: ''
    }
  },
  mounted () {
  },
  methods: {
    closeDialog (data) {
      this.select = false
      this.$emit('efferent', this.select, this.input)
    }
  }
}
</script>

<style scoped>
</style>
