<template>
  <div>
    <!-- 错误显示表 -->

    <!-- 数据列表 -->
    <h1>数据列表</h1>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="isLoading"
      :row-class-name="tableRowStyle"
    >
      <el-table-column align="center" label="行号" type="index" width="50"></el-table-column>

      <el-table-column
        :key="field"
        :label="label"
        :prop="field"
        align="left"
        header-align="center"
        v-for="(label, field) of fields"
      ></el-table-column>
    </el-table>

    <div class="ele-import-action">
      <el-button @click="handlePre">重新上传</el-button>
      <el-button :loading="isLoading" @click="handleRequest" type="primary">一键导入</el-button>
      <el-button @click="downloadError" type="primary">下载错误信息表</el-button>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'EleImportData',
  props: {

    fields: {
      type: Object,
      required: true
    },

    requestFn: {
      type: Function,
      required: true
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },


  },
  inject: ['goNext', 'goPre'],
  data() {
    return {
      isLoading: false,
      isDownload: false

    }
  },
  computed: {
  },
  methods: {
    tableRowStyle({ row, rowIndex }) {

      if (this.tableData[rowIndex]["haveNum"] === 0) {
        return 'ele-import-error'
      }
      else {
        return ''
      }
    },

    handlePre() {
      this.$emit('pre')
    },

    _getParam() {
      const paramArray = this.tableData
      var paramC = []
      var paramE = []
      paramArray.forEach((element, index, elArray) => {
        for (let key in element) {
          if (element[key] === null) {
            element[key] = ''
          }
          if (element[key] === undefined) {
            element[key] = 0
          }
        }
        if (element.haveNum === 1) {
          let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type } = element
          let elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type }
          paramC.push(elItem)
        }
        else {
          let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type } = element
          let elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type }
          paramE.push(elItem)
        }
      })
    },

    downloadError() {
      const paramArray = this.tableData

      const paramE = []
      paramArray.forEach((element, index, elArray) => {
        for (let key in element) {
          if (element[key] === null) {
            element[key] = ''
          }
          if (element[key] === undefined) {
            element[key] = 0
          }
        }
        if (element.haveNum === 0) {
          let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type } = element
          let elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type }
          paramE.push(elItem)
          console.log(paramE)
        }

      })
      this.$axios({
        method: 'post',
        url: '/file/getErrorExcel',
        data: JSON.stringify(paramE)
      }).then((response) => {
        if (response.data.code != '000') {
          this.$message.error(response.data.msg)
        } else {
          const urlString = response.data.data
          const baseurl = 'http://10.0.58.22:8080/file/download?fileName='
          const url = baseurl + urlString
          window.open(url)
        }
        this.isDownload = true
        console.log(response) // 请求成功返回的数据
      }).catch((error) => {
        this.$message.error('下载错误列表失败')
        console.error(error) // 请求失败返回的数据
      })

    },

    // 发送请求
    handleRequest() {
      if (this.isLoading) return
      if (!this.isDownload) {
        this.$message.error("请先下载错误信息表")
      }
      else {
        const paramArray = this.tableData
        var paramC = []
        var paramE = []
        paramArray.forEach((element, index, elArray) => {
          for (let key in element) {
            if (element[key] === null) {
              element[key] = ''
            }
            if (element[key] === undefined) {
              element[key] = 0
            }
          }
          if (element.haveNum === 1) {
            let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type } = element
            let elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type }
            paramC.push(elItem)
          }
          else {
            let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type } = element
            let elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type }
            paramE.push(elItem)
          }
        })
        this.$axios({
          method: 'post',
          url: '/book/adds',
          data: JSON.stringify(paramC)
        }).then((response) => {
          if (response.data.code != '000') {
            this.$message.error(response.data.msg)
          } else {
            this.$message.success('导入成功')
            this.goNext()
          }
          console.log(response) // 请求成功返回的数据
        }).catch((error) => {
          this.$message.error('导入失败, 请重试')
          console.error(error) // 请求失败返回的数据
        })
      }
    }
  },
}
</script>

<style>
.import-error-table {
  margin-bottom: 20px;
}
.ele-import-error {
  color: #f56c6c;
}
.ele-import-error:hover {
  color: #f56c6c;
}
</style>
