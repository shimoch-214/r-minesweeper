import { invoke } from "@tauri-apps/api/tauri";
import type { MineSweeperModel, ResponseModel } from "./type";

const convert = (res: ResponseModel): MineSweeperModel => {
  return {
    status: res.status,
    width: res.width,
    hight: res.hight,
    mineCount: res.mine_count,
    openedPositions: res.opened_positions,
    flaggedPositions: res.flagged_positions,
  };
};

export const get = async (): Promise<MineSweeperModel> => {
  const res: ResponseModel = await invoke("get");
  return convert(res);
};

export const open = async (x: number, y: number): Promise<MineSweeperModel> => {
  const res: ResponseModel = await invoke("open", { x, y });
  return convert(res);
};

export const addFlag = async (
  x: number,
  y: number,
): Promise<MineSweeperModel> => {
  const res: ResponseModel = await invoke("add_flag", { x, y });
  return convert(res);
};
