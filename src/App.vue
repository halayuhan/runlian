<!--
 * @Author: todo
 * @Date: 2019-07-22 15:30:40
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-02 11:39:24
 * @Description: file content
 -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({})
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

/* 更改默认样式 */
.el-button--primary {
  color: #fff;
  background-color: #5caaab;
  border-color: #5caaab;
}
.el-button--primary:hover {
  background-color: #5caaab;
  border-color: #5caaab;
}
.el-button--primary:focus {
  background-color: #5caaab;
  border-color: #5caaab;
}
.el-button:focus,
.el-button:hover {
  color: #fff;
  border-color: #5caaab;
  background-color: #5caaab;
}

.el-button--warning {
  color: #fff;
  background-color: #ee9e25;
  border-color: #ee9e25;
}
.el-button--warning:hover {
  background-color: #ee9e25;
  border-color: #ee9e25;
}
.el-button--warning:focus {
  background-color: #ee9e25;
  border-color: #ee9e25;
}

.el-button--success {
  color: #fff;
  background-color: #68a8ea;
  border-color: #68a8ea;
}
.el-button--success:hover {
  background-color: #68a8ea;
  border-color: #68a8ea;
}
.el-button--success:focus {
  background-color: #68a8ea;
  border-color: #68a8ea;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #5caaab;
  color: #fff;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
  background-color: #5caaab;
  color: #fff;
}
.el-select-dropdown__item.selected {
  color: #5caaab;
}
.el-date-table td.current:not(.disabled) span {
  background-color: #5caaab;
}
.el-date-table td.available:hover {
  color: #5caaab;
}
.el-picker-panel__shortcut:hover {
  color: #5caaab;
}
.el-date-picker__header-label.active,
.el-date-picker__header-label:hover {
  color: #5caaab;
}
/* .el-pagination .el-input__inner:hover {
  border-color: #5caaab;
} */

.el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: #5caaab;
}

.el-input__inner:hover {
  border-color: #5caaab;
}
</style>
