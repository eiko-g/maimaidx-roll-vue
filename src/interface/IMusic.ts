import type INotesDataDetail from './INotesDataDetail';

export default interface IMusic {
  id: number;
  // id11422 如月车站 没有曲名
  name?: string;
  // 排序名
  sort_name?: string;
  // id259 蔬菜汁 没有作者名
  artist_name?: string;
  bpm: number;
  // 分类 107 为宴会场
  genre: number;
  // 对应 IVersion，0 就是无印
  add_version: number;
  disable: boolean;
  levels:
    | {
        basic: number;
        advanced: number;
        expert: number;
        master: number;
        re_master?: number;
      }
    | {
        utage: number;
      };
  notes_data:
    | {
        basic: INotesDataDetail;
        advanced: INotesDataDetail;
        expert: INotesDataDetail;
        master: INotesDataDetail;
        re_master?: INotesDataDetail;
      }
    | {
        utage: INotesDataDetail;
      };
  // 1 为双人谱
  utage_play_style?: number;
  utage_kanji?: string;
  utage_comment?: string;
}
