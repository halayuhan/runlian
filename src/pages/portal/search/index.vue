<!--
 * @Author: liyan
 * @Date: 2019-07-26 13:46:00
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 13:56:35
 * @Description: file content
 -->
<template>
  <div class="search">
    <div class="search-wrapper">
      <div class="search-nav">
        <ul>
          <li>
            <span class="el-icon-arrow-right"></span>
          </li>
          <li>
            <router-link to="/check-in" active-class="active-link">签到管理</router-link>
            <!-- <a href="#">签到管理</a> -->
          </li>
          <li>
            <router-link to="/book" active-class="active-link">书单管理</router-link>
            <!-- <a href="#">书单管理</a> -->
          </li>
        </ul>
      </div>
      <router-view></router-view>
      <!-- <div class="search-handle">
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
            </li>
          </ul>
        </div>
      </div>-->
      <!-- <div class="search-content">
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
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style>
</style>
