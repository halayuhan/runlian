<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:14:12
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 13:52:01
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
@import "../../assets/less/portal/pages.css";
</style>
