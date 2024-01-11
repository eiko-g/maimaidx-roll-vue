export default interface ISetting {
  isFirstRun: boolean;
  // 难度
  rank: Array<string>;
  // 分类
  category: Array<string>;
  // 难度多选
  lvMultiple: boolean;
  // 最低等级
  lvMin: number | string;
  // 最低等级带加号
  lvMinPlus: boolean;
  // 最高等级
  lvMax: number | string;
  // 最高等级带加号
  lvMaxPlus: boolean;
  // 版本
  version: Array<string>;
}
