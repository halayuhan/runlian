<!--
 * @Author: liyan
 * @Date: 2019-07-29 17:06:47
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-21 13:55:48
 * @Description: file content
 -->
<template>
  <div class="check-in" v-loading.fullscreen.lock="this.$store.state.loading">
    <div :class="['check-in-wrapper', {'no-scroll': qrcodeVisible}]">
      <div class="search-handle">
        <div class="search-handle-left">
          <div class="time-picker">
            <el-date-picker
              v-model="timeStart"
              type="date"
              :picker-options="pickerOptions"
              :clearable="false"
              placeholder="选择起始时间"
            ></el-date-picker>
            <el-date-picker
              v-model="timeEnd"
              type="date"
              :picker-options="pickerOptions"
              :clearable="false"
              placeholder="选择结束时间"
            ></el-date-picker>
          </div>
          <div class="data-filter">
            <el-input
              placeholder="请输入姓名/ldap搜索"
              v-model="filterInput"
              clearable
              @keyup.enter.native="filterSearch"
            >
              <!-- <el-button slot="append" icon="el-icon-search" @click="filterSearch"></el-button> -->
            </el-input>
          </div>
        </div>
        <div class="search-handle-right">
          <ul>
            <li>
              <el-button type="primary" @click.prevent="filterSearch">搜索</el-button>
            </li>
            <li>
              <el-button type="primary" @click.prevent="downloadVisible = true">导出签到表</el-button>
              <!-- <button @click.prevent="downloadVisible = true">导出签到表</button> -->
              <el-dialog title="提示" :visible.sync="downloadVisible" width="30%">
                <span>是否确认导出签到表</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="downloadVisible = false">取消</el-button>
                  <el-button type="primary" @click.prevent="downloadExcel">确认</el-button>
                </span>
              </el-dialog>
            </li>
            <li>
              <el-button type="primary" @click.prevent="showMask">导出二维码</el-button>
              <!-- <button @click.prevent="showMask">导出二维码</button> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="search-content">
        <el-table
          :data="tableData"
          @sort-change="sortChange"
          :header-cell-style="{background: '#eee'}"
          border
          stripe
        >
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + (currentPage - 1) * pageSize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column width="140" label="LDAP" prop="ldap"></el-table-column>
          <el-table-column width="140" label="姓名" prop="userName"></el-table-column>
          <el-table-column width="90" label="性别" prop="gender">
            <template slot-scope="scope">{{scope.row.gender | genderFormat}}</template>
          </el-table-column>
          <el-table-column width="90" label="内外部" prop="isInternal">
            <template slot-scope="scope">{{scope.row.isInternal | internalFormat}}</template>
          </el-table-column>
          <el-table-column label="在读书籍" prop="bookName"></el-table-column>
          <el-table-column width="160" label="手机号码" prop="phoneNumber"></el-table-column>
          <el-table-column width="160" label="签到时间" prop="time" sortable="custom"></el-table-column>
        </el-table>
      </div>
      <div class="search-footer">
        <el-pagination
          background
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10,20,50]"
          layout="total,prev,pager,next,sizes,jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          v-show="isShow"
        ></el-pagination>
      </div>
    </div>
    <div class="mask" v-show="qrcodeVisible">
      <div class="mask-content">
        <div>
          <div id="qrcode"></div>
          <p>请扫码签到</p>
        </div>
        <div class="icon" @click.prevent="closeMask">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { GetSignRecord } from '@api/attendanceApi'

export default {
  name: 'CheckIn',
  data() {
    const timeEnd = new Date().getTime()
    const timeStart = new Date().getTime() - 3600 * 1000 * 24 * 7
    return {
      isShow: true,
      qrcodeVisible: false, // 是否显示二维码
      qrcodeObject: {}, // 二维码封装对象
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }, // 日期组件配置选项
      downloadVisible: false, // 是否显示导出Excel对话框
      filterInput: '', // 用于过滤的输入
      tableData: [], // 所有表格数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示行数
      total: 0, // 总数据量
      sign: 2, // 默认降序排列
      timeStart, // 起始时间
      timeEnd // 结束时间
    }
  },
  created() {
    this.queryData()
  },
  updated() {
    this.$parent.$parent.update()
  },
  mounted() {
    // 创建二维码dom结构，返回数据对象
    this.qrcode()
  },
  filters: {
    genderFormat(value) {
      return value === 'M' ? '男' : '女'
    },
    internalFormat(value) {
      return value === 'Y' ? '内部' : '外部'
    }
  },
  methods: {
    sortChange: function (column) {
      this.sign = (column.order === 'ascending') ? 1 : 2
      const paramsData = {
        sign: this.sign
      }
      this.queryData(paramsData)
    },
    queryData(paramsData = {}) {
      if (this.timeStart > this.timeEnd) {
        this.$message.error('起始时间不能大于结束时间!')
        return
      }
      const defaultParams = {
        start: this.getDate(this.timeStart, 'yyyy-MM-dd 00:00:00'),
        end: this.getDate(this.timeEnd, 'yyyy-MM-dd 23:59:59'),
        userName: this.filterInput.trim(),
        page: this.currentPage,
        pageSize: this.pageSize,
        sign: this.sign
      }
      const params = Object.assign({}, defaultParams, paramsData)
      const res = GetSignRecord(params)
      res.then(res => {
        this.tableData = []
        if (res.code != '000') {
          this.isShow = false
          console.log(res)
        } else {
          res.data.forEach(element => {
            let { ldap, userName, gender, isInternal, department, phoneNumber, book, timeString } = element
            const tableItem = { ldap, userName, gender, isInternal, department, phoneNumber, bookName: book, time: timeString }
            this.tableData.push(tableItem)
          })
          this.currentPage = res.page
          this.total = res.count
          this.isShow = true
        }
      }).catch((error) => {
        this.$message.error('网络错误，请重试')
        this.isShow = false
      })
    },
    filterSearch() {
      this.sign = 2
      const paramsData = {
        page: 1
      }
      this.queryData(paramsData)
    },
    downloadExcel() {
      const baseurl = process.env.API_HOST + '/signIn/getExcel?'
      const params = {
        start: this.getDate(this.timeStart, 'yyyy-MM-dd hh:mm:ss'),
        end: this.getDate(this.timeEnd, 'yyyy-MM-dd hh:mm:ss'),
        userName: this.filterInput
      }
      const url = baseurl + 'start=' + params.start + '&end=' + params.end + '&userName=' + params.userName
      window.open(url)
      this.downloadVisible = false
    },
    showMask() {
      const timestamp = Date.parse(new Date())
      // 创建二维码，填写相应 ip地址+时间戳
      this.qrcodeObject.makeCode('http://10.0.58.22:8090/#/attendance/?d=' + timestamp.toString())
      this.qrcodeVisible = true
    },
    closeMask() {
      // 清除二维码
      this.qrcodeObject.clear()
      this.qrcodeVisible = false
    },
    qrcode() {
      const qrcode = new QRCode('qrcode', {
        width: 360,
        height: 360,
        colorDark: '#000',
        colorLight: '#fff'
      })
      this.qrcodeObject = qrcode
    },
    handleCurrentChange(index) {
      const paramsData = {
        page: index
      }
      this.queryData(paramsData)
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
      this.queryData(paramsData)
      this.$nextTick(() => {
        console.log(this.$parent.$parent)
        this.$el.parentNode.parentNode.parentNode.parentNode.scrollTop = 0
        this.$parent.$parent.update()
      })
    }
  }
}
</script>

<style>
</style>
