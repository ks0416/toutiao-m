<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div
        slot="title"
        v-html="highlight(text)"
      ></div>
    </van-cell>
    <!-- 双花括号绑定会直接输出纯文本内容 -->
    <!-- <div>{{ htmlStr }}</div> -->

    <!-- 使用 v-html 指令可以绑定渲染带有 HTML 标签的字符串 -->
    <!-- <div v-html="htmlStr"></div> -->
  </div>
</template>
<script>

import { getSearchSuggestion } from '@/api/search'

import { debounce } from 'lodash'
export default {
  data () {
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  components: {

  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {

      // 当 searchText 发生改变的时候就会调用 handler 函数
      // 注意：handler 函数名称是固定的

      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        // console.log(value)
        this.loadSearchSuggestions(value)
      }, 1000),
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggestions (value) {
      try {
        const { data } = await getSearchSuggestion(value)
        // console.log('loadSearchSuggestions -> data', data)
        // console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`

      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep.search-suggestion {
  span.active {
    color: #ddaaee;
  }
  .van-search {
    position: absolute;
    top: 0;
  }
}
</style>
