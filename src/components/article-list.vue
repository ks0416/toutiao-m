<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article,index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article,index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>

    </van-pull-refresh>

  </div>
</template>

<script>

import { getArticles } from '../api/article'
import ArticleItem from '../components/article-item/article'

export default {
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 储存列表数据的数组
      loading: false, // 控制加载中的loading
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页的时间戳
      error: false, // 控制列表加载失败提示状态
      isLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功'// 下拉刷新成功提示
    }
  },
  methods: {
    async onLoad () {
      // 请求数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 页码请求数据时间戳
          with_top: 1// 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        const { results } = data.data
        // 数组展开运算符 会吧数组元素一个一个拿出来
        this.list.push(...results)

        // 本次数据加载结束之后要把加载状态设为false
        this.loading = false

        // 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页的数据时间搓
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了将finished设置为true 不在load加载更多了
          this.finished = true
        }

        // console.log(data)
      } catch (err) {
        // 展示错误提示状态
        this.error = true

        // 请求失败 了 loading页需要关闭

        this.loading = false
      }
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      // 加载状态结束

      // 数据全部加载完成
    },
    // 下拉刷新会触发核函数
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 页码请求数据时间戳
          with_top: 1// 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 关闭下拉刷新的loading状态
        this.isLoading = false

        // 更新下拉刷新成功提示框
        this.refreshSuccessText = `刷新成功 更新了${results.length}条数据`
      } catch (err) {
        this.isLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }

  }
}

</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
