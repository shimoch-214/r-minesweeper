import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { GameMode, MineSweeperModel } from "./types";
import * as command from "./client/command";

type Props = { children: React.ReactNode };

const MineSweeperContext = createContext<
  | {
      mode: GameMode;
      mineSweeper: MineSweeperModel;
      selectMode(mode: GameMode): void;
      open(x: number, y: number): Promise<void>;
      addFlag(x: number, y: number): Promise<void>;
      subFlag(x: number, y: number): Promise<void>;
      restart(): Promise<void>;
    }
  | undefined
>(undefined);

export function MineSweeperProvider({ children }: Props) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [mode, setMode] = useState<GameMode>("Low");
  const [mineSweeper, setMineSweeper] = useState<MineSweeperModel>();

  const selectMode = useCallback(
    async (selected: GameMode) => {
      if (!isInitialized) return;
      setMode(selected);
      const res = await command.restart(selected);
      setMineSweeper(res);
    },
    [isInitialized],
  );

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

  const restart = useCallback(async () => {
    if (!isInitialized) return;
    const res = await command.restart(mode);
    setMineSweeper(res);
  }, [isInitialized, mode]);

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

  if (!mineSweeper) return <>loading</>;

  return (
    <MineSweeperContext.Provider
      value={{ mode, mineSweeper, open, addFlag, subFlag, restart, selectMode }}
    >
      {children}
    </MineSweeperContext.Provider>
  );
}

export function useMineSweeperCtx() {
  const ctx = useContext(MineSweeperContext);

  if (!ctx) throw new Error("not initialized");

  return ctx;
}
