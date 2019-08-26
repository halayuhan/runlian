// 定义混入对象
export const beforeUploadCover = {
  methods: {
    beforeUploadCover (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传封面图片只能是JPG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过2MB!')
      }

      return isJPG && isLt2M
    }
  }
}
