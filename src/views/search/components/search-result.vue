<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="加载失败 点击重试"
    >
      <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>

import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 获取数据
      try {
        const { data } = await getSearchResult({
          page: this.page, // 页数
          per_page: this.perpage, // 每页数量
          q: this.searchText // 搜素关键字
        })
        // console.log(data)
        // 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)

        // 将本次加载中的 loading关闭
        this.loading = false

        // 判断是否有数据
        if (results.length) {
          // 如果有则更新下一页
          this.page++
        } else {
          // 如果没有  则将加载状态 finished 设置为true
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        // 展示加载失败的提示
        this.error = true

        this.loading = false
      }
    }
  }
}

</script>

<style lang="less" scoped>
</style>
