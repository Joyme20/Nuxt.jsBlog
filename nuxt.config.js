module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'laomingming',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  css:[
    {src:'element-ui/lib/theme-chalk/index.css'}
  ],

  plugins: [
    {
      src:'~plugins/element-ui',
      ssr: false
      //  ssr本是false
    }
  ],


  /*
  ** Build configuration
  */
  build: {

    vendor: ['element-ui'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',
      {
        target: 'http://193.112.14.234:5000', // api主机
        // target: 'http://127.0.0.1:5000/',
        pathRewrite: { '^/api' : '/' },
        changeOrigin:true //跨域
      }
    ]
  ]


};
