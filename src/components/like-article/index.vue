<template>

  <van-button
    :icon="value===1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value===1
    }"
    :loading="loading"
    @click="onCollect"
  />

</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeCrticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }

  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      let status = -1
      try {
        if (this.value === 1) {
          // 已点赞
          await deleteLike(this.articleId)
        } else {
          // 未点赞
          await addLike(this.articleId)

          status = 1
        }
        // 视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast('获取失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
::v-deep.liked {
  .van-icon {
    color: #ffa500;
  }
  .btn-item {
    margin: 0;
    padding: 0;
  }
}
</style>
