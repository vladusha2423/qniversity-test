module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/style.scss";`,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          //        loader: 'pug-plain-loader',
          oneOf: [
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader'],
            },
            {
              use: ['raw-loader', 'pug-plain-loader'],
            },
          ],
        },
      ],
    },
  },
};
