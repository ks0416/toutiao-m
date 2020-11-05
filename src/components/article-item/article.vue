<template>

  <van-cell
    :to="`/article/${article.art_id}`"
    class="article-item"
  >
    <div
      slot="title"
      class="title"
    >
      {{article.title}}
    </div>
    <div slot="label">
      <div
        v-if="article.cover.type === 3"
        class="cover-wrap"
      >
        <div
          class="cover.item"
          v-for="(img,index) in article.cover.images"
          :key="index"
        >
          <van-image
            width="100"
            height="100"
            :src="img"
          />
        </div>
      </div>
      <div class="ys">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}</span>
        <span>{{article.pubdate | relativeTime}}</span>

      </div>
    </div>

    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      width="100"
      height="100"
      :src="article.cover.images[0]"
    />

  </van-cell>

</template>

<script>
import '../../utils/dayjs'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .van-cell__title {
    line-height: 100px;
    width: 270px;
    .ys {
      display: flex;
      width: 400px;
      margin-top: 20px;
    }
    .title {
      margin-bottom: 50px;
    }
  }
  .van-cell__value {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 170px;
    width: 272px;
    margin-top: 20px;
    margin-left: 100px;
    // padding-bottom: 20px;
  }
  .cover-wrap {
    display: flex;
    justify-content: space-between;
  }
}
</style>
