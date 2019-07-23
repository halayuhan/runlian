<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:08:17
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-23 20:46:41
 * @Description: file content
 -->
<template>
  <div id="mobile-item">
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

<style scoped>
</style>
