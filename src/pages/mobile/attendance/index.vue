<!--
 * @Author: liyan
 * @Date: 2019-07-23 20:17:08
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-25 16:26:13
 * @Description: file content
 -->
<template>
  <div id="attendance">
    <div class="container">
      <form class="form">
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
                <input type="radio" id="male" value="male" v-model="sex" />
                <label for="male">男</label>
              </li>
              <li>
                <input type="radio" id="female" value="female" v-model="sex" />
                <label for="female">女</label>
              </li>
            </ul>
            <!-- <p class="justify-p" v-if="errors.sex">性别{{errors.sex}}</p> -->
          </div>
        </div>
        <div class="form-item justify-item">
          <span>内外部*</span>
          <div class="form-item-input">
            <ul>
              <li>
                <input type="radio" id="inner" value="inner" v-model="from" />
                <label for="inner">内部</label>
              </li>
              <li>
                <input type="radio" id="outer" value="outer" v-model="from" />
                <label for="outer">外部</label>
              </li>
            </ul>
            <!-- <p class="justify-p" v-if="errors.from">内外部{{errors.from}}</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>部门*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.apartment.val" />
            <!-- <p v-if="errors.apartment">部门{{errors.apartment}}</p> -->
          </div>
        </div>
        <div class="form-item">
          <span>手机号码*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.phone.val" />
            <!-- <p v-if="errors.phone">手机号码{{errors.phone}}</p> -->
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
          <button @click.prevent="loginSubmit">签到</button>
        </div>
        <!-- <center>
          <button @click.prevent="loginSubmit">签到</button>
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
      sex: 'male',
      from: 'inner',
      form: {
        name: {
          val: '',
          err_msg: '请输入正确姓名',
          rules: [/^[\u4e00-\u9fffa-zA-Z]+$/]
        },
        apartment: {
          val: '',
          err_msg: '请输入正确部门',
          rules: [/^[\u4e00-\u9fffa-zA-Z]{1,15}$/]
        },
        phone: {
          val: '',
          err_msg: '请输入正确手机号',
          rules: [/^[1]([3-9])[0-9]{9}$/]
        },
        books: {
          val: '',
          err_msg: '请输入正确书名',
          rules: [/^[\u4e00-\u9fffa-zA-Z]{1,15}$/]
        }
      }
    }
  },
  methods: {
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
        return isPass
      }
    },
    loginSubmit () {
      if (!this._validate()) {
      } else {
        // this.$axios({
        //   methods: 'post',
        //   url: 'api',
        //   data: {    //这里是发送给后台的数据
        //     username: this.form['name'].val,
        //     sex: this.sex,
        //     from: this.from,
        //     apartment: this.form['apartment'].val,
        //     phone: this.form['phone'].val,
        //     books: this.form['books'].val,
        //   }
        // }).then((response) => {
        //   this.$router.push('/success');
        //   console.log(response)       //请求成功返回的数据
        // }).catch((error) => {
        //   console.log(error)       //请求失败返回的数据
        // })
      }
    }
  }
}
</script>

<style scoped>
#attendance {
  height: 100%;
}

.container {
  height: 100%;
  /* width: 390px; */
  /* margin: 30px auto; */
  padding: 30px 10px 0 10px;
  /* background-color: #ccc; */
}

/* 表单item */
.form-item {
  display: flex;
  height: 55px;
  margin: 0 0 10px 0;
}

.form-item span {
  /* width: 70px; */
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #000;
}

.form-item .form-item-input {
  position: relative;
  flex: 1;
  height: 55px;
  margin: 0 20px 0 20px;
}

/* 文本输入*/
.form-item input[type="text"] {
  display: inline-block;
  width: 100%;
  height: 25px;
  margin: 0 0 5px 0;
  border-bottom: 1px solid #ccc;
}

.justify-item span {
  display: inline-block;
  width: 80px;
}
/* 单选输入区域 */
.form-item ul {
  display: flex;
}

.form-item li {
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  margin: 0 20px 0 0;
}

.form-item input[type="radio"] {
  margin: 0 5px 0 0;
}

/* 错误提示信息 */
.form-item p {
  height: 20px;
  line-height: 20px;
  color: #f30;
  /* background-color: #fb0; */
}

/* 单选框错误提示信息 */
/* .form-item .justify-p {
  width: 270px;
} */

.center {
  text-align: center;
}

button {
  width: 140px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  /* margin: 20px 0; */
  border-radius: 4px;
  background-color: #74bb92;
}
</style>
