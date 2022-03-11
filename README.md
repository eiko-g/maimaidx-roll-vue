# 舞萌DX Roll 歌网页 Vue 版

嗨呀，虽然原生 JavaScript 跑起来很快写起来很爽，但是扩展性还是稍微弱了点，所以就换成了 Vue.js 来写啦。

[点击试用](https://roll.maimoe.in/maimaidx/)

---

## 工作流程

旧版是先筛符合抽歌要求的歌曲，再抽某首歌，如果有多个难度都符合要求再抽难度。但是觉得这样不太对，所以这次就改了个新流程：

0. 给每首歌分配个 ID，因为我没拿到官方的 ID
1. 筛一遍分类
2. 筛一遍版本
3. 遍历剩下的歌，看对应的难度的等级合不合要求
4. 最后输出 `[{id: "歌曲 ID",rank:"对应难度",preview:{...预览信息}}]`

总之这样应该比以前的方式公平点，毕竟 EmpError 这种也是在 14+ 占了两个位置的嘛。

## 歌曲封面

因为封面太多了所以就没加进 Git 里，有需要的请去 `public/assets/img/cover.png` 里面看相关说明。

## How to 开发

就是 Vue 那一套啦，什么 `npm run serve` 什么 `npm run build` 之类的。

默认路径是 `maimai.web/maimaidx`，需要放其他地方的请自己改改 `vue.config.js` 里面的设置。

## 后续计划

- 写个后端管理歌曲数据（万年坑）
- 给每首歌加各种备注信息

首先要先把那个后端写出来了，嗯。

## 资料来源

- [maimai fc2 wiki](https://maimai.wiki.fc2.com/)
- [maimaiDX Offcial](https://maimai.sega.jp/song/)
- [官方数据.json（日版）](https://maimai.sega.jp/data/maimai_songs.json)
- [maimai Fandom 中文维基](https://maimai.fandom.com/zh/wiki/Maimai%E4%B8%AD%E6%96%87_%E7%BB%B4%E5%9F%BA)

## LICENSE

WTFPL