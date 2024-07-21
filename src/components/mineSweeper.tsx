import { MineSweeperHeader } from "./header/header";
import { MineSweeperTable } from "./table/table";

export function MineSweeper(): JSX.Element {
  return (
    <div className="inline-block pt-16">
      <MineSweeperHeader />
      <MineSweeperTable />
    </div>
  );
}
