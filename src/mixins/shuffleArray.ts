export default function shuffleArray(array:Array<any>) {
  // 打乱数组，来自：https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // 逼乎相关讨论：https://www.zhihu.com/question/68330851
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}