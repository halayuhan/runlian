<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:08:17
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-01 18:29:41
 * @Description: file content
 -->
<template>
  <div class="mobile-item">
    <mobile-header></mobile-header>
    <mobile-container></mobile-container>
  </div>
</template>

<script>
import MobileHeader from '@/components/mobile/MobileHeader'
import MobileContainer from '@/components/mobile/MobileContainer'

export default {
  name: 'MobileItem',
  components: {
    'mobile-header': MobileHeader,
    'mobile-container': MobileContainer
  }
}
</script>

<style>
.mobile-item {
  background: url("../../assets/bc_attend3.png") no-repeat;
  background-size: 100vw 100vh;
}
</style>
