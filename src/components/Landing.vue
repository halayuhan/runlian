<!--
 * @Author: liyan
 * @Date: 2019-07-22 19:56:58
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-23 15:11:30
 * @Description: file content
 -->
<template>
  <div id="landing">
    <div class="container">
      <form class="form">
        <div class="form-item">
          <span>姓名*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.name" />
            <p v-if="errors.name">姓名{{errors.name}}</p>
          </div>
        </div>
        <div class="form-item justify-item">
          <span>性别*</span>
          <div class="form-item-input">
            <ul>
              <li>
                <input type="radio" id="male" value="male" v-model="form.sex" />
                <label for="male">男</label>
              </li>
              <li>
                <input type="radio" id="female" value="female" v-model="form.sex" />
                <label for="female">女</label>
              </li>
            </ul>
            <p class="justify-p" v-if="errors.sex">性别{{errors.sex}}</p>
          </div>
        </div>
        <div class="form-item justify-item">
          <span>内外部*</span>
          <div class="form-item-input">
            <ul>
              <li>
                <input type="radio" id="inner" value="inner" v-model="form.from" />
                <label for="inner">内部</label>
              </li>
              <li>
                <input type="radio" id="outer" value="outer" v-model="form.from" />
                <label for="outer">外部</label>
              </li>
            </ul>
            <p class="justify-p" v-if="errors.from">内外部{{errors.from}}</p>
          </div>
        </div>
        <div class="form-item">
          <span>部门*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.apartment" />
            <p v-if="errors.apartment">部门{{errors.apartment}}</p>
          </div>
        </div>
        <div class="form-item">
          <span>手机号码*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.phone" />
            <p v-if="errors.phone">手机号码{{errors.phone}}</p>
          </div>
        </div>
        <div class="form-item">
          <span>在读书籍*</span>
          <div class="form-item-input">
            <input type="text" v-model="form.books" />
            <p v-if="errors.books">在读书籍{{errors.books}}</p>
          </div>
        </div>
        <center>
          <button>签到</button>
        </center>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data: () => ({
    form: {
      name: '',
      sex: '',
      from: '',
      apartment: '',
      phone: '',
      books: ''
    },
    errors: {
      name: '不能为空!',
      sex: '不能为空！',
      from: '不能为空！',
      apartment: '不能为空',
      phone: '不能为空！',
      books: '不能为空！'
    }
  })

}
</script>

<style scoped>
#landing {
  height: 100%;
}

.container {
  height: 100%;
  /* width: 390px; */
  /* margin: 30px auto; */
  padding: 30px 10px;
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

button {
  width: 140px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  margin: 20px 0;
  border-radius: 4px;
  background-color: #74bb92;
}
</style>
