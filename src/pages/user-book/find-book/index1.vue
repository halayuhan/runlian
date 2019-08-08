<!--
 * @Author: liyan
 * @Date: 2019-08-07 16:04:56
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-08 14:29:43
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
    <!-- <el-input placeholder="请输入姓名搜索" v-model="filterInput" @keyup.enter.native="handleSearch">
    <!-- <el-button slot="append" icon="el-icon-search" @click="filterSearch"></el-button>-->
    <!-- </el-input>  -->
    <div class="findBook_content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-collapse v-model="activeNames">
          <van-cell v-for="item in list" :key="item">
            <!-- <van-collapse-item>
            <div slot="title">-->
            <template slot="title">
              <van-image width="80" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </template>
            <template slot="default">
              <div class="item-bookName">
                <span>红与黑</span>
                <!-- <span>{{item.bookName}}</span> -->
              </div>
              <div class="item-type">
                <van-tag color="#5caaab">文学类</van-tag>
                <!-- <van-tag color="#5caaab">{{item.type}}</van-tag> -->
              </div>
              <div class="item-author">
                <span>作者：罗斯福妥耶夫斯基</span>
                <!-- <span>{{item.author}}</span> -->
              </div>

              <div class="item-publisher">
                <span>出版社：人民文学出版社</span>
                <!-- <span>{{item.publisher}}</span> -->
              </div>
              <div class="item-booktotal">
                <van-tag plain color="#5caaab">库藏</van-tag>
                <span>3本</span>
                <!-- <span>{{item.totalNum}}</span> -->
              </div>
              <div class="item-bookstatus">
                <van-tag plain color="#5caaab">在库</van-tag>
                <span>2本</span>
                <!-- <span>{{item.haveNum}}</span> -->
              </div>
            </template>
            <!-- </div>
            </van-collapse-item>-->
          </van-cell>
        </van-collapse>
      </van-list>
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
import { Row, Col, Image, Search, Collapse, CollapseItem, List, Tag, Skeleton, Card, Button, Cell, CellGroup, DropdownMenu, DropdownItem } from 'vant'

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
    [Image.name]: Image,
    [List.name]: List,
    [Tag.name]: Tag,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data () {
    return {
      // --下拉菜单的属性值--
      value: 0,
      droplist: [
        { text: '全部书籍', value: 0 },
        { text: '可借书籍', value: 1 }
      ],
      listData: [1, 2, 3, 4, 5],
      // --列表属性值--
      list: [],
      loading: false,
      finished: false,
      activeNames: ['1'],
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
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true
        }
      }, 500)
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
.van-cell__value {
  text-align: left;
  width: 200px;
  -webkit-flex: 3;
  flex: 3;
}
.van-cell__title {
  -webkit-flex: 1;
  flex: 1;
}
.item-bookName {
  font-size: 18px;
  color: #5caaab;
  letter-spacing: 2px;
  float: left;
}
.item-booktotal,
.item-bookstatus {
  float: left;
  padding-right: 20px;
}
.item-type {
  text-align: right;
}
.van-tag {
  font-size: 12px;
}
</style>
