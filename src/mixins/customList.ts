import type ISongRollList from "@/interface/ISongRollList";

const custom = {
  _getID() {
    console.log("从本地数据获取 ID");
    let a = parseInt(localStorage.getItem("songlist_id") as string);
    return a;
  },
  _setID() {
    console.log("那我+1");
    let a = this._getID() + 1;
    localStorage.setItem("songlist_id", a.toString());
  },
  get(id: number) {
    if (!id) {
      throw new Error("没输入 ID");
    }
    return id;
  },
  add(name: string = "未命名歌单") {
    this._setID();
    console.log("新歌单名为：", name);
    return name;
  },
  save(id: number, list: Array<ISongRollList>) {
    return { id, list };
  },
};

export { custom };
