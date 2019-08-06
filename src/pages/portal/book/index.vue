<!--
 * @Author: liyan
 * @Date: 2019-07-29 17:07:16
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-05 19:43:16
 * @Description: file content
 -->
<template>
  <div class="book" v-loading.fullscreen.lock="this.$store.state.loading">
    <div class="book-wrapper">
      <div class="search-handle">
        <div class="search-handle-left">
          <div class="data-filter">
            <el-input placeholder="请输入书籍名称/作者/出版社" v-model="filterInput" width="250">
              <el-button slot="append" icon="el-icon-search" @click.prevent="filterSearch"></el-button>
            </el-input>
          </div>
        </div>
        <div class="search-handle-right">
          <ul>
            <li>
              <el-upload
                ref="upload"
                action
                :show-file-list="false"
                :on-change="readExcel"
                :auto-upload="false"
              >
                <el-button type="primary" slot="trigger">上传书目</el-button>
              </el-upload>
              <!-- <el-button type="primary">上传书目</el-button> -->
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
              <el-button type="primary" @click="handleAddBook">添加</el-button>
            </li>
            <li>
              <el-button type="success">导出书单</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-content">
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
                      <span>{{props.row.ISBN}}</span>
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
              <div class="book-cover">
                <img :src="scope.row.img" alt="cover" />
              </div>
              <!-- <img :src="scope.row.img" alt="cover" />
              <div class="upload-div">
                <el-upload
                  class="cover-uploader"
                  action="#"
                  :show-file-list="false"
                  :on-change="handleAvatarSuccess.bind(this,[...arguments])"
                  :auto-upload="false"
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
              </div>-->
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
import XLSX from 'xlsx'
export default {
  name: 'Book',
  data: () => ({
    tableData: [
      {
        img: 'http://api.jisuapi.com/isbn/upload/1/201.jpg',
        bookName: 'python',
        author: 'aa',
        isbn: '12345678901',
        publisher: 'bbb',
        pubDate: '2018-4-1',
        page: '335',
        type: 'cc',
        description: 'wwwwwwwwwwwwssssssssssssssssssssssssssssssssaaaaaaaaaaaassddddddddddsssswwwww',
        totalNum: '3',
        outNum: '1',
        haveNum: '2',
        edit: false,
        temp: {
          type: '',
          totalNum: '',
          outNum: '',
          haveNum: ''
        }
      }
    ],
    total: 0,
    filterInput: '',
    downloadVisible: false,
    currentPage: 1, // 当前页码
    pageSize: 10, // 每页显示行数,
    isLoading: true
  }),
  created () {
    this.queryData()
  },
  methods: {
    queryData (paramsData = {}) {
      const defaultParams = {
        isExist: 0,
        keyword: this.filterInput,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      const params = Object.assign({}, defaultParams, paramsData)
      console.log(params)
      this.$axios({
        methods: 'get',
        url: process.env.API_HOST + '/query/query',
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
      // const params = {
      //   appkey: 'b979ae09bbbff4a2',
      //   isbn: this.filterInput
      // }
      // this.$axios({
      //   methods: 'get',
      //   url: '/isbn/',
      //   params
      // }).then(response => {
      //   console.log(response.data.result)
      // }).catch((error) => {
      //   console.log(error)
      // })
    },
    readExcel (file) {
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          for (let sheet in workbook.Sheets) {
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            console.log(sheetArray)
          }
        } catch (e) {
          this.$message.warning('文件类型不正确!')
          return false
        }
      }
      fileReader.readAsBinaryString(file.raw)
    },
    downloadTemplate () {
      const baseurl = 'http://10.0.58.22:8080/book/getTemplate'
      const url = baseurl
      window.open(url)
      this.downloadVisible = false
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
    handleAvatarSuccess (scope, file) {
      // console.log(file)
      // console.log(fileList)
      console.log(arguments)
      console.log(scope[0].$index)
      console.log(file.name)
      const index = scope[0].$index
      const imageUrl = '/static/cover/' + file.name
      this.pageData[index].img = imageUrl
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
    },
    handleEditCancel (index, row) {
      row.edit = false
      row.type = row.temp.type
      row.totalNum = row.temp.totalNum
      row.outNum = row.temp.outNum
      row.haveNum = row.temp.haveNum
    }
  }
}
</script>

<style>
.search-handle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  padding: 0 50px;
  /* border-bottom: 1px solid #000; */
  /* background-color: #eee; */
}

.search-handle-left {
  display: flex;
  justify-content: flex-start;
  margin: 0 20px 0 0;
}

.search-handle-left .el-input__inner {
  width: 240px;
}

.search-handle-right ul {
  display: flex;
}

/* .el-input-group__append button.el-button {
  background-color: #5caaab;
  color: #fff;
} */

.search-handle-right li {
  margin: 0 20px 0 0;
}
.search-handle-right li:last-child {
  margin: 0;
}

.search-content {
  padding: 30px 50px 0 50px;
}

.el-table .cell ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-table .cell li {
  display: flex;
  margin: 0 0 5px 0;
}

.el-table .cell li p {
  margin: 0 3px 0 0;
  width: 40px;
}
/* .el-table .cell li .el-input {
  margin: 0 0 0 5px;
  width: 40px;
} */

.el-table .cell img {
  display: inline-block;
  width: 90px;
  height: 150px;
  margin: 0 0 5px 0;
}

.el-table .table-expand-form {
  display: flex;
  padding: 0 0 10px 0;
  /* align-items: flex-end; */
}

.el-table .table-expand-form .el-form-item {
  margin: 0;
  height: 30px;
}

.el-table .table-expand-form .el-form-item div {
  display: flex;
  height: 30px;
}

.el-table .table-expand-form .el-form-item .flex-column {
  flex-direction: column;
}

.el-table .expand-form-left {
  width: 240px;
}

.el-table .expand-form-right {
  width: 250px;
}

.el-table .expand-form-center {
  flex: 1;
  padding: 0 80px 0 60px;
  /* align-self: flex-start; */
}

.el-table .table-expand-form p {
  width: 90px;
  font-size: 16px;
  font-weight: bold;
}

.el-table .table-expand-form h1 {
  font-size: 14px;
  font-weight: normal;
  word-break: break-all;
}

.search-footer {
  display: flex;
  justify-content: flex-end;
  padding: 30px 50px;
}
</style>
