module.exports = {
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        console.log(args);
        args[0].title = "买买 DX 曲目抽奖页面";
        return args;
      });
    // 排除封面文件夹
    // 开发时要注释掉，不然封面就显示异常了
    // https://stackoverflow.com/questions/61122635/vue-js-exclude-folders-from-webpack-bundle
    /*
    config.plugin("copy").tap(([options]) => {
      options[0].ignore.push("assets/img/cover.png/**");
      return [options];
    });
    */
  },
  publicPath: '/maimaidx'
}