/* 封装 axios 请求模块  */

import axios from 'axios'
import store from '@/store'

import JSONBig from 'json-bigint'

// json.parse()   把json格式的字符串转为javascript对象

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径

  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
    // axios 默认会在内部这样来处理后端返回的数据
  }]
})

// 请求拦截器

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器

export default request
