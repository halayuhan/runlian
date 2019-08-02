<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:14:12
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-01 17:09:30
 * @Description: file content
 -->
<template>
  <div class="portal-item">
    <portal-header></portal-header>
    <portal-container></portal-container>
  </div>
</template>

<script>
import PortalHeader from '@/components/portal/PortalHeader'
import PortalContainer from '@/components/portal/PortalContainer'

export default {
  name: 'PortalItem',
  data: () => ({
    isLogin: false
  }),
  components: {
    'portal-header': PortalHeader,
    'portal-container': PortalContainer
  }
}
</script>

<style>
.portal-item {
  height: 100%;
}
</style>
