import dayjs from 'dayjs'

import Vue from 'vue'

import relativeTime from 'dayjs/plugin/relativeTime'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 配置相对时间插件
dayjs.extend(relativeTime)

// 默认语言是英文我们在这配置为中文
dayjs.locale('zh-cn')// 全局使用

// console.log(dayjs().locale('zh-cn').format('YYYY-MM-DD')) // 当前实例使用
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
