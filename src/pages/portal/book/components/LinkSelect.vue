<template>
  <el-input
    :placeholder="changePlaceholder"
    v-model="filterInput"
    width="250"
    clearable
    @keyup.enter.native="filterSearch"
  >
    <div slot="prepend" class="select-type">
      <el-select v-model="searchKey" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-button slot="append" icon="el-icon-search" @click.prevent="filterSearch"></el-button>
  </el-input>
</template>

<script>
export default {
  name: 'LinkSelect',
  props: {
  },
  data() {
    return {
      changePlaceholder: '请输入关键字搜索',
      filterInput: '',
      searchKey: 0,
      options: [{
        value: 0,
        label: '关键字'
      },
      {
        value: 1,
        label: '书名'
      },
      {
        value: 2,
        label: '类型'
      },
      {
        value: 3,
        label: '作者名'
      }, {
        value: 4,
        label: '出版社'
      }
      ]
    }
  },
  methods: {
    filterSearch() {
      this.$emit('search', this.filterInput, this.searchKey)
    }
  },
  watch: {
    searchKey: function (newVal) {
      let word = ''
      this.options.forEach((element) => {
        if (element.value === newVal) {
          word = element.label
        }
      })
      this.changePlaceholder = '请输入' + word + '搜索'
    }
  }
}
</script>

<style>
</style>
