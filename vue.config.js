module.exports = {
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        console.log(args);
        args[0].title = "买买 DX 曲目抽奖页面";
        return args;
      })
  },
  publicPath: '/maimaidx'
}