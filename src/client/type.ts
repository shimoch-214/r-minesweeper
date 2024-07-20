type Status = "Inti" | "Started" | "Failed" | "Success";

type Position = { x: number; y: number };

type OpenedPosition = Position & {
  aroundBombsCount: number;
};

export type ResponseModel = {
  status: Status;
  width: number;
  hight: number;
  mine_count: number;
  opened_positions: OpenedPosition[];
  flagged_positions: Position[];
};

export type MineSweeperModel = {
  status: Status;
  width: number;
  hight: number;
  mineCount: number;
  openedPositions: OpenedPosition[];
  flaggedPositions: Position[];
};
