import { MineSweeperMineCount } from "./mineCount";
import { MineSweeperStatus } from "./status";
import { MineSweeperTimer } from "./timer";

export function MineSweeperHeader(): JSX.Element {
  return (
    <div className="flex justify-between">
      <MineSweeperMineCount />
      <MineSweeperStatus />
      <MineSweeperTimer />
    </div>
  );
}
