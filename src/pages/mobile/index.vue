<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:08:17
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 14:05:14
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
@import "../../assets/less/mobile/pages.css";
</style>
