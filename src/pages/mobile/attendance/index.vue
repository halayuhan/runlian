<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:17:08
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-02 10:09:14
 * @Description: file content
 -->
<template>
  <div class="attendance">
    <div class="attend-container">
      <form class="form">
        <div class="form-item">
          <span>LDAP账号*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.ldap.val" />
            <!-- <p v-if="errors.phone">手机号码{{errors.phone}}</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>手机号码*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.phone.val" @blur="_getUserinfo()" v-if="!isShow" />
            <h2 v-if="isShow">{{form.phone.val}}</h2>
            <!-- <p v-if="errors.phone">手机号码{{errors.phone}}</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>姓名*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.name.val" />
            <!-- <p v-if="errors.name">姓名{{errors.name}}</p> -->
          </div>
        </div>
        <div class="form-item justify-item">
          <span>性别*</span>
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
          <span>内外部*</span>
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
          <span>部门*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.department.val" />
            <!-- <p v-if="errors.department">部门{{errors.department}}</p> -->
          </div>
        </div>

        <div class="form-item">
          <span>在读书籍*</span>
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
      isShow: true,
      gender: 'M',
      isInternal: 'Y',
      form: {
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
        },
        ldap: {
          val: 'yuhan13',
          err_msg: '请输入正确LDAP账号',
          rules: [/^[1]([3-9])[0-9]{9}$/]
        }
      }
    }
  },
  mounted: function () {
    if (window.localStorage.getItem('phone')) { // 判断本地localStorage内是否存有用户历史信息
      this.gender = window.localStorage.getItem('gender')
      this.isInternal = window.localStorage.getItem('isInternal')
      this.form.name.val = window.localStorage.getItem('name')
      this.form.department.val = window.localStorage.getItem('department')
      this.form.phone.val = window.localStorage.getItem('phone')
    } else {
      alert('请输入手机号搜索历史数据')
    }
  },
  computed: {
    channel () {
      return this.form.phone.val
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
        phoneNumber: this.form.phone.val
      }
      let reg = /^[1]([3-9])[0-9]{9}$/
      if (!reg.test(this.form.phone.val)) {
        alert(this.form.phone.err_msg)
      } else {
        // alert('数据绑定中...')
        this.$axios({
          methods: 'get',
          url: '/signIn/getUser',
          params })
          .then((response) => {
            if (response.data.code != '000') {
              alert('当前用户无签到历史')
              localStorage.clear()
              this.form.name.val = ''
              this.form.department.val = ''
            } else {
              this.gender = response.data.data.gender
              this.isInternal = response.data.data.isInternal
              this.form.name.val = response.data.data.userName
              this.form.department.val = response.data.data.department
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
          alert(this.form[key].err_msg)
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
      const { name, department, phone, books } = this.form
      const params = {
        gender: this.gender,
        isInternal: this.isInternal,
        userName: name.val,
        phoneNumber: phone.val,
        department: department.val,
        bookName: books.val
      }
      window.localStorage.setItem('gender', params.gender)
      window.localStorage.setItem('isInternal', params.isInternal)
      window.localStorage.setItem('name', params.userName)
      window.localStorage.setItem('department', params.department)
      window.localStorage.setItem('phone', params.phoneNumber)
      window.localStorage.setItem('books', params.bookName)

      this.$axios({
        methods: 'post',
        url: '/signIn/submit',
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
.attendance {
  height: 100%;
}

.attend-container {
  height: 100%;
  /* padding: 10px; */
}

.attend-container .form {
  height: 100%;
  padding: 20px;
  /* border-radius: 10px; */
  background-color: rgba(255, 255, 255, 0.7);
}

/* 表单item */
.attend-container .form-item {
  display: flex;
  height: 50px;
  /* margin: 0 0 10px 0; */
}

.attend-container .form-item span {
  /* width: 70px; */
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #000;
}

.attend-container .form-item .form-item-input {
  position: relative;
  flex: 1;
  height: 55px;
  margin: 0 20px 0 20px;
}

/* 文本输入*/
.attend-container .form-item input[type="text"] {
  display: inline-block;
  width: 100%;
  height: 25px;
  margin: 0 0 5px 0;
  border-bottom: 1px solid #ccc;
}

.attend-container .form-item h2 {
  height: 30px;
  line-height: 30px;
  font-weight: normal;
  color: initial;
}

.attend-container .justify-item span {
  display: inline-block;
  width: 80px;
}
/* 单选输入区域 */
.attend-container .form-item ul {
  display: flex;
}

.attend-container .form-item li {
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  margin: 0 20px 0 0;
}

.attend-container .form-item input[type="radio"] {
  margin: 0 5px 0 0;
}

/* 错误提示信息 */
.attend-container .form-item p {
  height: 20px;
  line-height: 20px;
  color: #f30;
  /* background-color: #fb0; */
}

.attend-container .center {
  text-align: center;
  margin: 10px 0 0 0;
}

.attend-container button {
  width: 140px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  /* margin: 20px 0; */
  border-radius: 4px;
  background-color: #5caaab;
}
</style>
