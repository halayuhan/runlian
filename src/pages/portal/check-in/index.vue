<!--
 * @Author: liyan
 * @Date: 2019-07-29 17:06:47
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-29 17:38:41
 * @Description: file content
 -->
<template>
  <div class="check-in">
    <div class="check-in-wrapper">
      <div class="search-handle">
        <div class="search-handle-left">
          <div class="time-picker">
            <el-date-picker
              v-model="timeStart"
              type="date"
              placeholder="选择起始时间"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <el-date-picker
              v-model="timeEnd"
              type="date"
              placeholder="选择结束时间"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
          <div class="data-filter">
            <el-input placeholder="请输入姓名" v-model="filterInput">
              <el-button slot="append" icon="el-icon-search" @click.prevent="filterSearch"></el-button>
            </el-input>
          </div>
        </div>
        <div class="search-handle-right">
          <ul>
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
        <el-table :data="pageData" :header-cell-style="{background: '#eee'}" border stripe>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + (currentPage - 1) * pageSize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="userName"></el-table-column>
          <el-table-column label="性别" prop="gender"></el-table-column>
          <el-table-column label="内外部" prop="isInternal"></el-table-column>
          <el-table-column label="在读书籍" prop="bookName"></el-table-column>
          <el-table-column label="手机号码" prop="phoneNumber"></el-table-column>
          <el-table-column label="签到时间" prop="time"></el-table-column>
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

export default {
  name: 'CheckIn',
  data: () => ({
    qrcodeVisible: false, // 是否显示二维码
    qrcodeObject: {}, // 二维码封装对象
    pickerOptions: {
      disabledDate (time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        },
        {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        },
        {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }
      ]
    }, // 日期组件配置选项
    downloadVisible: false, // 是否显示导出Excel对话框
    filterInput: '', // 用于过滤的输入
    tableData: [
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '红与黑',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '红与黑',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '红与黑',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '红与黑',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '红与黑',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '红与黑',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '红与黑',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '你一生的故事',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '哈利波特',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '水问',
        time: '2019-9-10'
      },
      {
        userName: 'lili',
        gender: '女',
        isInternal: '是',
        department: '外部',
        phoneNumber: '122345677',
        bookName: '水问',
        time: '2019-9-10'
      }

    ], // 所有表格数据
    currentPage: 1, // 当前页码
    pageSize: 10 // 每页显示行数
  }),
  computed: {
    timeStart () {
      return new Date().getTime() - 3600 * 1000 * 24 * 7
    },
    timeEnd () {
      return new Date().getTime()
    },
    total () {
      return this.tableData.length
    }, // 总数据量
    pageData () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    } // 当前页显示数据
  },
  mounted () {
    // 创建二维码dom结构，返回数据对象
    this.qrcode()
  },
  methods: {
    filterSearch () {
      // 过滤搜索
      // todo
      console.log(this.filterInput)
    },
    downloadExcel () {
      // 动态加a标签，链接下载Excel
      // todo
      console.log(2)
      this.downloadVisible = false
    },
    showMask () {
      let timestamp = Date.parse(new Date())
      console.log(timestamp.toString())
      // 创建二维码，填写相应 ip地址+时间戳
      this.qrcodeObject.makeCode('http://10.54.26.214:8080/#/attendance' + '#' + timestamp.toString())
      this.qrcodeVisible = true
    },
    closeMask () {
      // 清除二维码
      this.qrcodeObject.clear()
      this.qrcodeVisible = false
    },
    qrcode () {
      // let timestamp = Date.parse(new Date())
      // console.log(timestamp.toString())
      // let qrcode = new QRCode('qrcode', {
      //   width: 132,
      //   height: 132,
      //   text: 'http://10.54.30.64:8080/#/attendance' + '#' + timestamp.toString(), // 二维码地址
      //   colorDark: '#000',
      //   colorLight: '#fff'
      // })
      let qrcode = new QRCode('qrcode', {
        width: 132,
        height: 132,
        colorDark: '#000',
        colorLight: '#fff'
      })
      this.qrcodeObject = qrcode
    },
    handleCurrentChange (index) {
      this.currentPage = index
    },
    handleSizeChange (index) {
      this.pageSize = index
    }
  }
}
</script>

<style scoped>
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

.search-handle-left .data-filter {
  margin: 0 0 0 40px;
}

.el-input-group__append button.el-button {
  background-color: #409eff;
  color: #fff;
}

.search-handle-right li:first-child {
  margin: 0 20px 0 0;
}

.mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
}

.mask-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 320px;
  text-align: center;
  background-color: #fff;
}

.mask-content p {
  margin: 10px 0 0 0;
  font-size: 16px;
}

.mask-content .icon {
  position: absolute;
  right: 0;
  top: 0;
}
.mask-content i::before {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
}

#qrcode {
  width: 142px;
  height: 142px;
  padding: 5px;
  /* border: 1px solid #000; */
  background-color: #fff;
}

#qrcode img {
  width: 132px;
  height: 132px;
}

.search-content {
  padding: 30px 50px 0 50px;
}

.search-footer {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
</style>
