const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:(config) => {
    //添加配置  检测glsl文件  使用webpack-glsl-loader加载器 需要npm install webpack-glsl-loader --save-dev
    config.module.rules.push({
      test:/\.glsl$/,
      use:[{
        loader:'webpack-glsl-loader'
      }]
    })
  }
})
