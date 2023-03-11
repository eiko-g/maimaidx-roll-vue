# maimaiDX 封面文件夹
为啥这里没有图片呢？因为我没传，版权警告。

## How to get 封面？
先去 [官网](https://maimai.sega.jp/song)，然后开控制台，贴入以下代码：

```javascript
(async function() {
    // 这是日版歌单，最新最热
    let response = await fetch('https://maimai.sega.jp/data/maimai_songs.json');
    let list = await response.json();

    // 然后建立一个下载列表
    let cover = [];
    list.forEach(item=>{
        cover.push('https://maimaidx.jp/maimai-mobile/img/Music/'+item.image_url);
    });

    // 最后写到页面
    document.body.innerHTML = cover.join('<br>');
})();
```

全选，把内容保存到 `cover.txt`。然后开个 `bash` 或者别的啥，反正有 `wget` 就行，然后执行以下内容：

```bash
wget -i cover.txt --no-check-certificate -nv
```

这样就可以把封面下到当前文件夹了。

## 有些封面跟舞萌 DX 不一样怎么办？
嗨呀你不会去公众号扒吗？