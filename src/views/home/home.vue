<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/searc"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 平道列表 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
      title-active-color="#000000"
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list
          ref="article-list"
          :channel="channel"
        ></article-list>
        <!-- 文章列表 -->
      </van-tab>

      <div
        slot="nav-right"
        class="placeholder"
      ></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow=true"
      >
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >

      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'

import ArticleList from '../../components/article-list'

import ChannelEdit from '../../components/channel.edit'
import { mapState } from 'vuex'

import { getItem } from '../../utils/storage'

export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow: false // 控制编辑频道弹出层显示状态

    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取用户频道
    async loadChannels () {
      try {
        //
        // this.channels = data.data.channels
        // console.log(data)
        let channels = []

        if (this.user) {
          // 已登录 请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有拿来使用
          if (localChannels) {
            channels = localChannels
            // 没有 请求获取默认频道列表
          } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChennelEditShow = true) {
      // console.log(index)
      this.active = index
      // 编辑激活频道项

      // 关闭频道弹出层
      this.isChennelEditShow = false
    }
  }

}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  ::v-deep.channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 90px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82;
    }
    .van-tab {
      min-width: 200px;
      border-right: 2px solid #edeffe;
      // .van-tab__text {
      color: #777777;
      font-size: 30px;
      // }
      .van-tab--active {
        color: #000000;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      display: flex;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      justify-content: center;
      align-items: center;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
