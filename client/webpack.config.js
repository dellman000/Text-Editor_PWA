const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.

const productionPlugins = [
  // new WorkboxPlugin.GenerateSW({
  //   // these options encourage the ServiceWorkers to get in there fast
  //   // and not allow any straggling "old" SWs to hang around
  //   clientsClaim: true,
  //   skipWaiting: true,
  // }),
  new WebpackPwaManifest({
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    background_color: '#ffffff',
    theme_color: '#ffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    ios: true,
    publicPath: '/',
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/images/logo.png'),
        size: '1024x1024' // you can also use the specifications pattern
      },
      {
        src: path.resolve('src/images/logo.png'),
        size: '1024x1024',
        purpose: 'maskable'
      }
    ]
  })

]


const plugins= [
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
        // destination: path.join('assets', 'icons'),
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
  }),
]

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
      ],
    },
  };
};
