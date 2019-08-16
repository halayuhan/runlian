<!--
 * @Author: liyan
 * @Date: 2019-08-06 17:07:49
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-15 20:18:12
 * @Description: file content
 -->
<template>
  <div class="ele-import-download">
    <el-link :href="filepath" :underline="false" @click.native="handleDownload" target="_blank">
      <i class="el-icon-document"></i>
    </el-link>
    <div>
      <el-link
        :href="filepath"
        :underline="false"
        @click.native="handleDownload"
        target="_blank"
      >点击下载模板文件</el-link>
    </div>

    <div class="ele-import-action">
      <el-button @click="handleDownload" type="success">
        <el-link :href="filepath" :underline="false" style="color: white" target="_blank">下载模板</el-link>
      </el-button>
      <el-button @click="handleNext" type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EleImportDownload',
  props: {
    filepath: {
      type: String,
      required: true
    }
  },
  inject: ['goNext'],
  data () {
    return {
      hasDownload: false
    }
  },
  methods: {
    // 点击下一步
    handleNext () {
      if (this.hasDownload) {
        this.goNext()
      } else {
        this.$message.error('您还未下载模板文件')
      }
    },

    // 判断是否已经下载
    checkHasDownload () {
      // this.hasDownload = Cookie.get('ele-import-download-' + this.filepath)
    }
  },
  mounted () {
    // 判断是否下载过
    this.checkHasDownload()
  }
}
</script>

<style>
</style>
