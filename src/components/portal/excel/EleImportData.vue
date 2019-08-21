<!--
 * @Author: liyan
 * @Date: 2019-08-09 14:46:45
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-15 20:31:25
 * @Description: file content
 -->
<template>
  <div>
    <div v-if="hasError">
      <el-alert show-icon type="warning">
        <ol class="ele-import-upload-tips">
          <li>红色*号表示该信息为空，不能正确导入</li>
        </ol>
      </el-alert>
    </div>
    <!-- 数据列表 -->
    <h1>数据列表</h1>
    <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowStyle">
      <el-table-column align="center" label="行号" type="index" width="50"></el-table-column>

      <el-table-column
        :key="field"
        :label="label"
        :prop="field"
        align="left"
        header-align="center"
        v-for="(label, field) of fields"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <!-- 自定义错误显示 -->
      <!-- <template v-slot="scope">
        <el-tooltip
          :content="errorData[scope.$index][field]"
          class="item"
          effect="dark"
          placement="top"
          v-if="errorData[scope.$index] && errorData[scope.$index][field]"
        >
          <div>{{ scope.row[field] || "&nbsp;" }}</div>
        </el-tooltip>
        <template v-else>{{scope.row[field]}}</template>
      </template>-->
    </el-table>

    <div class="ele-import-action">
      <el-button @click="handlePre">重新上传</el-button>
      <el-button @click="downloadError" type="primary" v-if="hasError">下载错误信息表</el-button>
      <el-button @click="handleRequest" type="primary">导入正确书籍</el-button>
    </div>
  </div>
</template>

<script>
import { GetErrorExcel, AddBookList } from '../../../api/bookApi'
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
      isDownload: false,
      hasError: true,
      errorData: [],
      correctData: []
    }
  },
  methods: {
    tableRowStyle({ row, rowIndex }) {
      if (this.tableData[rowIndex]['haveNum'] === 0) {
        this.hasError = true
        this.isDownload = false
        return 'ele-import-error'
      } else {
        this.hasError = false
        this.isDownload = true
        return ''
      }
    },
    handlePre() {
      this.$emit('pre')
    },
    _handleData() {
      const paramArray = this.tableData
      paramArray.forEach((element) => {
        for (const key in element) {
          if (element[key] === null) {
            element[key] = ''
          }
          if (element[key] === undefined) {
            element[key] = 0
          }
        }
        if (element.haveNum === 1) {
          let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type } = element
          const elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type }
          this.correctData.push(elItem)
        } else {
          let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type } = element
          const elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, totalNum, type }
          this.errorData.push(elItem)
        }
      })
    },
    downloadError() {
      this._handleData()
      const paramError = this.errorData
      const res = GetErrorExcel(paramError)
      res.then(res => {
        console.log(res)
        const urlString = res.data
        const baseurl = 'http://10.0.58.22:8080/file/download?fileName='
        const url = baseurl + urlString
        window.open(url)
        this.isDownload = true
      })
    },

    // 发送请求
    handleRequest() {
      if (!this.isDownload) {
        this.$message.error('请先下载错误信息表')
      } else {
        this._handleData()
        const paramCorrect = this.correctData
        const res = AddBookList(paramCorrect)
        res.then(res => {
          this.$message.success('导入成功')
          this.goNext()
        })
      }
    }
  }
}
</script>

<style>
</style>
