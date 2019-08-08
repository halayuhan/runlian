<!--
 * @Author: liyan
 * @Date: 2019-08-07 16:04:56
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-08 13:42:32
 * @Description: file content
 -->

<template>
  <div class="find-book">
    <el-input placeholder="请输入姓名搜索" v-model="filterInput" @keyup.enter.native="handleSearch">
      <!-- <el-button slot="append" icon="el-icon-search" @click="filterSearch"></el-button> -->
    </el-input>
    <el-button type="primary" @click.prevent="handleSearch"></el-button>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <li v-for="item in listData">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FindBook',
  data () {
    return {
      listData: [1, 2, 3, 4, 5],
      tableData: [],
      filterInput: '',
      total: 0,
      count: 0, // 相当于页码
      pageSize: 5,
      busy: false
    }
  },
  methods: {
    queryData (params = {}) {
      const defaultParams = {
        isExist: 0,
        keyword: this.filterInput.trim(),
        page: this.count,
        pageSize: this.pageSize
      }
      const paramsData = Object.assign({}, defaultParams, params)
      console.log(paramsData)

      this.$axios({
        methods: 'get',
        // url: process.env.API_HOST + '/book/query',
        url: 'http://10.54.24.45:8080' + '/book/query',
        paramsData
      }).then((response) => {
        this.tableData = []
        if (response.data.code != '000') {
          this.total = 0
          this.$message.error(response.data.msg)
          this.busy = false
          return
        } else {
          for (let i = 0; i < response.data.data.length; i++) {
            const currentData = response.data.data[i]
            let {bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum} = currentData
            let tableItem = {bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum, edit: false}
            this.tableData.push(tableItem)
          }
          this.listData.push(...this.tableData)
          this.currentPage = response.data.page
          this.total = response.data.count
          this.busy = false
        }
        console.log(response)
      }).catch((error) => {
        console.log(error)
        // this.busy = false
        this.isScrollOver()
      })
      // console.log(this.busy)
      // this.busy = false
    },
    loadMore () {
      // debugger
      this.busy = true
      this.count++
      const paramsData = {
        page: this.count
      }
      this.queryData(paramsData)
      if (this.count * this.pageSize > this.total) {
        this.busy = true
      }
    },
    isScrollOver () {
      if (this.count * this.pageSize > this.total) {
        this.busy = true
      } else {
        this.busy = false
      }
    },
    handleSearch () {
      this.count = 1
      this.queryData = {
        page: this.count
      }
    }
  }
}
</script>
<style>
.find-book {
  height: 100%;
  background-color: #ccc;
}
</style>
