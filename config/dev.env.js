/*
 * @Author: liyan
 * @Date: 2019-07-23 14:44:06
 * @LastEditors: liyan
 * @LastEditTime: 2019-08-06 14:26:57
 * @Description: file content
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://10.0.58.22:8080"'
})
