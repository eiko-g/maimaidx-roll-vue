import type IMusic from '@/interface/IMusic';
import type ISetting from '@/interface/ISetting';
import type ISongRollList from '@/interface/ISongRollList';

export default function songFilterV3(
  song_list: IMusic[],
  input_setting: ISetting,
): ISongRollList[] | undefined {
  console.log('开始筛歌');
  console.time('筛歌计时器');

  if (!input_setting || Object.keys(input_setting).length === 0) {
    console.error('筛歌函数没有加载到设置，代码写炸了');
    return [];
  }

  console.log('输入进来的设置：', input_setting);

  const output_list: ISongRollList[] = [];

  // 先筛出来没有被禁用的歌
  let temp_song_list = song_list.filter((item) => !item.disable);

  // 筛一下分类
  console.log('筛分类');
  if (!input_setting.category.includes('all')) {
    console.log('要筛的分类', input_setting.category);
    temp_song_list = temp_song_list.filter((item) =>
      input_setting.category.includes(item.genre.toString()),
    );
  }

  // 筛一下版本
  console.log('筛版本');
  if (!input_setting.version.includes('all')) {
    console.log('要筛的版本', input_setting.version);
    temp_song_list = temp_song_list.filter((item) =>
      input_setting.version.includes(item.add_version.toString()),
    );
  }

  // 筛一下等级
  console.log('筛等级');
  function levelFilter(level: number) {
    if (!input_setting.lvMultiple) {
      return level === input_setting.lvMin;
    } else {
      return level >= input_setting.lvMin && level <= input_setting.lvMax;
    }
  }

  if (input_setting.rank.includes('all')) {
    input_setting.rank = ['basic', 'advanced', 'expert', 'master', 're_master'];
  }

  temp_song_list.map((song_item) => {
    console.log('正在处理曲目的 ID：', song_item.id);
    input_setting.rank.map((rank_item) => {
      console.log('正在处理的难度：', rank_item);
      if (!(rank_item in song_item.levels)) {
        return;
      }
      const levelValue = song_item.levels[rank_item as keyof typeof song_item.levels];
      if (levelFilter(levelValue as number)) {
        output_list.push({
          id: song_item.id,
          name: song_item.name ?? '',
          difficult: rank_item,
          level: levelValue,
        });
      }
    });
  });

  console.timeEnd('筛歌计时器');
  console.log('筛出来的歌单', output_list);
  return output_list;
}
