<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:17:08
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-16 13:25:21
 * @Description: file content
 -->
<template>
  <div class="attendance" v-loading.fullscreen.lock="this.$store.state.loading">
    <div class="attend-container">
      <form class="form">
        <div class="form-item">
          <span>*LDAP账号:</span>
          <div class="form-item-input">
            <input type="text" v-model="form.ldap.val" @blur="_getUserinfo()" />
            <!-- <p v-if="errors.phone">手机号码{{errors.phone}}</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>*手机号码:</span>
          <div class="form-item-input">
            <input type="text" v-model="form.phoneNumber.val" />
            <!-- <h2 v-if="!isShow">{{form.phone.val}}</h2> -->
            <!-- <p v-if="isCorrect">请谨慎填写，提交后不可修改</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>*姓名:</span>
          <div class="form-item-input">
            <input type="text" v-model="form.userName.val" v-if="isShow" />
            <h2 v-if="!isShow">{{form.userName.val}}</h2>
            <p v-if="isCorrect">请谨慎填写，提交后不可修改</p>
          </div>
        </div>
        <div class="form-item justify-item">
          <span>*性别:</span>
          <div class="form-item-input">
            <ul>
              <li>
                <input type="radio" id="male" value="M" v-model="gender" />
                <label for="male">男</label>
              </li>
              <li>
                <input type="radio" id="female" value="W" v-model="gender" />
                <label for="female">女</label>
              </li>
            </ul>
            <!-- <p class="justify-p" v-if="errors.gender">性别{{errors.gender}}</p> -->
          </div>
        </div>
        <div class="form-item justify-item">
          <span>*内外部:</span>
          <div class="form-item-input">
            <ul>
              <li>
                <input type="radio" id="inner" value="Y" v-model="isInternal" />
                <label for="inner">内部</label>
              </li>
              <li>
                <input type="radio" id="outer" value="N" v-model="isInternal" />
                <label for="outer">外部</label>
              </li>
            </ul>
            <!-- <p class="justify-p" v-if="errors.from">内外部{{errors.from}}</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>*部门:</span>
          <div class="form-item-input">
            <!-- <input type="text" v-model="form.department.val" /> -->
            <el-select v-model="form.department.val" clearable placeholder="请选择">
              <el-option v-for="item in options" :label="item" :value="item" :key="item.index"></el-option>
            </el-select>
            <!-- <p v-if="errors.department">部门{{errors.department}}</p> -->
          </div>
        </div>

        <div class="form-item">
          <span>*在读书籍:</span>
          <div class="form-item-input">
            <input type="text" v-model="form.bookName.val" />
            <!-- <p v-if="errors.books">在读书籍{{errors.books}}</p> -->
          </div>
        </div>
        <div class="center">
          <button @click.prevent="attendSubmit">签到</button>
        </div>
        <!-- <center>
          <button @click.prevent="attendSubmit">签到</button>
        </center>-->
      </form>
    </div>
  </div>
</template>

<script>
import { GetUser, AttendSign } from '../../../api/attendanceApi'
export default {
  name: 'Attendance',
  data() {
    return {
      isCorrect: false,
      isShow: true,
      gender: 'M',
      isInternal: 'Y',
      options: ['华润云', '智慧技术部', '科技创新部', '数据中心', '管理与发展部', 'IT产品服务部', 'IT运营服务部'],
      form: {
        ldap: {
          val: '',
          err_msg: '请输入正确LDAP账号',
          rules: [/^[_a-zA-Z0-9]+$/]
        },
        userName: {
          val: '',
          err_msg: '请输入正确姓名',
          rules: [/^[\u4e00-\u9fffa-zA-Z]+$/]
        },
        department: {
          val: '',
          err_msg: '请输入正确部门',
          rules: [/^[\u4e00-\u9fffa-zA-Z\\-]{1,15}$/]
        },
        phoneNumber: {
          val: '',
          err_msg: '请输入正确手机号',
          rules: [/^[1]([3-9])[0-9]{9}$/]
        },
        bookName: {
          val: '',
          err_msg: '请输入正确书名',
          rules: [/^[\s\S]{1,30}$/]
        }
      }
    }
  },
  mounted: function () {
    if (window.localStorage.getItem('ldap')) { // 判断本地localStorage内是否存有用户历史信息
      let { ldap, userName, department, phoneNumber, bookName } = this.form
      let formlocalData = Object.assign({}, localStorage)
      this.gender = formlocalData.gender
      this.isInternal = formlocalData.isInternal
      userName.val = formlocalData.userName
      department.val = formlocalData.department
      phoneNumber.val = formlocalData.phoneNumber
      ldap.val = formlocalData.ldap
      bookName.val = formlocalData.bookName
      this.isShow = false
    } else {
      this.$message.info('请输入LDAP账号搜索签到历史')
    }
  },
  computed: {
    channel() {
      return this.form.ladp.val
    }
  },
  methods: {
    _getUserinfo() {
      const params = {
        ldap: this.form.ldap.val
      }
      const reg = /^[_a-zA-Z0-9]+$/
      if (!reg.test(this.form.ldap.val)) {
        this.$message.error(this.form.ldap.err_msg)
      } else {
        const res = GetUser(params)
        res.then(res => {
          if (res.code != '000') {
            this.form.userName.val = ''
            this.form.department.val = ''
            this.form.phoneNumber.val = ''
            this.form.bookName.val = ''
            this.isShow = true
            this.isCorrect = true
          } else {
            const attendData = res.data
            this.gender = attendData.gender
            this.isInternal = attendData.isInternal
            this.form.userName.val = attendData.userName
            this.form.department.val = attendData.department
            this.form.phoneNumber.val = attendData.phoneNumber
            this.form.bookName.val = attendData.bookName
            this.isShow = false
            this.isCorrect = false
          }
        })
      }
    },

    _validate() {
      let isPass = false
      for (const key in this.form) {
        const reg = this.form[key].rules[0]
        if (reg.test(this.form[key].val) && this.form[key].val != '') {
          isPass = true
        } else {
          isPass = false
          this.$message.error(this.form[key].err_msg)
          this.form[key].val = ''
          break
        }
      }
      return isPass
    },

    attendSubmit() {
      if (!this._validate()) {
        return
      }
      const { ldap, userName, department, phoneNumber, bookName } = this.form
      const params = {
        gender: this.gender,
        isInternal: this.isInternal,
        ldap: ldap.val,
        userName: userName.val,
        phoneNumber: phoneNumber.val,
        department: department.val,
        bookName: bookName.val
      }
      for (const key in params) {
        window.localStorage.setItem(key, params[key])
      }
      const res = AttendSign(params)
      res.then(res => {
        if (res.code != '000') {
          this.$message.error('签到失败')
        } else {
          this.$router.push('/success')
        }
      })
    }
  }
}
</script>

<style>
</style>
