<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:16:08
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-24 16:37:32
 * @Description: file content
 -->
<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="user-entry">
        <div class="user-entry-header">
          <i>avatar</i>
          <p>管理员登录</p>
        </div>
        <div class="user-entry-container">
          <form>
            <div class="form-item">
              <label for="user">用户名</label>
              <input type="text" id="user" />
            </div>
            <div class="form-item">
              <label for="password">密码</label>
              <input type="password" id="password" />
            </div>
            <center>
              <button>登录</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
.login {
  height: 100%;
}

.login-wrapper {
  height: 100%;
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
}

.user-entry {
  width: 480px;
  /* height: 300px; */
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 3px;
}

.user-entry-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-entry-header i {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: #ccc;
}

.user-entry-header p {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}

.user-entry-container button {
  width: 140px;
  height: 40px;
  border-radius: 4px;
  margin: 30px 0 0 0;
  color: #fff;
  background-color: #169bd5;
}

.form-item {
  display: flex;
  flex-direction: column;
  height: 70px;
}

.form-item label {
  height: 30px;
  line-height: 30px;
}
.form-item input {
  display: inline-block;
  height: 40px;
  padding: 5px;
  line-height: 30px;
  border: 1px solid #000;
  border-radius: 2px;
}
</style>
