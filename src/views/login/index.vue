<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登陆"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <!-- from表单 -->
    <van-form
      ref="loginForm"
      @submit="onSubmit"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i
          slot="left-icon"
          class="iconfont iconshouji"
        ></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="密码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i
          slot="left-icon"
          class="iconfont iconyanzhengma"
        ></i>

        <!-- button按钮 -->
        <template #button>
          <van-button
            v-if="isCountDownShow"
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
          >发送验证码</van-button>
          <!-- 倒计时组件 -->
          <van-count-down
            v-else
            slot="button"
            :time='1000*30'
            format="ss"
            @finish="isCountDownShow=true"
          />
        </template>

      </van-field>
      <div class="login-btn-wrap">
        <van-button
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { login, sendSms } from '../../api/user'
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码246810
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: true

    }
  },
  methods: {
    // 获取表单数据
    async onSubmit () {
      const user = this.user

      // 加载提示
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0 // 持续时间 toast
        // forbidClick: true
      })

      // 提交表单请求登陆
      try {
        const { data } = await login(user)

        // console.log('登录成功', res)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')

        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('登录失败', err)
          this.$toast.fail('登陆失败 请稍后重试')
        }
      }
    },
    async onSendSms () {
      // console.log('onSendSms')
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = false
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = true
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    // width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
