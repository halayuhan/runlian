<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:17:08
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 14:01:48
 * @Description: file content
 -->
<template>
  <div class="attendance" v-loading.fullscreen.lock="this.$store.state.loading">
    <div class="attend-container">
      <form class="form">
        <div class="form-item">
          <span>LDAP账号</span>
          <div class="form-item-input">
            <input type="text" v-model="form.ldap.val" @blur="_getUserinfo()" />
            <!-- <p v-if="errors.phone">手机号码{{errors.phone}}</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>手机号码</span>
          <div class="form-item-input">
            <input type="text" v-model="form.phone.val" v-if="isShow" />
            <h2 v-if="!isShow">{{form.phone.val}}</h2>
            <p v-if="isCorrect">请谨慎填写，提交后不可修改</p>
          </div>
        </div>
        <div class="form-item">
          <span>姓名</span>
          <div class="form-item-input">
            <input type="text" v-model="form.name.val" v-if="isShow" />
            <h2 v-if="!isShow">{{form.name.val}}</h2>
            <p v-if="isCorrect">请谨慎填写，提交后不可修改</p>
          </div>
        </div>
        <div class="form-item justify-item">
          <span>性别</span>
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
          <span>内外部</span>
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
          <span>部门</span>
          <div class="form-item-input">
            <input type="text" v-model="form.department.val" />
            <!-- <p v-if="errors.department">部门{{errors.department}}</p> -->
          </div>
        </div>

        <div class="form-item">
          <span>在读书籍</span>
          <div class="form-item-input">
            <input type="text" v-model="form.books.val" />
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
export default {
  name: 'Attendance',
  data () {
    return {
      isCorrect: false,
      isShow: true,
      gender: 'M',
      isInternal: 'Y',
      form: {
        ldap: {
          val: '',
          err_msg: '请输入正确LDAP账号',
          rules: [/^[_a-zA-Z0-9]+$/]
        },
        name: {
          val: '',
          err_msg: '请输入正确姓名',
          rules: [/^[\u4e00-\u9fffa-zA-Z]+$/]
        },
        department: {
          val: '',
          err_msg: '请输入正确部门',
          rules: [/^[\u4e00-\u9fffa-zA-Z\\-]{1,15}$/]
        },
        phone: {
          val: '',
          err_msg: '请输入正确手机号',
          rules: [/^[1]([3-9])[0-9]{9}$/]
        },
        books: {
          val: '',
          err_msg: '请输入正确书名',
          rules: [/^[\u4e00-\u9fffa-zA-Z0-9]{1,30}$/]
        }
      }
    }
  },
  mounted: function () {
    if (window.localStorage.getItem('ldap')) { // 判断本地localStorage内是否存有用户历史信息
      this.gender = window.localStorage.getItem('gender')
      this.isInternal = window.localStorage.getItem('isInternal')
      this.form.name.val = window.localStorage.getItem('name')
      this.form.department.val = window.localStorage.getItem('department')
      this.form.phone.val = window.localStorage.getItem('phone')
      this.form.ldap.val = window.localStorage.getItem('ldap')
      this.form.books.val = window.localStorage.getItem('books')
      this.isShow = false
    } else {
      this.$message.info('请输入LDAP账号搜索签到历史')
    }
  },
  computed: {
    channel () {
      return this.form.ladp.val
    }
  },

  // watch: {
  //   channel: function (newValue, oldValue) {
  //     if (newValue.length != 11) {
  //       //alert('输入正确手机号');
  //     }
  //     else {
  //       this.$axios({
  //         methods: 'get',
  //         url: '/admin/signIn/getUser',
  //         data: {phoneNumber:this.form.phone.val}        })
  //         .then((response) => {
  //           this.gender = response.gender;
  //           this.from = response.from;
  //           this.form.name.val = response.name;
  //           this.form.department.val = response.department;
  //           console.log(response)       //请求成功返回的数据
  //         }).catch((error) => {
  //           console.error(error)       //请求失败返回的数据
  //         })
  //     }
  //   }
  // },
  methods: {
    _getUserinfo () {
      const params = {
        ldap: this.form.ldap.val
      }
      let reg = /^[_a-zA-Z0-9]+$/
      if (!reg.test(this.form.ldap.val)) {
        this.$message.error(this.form.ldap.err_msg)
      } else {
        this.$axios({
          methods: 'get',
          url: process.env.API_HOST + '/signIn/getUser',
          params
        })
          .then((response) => {
            if (response.data.code != '000') {
              localStorage.clear()
              this.form.name.val = ''
              this.form.department.val = ''
              this.form.phone.val = ''
              this.form.books.val = ''
              this.gender = 'M'
              this.isShow = true
              this.isCorrect = true
            } else {
              this.gender = response.data.data.gender
              this.isInternal = response.data.data.isInternal
              this.form.name.val = response.data.data.userName
              this.form.department.val = response.data.data.department
              this.form.phone.val = response.data.data.phoneNumber
              this.form.books.val = response.data.data.book
              this.isShow = false
              this.isCorrect = false
            }
            console.log(response) // 请求成功返回的数据
          }).catch((error) => {
            console.error(error) // 请求失败返回的数据
          })
      }
    },

    _validate () {
      let isPass = false
      for (let key in this.form) {
        let reg = this.form[key].rules[0]
        // console.log(reg.test(this.form[key].val));
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

    attendSubmit () {
      if (!this._validate()) {
        return
      }
      const { ldap, name, department, phone, books } = this.form
      const params = {

        gender: this.gender,
        isInternal: this.isInternal,
        ldap: ldap.val,
        userName: name.val,
        phoneNumber: phone.val,
        department: department.val,
        bookName: books.val
      }
      window.localStorage.setItem('ldap', params.ldap)
      window.localStorage.setItem('gender', params.gender)
      window.localStorage.setItem('isInternal', params.isInternal)
      window.localStorage.setItem('name', params.userName)
      window.localStorage.setItem('department', params.department)
      window.localStorage.setItem('phone', params.phoneNumber)
      window.localStorage.setItem('books', params.bookName)

      this.$axios({
        methods: 'post',
        url: process.env.API_HOST + '/signIn/submit',
        params
      }).then((response) => {
        if (response.data.code != '000') {
          alert('签到失败')
        } else {
          this.$router.push('/success')
        }
        console.log(response) // 请求成功返回的数据
      }).catch((error) => {
        console.error(error) // 请求失败返回的数据
      })
    }
  }
}
</script>

<style>
</style>
