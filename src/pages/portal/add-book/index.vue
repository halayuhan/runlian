<!--
 * @Author: liyan
 * @Date: 2019-07-31 11:49:06
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-12 15:08:38
 * @Description: file content
 -->
<template>
  <div class="add-book">
    <div class="add-book-wrapper">
      <div class="add-book-header">
        <h1>添加书籍*</h1>
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
              <el-form-item label="ISBN" prop="ISBN">
                <el-input v-model="formData.ISBN" @blur="getBookinfo()"></el-input>
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
              <el-form-item label="页数">
                <el-input v-model="formData.page" :disabled="isRead"></el-input>
              </el-form-item>
            </div>
            <div class="from-col-group">
              <div class="from-col-toptwo">
                <div class="form-col-2">
                  <el-form-item label="数量" prop="addNum">
                    <el-input v-model="formData.addNum"></el-input>
                  </el-form-item>
                  <el-form-item label="出版社" prop="publisher">
                    <el-input v-model="formData.publisher" :disabled="isRead"></el-input>
                  </el-form-item>
                  <el-form-item label="出版时间" prop="pubDate">
                    <el-input v-model="pubDate" :disabled="isRead" placeholder="例如 2019/01/01"></el-input>
                  </el-form-item>
                </div>
                <div class="form-col-3">
                  <el-form-item class="item-upload">
                    <div class="upload-div">
                      <el-upload
                        class="cover-uploader"
                        action="#"
                        :show-file-list="false"
                        :http-request="handleUploadCover"
                        :before-upload="beforeUploadCover"
                      >
                        <img v-if="formData.img" :src="formData.img" alt="cover" class="cover" />
                        <i v-else class="el-icon-plus cover-uploader-icon">
                          <em>上传封面</em>
                        </i>
                      </el-upload>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="form-col-4">
                <el-form-item label="书籍详情">
                  <el-input type="textarea" v-model="formData.description"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="form-btn-group">
            <el-form-item>
              <el-button type="primary" class="save_btn" @click="handleSave('formData')">保存</el-button>
              <el-button type="warning" class="cancel_btn" @click="handleCancel">清空</el-button>
              <el-button type="primary" class="back_btn" @click="goback">返回</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddBook',
  data() {
    return {
      isRead: false,
      formData: {
        img: '',
        bookName: '',
        author: '',
        ISBN: '',
        publisher: '',
        pubDate: '',
        page: '',
        type: '',
        description: '',
        addNum: 1
      },
      rules: {
        ISBN: [{
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
    getBookinfo() {
      const params = {
        isbn: this.formData.ISBN
      }
      this.$axios({
        methods: 'get',
        url: process.env.API_HOST + '/book/get',
        params
      })
        .then((response) => {
          if (response.data.code !== '000') {
            this.formData.bookName = ''
            this.formData.author = ''
            this.formData.publisher = ''
            this.formData.pubDate = ''
            this.formData.type = ''
            this.formData.page = ''
            this.formData.img = ''
            this.formData.description = ''
            this.isRead = false
          } else {
            const bookinfo = response.data.data
            // let { img, bookName, author, ISBN, publisher, pubDate, page, type, description, addNum } = this.formData
            this.formData.bookName = bookinfo.bookName
            this.formData.author = bookinfo.author
            this.formData.publisher = bookinfo.publisher
            this.formData.pubDate = bookinfo.pubDate
            this.formData.type = bookinfo.type
            this.formData.page = bookinfo.page
            this.formData.img = bookinfo.img
            this.formData.description = bookinfo.description
            this.isRead = true
          }
          console.log(response) // 请求成功返回的数据
        }).catch((error) => {
          this.isRead = false
          console.error(error) // 请求失败返回的数据
        })
    },
    handleCancel() {
      this.formData = {
        img: '',
        bookName: '',
        author: '',
        ISBN: '',
        publisher: '',
        pubDate: '',
        page: '',
        type: '',
        description: '',
        addNum: ''
      }
    },
    handleSave(formData) {
      this.$refs[formData].validate((valid) => {
        if (!valid) {
          this.$message.error('请填入正确信息')
          return false;
        } else {
          const { img, bookName, author, ISBN, publisher, pubDate, page, type, description, addNum } = this.formData
          const params = {
            isbn: ISBN,
            bookName: bookName,
            author: author,
            type: type,
            totalNum: addNum,
            page: page,
            pubDate: pubDate,
            publisher: publisher,
            img: img,
            description: description
          }
          this.$axios({
            method: 'get',
            url: process.env.API_HOST + '/book/add',
            params
          }).then(response => {
            if (response.data.code != '000') {
              this.$message.error(response.data.msg)
            } else {
              this.$message.success('添加成功')
              this.$router.push('/book')
            }
            console.log(response)
          }).catch((error) => {
            this.$message.error('操作错误，请重试')
            console.log(error)
          })
        }
      })

    },
    beforeUploadCover(file) {
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
    handleUploadCover(file) {
      const isbn = this.formData.ISBN
      if (!isbn) {
        this.$message.error('请先输入书籍ISBN编号再上传图片')
      }
      else {
        let formdata = new FormData()
        formdata.append('isbn', isbn)
        formdata.append('file', file.file)
        this.$axios({
          method: 'post',
          url: process.env.API_HOST + '/file/uploadImg',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          if (response.data.code === '000') {
            console.log(response.data.data) // 存储返回的路径到row.img
            this.formData.img = process.env.API_HOST + '/file/get?fileName=' + response.data.data
          } else {
            this.$message.error(response.data.msg)
          }
        }).catch((error) => {
          this.$message.error('上传失败')
          console.log(error)
        })
      }
    },
    goback() {
      this.$router.push('/book')
    }
  }
}
</script>
<style>
</style>
