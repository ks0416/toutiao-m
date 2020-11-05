<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onBirthday"
    />
  </div>
</template>

<script>

import { updateUserRinfo } from '@/api/user'

import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onBirthday () {
      this.$toast.loading({
        message: '保存中。。。',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')

        const data = await updateUserRinfo({

          birthday: currentDate

        })
        console.log(data)
        // 更新视图
        this.$emit('input', currentDate)
        // 关闭弹层、
        this.$emit('close')
        // 成功提示
        this.$toast.success('更新成功')

        // console.log(data)
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
