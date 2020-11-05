
// 评论请求模块

import request from '@/utils/request'

// 获取文章评论列表
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 对文章评论点赞
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞na
export const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`

  })
}
// 发布文章评论或回复评论
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
