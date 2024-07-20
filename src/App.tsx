import { useEffect, useState } from "react";
import type { MineSweeperModel } from "./client/type";
import { get } from "./client/command";

function App() {
  const [initialized, setInitialized] = useState(true);
  const [gameState, setGameState] = useState<MineSweeperModel>();

  useEffect(() => {
    if (!initialized) return;
    const initGame = async () => {
      const res = await get();
      setGameState(res);
    };
    initGame();
    setInitialized(false);
  }, [initialized]);

  return gameState ? (
    <>
      <p className="text-blue-300">{JSON.stringify(gameState)}</p>
    </>
  ) : (
    <>
      <p>initialized</p>
    </>
  );
}

export default App;
