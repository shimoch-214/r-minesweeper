import type { MineSweeperModel, Position } from "../../types";

export const inProgress = (mineSweeper: MineSweeperModel): boolean => {
  switch (mineSweeper.status) {
    case "Init":
      return true;
    case "Started":
      return true;
    case "Failed":
      return false;
    case "Success":
      return false;
  }
};

export const isOpened = (
  mineSweeper: MineSweeperModel,
  pos: Position,
): boolean => {
  return mineSweeper.openedPositions.has(pos);
};

export const isFlagged = (
  mineSweeper: MineSweeperModel,
  pos: Position,
): boolean => {
  return mineSweeper.flaggedPositions.has(pos);
};

export const isMine = (
  mineSweeper: MineSweeperModel,
  pos: Position,
): boolean => {
  return mineSweeper.minePositions.has(pos);
};
