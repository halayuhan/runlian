<!--
 * @Author: liyan
 * @Date: 2019-07-29 17:07:16
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-21 13:55:54
 * @Description: file content
 -->
<template>
  <div class="book">
    <div class="book-wrapper" ref="scrollElement">
      <div class="book-search-handle">
        <div class="book-search-handle-left">
          <div class="book-filter">
            <link-select @search="filterSearch" />
          </div>
        </div>
        <div class="book-search-handle-right">
          <ul>
            <li>
              <el-button type="primary" @click.prevent="downloadVisible = true">书目模板下载</el-button>
              <el-dialog title="提示" :visible.sync="downloadVisible" width="30%">
                <span>是否确认导出书目模板</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click.prevent="downloadVisible = false">取消</el-button>
                  <el-button type="primary" @click.prevent="downloadTemplate">确认</el-button>
                </span>
              </el-dialog>
            </li>
            <li>
              <el-button type="primary" @click="handleOpen">Excel导入书单</el-button>
              <ex-import
                :fields="fields"
                :visible.sync="visible"
                :requestFn="requestFn"
                :tips="tips"
                :title="title"
                @close="handleCloseImport"
              />
            </li>
            <li>
              <el-button type="primary" @click.prevent="handleAddBook">单个添加</el-button>
            </li>
            <li>
              <el-button type="success" @click.prevent="importVisible = true">导出书单</el-button>
              <el-dialog title="提示" :visible.sync="importVisible" width="30%">
                <span>是否确认导出书单</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click.prevent="importVisible = false">取消</el-button>
                  <el-button type="primary" @click.prevent="importBook">确认</el-button>
                </span>
              </el-dialog>
            </li>
          </ul>
        </div>
      </div>
      <div class="book-search-content" v-loading.fullscreen.lock="this.$store.state.loading">
        <el-table
          :data="tableData"
          @sort-change="sortChange"
          :cell-style="{'vertical-align':'center','text-align':'center'}"
          :header-cell-style="{background: '#eee'}"
          border
          stripe
        >
          <el-table-column label="序号" width="60">
            <span slot-scope="scope">{{scope.$index + (currentPage - 1) * pageSize + 1}}</span>
          </el-table-column>
          <el-table-column label="ISBN">
            <template slot-scope="scope">
              <span>{{scope.row.isbn}}</span>
              <i class="el-icon-edit-outline" @click="handleEditISBN(scope.$index,scope.row)"></i>
            </template>
          </el-table-column>
          <el-table-column label="书籍封面">
            <template slot-scope="scope">
              <img v-lazy="scope.row.img" :src="scope.row.img" alt="cover" />
              <div class="upload-div">
                <el-upload
                  class="cover-uploader"
                  action="#"
                  :show-file-list="false"
                  :http-request="handleUploadCover.bind(this,[...arguments])"
                  :before-upload="beforeUploadCover"
                >
                  <div class="cover-uploader-button">
                    <el-button
                      type="warning"
                      size="mini"
                      slot="trigger"
                      v-if="scope.row.edit"
                      :disabled="!scope.row.edit"
                    >上传封面</el-button>
                  </div>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="书籍名称">
            <span slot-scope="scope">{{scope.row.bookName}}</span>
          </el-table-column>
          <el-table-column label="作者" prop="author">
            <span slot-scope="scope">{{scope.row.author}}</span>
          </el-table-column>
          <el-table-column label="出版社" prop="publisher">
            <span slot-scope="scope">{{scope.row.publisher}}</span>
          </el-table-column>
          <el-table-column label="创建日期" prop="createDate" sortable="custom">
            <span slot-scope="scope">{{scope.row.createDate}}</span>
          </el-table-column>
          <el-table-column label="书籍类型" prop="type">
            <el-input slot-scope="scope" v-if="scope.row.edit" v-model="scope.row.type"></el-input>
            <span v-else>{{scope.row.type|filterType}}</span>
          </el-table-column>
          <el-table-column label="数量">
            <ul slot-scope="scope">
              <li v-if="!scope.row.edit">
                <p>总数</p>
                <span>{{scope.row.totalNum}}</span>
              </li>
              <li>
                <p>可借</p>
                <el-input v-if="scope.row.edit" v-model="scope.row.haveNum" size="mini"></el-input>
                <span v-else>{{scope.row.haveNum}}</span>
              </li>
              <li>
                <p>待还</p>
                <el-input v-if="scope.row.edit" v-model="scope.row.outNum" size="mini"></el-input>
                <span v-else>{{scope.row.outNum}}</span>
              </li>
            </ul>
          </el-table-column>
          <el-table-column label="操作" width="90">
            <ul slot-scope="scope">
              <li>
                <el-button
                  v-if="!scope.row.edit"
                  size="mini"
                  type="blue"
                  @click="showdetail(scope.$index,scope.row)"
                >详情</el-button>
                <book-detail
                  ref="bookDetail"
                  :visible.sync="detailVisible"
                  @close="handleCloseImport"
                  :rowData="rowData"
                />
              </li>
              <li>
                <el-button
                  v-if="!scope.row.edit"
                  size="mini"
                  type="primary"
                  @click="handleEditChange(scope.$index,scope.row)"
                >编辑</el-button>
              </li>
              <li>
                <el-button
                  v-if="!scope.row.edit"
                  :disabled="scope.row.borrowstatus"
                  size="mini"
                  type="self"
                  @click="handleBook(scope.$index,scope.row,0)"
                >借书</el-button>
              </li>
              <li>
                <el-button
                  v-if="!scope.row.edit"
                  :disabled="scope.row.returnstatus"
                  size="mini"
                  type="success"
                  @click="handleBook(scope.$index,scope.row,1)"
                >还书</el-button>
              </li>
              <li>
                <el-button
                  v-if="scope.row.edit"
                  size="mini"
                  type="primary"
                  @click="handleEditSave(scope.$index,scope.row)"
                >保存</el-button>
              </li>
              <li>
                <el-button
                  v-if="scope.row.edit"
                  size="mini"
                  type="success"
                  @click="handleEditCancel(scope.$index,scope.row)"
                >取消</el-button>
              </li>
            </ul>
          </el-table-column>
        </el-table>
      </div>
      <div class="search-footer">
        <el-pagination
          background
          :hide-on-single-page="total == 0"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10,20,50]"
          layout="total,prev,pager,next,sizes,jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ExImport from './components/ExImport'
import BookDetail from './components/BookDetail'
import LinkSelect from './components/LinkSelect'
import queryData from '@mixin/queryData.js'
import { QueryData, UploadImg, UpdateIsbn, UpdateBook } from '@api/bookApi'
import { beforeUploadCover } from '@mixin/beforeUploadCover'
const querystring = require('querystring')
export default {
  name: 'Book',
  mixins: [beforeUploadCover, queryData],
  components: {
    ExImport,
    LinkSelect,
    BookDetail
  },
  data() {
    return {
      title: '批量导入书单',
      tips: ['除书籍简介外，其他信息为必填', '若添加书籍数量为空，默认为1'],
      fields: {
        // id: '序号',
        isbn: 'ISBN/书籍编号*',
        bookName: '书籍名称*',
        author: '作者*',
        publisher: '出版社*',
        pubDate: '出版时间*',
        totalNum: '数量*',
        type: '书籍类型*',
        description: '书籍简介'
      },
      downloadVisible: false,
      importVisible: false,
      detailVisible: false,
      visible: false, // 批量上传提示框可见情况     
      tableData: [],
      total: 0,
      updateOldValue: {},
      rowData: {}
    }
  },
  created() {
    this.loadData()

  },
  updated() {
    this.$parent.$parent.update()
  },
  filters: {
    filterType(value) {
      return value === '' ? '--' : value
    }
  },
  methods: {
    loadData(paramsData = {}) {
      const params = this.getParams(paramsData)
      QueryData(querystring.stringify(params)).then(res => {
        this.tableData = []
        res.data.forEach((element) => {
          let { createDate, bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum } = element
          const borrowstatus = (haveNum === 0) ? true : false
          const returnstatus = (outNum === 0) ? true : false
          const tableItem = { createDate, bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum, edit: false, detail: false, borrowstatus, returnstatus }
          this.tableData.push(tableItem)
        })
        this.currentPage = res.page
        this.total = res.count
      })
    },
    sortChange: function (column) {
      if (column.order === 'ascending') {
        this.sortFlag = 1
      } else if (column.order === 'descending') {
        this.sortFlag = 2
      } else {
        this.sortFlag = 0
      }
      const paramsData = {
        sortFlag: this.sortFlag
      }
      this.loadData(paramsData)
    },
    filterSearch(filterInput, searchkey) {
      const paramsData = {
        sign: +searchkey,
        page: 1,
        keyword: filterInput
      }
      this.loadData(paramsData)
    },
    importBook() {
      const baseurl = process.env.API_HOST + '/book/getBookList'
      const url = baseurl
      window.open(url)
      this.importVisible = false
    },
    downloadTemplate() {
      const baseurl = process.env.API_HOST + '/file/getTemplate'
      const url = baseurl
      window.open(url)
      this.downloadVisible = false
    },
    async requestFn(data) {
      this.tableData = JSON.stringify(data)
      return Promise.resolve()
    },
    handleCloseImport() {
      this.loadData()
    },
    handleOpen() {
      this.visible = true
    },
    handleAddBook() {
      this.$router.push('/book/add-book')
    },
    handleCurrentChange(index) {
      const paramsData = {
        page: index
      }
      this.loadData(paramsData)
      this.$nextTick(() => {
        this.$el.parentNode.parentNode.parentNode.parentNode.scrollTop = 0
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      const paramsData = {
        pageSize,
        page: 1
      }
      this.loadData(paramsData)
      this.$nextTick(() => {
        this.$el.parentNode.parentNode.parentNode.parentNode.scrollTop = 0
      })
    },
    handleUploadCover(scope, file) {
      const fileIsbn = scope[0].row.isbn
      const formdata = new FormData()
      formdata.append('isbn', fileIsbn)
      formdata.append('file', file.file)
      UploadImg(formdata).then(res => {
        if (res.code === '000') {
          scope[0].row.img = process.env.API_HOST + '/file/get?fileName=' + res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleEditChange(index, row) {
      this.updateOldValue = Object.assign(this.updateOldValue, row)
      row.edit = true
    },
    handleEditSave(index, row) {
      if (row.haveNum < 0) {
        this.$message.error('可借数量不能为负!')
        return
      }
      if (row.outNum < 0) {
        this.$message.error('待还数量不能为负!')
        return
      }
      if (row.haveNum === '') {
        this.$message.error('可借数量不能为空!')
        return
      }
      if (row.outNum === '') {
        this.$message.error('待还数量不能为空!')
        return
      }
      row.edit = false
      row.totalNum = +row.haveNum + +row.outNum
      this.updateData(index, row, '编辑')
    },
    handleEditCancel(index, row) {
      row = Object.assign(row, this.updateOldValue)
      row.edit = false
    },
    handleEditISBN(index, row) {
      this.$prompt('请输入新的书籍编号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const params = {
          newIsbn: value,
          oldIsbn: row.isbn
        }
        const res = UpdateIsbn(params)
        res.then(res => {
          if (res.code === '000') {
            this.$message({
              message: '修改成功!',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '修改失败!',
              type: 'error',
              duration: 2000
            })
          }
          this.loadData({ page: this.currentPage })
        })
      })
    },
    updateData(index, row, msg) {
      const params = {
        author: row.author,
        bookName: row.bookName,
        description: row.description,
        img: row.img,
        isbn: row.isbn,
        outNum: row.outNum,
        page: row.page,
        pubDate: row.pubDate,
        publisher: row.publisher,
        totalNum: row.totalNum,
        type: row.type
      }
      UpdateBook(querystring.stringify(params)).then(res => {
        if (res.code === '000') {
          this.$message({
            message: msg + '成功!',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message({
            message: msg + '失败!',
            type: 'error',
            duration: 2000
          })
          row = Object.assign(row, this.updateOldValue)
          row.edit = false
        }
      }).catch((error) => {
        console.log('error:', error)
        this.$message.error('网络错误，请重试')
        row = Object.assign(row, this.updateOldValue)
      })
    },
    handleBook(index, row, handlesign) {
      let handleNum_a = (handlesign === 0) ? row.haveNum : row.outNum
      const msg = (handlesign === 0) ? '借书' : '还书'
      const msgNotice = (handlesign === 0) ? '已无可借书籍' : '暂无书籍借出'
      if (handleNum_a <= 0) {
        this.$message.error(msgNotice)
        return
      }
      else {
        if (handlesign === 0) {
          row.haveNum--
          row.outNum++
        }
        else {
          row.haveNum++
          row.outNum--
        }
        row.borrowstatus = (row.haveNum <= 0) ? true : false
        row.returnstatus = (row.outNum <= 0) ? true : false
        row.totalNum = +row.haveNum + +row.outNum
        this.updateData(index, row, msg)
      }
    },
    showdetail(index, row) {
      this.detailVisible = true
      this.rowData = row
    }
  }
}
</script>
<style>
</style>
