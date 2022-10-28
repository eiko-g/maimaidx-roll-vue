# 舞萌DX 抽歌网页

用 Vite 重新构建了捏，目前是 `pnpm + vite + vue3.x + pinia`，测试的时候速度嗖嗖的，爽。

虽然编译速度好像区别不太大。

[点击试用](https://roll.maimoe.in/maimaidx/)

## 歌曲封面

因为封面太多了所以就没加进 Git 里，有需要的请去 `public/assets/img/cover.png/readme.md` 里面看相关说明。

## 开发相关

如果没有装 `pnpm` 的话就先 `npm install -g pnpm`，速度比用 `npm` 要快。

推荐开发工具：[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) （记得禁用 Vetur）+ [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)，装完之后要开 [Takeover mode](https://staging-cn.vuejs.org/guide/typescript/overview.html#takeover-mode)。

默认路径为 `maimai.web/maimaidx`，如果需要部署在其他目录的请去 `vite.config.ts` 修改或注释。

安装：

```sh
pnpm install
```

开发：

```sh
pnpm dev
```

构建：

```sh
pnpm build
```

语法检查：

```sh
pnpm lint
```

## 后续计划

- [ ] 写个后端管理歌曲数据（万年坑）
- [ ] 给每首歌加各种备注信息
- [ ] [**重要**] 我要定数呜呜呜呜呜

首先要先把那个后端写出来了，嗯。

## 资料来源

- [maimai fc2 wiki](https://maimai.wiki.fc2.com/) （已挂）
- [maimaiDX Offcial](https://maimai.sega.jp/song/)
- [官方数据.json（日版）](https://maimai.sega.jp/data/maimai_songs.json)
- [maimai Fandom 中文维基](https://maimai.fandom.com/zh/wiki/Maimai%E4%B8%AD%E6%96%87_%E7%BB%B4%E5%9F%BA)
- [maimai Gamerch wiki（日文）](https://maimai.gamerch.com/)

## LICENSE

代码部分为 WTFPL，其他图片素材什么的为原作者所有