import { useMineSweeperCtx } from "../../provider";
import { Cell } from "./cell/cell";

export function MineSweeperTable(): JSX.Element {
  const { mineSweeper: ms } = useMineSweeperCtx();
  const cells = Array.from({ length: ms.hight }, (_, j) => {
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <tr key={j}>
        {Array.from({ length: ms.width }, (_, i) => {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <td key={`${i}_${j}`}>
              <Cell x={i} y={j} />
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <table className="select-none">
      <tbody>{cells}</tbody>
    </table>
  );
}
