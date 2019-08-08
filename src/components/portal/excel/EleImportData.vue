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
      >
        <!-- <template slot-scope="scope">
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
      </el-table-column>
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

    errorIndex: {
      type: Array,
      default: () => []
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
      // errorData: {}
    }
  },
  computed: {

    // errorTableData() {
    //   const errorData = this.errorData
    //   const errorTableData = []
    //   for (const index in errorData) {
    //     let messageArr = []
    //     for (const field in errorData[index]) {
    //       messageArr.push(errorData[index][field])
    //     }
    //     errorTableData.push({
    //       row: Number(index) + 1,
    //       reason: messageArr.join('、')
    //     })
    //   }

    //   return errorTableData
    // }
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
    // 检查单元格是否错误
    // checkCell({ row, column, rowIndex }) {
    //   if (this.errorData[rowIndex] && this.errorData[rowIndex][column.property]) {
    //     return 'ele-import-error-cell'
    //   }
    // },

    // // 校检数据
    // validateData() {
    //   if (this.rules) {
    //     var validator = new Schema(this.rules)
    //     const errorData = []
    //     this.tableData.forEach((item, index) => {
    //       validator.validate(item, (errors, fileds) => {
    //         if (errors) {
    //           errorData[index] = []
    //           errors.forEach((error) => {
    //             errorData[index][error.field] = error.message
    //           })
    //         }
    //       })
    //     })

    //     this.errorData = errorData
    //   }
    // },

    handlePre() {
      this.$emit('pre')
    },

    // 根据value找到key
    findKey(obj, value, compare = (a, b) => a === b) {
      let key = Object.keys(obj).find(k => compare(obj[k], value))
      if (!isNaN(Number(key))) {
        key = Number(key)
      }
      return key
    },

    downloadError() {

    },

    // 发送请求
    handleRequest() {
      if (this.isLoading) return
      this.$message.info("已帮您自动下载错误信息表")
      // downloadError()
      const paramArray = this.tableData
      let param = []
      paramArray.forEach((element, index, elArray) => {
        for (let key in element) {
          if (element[key] === null) {
            element[key] = ''
          }
          if (element[key] === undefined) {
            element[key] = 0
          }
        }

        // if (element.haveNum === 1) {
        let { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, num, type } = element
        let elItem = { author, bookName, description, img, isbn, outNum, page, pubDate, publisher, num, type }
        console.log(elItem)
        param.push(elItem)
        // }
      })
      console.log(param)
      const data = {
        books: param
      }

      // debugger
      this.$axios({
        method: 'post',
        url: '/book/adds',
        data: JSON.stringify(param)
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
  },
}
</script>

<style>
.import-error-table {
  margin-bottom: 20px;
}
.ele-import-error {
  color: white;
  background-color: #f56c6c !important;
}
.ele-import-error:hover {
  background-color: #f56c6c !important;
  background: #f56c6c !important;
}
</style>
