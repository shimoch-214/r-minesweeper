import type { AroundMinesCount, Status } from "../types";

export type ResponseModel = {
  status: Status;
  width: number;
  hight: number;
  mine_count: number;
  opened_positions: {
    x: number;
    y: number;
    around_mines_count: AroundMinesCount;
  }[];
  flagged_positions: {
    x: number;
    y: number;
  }[];
};
