'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API_ROOT: '"http://10.1.202.77:8765/"',
  BASE_API_ROOT: '"http://10.1.245.194:8765/"',
})
