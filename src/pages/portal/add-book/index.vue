<!--
 * @Author: liyan
 * @Date: 2019-07-31 11:49:06
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-31 16:35:43
 * @Description: file content
 -->
<template>
  <div class="add-book">
    <div class="add-book-wrapper">
      <div class="add-book-header">
        <h1>添加书籍*</h1>
      </div>
      <div class="add-book-form">
        <el-form ref="form" :model="formData" label-width="100px" label-position="left">
          <div class="form-item-group">
            <div class="form-col-1">
              <el-form-item label="ISBN">
                <el-input v-model="formData.ISBN"></el-input>
              </el-form-item>
              <el-form-item label="书籍名称">
                <el-input v-model="formData.bookName"></el-input>
              </el-form-item>
              <el-form-item label="作者">
                <el-input v-model="formData.author"></el-input>
              </el-form-item>
              <el-form-item label="出版社">
                <el-input v-model="formData.publisher"></el-input>
              </el-form-item>
              <el-form-item label="页数">
                <el-input v-model="formData.page"></el-input>
              </el-form-item>
              <el-form-item label="书籍类型">
                <el-input v-model="formData.type"></el-input>
              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model="formData.addNum"></el-input>
              </el-form-item>
              <el-form-item label="书籍详情">
                <el-input type="textarea" v-model="formData.description"></el-input>
              </el-form-item>
            </div>
            <div class="form-col-2">
              <el-form-item label="上传封面">
                <div class="upload-div">
                  <el-upload
                    class="cover-uploader"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleCoverChange"
                  >
                    <img v-if="formData.img" :src="formData.img" alt="cover" class="cover" />
                    <i v-else class="el-icon-plus cover-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="form-btn-group">
            <el-form-item>
              <el-button type="primary" size="small" @click="handleSave">保存</el-button>
              <el-button type="danger" size="small" @click="handleCancel">取消</el-button>
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
  data: () => ({
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
      addNum: ''
    }
  }),
  methods: {
    handleCoverChange (file) {
      this.formData.img = '/static/cover/' + file.name
    },
    handleCancel () {
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
    handleSave () {

    }
  }
}
</script>
<style scoped>
.add-book-wrapper {
  padding: 30px 40px;
}

.add-book-header {
  height: 40px;
  line-height: 40px;
  margin: 0 0 40px 0;
}

.add-book-header h1 {
  font-size: 28px;
}

.add-book-form {
  width: 100%;
}

.add-book-form .form-item-group {
  display: flex;
  margin: 0 0 30px 0;
}

.add-book-form .form-col-1 {
  width: 50%;
  padding: 0 100px 0 0;
}

.add-book-form .form-col-2 {
  display: flex;
  align-items: flex-end;
}

.add-book-form .form-col-2 .cover-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add-book-form .form-col-2 .cover-uploader >>> .el-upload:hover {
  border-color: #409eff;
}

.add-book-form .form-col-2 .cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.add-book-form .form-col-2 .cover {
  display: inline-block;
  width: 85px;
  height: 150px;
}

.form-btn-group .el-form-item {
  display: flex;
  justify-content: center;
}

.form-btn-group >>> .el-form-item__content {
  margin: 0 auto !important;
}

.el-form-item >>> .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
}
</style>
