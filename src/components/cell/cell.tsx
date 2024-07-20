import { type AroundMinesCount, Position } from "../../types";
import { Closed, Flagged } from "./closed";
import { Opened } from "./opened";
import { useMineSweeperCtx } from "../../provider";

type Props = {
  x: number;
  y: number;
};

const selectCell = (opened: AroundMinesCount | undefined, flagged: boolean) => {
  if (opened !== undefined) {
    return <Opened value={opened} />;
  }
  if (flagged) {
    return <Flagged />;
  }
  return <Closed />;
};

export function Cell({ x, y }: Props) {
  const { mineSweeper, open, addFlag, subFlag } = useMineSweeperCtx();

  const pos = Position(x, y);

  const opened = mineSweeper.openedPositions.get(pos);
  const flagged = mineSweeper.flaggedPositions.has(Position(x, y));

  const handleOpen = async () => {
    if (opened !== undefined || flagged) return;
    await open(x, y);
  };

  const handleFlag = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (opened !== undefined) return;

    if (flagged) {
      await subFlag(x, y);
    } else {
      await addFlag(x, y);
    }
  };

  return (
    <button onClick={handleOpen} onContextMenu={handleFlag} type="button">
      <div className="size-8 text-center leading-loose">
        {selectCell(opened, flagged)}
      </div>
    </button>
  );
}
