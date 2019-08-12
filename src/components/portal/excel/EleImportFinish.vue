<!--
 * @Author: liyan
 * @Date: 2019-08-08 16:13:54
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-12 09:37:21
 * @Description: file content
 -->
<template>
  <div class="ele-import-finish">
    <div>
      <i class="el-icon-success"></i>
    </div>
    <div>导入成功</div>
    <div class="ele-import-action">
      <el-button @click="handleFinish" type="primary">查看详情</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EleImportFinish',
  data () {
    return {}
  },
  methods: {
    handleFinish () {
      this.$emit('finish')
    }
  },
  mounted () { }
}
</script>

<style>
</style>
