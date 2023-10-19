import type ISongRollList from "@/interface/ISongRollList";

const custom = {
  get(id: number) {
    return id;
  },
  add(name: string) {
    return name;
  },
  save(id: number, list: Array<ISongRollList>) {
    return { id, list };
  },
};

export { custom };
