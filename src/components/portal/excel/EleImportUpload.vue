<!--
 * @Author: liyan
 * @Date: 2019-08-06 17:07:49
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-19 10:34:18
 * @Description: file content
 -->
<template>
  <div>
    <!-- 提示列表 -->
    <div v-if="tips && tips.length">
      <el-alert show-icon type="warning">
        <ol class="ele-import-upload-tips">
          <li :key="index" v-for="(item, index) of tips">{{item}}</li>
        </ol>
      </el-alert>
    </div>

    <!-- 上传组件 -->
    <el-upload
      :before-upload="beforeUpload"
      :http-request="Requeset"
      :show-file-list="false"
      action="/"
      class="ele-import-upload-uploader"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将填写后的文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <!-- 操作 -->
    <!-- <div class="ele-import-action">
      <el-button :loading="isLoading" @click="handleGoNext" type="primary">下一步</el-button>
    </div>-->
  </div>
</template>

<script>
// 上传文件页面
import excel from '@/pages/portal/excel'

export default {
  name: 'EleImportUpload',
  props: {
    tips: Array,
    fields: {
      type: Object,
      required: true
    }
  },
  inject: ['goNext', 'goPre'],
  data () {
    return {
      fileList: []

    }
  },
  methods: {
    // 上传
    Requeset (file) {
      const formdata = new FormData()
      formdata.append('file', file.file)
      this.$axios({
        method: 'post',
        url: process.env.API_HOST + '/book/uploadExcel',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        const tableData = []
        const errorDate = []

        for (let i = 0; i < response.data.data.length; i++) {
          const bookData = response.data.data[i]

          if (bookData.haveNum === 0) {
            errorDate.push({ bookData })
            this.$emit('errorRow', errorDate)
          }
          if (bookData.img === undefined) {
            bookData.img = ''
          }
          let { id, isbn, bookName, author, publisher, pubDate, totalNum, type, description, haveNum, img, outNum, page, num } = bookData
          const tableItem = { id, isbn, bookName, author, publisher, pubDate, totalNum, type, description, haveNum, img, outNum, page, num }
          tableData.push(tableItem)
        }
        console.log('upload', tableData)
        this.$emit('upload', tableData)
        this.goNext()

        // 请求成功返回的数据
      }).catch((error) => {
        this.$message.error('上传失败')
        console.error(error) // 请求失败返回的数据
      })
    },

    // 检测文件类型
    checkType (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      const extArr = ['xlsx', 'xls', 'csv']
      return extArr.includes(fileExt)
    },
    // 上传错处提示
    uploadError (message) {
      this.$notify.error({
        title: '上传出错了',
        message: message
      })
    },
    // 检测表头
    checkTableTitle (columns, fields) {
      const titles = Object.values(fields)
      titles.forEach((item) => {
        if (!columns.includes(item)) {
          this.$notify.error({
            title: '数据错处了',
            message: item + ' 列未找到'
          })
        }
      })
    },
    handleGoNext () {
      this.$notify.error({
        title: '提示',
        message: '请先上传数据'
      })
    },

    // 改变 tableData 的 key, 并且过滤掉不需要的字段
    changeDatakeyAndFilter (arr) {
      const fields = this.fields
      return arr.map((item) => {
        const res = {}
        for (const key in fields) {
          res[key] = item[fields[key]]
        }
        return res
      })
    },

    async beforeUpload (file) {
      // 检测文件类型
      if (!this.checkType(file)) {
        this.uploadError('文件：' + file.name + ' 文件类型错误，请在模板文件上修改后上传')
        return false
      }
    }
  }
}
</script>

<style>
</style>
