<!--
 * @Author: liyan
 * @Date: 2019-07-29 17:07:16
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-07 17:56:59
 * @Description: file content
 -->
<template>
  <div class="book" v-loading.fullscreen.lock="this.$store.state.loading">
    <div class="book-wrapper">
      <div class="book-search-handle">
        <div class="book-search-handle-left">
          <div class="book-filter">
            <el-input
              placeholder="请输入书籍名称/作者/出版社"
              v-model="filterInput"
              width="250"
              @keyup.enter.native="filterSearch"
            >
              <el-button slot="append" icon="el-icon-search" @click.prevent="filterSearch"></el-button>
            </el-input>
          </div>
        </div>
        <div class="book-search-handle-right">
          <ul>
            <li>
              <el-button type="primary" @click="handleOpen">上传书目</el-button>
              <ex-import
                :fields="fields"
                :requestFn="requestFn"
                :rules="rules"
                :tips="tips"
                :title="title"
                :visible.sync="visible"
                @close="handleCloseImport"
                @finish="handleFinishImport"
              />
            </li>
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
              <el-button type="primary" @click.prevent="handleAddBook">添加</el-button>
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
      <div class="book-search-content">
        <el-table :data="tableData" :header-cell-style="{background: '#eee'}" border stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form class="table-expand-form">
                <div class="expand-form-left">
                  <el-form-item>
                    <div>
                      <p>书籍名称:</p>
                      <span>{{props.row.bookName}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>作者:</p>
                      <span>{{props.row.author}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>出版社:</p>
                      <span>{{props.row.publisher}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>出版日期:</p>
                      <span>{{props.row.pubDate}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>ISBN:</p>
                      <span>{{props.row.isbn}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>页数:</p>
                      <span>{{props.row.page}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>类型:</p>
                      <span>{{props.row.type}}</span>
                    </div>
                  </el-form-item>
                </div>
                <div class="expand-form-center">
                  <el-form-item>
                    <div class="flex-column">
                      <p>描述:</p>
                      <h1>{{props.row.description}}</h1>
                    </div>
                  </el-form-item>
                </div>
                <div class="expand-form-right">
                  <el-form-item>
                    <div>
                      <p>库藏数量:</p>
                      <span>{{props.row.totalNum}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>可借数量:</p>
                      <span>{{props.row.outNum}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div>
                      <p>可借数量:</p>
                      <span>{{props.row.haveNum}}</span>
                    </div>
                  </el-form-item>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + (currentPage - 1) * pageSize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="ISBN" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.isbn}}</span>
            </template>
          </el-table-column>
          <el-table-column label="书籍封面" align="center">
            <template slot-scope="scope">
              <!-- <div class="book-cover">
                <img :src="scope.row.img" alt="cover" />
              </div>-->
              <img :src="scope.row.img" alt="cover" />
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
          <el-table-column label="书籍名称" align="center">
            <template slot-scope="scope">
              <!-- <template v-if="scope.row.edit">
                <el-input v-model="scope.row.bookName"></el-input>
              </template>
              <span v-else>{{scope.row.bookName}}</span>-->
              <span>{{scope.row.bookName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="作者" prop="author" align="center">
            <template slot-scope="scope">
              <!-- <template v-if="scope.row.edit">
                <el-input v-model="scope.row.author"></el-input>
              </template>
              <span v-else>{{scope.row.author}}</span>-->
              <span>{{scope.row.author}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出版社" prop="publisher" align="center">
            <template slot-scope="scope">
              <!-- <template v-if="scope.row.edit">
                <el-input v-model="scope.row.publisher"></el-input>
              </template>
              <span v-else>{{scope.row.publisher}}</span>-->
              <span>{{scope.row.publisher}}</span>
            </template>
          </el-table-column>
          <el-table-column label="书籍类型" prop="type" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.type"></el-input>
              </template>
              <span v-else>{{scope.row.type}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              <ul>
                <li>
                  <p>在库</p>
                  <template v-if="scope.row.edit">
                    <el-input v-model="scope.row.haveNum" size="mini"></el-input>
                  </template>
                  <span v-else>{{scope.row.haveNum}}</span>
                </li>
                <li>
                  <p>出库</p>
                  <template v-if="scope.row.edit">
                    <el-input v-model="scope.row.outNum" size="mini"></el-input>
                  </template>
                  <span v-else>{{scope.row.outNum}}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <ul>
                <li>
                  <el-button
                    size="mini"
                    type="primary"
                    :disabled="scope.row.edit"
                    v-if="!scope.row.edit"
                    @click="handleEditChange(scope.$index,scope.row)"
                  >编辑</el-button>
                </li>
                <li>
                  <el-button
                    size="mini"
                    type="primary"
                    v-if="scope.row.edit"
                    :disabled="!scope.row.edit"
                    @click="handleEditCancel(scope.$index,scope.row)"
                  >取消</el-button>
                </li>
                <li>
                  <el-button
                    size="mini"
                    type="success"
                    :disabled="!scope.row.edit"
                    v-if="scope.row.edit"
                    @click="handleEditSave(scope.$index,scope.row)"
                  >保存</el-button>
                </li>
              </ul>
            </template>
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

export default {
  name: 'Book',
  components: {
    ExImport
  },
  data () {
    return {
      title: '批量导入书单',
      tips: ['ISBN必填', '数量必填', '书籍类型必填'],
      fields: {
        series: '序号',
        isbn: 'ISBN/书籍编号*',
        bookName: '书籍名称*',
        author: '作者*',
        publisher: '出版社*',
        publishTime: '出版时间*',
        bookNum: '数量*',
        category: '书籍类型*',
        bookInfo: '书籍简介'
      },
      rules: {
        series: { type: 'number' },
        isbn: { type: 'number', required: true, message: '书籍ISBN必填' },
        bookNum: { type: 'number', required: true, message: '书籍数量必填' },
        category: { type: 'string', required: true, message: '书籍类型必填' }
      },
      downloadVisible: false,
      importVisible: false,
      visible: false,
      filterInput: '',
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示行数
      total: 0
    }
  },
  created () {
    this.queryData()
  },
  methods: {
    queryData (paramsData = {}) {
      const defaultParams = {
        isExist: 0,
        keyword: this.filterInput.trim(),
        page: this.currentPage,
        pageSize: this.pageSize
      }
      const params = Object.assign({}, defaultParams, paramsData)
      console.log(params)
      this.$axios({
        methods: 'get',
        url: process.env.API_HOST + '/book/query',
        params
      }).then((response) => {
        this.tableData = []
        if (response.data.code != '000') {
          this.total = 0
          this.$message.error(response.data.msg)
          return
        } else {
          for (let i = 0; i < response.data.data.length; i++) {
            const currentData = response.data.data[i]
            let {bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum} = currentData
            let tableItem = {bookName, author, isbn, publisher, pubDate, page, img, description, type, totalNum, outNum, haveNum, edit: false}
            this.tableData.push(tableItem)
          }
          this.currentPage = response.data.page
          this.total = response.data.count
        }
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    filterSearch () {
      const paramsData = {
        page: 1
      }
      this.queryData(paramsData)
    },
    isbnTest () {
      const params = {
        appkey: 'b979ae09bbbff4a2',
        isbn: this.filterInput
      }
      this.$axios({
        methods: 'get',
        url: '/isbn/query',
        params
      }).then(response => {
        console.log(response.data.result)
      }).catch((error) => {
        console.log(error)
      })
    },
    importBook () {
      const baseurl = process.env.API_HOST + '/book/getBookList'
      const url = baseurl
      window.open(url)
      this.importVisible = false
    },
    downloadTemplate () {
      // const baseurl = 'http://10.0.58.22:8080/book/getTemplate'
      const baseurl = process.env.API_HOST + '/book/getTemplate'
      const url = baseurl
      window.open(url)
      this.downloadVisible = false
    },
    async requestFn (data) {
      this.tableData = JSON.stringify(data)
      console.log(data)
      return Promise.resolve()
    },
    handleCloseImport () {
      console.log('弹窗关闭了~')
    },
    handleFinishImport () {
      console.log('导入完毕了~')
    },
    handleOpen () {
      this.visible = true
    },
    handleAddBook () {
      this.$router.push('/book/add-book')
    },
    handleCurrentChange (index) {
      const paramsData = {
        page: index
      }
      this.queryData(paramsData)
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      const paramsData = {
        pageSize,
        page: 1
      }
      this.queryData(paramsData)
    },
    beforeUploadCover (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传封面图片只能是JPG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过2MB!')
      }
      return isJPG && isLt2M
    },
    handleUploadCover (scope, file) {
      const fileName = scope[0].row.isbn
      let formdata = new FormData()
      formdata.append('name', fileName)
      formdata.append('file', file.file)
      // this.$axios({
      //   method: 'post',
      //   url: 'http://10.54.24.45:8080/book/addImage',
      //   data: formdata,
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }).then((response) => {
      //   console.log(response) // 存储返回的路径到row.img
      // }).catch((error) => {
      //   this.$message.error('上传失败')
      //   console.log(error)
      // })
    },
    handleEditChange (index, row) {
      row.edit = true
      row.temp = {
        type: row.type,
        totalNum: row.totalNum,
        outNum: row.outNum,
        haveNum: row.haveNum
      }
    },
    handleEditSave (index, row) {
      row.edit = false
      row.totalNum = +row.haveNum + row.outNum
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

      console.log(params)

      this.$axios({
        methods: 'get',
        url: process.env.API_HOST + '/book/update',
        params
      }).then(response => {
        console.log(response)
        if (response.data.code === '000') {
          this.$message({
            message: response.data.msg,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message({
            message: response.data.msg,
            type: 'error',
            duration: 2000
          })
          row.img = row.temp.img
          row.type = row.temp.type
          row.totalNum = row.temp.totalNum
          row.outNum = row.temp.outNum
          row.haveNum = row.temp.haveNum
        }
      }).catch((error) => {
        console.log(error)
        row.img = row.temp.img
        row.type = row.temp.type
        row.totalNum = row.temp.totalNum
        row.outNum = row.temp.outNum
        row.haveNum = row.temp.haveNum
      })
    },
    handleEditCancel (index, row) {
      row.edit = false
      row.img = row.temp.img
      row.type = row.temp.type
      row.totalNum = row.temp.totalNum
      row.outNum = row.temp.outNum
      row.haveNum = row.temp.haveNum
    }
  }
}
</script>

<style>
</style>
