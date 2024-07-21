import { useMineSweeperCtx } from "../provider";

export function MineSweeperStatus(): JSX.Element {
  const { mineSweeper: ms, restart } = useMineSweeperCtx();

  const handleRestart = async () => {
    await restart();
  };

  return (
    <p>
      <button type="button" onClick={handleRestart}>
        {ms.status}
      </button>
    </p>
  );
}
