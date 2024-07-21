import { invoke } from "@tauri-apps/api/tauri";
import type { ResponseModel } from "./type";
import { Position, type MineSweeperModel } from "../types";

const convert = (res: ResponseModel): MineSweeperModel => {
  const openedPositions: MineSweeperModel["openedPositions"] = new Map(
    res.opened_positions.map((p) => [Position(p.x, p.y), p.around_mines_count]),
  );
  const flaggedPositions: MineSweeperModel["flaggedPositions"] = new Set(
    res.flagged_positions.map((p) => Position(p.x, p.y)),
  );
  const minePositions: MineSweeperModel["minePositions"] = new Set(
    res.mine_positions.map((p) => Position(p.x, p.y)),
  );

  return {
    status: res.status,
    width: res.width,
    hight: res.hight,
    mineCount: res.mine_count,
    openedPositions,
    flaggedPositions,
    minePositions,
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

export const subFlag = async (
  x: number,
  y: number,
): Promise<MineSweeperModel> => {
  const res: ResponseModel = await invoke("sub_flag", { x, y });
  return convert(res);
};

export const restart = async (): Promise<MineSweeperModel> => {
  const res: ResponseModel = await invoke("restart");
  return convert(res);
};
