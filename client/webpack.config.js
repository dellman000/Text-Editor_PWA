const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { Generator } = require('webpack');
const is_prod = process.env.NODE_ENV==='production'
// const WorkboxPlugin = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.




const productionPlugins= [
  new InjectManifest({
    swSrc: './src-sw.js',
    swDest: 'service-worker.js',
  }),
  new WebpackPwaManifest({
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    background_color: '#ffffff',
    theme_color: '#2196F3',
    icons: [
      {
        src: path.resolve('./src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons'),
        filename:'icon_96x96.png'
      },
    ],
  }),

]
const plugins=[new HtmlWebpackPlugin({
  template: './index.html'
})]
if(is_prod){
  plugins.push(...productionPlugins)
}

// const plugins = [
// //   new HtmlWebpackPlugin({
// //   template: './index.html'
// // }),
// new InjectManifest({
//   swSrc: './src/sw.js',
// }),

// ]

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
          ],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        },
        {
          test: /\.(png|svg|jpg)$/,
          // exclude: /node_modules/,
          type:'asset/resorces',
          generator:{
            filename:'assets/[name].[hash][ext]'
          }
        }
      ],
    },

    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 8888,
      // proxy:[{
      //   context:['/'],
      //   target:'http://localhost:3000',
      //   secure:false
      // }],
      watchFiles: {
        paths: ['./index.html']
      }
    }
  };
};
