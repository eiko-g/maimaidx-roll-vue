export default interface ISong {
  id: number;
  分类: string;
  曲名: string;
  BPM?: string | number;
  等级: {
    B: string | number;
    A: string | number;
    E: string | number;
    M: string | number;
    R: string | number;
  };
  类型: string;
  版本: string;
  封面: string | undefined;
  作者?: string | undefined;
  lvMark?: {
    B: number;
    A: number;
    E: number;
    M: number;
    R?: number;
  };
}
