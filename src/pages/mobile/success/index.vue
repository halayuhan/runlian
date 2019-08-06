<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:08:17
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-05 19:28:35
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
.success {
  height: 100%;
}

.success-container {
  height: 100%;
  overflow: auto;
  /* 解决BFC */
  /* display: flex;
  justify-content: center; */
}
.success-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 120px;
  height: 120px;
  margin: 160px auto;
  /* border: 2px solid #4d4d4d; */
  border-radius: 60px;
  background-color: rgba(255, 255, 255, 0.7);
}
.success-box i::before {
  font-size: 60px;
  font-weight: bold;
  color: #218482;
}

.success-box p {
  color: #218482;
  font-weight: bold;
}
</style>
