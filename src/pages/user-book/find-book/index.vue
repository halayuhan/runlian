<!--
 * @Author: liyan
 * @Date: 2019-08-07 16:04:56
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-08 13:42:28
 * @Description: file content
 -->

<template>
  <div class="findBook">
    <div class="findBook_header">
      <h1>linksoul读书会书单</h1>
    </div>
    <div class="findBook_search">
      <van-row>
        <van-col span="5">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="droplist" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="19">
          <form action="/">
            <van-search
              placeholder="请输入书名\作者搜索"
              v-model="filterInput"
              show-action
              @search="onSearch"
              @cancel="onCancel"
            />
          </form>
        </van-col>
      </van-row>
    </div>

    <div class="findBook_content">
      <van-cell-group>
        <van-cell>
          <div class="findBook_left">
            <template slot="title">
              <van-image width="80" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </template>
          </div>
          <template slot="default">
            <P>红与黑</P>
            <p>作者</p>
          </template>
        </van-cell>

        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </div>
  </div>
  <!-- <el-button type="primary" @click.prevent="handleSearch"></el-button>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="10"
        >
          <li v-for="item in listData">{{item}}</li>
  </ul>-->
</template>

<script>
import { Row, Col, Image, Search, Collapse, CollapseItem, List, Skeleton, NavBar, Card, Button, Cell, CellGroup, DropdownMenu, DropdownItem } from 'vant'

export default {
  name: 'FindBook',
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image

  },
  data () {
    return {
      value: 0,
      droplist: [
        { text: '全部书籍', value: 0 },
        { text: '可借书籍', value: 1 }
      ],
      listData: [1, 2, 3, 4, 5],
      tableData: [],
      filterInput: '',
      total: 0,
      count: 1, // 相当于页码
      pageSize: 5,
      busy: false
    }
  },
  watch: {
    count (val) {
      if (val * this.pageSize >= this.total) {
        // this.busy = true
      }
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {

    },
    queryData (params = {}) {
      const defaultParams = {
        isExist: 0,
        keyword: this.filterInput.trim(),
        page: this.count,
        pageSize: this.pageSize
      }
      const paramsData = Object.assign({}, defaultParams, params)

      this.$axios({
        methods: 'get',
        url: process.env.API_HOST + '/book/query',
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
            let { bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum } = currentData
            let tableItem = { bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum, edit: false }
            this.tableData.push(tableItem)
          }
          this.listData.push(...this.tableData)
          this.currentPage = response.data.page
          this.total = response.data.count
          this.busy = false
        }
        console.log(response)
      }).catch((error) => {
        console.log(1)
        console.log(error)
        // this.busy = false
      })

      console.log(2)
      this.busy = false
    },
    loadMore () {
      // debugger
      this.busy = true
      this.count++
      // this.listData.push(this.count)
      // console.log(this.count)
      const paramsData = {
        page: this.count
      }
      this.queryData(paramsData)
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
.findBook_header {
  height: 50px;
  padding: 0 8px;
  background-size: 80vw 60px;
  background-color: #5caaab;
  border: 1px solid #eee;
}
h1 {
  /* width: 390px; */
  height: 50px;
  line-height: 48px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.8);
  -webkit-text-stroke: 0.5px #03716e;
  /* -webkit-text-stroke: 0.5px #000; */
  /* color: rgba(255, 255, 255, 0.8); */
}
.find-book {
  height: 100%;
  background-color: #ccc;
}
.findBook_left {
}
</style>
