<template>
  <div class="user-finfo">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->

    <!-- 个人信息 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    >

    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        class="avatar"
        fit="cover"
        :src="user.photo"
        round
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow=true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ?'男':'女'"
      is-link
      @click="isUpdateGenderShow=true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow=true"
    ></van-cell>
    <!-- 个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height:100%;"
      position="bottom"
    >
      <update-name
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow=false"
      />
    </van-popup>
    <!-- 编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow=false"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhoroShow"
      position="bottom"
      :style="{
        height:'100%'
      }"
    >
      <update-photo
        v-if="isUpdatePhoroShow"
        :img="img"
        @close="isUpdatePhoroShow=false"
        @update-photo="user.photo=$event"
      />
    </van-popup>
    <!-- 编辑头像 -->
  </div>
</template>

<script>

import { getUserRinfo } from '@/api/user'

import UpdateName from './components/update-name'

import UpdateGender from './components/update-gender'

import UpdateBirthday from './components/update-birthday'

import UpdatePhoto from './components/update-photo'

export default {
  name: 'UserRinfo',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {}, // 获取到的数据dx
      isUpdateNameShow: false, // 昵称弹层关闭显示

      isUpdateGenderShow: false, // 性别弹层关闭显示

      isUpdateBirthdayShow: false, // 生日弹层关闭显示

      isUpdatePhoroShow: false, // 头像弹层显示隐藏

      img: null // 默认为空
    }
  },
  // 周期函数
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      // console.log(12)
      try {
        const { data } = await getUserRinfo()

        // console.log(data)
        this.user = data.data
      } catch (err) {
        // console.log(err)
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // console.log(data)

      // 预览图片弹出框
      this.isUpdatePhoroShow = true

      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-finfo {
  .avatar {
    width: 70px;
    height: 70px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
