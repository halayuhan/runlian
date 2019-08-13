<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:16:08
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 13:55:17
 * @Description: file content
 -->
<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="slogan">
        <p>
          教育是一棵树撼动另一棵树
          <br />一朵云推动另一朵云
          <br />一个灵魂唤醒另一个灵魂
        </p>
      </div>
      <div class="user-entry">
        <div class="user-entry-header">
          <i class="el-icon-user"></i>
          <p>管理员登录</p>
        </div>
        <div class="user-entry-container">
          <form>
            <div class="form-item">
              <label for="user">用户名</label>
              <input type="text" id="user" v-model="username" />
            </div>
            <div class="form-item">
              <label for="password">密码</label>
              <input type="password" id="password" v-model="password" />
            </div>
            <div class="center">
              <button @click.prevent="login_Submit">登录</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Encrypt } from '../../../api/encrypt'
export default {
  name: 'Login',

  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login_Submit() {
      let encryptPsw = Encrypt(this.password)
      const params = {
        adminName: this.username,
        password: encryptPsw
      }
      console.log(params)
      if (this.username == '' || this.password == '') {
        this.$message.error('用户名与密码不能为空！')
      } else {
        this.$axios({
          methods: 'get',
          url: process.env.API_HOST + '/admin/login',
          params
        }).then((response) => {
          if (response.data.code != '000') {
            this.$message.error(response.data.msg)
          } else {
            this.$store.commit('GET_USER', response.data.data.adminName)
            this.$router.push('/search')
          }
          console.log(response) // 请求成功返回的数据
        }).catch((error) => {
          this.$message.error('登录失败')
          console.error(error) // 请求失败返回的数据
        })
      }
    }
  }
}
</script>

<style>
</style>
