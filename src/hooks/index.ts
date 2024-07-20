import { useCallback, useEffect, useState } from "react";
import type { MineSweeperModel } from "../types";
import * as command from "../client/command";

export function useMineSweeper() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [mineSweeper, setMineSweeper] = useState<MineSweeperModel>();

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    const init = async () => {
      const res = await command.get();
      setMineSweeper(res);
    };
    init();
    setIsInitialized(true);
  }, [isInitialized]);

  const open = useCallback(
    async (x: number, y: number) => {
      if (!isInitialized) return;
      const res = await command.open(x, y);
      setMineSweeper(res);
    },
    [isInitialized],
  );

  const addFlag = useCallback(
    async (x: number, y: number) => {
      if (!isInitialized) return;
      const res = await command.addFlag(x, y);
      setMineSweeper(res);
    },
    [isInitialized],
  );

  const subFlag = useCallback(
    async (x: number, y: number) => {
      if (!isInitialized) return;
      const res = await command.subFlag(x, y);
      setMineSweeper(res);
    },
    [isInitialized],
  );

  const get = useCallback(async () => {
    if (!isInitialized) return;
    const res = await command.get();
    setMineSweeper(res);
  }, [isInitialized]);

  return {
    mineSweeper,
    open,
    addFlag,
    subFlag,
    get,
  };
}
