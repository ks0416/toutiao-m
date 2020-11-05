
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div
        v-if="loading"
        class="loading-wrap"
      >
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div
        v-else-if="article.title"
        class="article-detail"
      >
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell
          class="user-info"
          center
          :border="false"
        >
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div
            slot="title"
            class="user-name"
          >{{article.aut_name}}</div>
          <div
            slot="label"
            class="publish-date"
          >{{article.pubdate | relativeTime}}</div>

          <follow-user
            class="follow-btn"
            :user-id="article.aut_id"
            v-model="article.is_followed"
          />

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论列表 -->
        <comment-list
          :source="article.art_id"
          :list="commentList"
          @onload-success="totalCommentCount = $event.total_count"
          @reply-click="onReplyClick"
        />

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostCommentShow=true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :badge="totalCommentCount"
            color="#777"
          />
          <collet-article
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          />

          <like-crticle
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          />

          <van-icon
            name="share"
            color="#777777"
          ></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 评论弹出层 -->
        <van-popup
          v-model="isPostCommentShow"
          closeable
          position="bottom"
        >
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          />
        </van-popup>
        <!-- 评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div
        v-else-if="errStatus===404"
        class="error-wrap"
      >
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div
        v-else
        class="error-wrap"
      >
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button
          @click="loadArticle"
          class="retry-btn"
        >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        :comment="currentComment"
        v-if="isReplyShow"
      />
    </van-popup>
    <!-- 评论回复 -->
  </div>
</template>

<script>

import { getArticleById } from '@/api/article'

import { ImagePreview } from 'vant'

import './github-markdown.css'

import FollowUser from '@/components/follow-user/index' // 组件封装 关注

import ColletArticle from '@/components/collet-article/index'

import LikeCrticle from '@/components/like-article/index'

import CommentList from '@/views/components/comment-list'

import CommentPost from '@/views/components/comment-post'

import CommentReply from '@/views/components/comment-reply'
export default {
  name: 'articleDelete',
  props: {
    article_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    FollowUser,
    ColletArticle,
    LikeCrticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  // 给所有的后代提供数据
  provide: function () {
    return {
      article_id: this.article_id
    }
  },
  // 周期函数
  created () {
    this.loadArticle()
  },
  data () {
    return {
      article: {}, // 所有数据
      loading: true, // 控制loading关闭开启状态
      errStatus: 0,
      followLoading: false, // 默认loading关闭
      totalCommentCount: 0,
      isPostCommentShow: false, // 评论弹出层显示影藏
      commentList: [], // 评论列表
      isReplyShow: false,
      currentComment: {}// 点击回复评论项
    }
  },
  methods: {
    // 请求数据
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.article_id)

        this.article = data.data
        // console.log(data)

        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)

        // 请求数据成功关闭loading
        this.loading = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取文章失败')
      }
    },
    // 预览图片
    previewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)

        img.onclick = () => {
          ImagePreview({
            images,
            // 索引
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      // 关闭弹出层
      this.isPostCommentShow = false
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    // 回复评论
    onReplyClick (comment) {
      // console.log(comment)
      this.currentComment = comment
      // 显示回复弹出层
      this.isReplyShow = true
    }

  }
}
</script>

<style lang="less" scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    ::v-deep.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
