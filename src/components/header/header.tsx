import { MineSweeperMineCount } from "./mineCount";
import { MineSweeperModeSelect } from "./modeSelect";
import { MineSweeperStatus } from "./status";
import { MineSweeperTimer } from "./timer";

export function MineSweeperHeader(): JSX.Element {
  return (
    <>
      <MineSweeperModeSelect />
      <div className="flex justify-between">
        <MineSweeperMineCount />
        <MineSweeperStatus />
        <MineSweeperTimer />
      </div>
    </>
  );
}
