<template>

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败 请点击重试"
    :immediate-check="false"
  >
    <comment-item
      v-for="(item,index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
    />
  </van-list>

</template>

<script>
import { getComment } from '@/api/comment'

import CommentItem from '@/views/components/comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }

  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据标记
      limit: 20,
      error: false
    }
  },
  created () {
    // 当你手动初始化onload 他不会自动开始初始化的loading
    // 所以我们要手动的开启初始化 loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    // 发起请求数据
    async onLoad () {
      try {
        const { data } = await getComment({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })

        // 2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        console.log(data)

        // 把文章评论总数传递到外部
        this.$emit('onload-success', data.data)

        // 3.将loading 设置为false
        this.loading = false

        // 4.判断是否还有数据
        if (results.length) {
          // 有就更新下一页数据
          this.offset = data.data.last_id
        } else {
          // 没有就finished设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true

        this.loading = false
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
