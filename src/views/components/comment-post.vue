<template>

  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>

import { addComment } from '@/api/comment.js'

export default {
  name: 'CommnetPost',

  components: {},
  inject: {
    article_id: {
      type: [Number, String, Object],
      required: null
    }
  },

  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论目标id

          content: this.message, // 评论的内容

          art_id: this.article_id ? this.article_id.toString() : this.article_id // 对文章进行评论，不要传此参数
        })
        // console.log(data)

        this.message = '' // 清空文本
        this.$emit('post-success', data.data)
      } catch (err) {
        this.$toast('失败信息')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
