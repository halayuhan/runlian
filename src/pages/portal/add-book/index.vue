<!--
 * @Author: liyan
 * @Date: 2019-07-31 11:49:06
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-16 14:03:22
 * @Description: file content
 -->
<template>
  <div class="add-book">
    <div class="add-book-wrapper">
      <div class="add-book-header">
        <i class="el-icon-back" @click="goback"></i>
        <span>添加书籍*</span>
      </div>
      <div class="add-book-form">
        <el-form
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="100px"
          label-position="left"
        >
          <div class="form-item-group">
            <div class="form-col-1">
              <el-form-item label="ISBN">
                <el-input v-model="formData.isbn" @blur="getBookinfo()"></el-input>
              </el-form-item>
              <el-form-item label="书籍名称" prop="bookName">
                <el-input v-model="formData.bookName" :disabled="isRead"></el-input>
              </el-form-item>
              <el-form-item label="作者" prop="author">
                <el-input v-model="formData.author" :disabled="isRead"></el-input>
              </el-form-item>
              <el-form-item label="书籍类型" prop="type">
                <el-input v-model="formData.type" :disabled="isRead"></el-input>
              </el-form-item>
              <el-form-item label="页数" prop="page">
                <el-input v-model="formData.page" :disabled="isRead"></el-input>
              </el-form-item>
            </div>
            <div class="from-col-group">
              <div class="from-col-toptwo">
                <div class="form-col-2">
                  <el-form-item label="数量" prop="addNum">
                    <el-input v-model.number="formData.addNum"></el-input>
                  </el-form-item>
                  <el-form-item label="出版社" prop="publisher">
                    <el-input v-model="formData.publisher" :disabled="isRead"></el-input>
                  </el-form-item>
                  <el-form-item label="出版时间" prop="pubDate">
                    <el-input v-model="pubDate" :disabled="isRead" placeholder="例如 2019/01/01"></el-input>
                  </el-form-item>
                </div>
                <div class="form-col-3">
                  <el-form-item class="item-upload" prop="img">
                    <div class="upload-div">
                      <el-upload
                        class="cover-uploader"
                        action="#"
                        :show-file-list="false"
                        :http-request="handleUploadCover"
                        :before-upload="beforeUploadCover"
                        :disabled="isRead"
                      >
                        <img
                          v-model="formData.img"
                          v-if="formData.img"
                          :src="formData.img"
                          alt="cover"
                          class="cover"
                        />
                        <i v-else class="el-icon-plus cover-uploader-icon">
                          <em>上传封面</em>
                        </i>
                      </el-upload>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="form-col-4">
                <el-form-item label="书籍详情" prop="description">
                  <el-input type="textarea" v-model="formData.description"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="form-btn-group">
            <el-form-item>
              <el-button type="primary" class="save_btn" @click="handleSave('formData')">保存</el-button>
              <el-button type="warning" class="cancel_btn" @click="handleCancel">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { GetBook, AddOneBook, UploadImg } from '../../../api/bookApi'
const querystring = require('querystring')
export default {
  name: 'AddBook',
  data () {
    return {
      isRead: false,
      formData: {
        img: '',
        bookName: '',
        author: '',
        isbn: '',
        publisher: '',
        pubDate: '',
        page: '',
        type: '',
        description: '',
        addNum: 1
      },
      rules: {
        isbn: [{
          required: true, message: '请输入书籍ISBN编号或自建编号', trigger: 'blur'
        }],
        bookName: [{
          required: true, message: '请输入书籍名称', trigger: 'blur'
        }],
        addNum: [{
          required: true, type: 'number', message: '请输入添加数量', trigger: 'blur'
        }],
        author: [{
          required: true, message: '请输入书籍作者', trigger: 'blur'
        }],
        publisher: [{
          required: true, message: '请输入书籍出版社', trigger: 'blur'
        }],
        pubDate: [{
          required: true, message: '请输入书籍出版时间', trigger: 'blur'
        }],
        type: [{
          required: true, message: '请输入书籍类型', trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    pubDate: {
      get: function () {
        return this.formData.pubDate.substr(0, 10)
      },
      set: function (value) {
        this.formData.pubDate = value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1\/').replace(/(\d{4}\/\d{2})(?=\d)/g, '$1\/')
        if (value.length === 7) {
          this.formData.pubDate = value.replace(/[/]$/, '')
        }
      }
    }
  },
  methods: {
    getBookinfo () {
      const params = {
        isbn: this.formData.isbn
      }
      const res = GetBook(params)
      res.then(res => {
        if (res.code === '000') {
          const bookinfo = res.data
          let { img, bookName, author, publisher, pubDate, page, type, description } = bookinfo
          this.formData = Object.assign(this.formData, { img, bookName, author, publisher, pubDate, page, type, description })
          this.isRead = true
        } else {
          this.$refs['formData'].resetFields()
          this.isRead = false
        }
      }).catch((error) => {
        this.isRead = false
        console.error(error) // 请求失败返回的数据
      })
    },
    handleCancel () {
      this.$refs['formData'].resetFields()
      this.formData.isbn = ''
      this.isRead = false
    },
    handleSave (formData) {
      this.$refs[formData].validate((valid) => {
        if (!valid) {
          this.$message.error('请填入正确信息')
          return false
        } else {
          const { img, bookName, author, isbn, publisher, pubDate, page, type, description, addNum } = this.formData
          const paramsOther = {
            totalNum: addNum
          }
          const params = Object.assign({}, { isbn, bookName, author, type, publisher, pubDate, page, img, description }, paramsOther)
          AddOneBook(querystring.stringify(params)).then(res => {
            if (res.code != '000') {
              this.$message.error(res.msg)
            } else {
              this.$message.success('添加成功')
              this.$router.push('/book')
            }
          })
        }
      })
    },
    beforeUploadCover (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传封面图片只能是JPG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过2MB!')
      }

      return isJPG && isLt2M
    },
    handleUploadCover (file) {
      const isbn = this.formData.isbn
      if (!isbn) {
        this.$message.error('请先输入书籍ISBN编号再上传图片')
      } else {
        const formdata = new FormData()
        formdata.append('isbn', isbn)
        formdata.append('file', file.file)
        const res = UploadImg(formdata)
        res.then(res => {
          if (res.code === '000') {
            this.formData.img = process.env.API_HOST + '/file/get?fileName=' + res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    goback () {
      this.$router.push('/book')
    }
  }
}
</script>
<style>
</style>
