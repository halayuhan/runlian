<!--
 * @Author: todo
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-07-23 14:55:48
 * @Description: file content
 -->
<template>
  <div id="app">
    <header class="header">
      <h1>Linksoul读书会签到表</h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({ })
}
</script>

<style>
body,
header,
footer,
section,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
form,
input,
button,
select,
textarea,
p,
th,
td,
a {
  margin: 0;
  padding: 0;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
}

i,
em {
  font-style: normal;
}

body,
html,
#app {
  height: 100%;
}

body {
  background: #fff;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  /* overflow: hidden; */
  cursor: default;
}

h1,
h2,
h3 {
  font-weight: bold;
}

ul,
ol {
  list-style: none;
}

img {
  border: none;
  vertical-align: bottom;
}

a,
a:hover {
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

a:hover {
  color: #ff6f4b;
}

.a-reverse {
  color: #ff6f4b;
}

.a-reverse:hover {
  text-decoration: none;
}

.a-highlight {
  color: #1890ff;
}

.a-highlight:hover {
  color: #a3d3ff;
}

input,
button {
  border: none;
  outline: none;
  background: transparent;
}

button {
  cursor: pointer;
}

input[type="text"]::-ms-clear {
  display: none;
}

.cfx::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.cut {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.show {
  display: block;
}

.hide {
  display: none;
}

.break {
  word-wrap: break-word;
  word-break: break-all;
}

input::-webkit-input-placeholder {
  color: #b6b6b6 !important;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #b6b6b6 !important;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #b6b6b6 !important;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #b6b6b6 !important;
}

/* 自定义样式 */
.header {
  padding: 0 10px;
  background-color: #74bb92;
}
h1 {
  /* width: 390px; */
  height: 60px;
  /* margin: 0 auto; */
  line-height: 60px;
  font-size: 20px;
}
</style>
