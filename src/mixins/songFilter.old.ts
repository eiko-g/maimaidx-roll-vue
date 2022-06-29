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
  id: number,
  rank: string,
  preview: {
    name: string,
    rank: string,
    lv: number | string
  }
}

export default function songFilter(songlist: Array<ISong>, inputSetting: ISetting) {
  console.time('筛歌');
  if (!inputSetting || Object.keys(inputSetting).length === 0) {
    console.error('筛歌函数没有加载到设置，代码写炸了');
    return {};
  }
  console.log('输入进来的设置：', inputSetting);
  let
    setting = inputSetting,
    tempSongList = songlist,
    output: Array<ISongPreview> = [];
  if (setting.rank.includes('all')) {
    setting.rank = ['B', 'A', 'E', 'M', 'R'];
  }
  console.log('筛歌时的设置', setting);

  // 先筛分类
  if (setting.category[0] !== "all") {
    tempSongList = songlist.filter((item: ISong) => {
      return setting.category.includes(item.分类);
    });
  }

  // 再筛版本
  if (setting.version[0] !== "all") {
    tempSongList = tempSongList.filter(item => {
      return setting.version.includes(item.版本);
    });
  }
  // 看看筛完之后的
  console.log('筛了分类跟版本之后的歌单', tempSongList);
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
  console.log('高低一致', 高低一致)
  function 筛歌过程(等级: string) {
    // console.log('筛歌过程输入的等级', 等级);
    // 如果 非多等级筛选 或 最高等级跟最低等级设置一致
    if (setting.lvMultiple === false || 高低一致 === true) {
      let 抽歌等级 = setting.lvMin;
      // 如果要带加号就加上
      if (setting.lvMinPlus) {
        抽歌等级 = 抽歌等级 + "+";
      }
      // console.log("抽歌等级", 抽歌等级);
      // 直接判断一不一样就是了
      return 等级 === 抽歌等级;
    } else if (setting.lvMultiple === true && 高低一致 === false) {
      // 如果 等级多选 且 高低设置不一致
      // 先判定上下限
      // 如果高低整数等级一样的话，比如 12 跟 12+
      if (setting.lvMin === setting.lvMax) {
        // 这个好处理，直接返回结果就好
        // 举例：取整('12+') == 12，返回 true
        // 取整('13+') == 12，返回 false
        return Number.parseInt(等级) === setting.lvMin;
      } else {
        // 多等级的话，比如 11+ ~ 13
        // 先预设判定结果
        let 判定结果 = false;
        // 先判断整数范围
        // 如果某首歌是 12+ 的话就在 11+ ~ 13 里面，这个肯定没问题，嗯🚩
        // 同理，11/11+ 和 13/13+ 目前也是在范围内，下面再判断边缘情况
        // 抽 11+ ~ 12 也是没问题的，11/12+ 的情况在下面会判断
        if (
          Number.parseInt(等级) >= setting.lvMin &&
          Number.parseInt(等级) <= setting.lvMax
        ) {
          判定结果 = true;
        }
        // 再判断边缘情况
        // 如果抽到 11 的话，就不在 11+ ~ 13 的范围了嘛
        // 如果是抽 11 ~ 13 就不用这个判断了
        if (
          // what if 11/11+
          Number.parseInt(等级) === setting.lvMin &&
          // what if 要求结尾是+
          setting.lvMinPlus === true &&
          // what if 结尾没有+
          等级[等级.length - 1] !== "+"
        ) {
          // 就不在抽歌范围了
          判定结果 = false;
          // 举例：抽 11+ ~ 12，上面筛出来一首 11
          // 那么 11 取整得到 11，设置要求带加号，但是 11 的最后一位不是 +，所以为 false
          // 筛出来一首 11+ 的话，取整得到 11，最后一位是 +，所以无动作，继承上面的 判定结果 = true
        }

        // 判断最高等级的就是反过来的，我也不知道为什么这么写，但是感觉就该这样，脑子不太行。
        if (
          // what if 13/13+
          Number.parseInt(等级) === setting.lvMax &&
          // what if 要求结尾不是+
          setting.lvMaxPlus !== true &&
          // what if 结尾有+
          等级[等级.length - 1] == "+"
        ) {
          // 就不在抽歌范围了
          判定结果 = false;
          // 举例：抽 11+ ~ 12，上面筛出来一首 12+
          // 那么 12+ 取整得到 12，设置要求不带加号，但是 12+ 的最后一位是 +，所以为 false
          // 筛出来一首 12 的话，取整得到 12，最后一位不是 +，所以无动作，继承上面的 判定结果 = true
        }

        // 返回判定结果
        return 判定结果;
      }
    }
  }
  //#endregion
  // 开始筛选
  tempSongList.map(song => {
    // console.log('正在判断的歌', song);
    for (const [songRank, songDifficulty] of Object.entries(song.等级)) {
      if (setting.rank.includes(songRank)) {
        if (筛歌过程((songDifficulty as string))) {
          let songPreview = {
            id: song.id,
            rank: songRank,
            preview: {
              name: song.曲名,
              rank: songRank,
              lv: songDifficulty
            }
          };
          // console.log('output 被塞了这个：', songPreview);
          output.push(songPreview);
        }
      }
    }

  });
  console.timeEnd('筛歌');
  return output;
}