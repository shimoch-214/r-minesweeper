import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { MineSweeperModel } from "./types";
import * as command from "./client/command";

type Props = { children: React.ReactNode };

const MineSweeperContext = createContext<
  | {
      mineSweeper: MineSweeperModel;
      open(x: number, y: number): Promise<void>;
      addFlag(x: number, y: number): Promise<void>;
      subFlag(x: number, y: number): Promise<void>;
    }
  | undefined
>(undefined);

export function MineSweeperProvider({ children }: Props) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [mineSweeper, setMineSweeper] = useState<MineSweeperModel>();

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
      value={{ mineSweeper, open, addFlag, subFlag }}
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
