<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div
        slot="title"
        class="title-text"
      >我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit=!isEdit"
      >{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <!-- 宫格 -->
    <van-grid
      class="my-grid"
      :gutter="10"
    >
      <van-grid-item
        v-for="(channel,index) in myChannels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(channel,index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        >

        </van-icon>
        <span
          class="text"
          slot="text"
          :class="{active: active===index}"
        >{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div
        slot="title"
        class="title-text"
      >频道推荐</div>
    </van-cell>
    <!-- 宫格 -->
    <van-grid
      :gutter="10"
      class="recommend-grid"
    >
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllchannels, addUserChannel, deleteUserChannel } from '../api/channel'

import { mapState } from 'vuex'

import { setItem } from '../utils/storage'

export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      // channels: [], // 所有数据
      allChannels: [], // 所有频道列表
      isEdit: false, // 控制编辑显示
      fiexChannels: [0]// 固定频道

    }
  },
  created () {
    this.loadAllchannels()
  },
  computed: {
    ...mapState(['user']),

    recommendChannels () {
      const channels = []

      this.allChannels.forEach(channel => {
        // 遍历
        const ret = this.myChannels.find(myChannels => {
          return myChannels.id === channel.id
        })

        // 如果我的频道中不包括此项 则收集到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }
  },
  methods: {

    // 获取数据
    async loadAllchannels () {
      try {
        const { data } = await getAllchannels()
        this.allChannels = data.data.channels
        // console.log(data)
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 添加频道
    onAddChannel (channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录把数据请求放到线上
          addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length// 序号
          })
        } catch {
          this.$toast('保存失败')
        }
      } else {
        // 未登录把数据储存到本地
        setItem('TOUTIAD_CHANNELS', this.myChannels)
      }
    },
    // 编辑
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态 执行删除频道

        // 如果固定频道 则不删除
        if (this.fiexChannels.includes(channel.id)) {

        }
        // 要删除元素的索引
        if (index <= this.active) {
          // 让激活频道索引
          this.$emit('update-active', this.active - 1, true)
        }
        // 持久化处理

        this.myChannels.splice(index, 1)
      } else {
        // 非编辑状态切换频道
        this.$emit('update-active', index)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
        // 已登录则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
        // 未登录保存到本地
          setItem('TOUTIAD_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败。请稍等重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
