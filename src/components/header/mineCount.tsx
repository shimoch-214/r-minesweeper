import { useMineSweeperCtx } from "../provider";

export function MineSweeperMineCount(): JSX.Element {
  const { mineSweeper: ms } = useMineSweeperCtx();
  const count = ms.mineCount - ms.flaggedPositions.size;
  return <p>{count}</p>;
}
