import request from '../utils/request.js'
// import { getUserInfo } from '@/api/user';
// import store from '../store'

/* 用户相关请求 */
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发起请求头数据
    // headers: {
    //   // 核接口需要授权
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'

  })
}
// 关注用户
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: { target }
  })
}
// 取消关注
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`

  })
}
// 获取用户个人信息
export const getUserRinfo = target => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 编辑用户资料
export const updateUserRinfo = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 更新用户照片资料
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
