import { type MineSweeperModel, Position } from "../../../types";
import { Closed, Flagged, HiddenMine, InvalidFlagged } from "./closed";
import { Opened } from "./opened";
import { useMineSweeperCtx } from "../../provider";
import {
  inProgress,
  isFlagged,
  isMine,
  isOpened,
} from "../../../lib/mineSweeper";

type Props = {
  x: number;
  y: number;
};

const selectCellOnStarted = (mineSweeper: MineSweeperModel, pos: Position) => {
  if (isFlagged(mineSweeper, pos)) {
    return <Flagged />;
  }
  return <Closed />;
};

const selectCellOnSuccess = () => {
  return <Flagged />;
};

const selectCellOnFailed = (mineSweeper: MineSweeperModel, pos: Position) => {
  const flagged = isFlagged(mineSweeper, pos);
  const mine = isMine(mineSweeper, pos);
  if (flagged && !mine) {
    return <InvalidFlagged />;
  }
  if (flagged) {
    return <Flagged />;
  }
  if (mine) {
    return <HiddenMine />;
  }
  return <Closed />;
};

const selectCell = (mineSweeper: MineSweeperModel, pos: Position) => {
  if (mineSweeper.status === "Init") {
    return <Closed />;
  }

  if (isOpened(mineSweeper, pos)) {
    const aroundMineCount = mineSweeper.openedPositions.get(pos);
    if (aroundMineCount === undefined)
      throw new Error("unexpectedly not found");

    return <Opened value={aroundMineCount} />;
  }
  switch (mineSweeper.status) {
    case "Started":
      return selectCellOnStarted(mineSweeper, pos);
    case "Success":
      return selectCellOnSuccess();
    case "Failed":
      return selectCellOnFailed(mineSweeper, pos);
  }
};

export function Cell({ x, y }: Props) {
  const { mineSweeper, open, addFlag, subFlag } = useMineSweeperCtx();

  const pos = Position(x, y);

  const handleOpen = async () => {
    if (!isOpened(mineSweeper, pos) && !isFlagged(mineSweeper, pos)) {
      await open(x, y);
    }
  };

  const handleFlag = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (isOpened(mineSweeper, pos)) return;

    if (isFlagged(mineSweeper, pos)) {
      await subFlag(x, y);
    } else {
      await addFlag(x, y);
    }
  };

  const isDisabled = !inProgress(mineSweeper);

  return (
    <button
      onClick={handleOpen}
      onContextMenu={handleFlag}
      disabled={isDisabled}
      type="button"
    >
      <div className="size-8 text-center leading-loose">
        {selectCell(mineSweeper, pos)}
      </div>
    </button>
  );
}
