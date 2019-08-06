<!--
 * @Author: liyan
 * @Date: 2019-07-29 17:07:16
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-02 11:06:34
 * @Description: file content
 -->
<template>
  <div class="book">
    <div class="book-wrapper">
      <div class="search-handle">
        <div class="search-handle-left">
          <div class="data-filter">
            <el-input placeholder="请输入书籍名称" v-model="filterInput">
              <el-button slot="append" icon="el-icon-search" @click.prevent="filterSearch"></el-button>
            </el-input>
          </div>
        </div>
        <div class="search-handle-right">
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
              <el-button type="primary">书目模板下载</el-button>
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
        <el-table :data="pageData" :header-cell-style="{background: '#eee'}" border stripe>
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
                    <div>
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
              </div>
            </template>
          </el-table-column>
          <el-table-column label="书籍名称" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.bookName"></el-input>
              </template>
              <span v-else>{{scope.row.bookName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="作者" prop="author" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.author"></el-input>
              </template>
              <span v-else>{{scope.row.author}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出版社" prop="publisher" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.publisher"></el-input>
              </template>
              <span v-else>{{scope.row.publisher}}</span>
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
          :hide-on-single-page="false"
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
export default {
  name: 'Book',
  data () {
    return{
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
    visible: false,
    filterInput: '',
    tableData: [],
    currentPage: 1, // 当前页码
    pageSize: 10 // 每页显示行数

  }
  },
  computed: {
    total() {
      return this.tableData.length
    }, // 总数据量
    pageData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    }
  },
  // mounted () {
  //   this.isEdit = new Array(this.tableData.length)
  //   this.isEdit.fill(false)
  // },
  methods: {
    async requestFn(data) {
      this.tableData = JSON.stringify(data)
      console.log(data)
      // eslint-disable-next-line
      // return Promise.reject({ 1: { age: '名字错了' } })
      return Promise.resolve()
    },
    handleCloseImport() {
      console.log('弹窗关闭了~')
    },
    handleFinishImport() {
      console.log('导入完毕了~')
    },
    handleOpen() {
      this.visible = true
    },
    handleAddBook() {
      this.$router.push('/book/add-book')
    },
    handleCurrentChange(index) {
      this.currentPage = index
    },
    handleSizeChange(index) {
      this.pageSize = index
    },
    handleAvatarSuccess(scope, file) {
      // console.log(file)
      // console.log(fileList)
      console.log(arguments)
      console.log(scope[0].$index)
      console.log(file.name)
      const index = scope[0].$index
      const imageUrl = '/static/cover/' + file.name
      this.pageData[index].img = imageUrl
    },
    handleEditChange(index, row) {
      row.edit = true
    },
    handleEditSave(index, row) {
      row.edit = false
    },
    handleEditCancel(index, row) {
      row.edit = false
    }
  }
}
</script>

<style>
.search-handle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 50px;
  /* border-bottom: 1px solid #000; */
  /* background-color: #eee; */
}

.search-handle-left {
  display: flex;
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
  width: 85px;
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

.el-table .expand-form-left {
  width: 220px;
}

.el-table .expand-form-right {
  width: 250px;
}

.el-table .expand-form-center {
  flex: 1;
  padding: 0 80px 0 60px;
  /* align-self: flex-start; */
}

.el-table .table-expand-form span {
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
  justify-content: center;
  padding: 30px 0;
}
</style>
