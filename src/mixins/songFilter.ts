/**
 * 输入原歌单和设置，然后一通操作后输出筛选后的歌单列表
 * 输出的格式为 [{id:"歌曲 ID",rank:"符合抽歌要求的难度"}]
 * To do: 数据部分使用定数，就不用这么傻逼了
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
  // 屌，这里先转为数字才行
  setting.lvMin = Number.parseInt(setting.lvMin as string);
  setting.lvMax = Number.parseInt(setting.lvMax as string);
  // 高低一致指的是在多选难度时，最低和最高的设置完全一致
  // 这时候就跟单难度的判断方法一样了
  let 高低一致 =
    setting.lvMultiple === true &&
    setting.lvMin === setting.lvMax &&
    setting.lvMinPlus === setting.lvMaxPlus;
  console.log("是否高低一致：", 高低一致);

  // 如果是单一难度的话
  if (高低一致 === true || setting.lvMultiple !== true) {
    console.log("现在抽的是单难度");

    let 抽歌等级: string = setting.lvMin.toString();
    if (setting.lvMinPlus === true) {
      抽歌等级 = 抽歌等级 + "+";
    }
    // 对临时歌单进行处理
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
  } else if (setting.lvMultiple === true && 高低一致 === false) {
    console.log("现在抽的是范围难度");

    // 如果是 范围难度 且 不是同样的设置
    if (setting.lvMin === setting.lvMax) {
      console.log("等级的数字部分相同");
      // 如果数字部分相同的话
      // 上面已经判断过带不带加号的情况了，这里就不用判断了
      let 抽歌等级 = setting.lvMin;
      // 对临时歌单进行处理
      tempSongList.map((song) => {
        console.log("正在处理的歌：", song);
        for (const [songRank, songDifficulty] of Object.entries(song.等级)) {
          console.log("正在判断的难度和等级：", songRank, songDifficulty);
          if (setting.rank.includes(songRank)) {
            console.log("这个难度符合要求：", songRank);
            if (抽歌等级 === Number.parseInt(songDifficulty as string)) {
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
    } else {
      // 如果数字部分不同的话
      console.log("等级的数字部分不同", setting.lvMin, setting.lvMax);
      console.log(
        "低等级带加号：",
        setting.lvMinPlus,
        "高等级带加号：",
        setting.lvMaxPlus
      );

      // 对临时歌单进行处理
      tempSongList.map((song) => {
        console.log("---分割线---");

        console.log("正在处理的歌：", song);
        for (const [songRank, songDifficulty] of Object.entries(song.等级)) {
          console.log("正在判断的难度和等级：", songRank, songDifficulty);
          if (setting.rank.includes(songRank)) {
            console.log("这个难度符合要求：", songRank);

            // 预设结果
            let result = false;

            // 麻鬼烦的等级判定
            // 先判断整数范围
            // 如果某首歌是 12+ 的话就在 11+ ~ 13 里面，这个肯定没问题，嗯🚩
            // 同理，11/11+ 和 13/13+ 目前也是在范围内，下面再判断边缘情况
            // 抽 11+ ~ 12 也是没问题的，11/12+ 的情况在下面会判断
            if (
              Number.parseInt(songDifficulty as string) >= +setting.lvMin &&
              Number.parseInt(songDifficulty as string) <= +setting.lvMax
            ) {
              console.log("等级的数字部分在设置范围内：", songDifficulty);
              result = true;
            }

            console.log(
              "等级整数等于lvMin：",
              Number.parseInt(songDifficulty as string) === setting.lvMin
            );
            console.log(
              "结尾没有+：",
              (songDifficulty as string)[
                (songDifficulty as string).length - 1
              ] !== "+"
            );

            // 再判断边缘情况
            // 如果抽到 11 的话，就不在 11+ ~ 13 的范围了嘛
            // 如果是抽 11 ~ 13 就不用这个判断了
            if (
              // what if 11/11+
              Number.parseInt(songDifficulty as string) === setting.lvMin &&
              // what if 要求结尾是+
              setting.lvMinPlus === true &&
              // what if 结尾没有+
              (songDifficulty as string)[
                (songDifficulty as string).length - 1
              ] !== "+"
            ) {
              // 就不在抽歌范围了
              result = false;
              // 举例：抽 11+ ~ 12，上面筛出来一首 11
              // 那么 11 取整得到 11，设置要求带加号，但是 11 的最后一位不是 +，所以为 false
              // 筛出来一首 11+ 的话，取整得到 11，最后一位是 +，所以无动作，继承上面的 判定结果 = true
            }

            console.log(
              "等级整数等于lvMax：",
              Number.parseInt(songDifficulty as string) === setting.lvMax
            );
            console.log(
              "结尾有+：",
              (songDifficulty as string)[
                (songDifficulty as string).length - 1
              ] === "+"
            );

            // 判断最高等级的就是反过来的，我也不知道为什么这么写，但是感觉就该这样，脑子不太行。
            if (
              // what if 13/13+
              Number.parseInt(songDifficulty as string) === setting.lvMax &&
              // what if 要求结尾不是+
              setting.lvMaxPlus !== true &&
              // what if 结尾有+
              (songDifficulty as string)[
                (songDifficulty as string).length - 1
              ] === "+"
            ) {
              // 就不在抽歌范围了
              result = false;
              // 举例：抽 11+ ~ 12，上面筛出来一首 12+
              // 那么 12+ 取整得到 12，设置要求不带加号，但是 12+ 的最后一位是 +，所以为 false
              // 筛出来一首 12 的话，取整得到 12，最后一位不是 +，所以无动作，继承上面的 判定结果 = true
            }

            if (result === true) {
              console.log("等级符合要求：", songDifficulty);

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
  }

  //#endregion

  console.timeEnd("筛歌计时器");
  console.log("筛歌结束");

  // 挂到外面方便测试，虽然 TS 会报错但是能用
  // window.aaa = output;
  return output;
}
