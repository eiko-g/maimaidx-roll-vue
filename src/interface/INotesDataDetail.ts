export default interface INotesDataDetail {
  notes_designer: string,
  notes_count: {
    tap: number,
    hold: number,
    slide: number,
    touch: number,
    break: number,
    all: number
  } | {
    left: {
      tap: number,
      hold: number,
      slide: number,
      touch: number,
      break: number,
      all: number
    },
    right:{
      tap: number,
      hold: number,
      slide: number,
      touch: number,
      break: number,
      all: number
    }
  }
}
