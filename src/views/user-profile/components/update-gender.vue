<template>
  <div class="update-gender">
    <van-picker
      title="请选择性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onpickerChange"
    />
  </div>
</template>

<script>
import { updateUserRinfo } from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中。。。',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const loaclGender = this.loaclGender

        const data = await updateUserRinfo({

          gender: loaclGender

        })
        console.log(data)
        // 更新视图
        this.$emit('input', loaclGender)
        // 关闭弹层、
        this.$emit('close')
        // 成功提示
        this.$toast.success('更新成功')

        // console.log(data)
      } catch (err) {
        this.$toast('更新失败')
      }
    },
    onpickerChange (picker, value, index) {
      this.localGender = index
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
