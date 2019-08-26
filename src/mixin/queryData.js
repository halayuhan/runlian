export default {
  data () {
    return {
      tableData: [],
      filterInput: '',
      currentPage: 1,
      pageSize: 10,
      selectType: 0,
      sortFlag: 0
    }
  },
  methods: {
    created () {
      this.initData()
    },
    getParams (paramsData = {}) {
      const defaultParams = {
        isExist: 0,
        keyword: this.filterInput.trim(),
        page: this.currentPage,
        pageSize: this.pageSize,
        sign: this.selectType,
        sortFlag: this.sortFlag
      }
      return Object.assign({}, defaultParams, paramsData)
    },
    initData() {
      this.loadData()
    },
    loadData(paramsData = {}) {    
    }
  }
}
