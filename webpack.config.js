
// 给后面的来复习知识的自己，如果在开发中你发现了你下载了对应文件的loader，并且也use中添加了，但是webpack还是报错，
// 这时你最好先检查一下上面test属性写的正则表达式或者字符串，是否填写了多余的空格

const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")


// webpack中的配置信息都应该卸载moudule.exports中
module.exports = {
  mode:"development", // 指定打包是什么模式 开发还是生产
  // 指定入口文件
  entry:"./src/index.ts",

  // 指定打包后的文件位置
  output:{
    // 指定打包文件的目录
    path:path.resolve(__dirname,"dist"),
    // 打包后的文件叫什么名字
    filename:"bundle.js" , 
    environment:{   // 配置打包的环境  --告诉webpack不使用箭头函数（webpack不想兼容ie浏览器，因此很大程度上函数都用的箭头函数（ie不支持））
      arrowFunction:false,
      const:false  // 表示webpack在打包时不适用const声明变量
    }
  },
  

  // 指定webpack打包时要使用的模块
  module:{
    // 由于项目中文件很多，图片资源，sass，less，等等 需要指定各种加载规则
    rules:[
      {
        // test 指定的是规则生效的文件
        test:/\.ts$/, // 匹配所有ts文件
        use:[  // 配置加载器  可以是一个数组（多加载器·）或一个字符串（一个加载器）。数组的值可以是一个对象（某加载器的单独配置），也可是一个字符串（加载器名）

          // 配置babel
          {
            // 指定加载器
            loader:'babel-loader',
            // 设置babel
            options:{   
              // 设置预定义的环境（运行环境）
              presets:[
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets:{  // 表示代码运行在浏览器的版本，兼容目标浏览器
                      "chrome":"68",
                      "ie":'11'
                    },
                    // 指定corejs版本
                    "corejs":"3",
                    // 使用corejs的方法  usage 表示按需加载   
                    "useBuiltIns":"usage" 
                  }
                ]
              ]
            }

          },
          'ts-loader'] ,
        exclude:/node_modules/  // node_module 文件夹中的ts文件不需要加载
      },
      // 设置less文件的处理
      {
        test:/\.less$/,
        use:[
          "style-loader",
          "css-loader",
          // 引入postcss-loader
          {
            loader:"postcss-loader",
            options:{
              postcssOptions:{
                plugins:[
                  [
                    "postcss-preset-env",  // 配置css预处理环境
                    {
                      browsers:'last 2 version'    // 浏览器兼容版本——此处是每种浏览器最新的两个版本
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test:/\.(jpe?g|png|gif|svg)$/i,
        use: 'img-loader'
      }
    ]

  },
  // 配置webpack的插件
  plugins:[
    new CleanWebpackPlugin(), // 清除旧dist文件夹下的文件
    new HtmlWebpackPlugin({   
      title:"自定义title", // 用于设置插件生成网页的title，
      template:"./src/index.html"          // template字段表示以该html为模板进行打包
    }),
  ],
  // 用来设置引用模块  即设置哪些文件可以被引入，由于webpack默认不支持ts模块直接引入 
  resolve:{
    extensions:['.ts','.js']  // 允许以ts。js的文件可以被模块引入  必需
  }
}