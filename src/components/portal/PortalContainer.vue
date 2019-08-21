<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:14:30
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-19 11:45:09
 * @Description: file content
 -->
<template>
  <div class="portal-container">
    <el-scrollbar style="height: 100%;" ref="scrollbar">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'PortalContainer',
  updated () {
    this.$nextTick(() => {
      this.$refs.scrollbar.update()
      console.log('update')
    })
  }
}
</script>

<style>
</style>
