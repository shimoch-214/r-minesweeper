import { useMineSweeperCtx } from "../provider";
import { Cell } from "./cell/cell";

export function MineSweeper(): JSX.Element {
  const { mineSweeper: ms, restart } = useMineSweeperCtx();
  const field = Array.from({ length: ms.hight }, (_, j) =>
    Array.from({ length: ms.width }, (_, i) => ({
      x: i,
      y: j,
    })),
  );

  const handleRestart = async () => {
    await restart();
  };

  return (
    <div className="inline-block">
      <div className="flex justify-between">
        <p>{ms.mineCount - ms.flaggedPositions.size}</p>
        <p>
          <button type="button" onClick={handleRestart}>
            {ms.status}
          </button>
        </p>
        <p>time</p>
      </div>
      <table className="flex justify-center">
        <tbody>
          {field.map((row) => (
            <tr key={row[0].y}>
              {row.map(({ x, y }) => (
                <td key={`${x}_${y}`}>
                  <Cell x={x} y={y} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
