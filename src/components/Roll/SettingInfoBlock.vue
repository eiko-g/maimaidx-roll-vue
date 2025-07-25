<template>
  <div class="setting-info">
    <p>
      <b>抽选等级：</b>
      [
      <span class="rank">
        <span v-if="!setting.rank">难度</span>
        <span v-if="setting.rank && setting.rank.includes('all')" class="all">全难度</span>
        <span v-if="setting.rank && setting.rank.includes('basic')" class="B">B</span>
        <span v-if="setting.rank && setting.rank.includes('advanced')" class="A">A</span>
        <span v-if="setting.rank && setting.rank.includes('expert')" class="E">E</span>
        <span v-if="setting.rank && setting.rank.includes('master')" class="M">M</span>
        <span v-if="setting.rank && setting.rank.includes('re_master')" class="R">R</span>
      </span>
      ]
      <span class="lv">{{ lvText }}</span>
    </p>
    <p>
      <b>抽选分类：</b>
      <span class="category">{{ catText }}</span>
    </p>
    <p>
      <b>抽选版本：</b>
      <span class="version">{{ verText }}</span>
    </p>
    <p>
      <b>抽选歌单：</b>
      <span class="songlist">{{ songlistStore.songlistVersion }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import type IVersion from '@/interface/IVersion';
import { useSonglistStore } from '@/stores/songlist';
import { computed } from 'vue';

const props = defineProps(['setting']);
const songlistStore = useSonglistStore();

const lvText = computed(() => {
  let str = '';
  if (props.setting.lvMin > 0) {
    str = props.setting.lvMin;
    if (props.setting.lvMultiple) {
      str += ` ~ ${props.setting.lvMax}`;
    }
  } else {
    str = '未设置等级';
  }
  return str;
});

function getCatName(cat: string) {
  switch (cat) {
    case '101':
      return '动画 & 流行';
    case '102':
      return 'nico & V家';
    case '103':
      return '东方 Project';
    case '104':
      return '其他游戏';
    case '105':
      return 'maimai';
    case '106':
      return '音击 & 中二';
    case '107':
      return '宴会场';
    case 'all':
      return '全部分类';
    default:
      return '分类有误';
  }
}

const catText = computed(() => {
  const tempArr: string[] = [];
  props.setting.category.forEach((item: string) => {
    tempArr.push(getCatName(item));
  });
  return tempArr.join('、');
});

const verText = computed(() => {
  let str = '';
  if (!props.setting.version.includes('all')) {
    const tempArr: string[] = [];
    props.setting.version.map((sver_item: string) => {
      const result = (songlistStore.version as IVersion[]).find(
        (ver_item) => ver_item.id == +sver_item,
      );
      if (result) {
        tempArr.push(result.name);
      }
    });
    str = tempArr.join('、');
  } else {
    str = '全部版本';
  }
  return str;
});
</script>

<style scoped lang="scss">
.setting-info {
  color: #333;
  font-size: 12px;
  text-align: center;

  .rank {
    > span:not(:last-child)::after {
      content: '.';
    }

    .B {
      color: var(--color-B-dark);
    }

    .A {
      color: var(--color-A-dark);
    }

    .E {
      color: var(--color-E-dark);
    }

    .M {
      color: var(--color-M-dark);
    }

    .R {
      color: var(--color-R-dark);
    }
  }
}
</style>
