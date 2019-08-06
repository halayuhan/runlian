<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:08:17
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 13:57:12
 * @Description: file content
 -->
<template>
  <div class="success" v-loading.fullscreen.lock="this.$store.state.loading">
    <div class="success-container">
      <div class="success-box">
        <i class="el-icon-check"></i>
        <p>签到成功</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success'
}
</script>

<style>
</style>
