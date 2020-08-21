import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.timeout = 6000
axios.interceptors.request.use(config => {

    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(response => {
    return response
}, (error) => {
    // if (error.response.status == 401) {

    // }
    return Promise.reject(error);
})
export default axios
