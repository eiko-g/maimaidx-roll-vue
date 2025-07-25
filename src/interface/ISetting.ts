export default interface ISetting {
  isFirstRun: boolean,
  // 难度
  rank: Array<string>,
  // 分类
  category: Array<number|string>,
  // 难度多选
  lvMultiple: boolean,
  // 最低等级
  lvMin: number ,
  // 最高等级
  lvMax: number ,
  // 版本
  version: Array<number|string>,
}
