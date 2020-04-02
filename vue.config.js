const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const SentryPlugin = require("@sentry/webpack-plugin");

const needSourceMap = process.env.NODE_ENV !== "production";

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: needSourceMap,
  lintOnSave: true,

  chainWebpack: config => {
    if (process.env.NODE_ENV === "production" && needSourceMap) {
      config.plugin("sentry").use(SentryPlugin, [
        {
          ignore: ["node_modules"],
          include: "./dist", //上传dist文件的js
          release: "h5@0.1.0", //版本号
          // deleteAfterCompile: true,
          urlPrefix: "~" //cdn js的代码路径前缀
        }
      ]);
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    Object.assign(config, {
      // 开发生产共同配置
      optimization: {
        minimizer: [
          ...(!needSourceMap
            ? [
                new UglifyJsPlugin({
                  uglifyOptions: {
                    warnings: false,
                    compress: {
                      drop_console: true, //console
                      drop_debugger: false,
                      pure_funcs: ["console.log"] //移除console
                    }
                  }
                })
              ]
            : []),
          new OptimizeCSSPlugin({
            cssProcessorOptions: needSourceMap
              ? { safe: true, map: { inline: false } }
              : { safe: true }
          })
        ]
      }
    });
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: needSourceMap,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 75,
            propList: ["*"],
            mediaQuery: false, // 允许在媒体查询中转换px。
            exclude: "/node_modules/",
            minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
            selectorBlackList: ["weui", "mu"] // 忽略转换正则匹配项
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    disableHostCheck: true
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // proxy: {
    //     // 设置代理
    //     // proxy all requests starting with /api to jsonplaceholder
    //     'http://localhost:8080/': {
    //         target: 'http://baidu.com:8080', //真实请求的目标地址
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^http://localhost:8080/': ''
    //         }
    //     }
    // },
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/assets/css/common.less")]
    }
  }
};
