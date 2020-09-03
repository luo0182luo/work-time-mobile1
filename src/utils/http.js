import axios from 'axios'
const baseUrl = process.env.BASE_API_ROOT;
axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
axios.defaults.timeout = 6000
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  if(response.data.success){
    return response.data
  }else{
    return Promise.reject(response.data);
  }
  
}, (error) => {
  // if (error.response.status == 401) {

  // }
  return Promise.reject(error);
})
export default axios
