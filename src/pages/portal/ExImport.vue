<template>
  <div>
    <el-dialog
      :title="title"
      :visible="visible"
      :width="dialogWidth"
      @close="handlClose"
      v-if="visible"
    >
      <ele-steps
        :active="currentStep"
        :steps="['上传文件', '确认数据', '完成']"
        :stepsAttrs="{
          'align-center': true
        }"
      />
      <!-- 下载模板 -->

      <!-- 上传Excel -->
      <ele-import-upload
        :fields="fields"
        :tips="tips"
        @upload="handleUpload"
        v-if="currentStep === 1"
      />

      <!-- 数据展示 -->
      <ele-import-data
        :fields="fields"
        :formatter="formatter"
        :request-fn="requestFn"
        :rules="rules"
        :table-data="tableData"
        @pre="handleStep3Pre"
        v-if="currentStep === 2"
      />

      <!-- 导入结束 -->
      <ele-import-finish @finish="handleFinish" v-if="currentStep === 3" />
    </el-dialog>
  </div>
</template>

<script>
import EleSteps from 'vue-ele-steps'

import EleImportUpload from '../../components/excel/EleImportUpload'
import EleImportData from '../../components/excel/EleImportData'
import EleImportFinish from '../../components/excel/EleImportFinish'

export default {
  name: 'ExImport',
  props: {


    // 请求方法
    requestFn: {
      type: Function,
      required: true
    },
    // 导入字段
    fields: {
      type: Object,
      required: true
    },
    // 是否显示弹窗
    visible: {
      type: Boolean,
      required: true
    },
    // 标题
    title: {
      type: String,
      default: '批量导入书单'
    },


    // 提示信息，数组
    tips: Array,
    // 验证规则
    rules: Object,
    // 格式化数据

    // 弹窗宽度
    dialogWidth: {
      type: String,
      default: '80%'
    }
  },
  components: {
    EleSteps,
    EleImportData,
    EleImportUpload,
    EleImportFinish,

  },
  provide() {
    return {
      goPre: this.preStep,
      goNext: this.nextStep
    }
  },
  data() {
    return {
      tableData: [],
      columns: [],
      currentStep: 1
    }
  },
  methods: {
    // 上传
    handleUpload(columns, tableData) {
      this.columns = columns
      this.tableData = tableData
    },
    // 初始化数据
    initData() {
      this.tableData = []
      this.columns = []
      this.currentStep = 1
    },
    // 关闭
    handlClose() {
      this.initData()
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    // 结束
    handleFinish() {
      this.handlClose()
      this.$emit('finish')
    },
    // 下一步
    nextStep() {
      this.currentStep++
    },
    // 上一步
    preStep() {
      this.currentStep--
    },
    // 第3步 -> 第2步
    handleStep3Pre() {
      this.tableData = []
      this.columns = []
      this.preStep()
    }
  },
  mounted() { }
}
</script>

<style>
.ele-import-action {
  margin-top: 20px;
  text-align: center;
}
</style>
