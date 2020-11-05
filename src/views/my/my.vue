<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div
      v-if="user"
      class="user-info"
    >
      <!-- 头像 -->
      <div class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
              class="avatar"
              src="photo"
              round
              fit="cover"
            />
            <span class="name">{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button
              size="mini"
              round
              to="/user/profile"
            >编辑资料</van-button>
          </div>
        </div>
        <!-- 关注粉丝 -->
        <div class="data-stats">
          <div class="data-itme">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-itme">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-itme">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-itme">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">点赞</span>
          </div>
        </div>

      </div>
    </div>
    <!-- 已登录 -->
    <!-- 未登录头部 -->
    <div
      v-else
      class="header not-login"
    >
      <div class="login-btn">
        <img
          class="mobile-img"
          src="~@/assets/mobile.png"
          @click="$router.push('/login')"
        >
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录头部 -->

    <!-- 导航 -->
    <van-grid
      class="grid-nav"
      :column-num="2"
      clickable
    >
      <van-grid-item>
        <i
          slot="icon"
          class="iconfont iconshoucang"
        ></i>
        <span
          slot="text"
          class="text"
        >收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i
          slot="icon"
          class="iconfont iconlishi"
        ></i>
        <span
          class="text"
          slot="text"
        >历史</span>
      </van-grid-item>

    </van-grid>

    <van-cell
      title="消息通知"
      is-link
    />
    <van-cell
      class="mb-9"
      title="小爱同学"
    />
    <van-cell
      v-if="user"
      clickable
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  data () {
    return {
      userInfo: {}// 用户信息
    }
  },
  // 周期函数
  created () {
    // 如果用户登录了  则请求加载用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '确定退出？'

      }).then(() => {
        // on confirm
        this.$store.commit('setUser', null)
        this.$toast('退出成功')
      }).catch(() => {
        this.$toast('取消退出')
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败 请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    // display: flex;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 30px;
      color: #fff;
    }
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .user-info {
    .base-info {
      // width: 100px;
      height: 231px;

      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 24px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // width: 100px;
      // height: 130px;
      // background-color: #ccc;
      display: flex;
      .data-itme {
        height: 130px;
        flex: 1;
        display: flex;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 36px;
          color: #fff;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    font-size: 30px;

    .iconfont {
      font-size: 45px;
      color: #eb5253;
    }
    .iconlishi:before {
      color: #ff9d1d;
    }
  }
  .logout-cell {
    text-align: center;
    margin-top: 15px;
    font-size: 30px;
    color: #d8626d;
  }
}
</style>
