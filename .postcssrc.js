// // 配置postCss文件
// module.exports = {
//   plugins: {
//     // 配置autoprefixer生成浏览器css样式前缀
//     // autoprefixer: {
//     //   browsers: ['Android >= 4.0', 'iOS >= 8'],
//     // },
//     // 将px转换为rem
//     'postcss-pxtorem': {
//       // 假设设计稿750 /10=75  如果是vant就在除2
//       // 如果是我们自己css样式 则按75
//       // rootValue支持两种方式
//       // 数字：固定数值
//       // 函数：动态处理返回
//       rootValue ({ fiel }) {
//         return fiel.indexOf('vant') !== -1 ? 37.5 : 75
//       },
//       // *表示转换所有px
//       propList: ['*']
//     }
//   }
// }

module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    // 'autoprefixer': { // autoprefixer 插件的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],


      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}