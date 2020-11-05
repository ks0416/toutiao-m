<template>
  <div class="update-photo">
    <img
      :src="img"
      class="update"
      ref="img"
    >
    <div class="toolbar">
      <div
        class="cancel"
        @click="$emit('close')"
      >取消</div>
      <div
        class="confirm"
        @click="onConfirm"
      >确认</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'

import Cropper from 'cropperjs'

import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null

    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true

    })
  },
  methods: {
    onConfirm () {
      // 基于服务端裁剪 getDdate 方法获取截取参数
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob)
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中。。。',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 如果是接口要求 content-Type 是multipart/form-data
      // 则必须传递formData 对象
        const formData = new FormData()

        formData.append('photo', blob)

        const { data } = await updateUserPhoto(formData)

        // 关闭弹层
        this.$emit('close')

        // 更新视图
        this.$emit('update-photo', data.data.photo)

        // 提示成功
        this.$toast.success('更新成功')
      } catch {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin: 13px 15px;
    font-size: 30px;
  }
}

.update {
  display: block;
  max-width: 100%;
}
</style>
