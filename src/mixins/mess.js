export default function mess(inputLevel) {
    let setting = this.$store.getters.getSetting;
    // console.log("InputLevel", inputLevel);
    // 直接抄以前的部分了，还是用中文写变量方便
    // 高低一致指的是在多选难度时，最低和最高的设置完全一致
    // 这时候就跟单难度的判断方法一样了
    let 高低一致 =
        setting.lvMultiple == true &&
        setting.lv.lvMin == setting.lv.lvMax &&
        setting.lv.lvMinPlus == setting.lv.lvMaxPlus;
    // console.log("高低一致", 高低一致);
    if (setting.lvMultiple == false || 高低一致 == true) {
        // 单等级时的判断方法
        let 抽歌等级 = setting.lv.lvMin;
        // 如果要带加号就加上
        if (setting.lv.lvMinPlus) {
            抽歌等级 = 抽歌等级 + "+";
        }
        // console.log("抽歌等级", 抽歌等级);
        // 直接判断一不一样就是了
        return inputLevel == 抽歌等级;
    } else if (setting.lvMultiple == true || 高低一致 == false) {
        // 多等级时的判断方法
        // 先判定上下限
        // 如果高低整数等级一样的话，比如 12 跟 12+
        if (setting.lv.lvMin == setting.lv.lvMax) {
            // 这个好处理，直接返回结果就好
            // 举例：取整('12+') == 12，返回 true
            // 取整('13+') == 12，返回 false
            return Number.parseInt(inputLevel) == setting.lv.lvMin;
        } else {
            // 多等级的话，比如 11+ ~ 13
            // 先预设判定结果
            let 判定结果 = false;
            // 先判断整数范围
            // 如果某首歌是 12+ 的话就在 11+ ~ 13 里面，这个肯定没问题，嗯🚩
            // 同理，11/11+ 和 13/13+ 目前也是在范围内，下面再判断边缘情况
            // 抽 11+ ~ 12 也是没问题的，11/12+ 的情况在下面会判断
            if (
                Number.parseInt(inputLevel) >= setting.lv.lvMin &&
                Number.parseInt(inputLevel) <= setting.lv.lvMax
            ) {
                判定结果 = true;
            }
            // 再判断边缘情况
            // 如果抽到 11 的话，就不在 11+ ~ 13 的范围了嘛
            // 如果是抽 11 ~ 13 就不用这个判断了
            if (
                // what if 11/11+
                Number.parseInt(inputLevel) == setting.lv.lvMin &&
                // what if 要求结尾是+
                setting.lv.lvMinPlus == true &&
                // what if 结尾没有+
                inputLevel[inputLevel.length - 1] != "+"
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
                Number.parseInt(inputLevel) == setting.lv.lvMax &&
                // what if 要求结尾不是+
                setting.lv.lvMaxPlus != true &&
                // what if 结尾有+
                inputLevel[inputLevel.length - 1] == "+"
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