import * as dd from 'dingtalk-jsapi';
import $api from "./http.js"

import {
  Toast
} from 'vant'
//import Vue from 'Vue'
//import axios from 'axios'

// Vue.prototype.axios = axios;
export function requestAuthCode(Fn) {
  if (dd.env.platform == "notInDingTalk") {
    Toast.fail("请用钉钉打开")
    return false
  }
  Toast({
    duration: 0,
    message: '自动登录中...',
    forbidClick: true,
  })
  dd.ready(function () {
    dd.runtime.permission.requestAuthCode({
      corpId: "dingd07ee0cdafea6efa",
      onSuccess: function (result) {
        $api.get(`/api/worktime/openApi/getToken/${result.code}`).then(res => {      
              
          Toast.clear();
          alert(res.data)        
          sessionStorage.setItem('userId',res.data);
          
          if(res.code !== 200){
            Toast.fail('can not get user info！')
          } 
          if (typeof Fn === 'function') {
            Fn()
          }
        }).catch(err => {
          Toast.fail('登录失败，请刷新页面！')
        })
      },
      onFail: function (err) {
        Toast.fail(err.errorMessage || '登录异常，请刷新页面！')
      }
    })

  })

  dd.error(function (error) {
    /**
     {
        errorMessage:"错误信息",// errorMessage 信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
        errorCode: "错误码"
     }
    **/
    alert('dd error: ' + JSON.stringify(error));
  });
}
