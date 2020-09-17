import axios from 'axios'
import router from './router'
import {getToken,setToken} from './auth'


// const baseUrl = process.env.BASE_API_ROOT;
// axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000



axios.interceptors.request.use(
  config => {
    if (getToken()) {
      config.header.Authorrization = getToken()
    }
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.header['token'] ){
      setToken(response.header['token'])
    }
  if (response.status === 401 || res.status === 40101) {
    router.push({
      path:"/manhour"
    });
  }
  if (res.status === 40301) {
    Notification({
      title:"提示",
      message:"token過期，請重新登陸！",
      type:"warning",
      duration:3500
      
    })
    if (process.env.BASE_AUTO_LOGIN) {
      router.push({
        path:"/manhour"
      });
    } else{
      window.location.href = process.env.BASE_AUTO_LOGIN;
    }
    return Promise.reject("error")
  }
  if (res.status === 40001) {
    Notification({
      title:"提示",
      message:"賬號或密碼錯誤！",
      type:"warning",
      duration:2500
      
    });
    return Promise.reject("error")         
  }
  if (response.status !== 200 && res.status !== 200) {
   Message({      
      message:res.message,
      type:"error",
      duration:5 * 1000
      
    });            
  }else{
    return response;
  }
  if (res.status === 50001) {
    Notification({
      title:"提示",
      message:res.message,
      type:"warning",
      duration:2500
      
    });       
  }else{
    return response;
  }
  
}, function(error) {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Notification({
      title:"提示",
      message:"請求超時15000！",
      type:"warning",
      duration:2500
      
    });
    setTimeout(function(){
      location.reload();
    },300)
  }
  if (error && error.response) {
    if (error.response.status === 401) {
      window,location.href = process.env.BASE_AUTO_LOGIN;
    }
    if (error.response.status === 403) {
      router.push({
        path:"/error/403"
      });
    }
    if (error.response.status === 403) {
      router.push({
        path:"/error/404"
      });
    }
  } else {
    window.location.href = process.env.BASE_AUTO_LOGIN;
  }
  return Promise.reject(error);
});
export const POST = (url, params) => {
  return axios.post(process.env.BASE_API_ROOT + '${url}',params).then(res => res,data)
}

export const GET = (url, params) => {
  return axios.post(process.env.BASE_API_ROOT + '${url}' + '?time' + new Date().getTime(),{params:params
    }).then(res => res,data)
}

export const PUT = (url, params) => {
  return axios.put(process.env.BASE_API_ROOT + '${url}' ,params
    ).then(res => res,data)
}

export const DELETE = (url, params) => {
  return axios.delete(process.env.BASE_API_ROOT + '${url}' ,{params:params
  }).then(res => res,data)
}

export const PATCH = (url, params) => {
  return axios.patch(process.env.BASE_API_ROOT + '${url}' ,params
  ).then(res => res,data)
}