import { useMineSweeperCtx } from "../provider";
import { Cell } from "./cell/cell";
import { MineSweeperHeader } from "./header/header";

export function MineSweeper(): JSX.Element {
  const { mineSweeper: ms } = useMineSweeperCtx();
  const field = Array.from({ length: ms.hight }, (_, j) =>
    Array.from({ length: ms.width }, (_, i) => ({
      x: i,
      y: j,
    })),
  );
  return (
    <div className="inline-block">
      <MineSweeperHeader />
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
