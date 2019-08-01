<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:16:08
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-01 16:55:16
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
export default {
  name: 'Login',

  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login_Submit () {
      const params = {
        adminName: this.username,
        password: this.password
      }
      console.log(params)
      if (this.username == '' || this.password == '') {
        alert('用户名与密码不能为空！')
      } else {
        this.$axios({
          methods: 'get',
          url: '/admin/login',
          params
        }).then((response) => {
          if (response.data.code != '000') {
            alert(response.data.msg)
          } else {
            this.$store.commit('GET_USER', response.data.data.adminName)
            this.$router.push('/search')
          }
          console.log(response) // 请求成功返回的数据
        }).catch((error) => {
          alert('登录失败')
          console.error(error) // 请求失败返回的数据
        })
      }
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  position: relative;
  /* background: url("../../../assets/bc_book.jpg") no-repeat;
  background-size: 100vw 100vh; */
}

.login::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.4); */
}

.login-wrapper {
  height: 100%;
  padding: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 99;
  /* background-color: #ccc; */
  background: url("../../../assets/bc_book.jpg") no-repeat;
  background-size: 100% 100%;
}

.slogan {
  width: 340px;
  margin: -30px 200px 0 0;
  z-index: 99;
}

.slogan p {
  color: #1e8280;
  font-size: 24px;
  line-height: 50px;
  /* font-weight: bold; */
}

.user-entry {
  width: 480px;
  /* height: 300px; */
  padding: 20px 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  z-index: 99;
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
}

.user-entry-header .el-icon-user {
  display: inline-block;
  width: 60px;
  height: 60px;
  font-size: 60px;
  color: #666;
}

.user-entry-header p {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #333;
}

.user-entry-container .center {
  text-align: center;
}

.user-entry-container button {
  width: 140px;
  height: 40px;
  border-radius: 4px;
  margin: 30px 0 0 0;
  color: #fff;
  background-color: #5caaab;
}

.form-item {
  display: flex;
  flex-direction: column;
  height: 70px;
}

.form-item label {
  height: 30px;
  line-height: 30px;
  color: #333;
}
.form-item input {
  display: inline-block;
  height: 40px;
  padding: 5px;
  line-height: 30px;
  border: 1px solid #666;
  border-radius: 2px;
}
</style>
