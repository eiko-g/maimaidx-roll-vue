/**
 * 输入原歌单和设置，然后一通操作后输出筛选后的歌单列表
 * 输出的格式为 [{id:"歌曲 ID",rank:"符合抽歌要求的难度"}]
 * @param {Array} songlist
 * @param {Object} inputSetting
 * @returns {Array}
 */

import type ISetting from "@/interface/ISetting";
import type ISong from "@/interface/ISong";

interface ISongPreview {
  id: number;
  rank: string;
  preview: {
    name: string;
    rank: string;
    lv: number | string;
  };
}

export default function songFilter(
  songlist: Array<ISong>,
  inputSetting: ISetting
) {
  console.log("开始筛歌");
  console.time("筛歌计时器");
  if (!inputSetting || Object.keys(inputSetting).length === 0) {
    console.error("筛歌函数没有加载到设置，代码写炸了");
    return {};
  }
  console.log("输入进来的设置：", inputSetting);

  let setting = inputSetting,
    tempSongList = songlist,
    output: Array<ISongPreview> = [];

  console.log("筛歌时的设置", setting);

  // 如果难度是 all 则全部难度塞进去
  if (setting.rank.includes("all")) {
    setting.rank = ["B", "A", "E", "M", "R"];
  }

  // 先筛分类
  if (setting.category[0] !== "all") {
    tempSongList = songlist.filter((item: ISong) => {
      return setting.category.includes(item.分类);
    });
  }

  console.log("筛了分类的歌单：", tempSongList);

  // 再筛版本
  if (setting.version[0] !== "all") {
    tempSongList = tempSongList.filter((item) => {
      return setting.version.includes(item.版本);
    });
  }

  console.log("筛了版本的歌单：", tempSongList);

  //#region 筛歌过程
  // 为了保证筛歌过程都是字符串，呕
  setting.lvMin = setting.lvMin.toString();
  setting.lvMax = setting.lvMax.toString();
  // 高低一致指的是在多选难度时，最低和最高的设置完全一致
  // 这时候就跟单难度的判断方法一样了
  let 高低一致 =
    setting.lvMultiple === true &&
    setting.lvMin === setting.lvMax &&
    setting.lvMinPlus === setting.lvMaxPlus;
  console.log("是否高低一致：", 高低一致);

  // 如果是单一难度的话
  if (高低一致 === true || setting.lvMultiple === false) {
    let 抽歌等级 = setting.lvMin;
    if (setting.lvMinPlus === true) {
      抽歌等级 = 抽歌等级 + "+";
    }
    tempSongList.map((song) => {
      console.log("正在处理的歌：", song);
      for (const [songRank, songDifficulty] of Object.entries(song.等级)) {
        console.log("正在判断的难度和等级：", songRank, songDifficulty);
        if (setting.rank.includes(songRank)) {
          console.log("这个难度符合要求：", songRank);
          if (抽歌等级 === songDifficulty.toString()) {
            console.log("等级也符合要求：", songDifficulty);

            let songPreview = {
              id: song.id,
              rank: songRank,
              preview: {
                name: song.曲名,
                rank: songRank,
                lv: songDifficulty,
              },
            };

            console.log("output 被塞了这个：", songPreview);
            output.push(songPreview);
          }
        }
      }
    });
  }

  //#endregion

  console.timeEnd("筛歌计时器");
  console.log("筛歌结束");
  return output;
}
