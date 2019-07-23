<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:08:17
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-23 20:40:14
 * @Description: file content
 -->
<template>
  <div id="success">
    <div class="container">
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

<style scoped>
#success {
  height: 100%;
}

.container {
  height: 100%;
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
  border-radius: 4px;
  background-color: #4d4d4d;
}
.success-box i::before {
  font-size: 60px;
  color: #fff;
}

.success-box p {
  color: #fff;
}
</style>
