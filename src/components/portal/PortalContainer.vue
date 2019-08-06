<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:14:30
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-01 17:11:30
 * @Description: file content
 -->
<template>
  <div class="portal-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PortalContainer'
}
</script>

<style>
.portal-container {
  /* height: calc(100% - 80px); */
  background-color: #eee;
  overflow: auto;
  /* 清除BFC的影响 */
}
</style>
