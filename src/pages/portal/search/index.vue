<!--
 * @Author: liyan
 * @Date: 2019-07-24 10:14:12
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-25 16:22:30
 * @Description: file content
 -->
<template>
  <div class="search">
    <div class="search-wrapper">
      <div class="search-nav">
        <div class="search-nav-left"></div>
        <div class="search-nav-right">
          <ul>
            <li>
              <button>导出EXCRL表格</button>
            </li>
            <li>
              <button @click.prevent="showMask">导出二维码</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-content"></div>
      <div class="search-footer"></div>
    </div>
    <div class="mask" v-show="isShow">
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
  name: 'Search',
  data: () => ({
    isShow: false,
    qrcodeObject: {}
  }),
  mounted () {
    // 创建二维码dom结构，返回数据对象
    this.qrcode()
  },
  methods: {
    showMask () {
      let timestamp = Date.parse(new Date())
      console.log(timestamp.toString())
      // 创建二维码，填写相应 ip地址+时间戳
      this.qrcodeObject.makeCode('http://10.54.30.64:8080/#/attendance' + '#' + timestamp.toString())
      this.isShow = true
    },
    closeMask () {
      // 清除二维码
      this.qrcodeObject.clear()
      this.isShow = false
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
    }
  }
}
</script>

<style scoped>
.search {
  /* position: relative; */
  height: 100%;
  /* background: #ccc; */
}

.search-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 50px;
  background-color: #eee;
}

.search-nav-right ul {
  display: flex;
}

.search-nav-right li {
  height: 40px;
  line-height: 30px;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: #1698d5;
}

.search-nav-right li:first-child {
  margin: 0 20px 0 0;
}

.search-nav-right button {
  font-size: 12px;
  color: #fff;
  cursor: "pointer";
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
</style>
