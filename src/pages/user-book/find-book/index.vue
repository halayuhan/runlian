<!--
 * @Author: liyan
 * @Date: 2019-08-07 16:04:56
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-15 18:13:17
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
            <van-dropdown-item v-model="value" :options="droplist" @close="onSearch" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="19">
          <form action="/">
            <van-search
              placeholder="请输入书名/作者/书籍类型搜索"
              v-model="filterInput"
              @keyup.enter.native="onSearch"
              @search="onSearch"
              @clear="onCancel"
            ></van-search>
          </form>
        </van-col>
      </van-row>
    </div>

    <div class="findBook_content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-collapse v-model="activeNames">
          <van-collapse-item v-for="(item,index) in listData" :key="item.id">
            <div slot="title" class="item_single">
              <div class="cell-title">
                <van-image
                  width="80"
                  height="100"
                  :src="item.img"
                  @error="onImgError(index)"
                  v-model="item.img"
                >
                  <template v-slot:error>加载失败</template>
                </van-image>
              </div>
              <div class="cell-content">
                <div class="item-header-group">
                  <div class="item-bookName">
                    <span class="item-index">{{index+1+'.'}}</span>
                    <span>{{item.bookName}}</span>
                  </div>
                  <div class="item-type">
                    <van-tag color="#5caaab">{{item.type}}</van-tag>
                  </div>
                </div>
                <div class="item-author">
                  <span>作者：{{item.author}}</span>
                </div>
                <div class="item-publisher">
                  <span>{{item.publisher}}</span>
                </div>
                <div class="item-bookNum">
                  <div class="item-booktotal">
                    <van-tag plain color="#5caaab">库藏</van-tag>
                    <span>{{item.totalNum}}</span>
                  </div>
                  <div class="item-bookstatus">
                    <van-tag plain color="#5caaab">在库</van-tag>
                    <span>{{item.haveNum}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div slot="default">
              <div class="item-pubDate">
                <span class="title-span">出版时间 :</span>
                <span>{{item.pubDate}}</span>
              </div>
              <div>
                <span class="title-span">ISBN :</span>
                <span>{{item.isbn}}</span>
              </div>
              <div>
                <span class="title-span">书籍简介 :</span>
                <p>{{item.description}}</p>
              </div>
            </div>
          </van-collapse-item>
          <vueToTop
            type="9"
            top="280"
            size="30"
            color="#fff"
            style="font-size: 30px;background-color: rgba(21, 24, 25, 0.5)"
          ></vueToTop>
        </van-collapse>
      </van-list>
    </div>
  </div>
</template>

<script>
import { QueryData } from '../../../api/bookApi'
const querystring = require('querystring')
import { Row, Col, Icon, Image, Search, Collapse, CollapseItem, List, Tag, Skeleton, Card, Button, Cell, CellGroup, DropdownMenu, DropdownItem } from 'vant'
import vueToTop from 'vue-totop'
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
    [CollapseItem.name]: CollapseItem,
    [Icon.name]: Icon,
    vueToTop
  },
  data() {
    return {
      // --下拉菜单的属性值--
      value: 0,
      droplist: [
        { text: '全部书籍', value: 0 },
        { text: '可借书籍', value: 1 }
      ],
      // --列表属性值--
      listData: [],
      loading: false,
      finished: false,
      activeNames: ['1'],
      filterInput: '',
      total: 0,
      count: 0, // 相当于页码
      pageSize: 5

    }
  },
  methods: {
    onSearch() {
      this.listData = []
      this.count = 1
      const paramsData = {
        isExist: this.value,
        page: this.count
      }
      this.queryData(paramsData)
    },
    onCancel() {
      this.filterInput = ''
    },
    onLoad() {
      this.finished = false
      this.count++
      const paramsData = {
        page: this.count
      }
      this.queryData(paramsData)
    },
    onImgError(index) {
      this.listData[index].img = '../../../../static/cover/default.jpg'
    },
    queryData(paramsData = {}) {
      const defaultParams = {
        isExist: this.value,
        keyword: this.filterInput.trim(),
        page: this.count,
        pageSize: this.pageSize,
        sign: 0,
        sortFlag: 0
      }
      const params = Object.assign({}, defaultParams, paramsData)

      QueryData(querystring.stringify(params)).then(res => {
        if (res.code != '000') {
          this.total = 0
          this.loading = false
          this.isScrollOver()
          return
        } else {
          res.data.forEach(element => {
            let { bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum } = element
            const ListItem = { bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum, edit: false }
            this.listData.push(ListItem)
          });
          this.currentPage = res.page
          this.total = res.count
        }
        this.loading = false
        this.isScrollOver()
      }).catch((error) => {
        console.log(error)
        this.loading = false
        this.isScrollOver()
      })
    },
    isScrollOver() {
      if (this.count * this.pageSize > this.total) {
        this.finished = true
      } else {
        this.finished = false
      }
    },
    loadMore() {
      this.count++
      const paramsData = {
        page: this.count
      }
      this.queryData(paramsData)
    },
    handleSearch() {
      this.count = 1
      this.queryData = {
        page: this.count
      }
    }
  }
}
</script>
<style>
@import "../../../assets/less/user-book/pages.css";
</style>
