<template>
  <el-dialog title="书目详情" :visible="visible" @close="handlClose" v-if="visible">
    <el-form :rowData="rowData" class="detail-box">
      <div class="detail-content">
        <div class="detail-content-left">
          <el-form-item>
            <div>
              <p>书籍名称:</p>
              <span>{{detailData.bookName}}</span>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <p>作者:</p>
              <span>{{detailData.author}}</span>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <p>出版社:</p>
              <span>{{detailData.publisher}}</span>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <p>出版日期:</p>
              <span>{{detailData.pubDate}}</span>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <p>ISBN:</p>
              <span>{{detailData.isbn}}</span>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <p>页数:</p>
              <span>{{detailData.page}}</span>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <p>类型:</p>
              <span>{{detailData.type}}</span>
            </div>
          </el-form-item>
        </div>
        <div class="detail-content-right">
          <div class="flex-column">
            <p>描述:</p>
            <h1>{{detailData.description}}</h1>
          </div>
        </div>
      </div>
      <div class="detail-footer">
        <el-form-item>
          <div>
            <p>库藏数量:</p>
            <span>{{detailData.totalNum}}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <p>待还数量:</p>
            <span>{{detailData.outNum}}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <p>可借数量:</p>
            <span>{{detailData.haveNum}}</span>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: 'BookDetail',
  props: {
    rowData: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    rowData: function (newVal, oldVal) {
      let { bookName, author, publisher, pubDate, isbn, page, type, description, totalNum, outNum, haveNum } = newVal
      this.detailData = { bookName, author, publisher, pubDate, isbn, page, type, description, totalNum, outNum, haveNum };
    }  },
  data() {
    return {
      detailData: this.rowData,
    }
  },
  methods: {
    handlClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
  }
}
</script>
