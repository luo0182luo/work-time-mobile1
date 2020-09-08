import * as dd from 'dingtalk-jsapi';
import { Toast } from 'vant'
import Vue from 'Vue'

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
      corpId: 'dingd07ee0cdafea6efa',
      onSuccess: function (result) {
        Vue.prototype.$axios.get(`/api/dTalk/getUserId/${result.code}`).then(res => {
          Toast.clear();
          Vue.prototype.$userId = res.data.userId
          if (typeof Fn === 'function') {
            Fn()
          }
        }).catch(err => {
          Toast.clear();
          Toast.fail('登录失败，请刷新页面！')
        })
      },
      onFail: function (err) {
        Toast.clear();
        Toast.fail(err.errorMessage || '登录异常，请刷新页面！')
      }
    })
  })
}