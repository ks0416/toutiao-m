<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfile"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
        placeholder="请输入昵称"
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>

import { updateUserRinfo } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfile () {
      this.$toast.loading({
        message: '保存中。。。',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName

        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await updateUserRinfo({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹层、
        this.$emit('close')
        // 成功提示
        this.$toast.success('更新成功')

        console.log(data)
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 20px;
}
</style>
