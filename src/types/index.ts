export type Status = "Inti" | "Started" | "Failed" | "Success";

type BrandType<K, T> = K & { __brand: T };

export type Position = BrandType<string, "Position">;

export const Position = (x: number, y: number): Position => {
  return `${x}_${y}` as Position;
};

export type AroundMinesCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type MineSweeperModel = {
  status: Status;
  width: number;
  hight: number;
  mineCount: number;
  openedPositions: Map<Position, AroundMinesCount>;
  flaggedPositions: Set<Position>;
};
