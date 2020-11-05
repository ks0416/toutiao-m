<template>
  <van-button
    v-if="isfollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
  >已关注</van-button>

  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
  >关注</van-button>
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  model: {
    prop: 'isfollowed', // 默认是value
    event: 'update-is_followed' // 默认是input
  },
  data () {
    return {
      loading: false
    }
  },
  props: {
    isfollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    // 请求数据
    async onFollow () {
      this.loading = true // 启用、loading
      try {
        // 已关注  取消关注
        if (this.isfollowed) {
          await deleteFollow(this.userId)
        } else {
          // 未关注 新增关注
          await addFollow(this.userId)
        }
        // this.article.is_followed = !this.article.is_followed

        // 更新视图
        this.$emit('update-is_followed', !this.isfollowed)
      } catch (err) {
        let message = '操作失败'

        if (err.response && err.response.status === 400) {
          message = '不能关注自己'

          this.$toast(message)
        }
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
