<!--
 * @Author: liyan
 * @Date: 2019-07-31 11:49:06
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 13:56:52
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
<style>
</style>
