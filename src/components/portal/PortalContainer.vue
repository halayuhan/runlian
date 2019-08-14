<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:14:30
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-14 15:25:27
 * @Description: file content
 -->
<template>
  <div class="portal-container">
    <el-scrollbar style="height: 100%;">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'PortalContainer'
}
</script>

<style>
</style>
