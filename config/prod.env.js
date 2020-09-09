'use strict'
let obj = {}
const target = process.env.npm_lifecycle_event;
if (target == 'test') {
  obj = {
    NODE_ENV: '"production"',
    BASE_API_ROOT: '"http://10.1.247.42:8765"',
  }
} else if (target == 'development') {
  obj = {
    NODE_ENV: '"production"',
    BASE_API_ROOT: '"http://10.1.202.77:8765"',
  }
} else {
  obj = {
    NODE_ENV: '"production"',
    BASE_API_ROOT: '"http://gateway.capol.cn:8090"',
  }
}

module.exports = obj;
