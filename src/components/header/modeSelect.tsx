import { useMineSweeperCtx } from "../provider";
import { GameMode } from "../../types";

export function MineSweeperModeSelect(): JSX.Element {
  const { mode, selectMode } = useMineSweeperCtx();
  return (
    <label>
      <select
        value={mode}
        onChange={(e) => selectMode(e.target.value as GameMode)}
      >
        <option value={GameMode.Low}>初級</option>
        <option value={GameMode.Middle}>中級</option>
        <option value={GameMode.High}>上級</option>
      </select>
    </label>
  );
}
